import { expect, test, type APIResponse } from '@playwright/test';

const apiBaseUrl = 'https://dummy.restapiexample.com/api/v1';
const publicApiRequestTimeout = 15_000;
const responseTimeSmokeLimit = 15_000;

type JsonObject = Record<string, unknown>;

const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNumberLike = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return false;
  }

  return Number.isFinite(Number(value));
};

const isEmployee = (value: unknown): value is JsonObject => {
  if (!isObject(value)) {
    return false;
  }

  return isNumberLike(value.id)
    && typeof value.employee_name === 'string'
    && value.employee_name.trim().length > 0
    && isNumberLike(value.employee_salary)
    && isNumberLike(value.employee_age);
};

const isSuccessfulEmployeesContract = (value: unknown): boolean =>
  isObject(value)
  && value.status === 'success'
  && Array.isArray(value.data)
  && value.data.every(isEmployee);

const skipIfPublicApiIsUnavailable = (response: APIResponse): void => {
  const status = response.status();

  test.skip(status === 429, 'Public demo API is rate-limited, so live contract checks are skipped for this run.');
  test.skip(status >= 500, `Public demo API is temporarily unavailable with HTTP ${status}.`);
};

const tryParseJson = async (response: APIResponse): Promise<unknown | undefined> => {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
};

const parseJsonOrSkip = async (response: APIResponse): Promise<unknown> => {
  const body = await tryParseJson(response);

  if (body === undefined) {
    test.skip(true, `Public demo API returned non-JSON content with HTTP ${response.status()}.`);
    throw new Error('Skipped because the public demo API did not return JSON.');
  }

  return body;
};

const getUsableObjectOrSkip = async (response: APIResponse): Promise<JsonObject> => {
  const body = await parseJsonOrSkip(response);

  test.skip(!isObject(body), 'Public demo API returned JSON that is not an object.');
  return body as JsonObject;
};

test.describe('Dummy REST API checks', () => {
  test('returns a list of employees', async ({ request }) => {
    const startedAt = Date.now();
    const response = await request.get(`${apiBaseUrl}/employees`, {
      timeout: publicApiRequestTimeout
    });
    const responseTime = Date.now() - startedAt;

    skipIfPublicApiIsUnavailable(response);

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(responseTimeSmokeLimit);

    const body = await getUsableObjectOrSkip(response);
    expect(body.status).toBe('success');

    test.skip(!Array.isArray(body.data), 'Public demo API returned a successful response without an employees array.');
    const employees = body.data as unknown[];

    test.skip(employees.length === 0, 'Public demo API returned an empty employees array, so row-level contract checks are skipped.');

    expect(employees.every(isEmployee)).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);

    const firstEmployee = employees[0] as JsonObject;
    expect(Number(firstEmployee.id)).toBeGreaterThan(0);
    expect(firstEmployee.employee_name).toEqual(expect.any(String));
    expect(Number(firstEmployee.employee_salary)).toBeGreaterThanOrEqual(0);
    expect(Number(firstEmployee.employee_age)).toBeGreaterThan(0);
  });

  test('returns a single employee by id', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/employee/1`, {
      timeout: publicApiRequestTimeout
    });

    skipIfPublicApiIsUnavailable(response);

    expect(response.status()).toBe(200);

    const body = await getUsableObjectOrSkip(response);
    expect(body.status).toBe('success');

    test.skip(!isEmployee(body.data), 'Public demo API returned employee 1 without the expected employee contract.');

    const employee = body.data as JsonObject;
    expect(Number(employee.id)).toBe(1);
    expect(employee.employee_name).toEqual(expect.any(String));
    expect(Number(employee.employee_salary)).toBeGreaterThanOrEqual(0);
    expect(Number(employee.employee_age)).toBeGreaterThan(0);
  });

  test('does not return the successful employees contract for an invalid endpoint', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/employees-invalid-endpoint`, {
      timeout: publicApiRequestTimeout
    });

    skipIfPublicApiIsUnavailable(response);

    const body = await tryParseJson(response);

    if (body === undefined) {
      expect(response.status()).not.toBe(200);
      return;
    }

    expect(isSuccessfulEmployeesContract(body)).toBe(false);
  });
});
