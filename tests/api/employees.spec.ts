import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://dummy.restapiexample.com/api/v1';

test.describe('Backend API tests - Dummy REST API Example', () => {
  test('should get all employees', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/employees`);

    expect([200, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('data');
      expect(Array.isArray(body.data)).toBeTruthy();
    }
  });

  test('should get a single employee by ID', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/employee/1`);

    expect([200, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('data');
    }
  });

  test('should create a new employee', async ({ request }) => {
    const payload = {
      name: 'Vasyl QA Test',
      salary: '70000',
      age: '35',
    };

    const response = await request.post(`${API_BASE_URL}/create`, {
      data: payload,
    });

    expect([200, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('data');
      expect(body.data.name).toBe(payload.name);
      expect(body.data.salary).toBe(payload.salary);
      expect(body.data.age).toBe(payload.age);
    }
  });

  test('should update an employee', async ({ request }) => {
    const payload = {
      name: 'Updated QA Employee',
      salary: '85000',
      age: '36',
    };

    const response = await request.put(`${API_BASE_URL}/update/1`, {
      data: payload,
    });

    expect([200, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('data');
      expect(body.data.name).toBe(payload.name);
    }
  });

  test('should delete an employee', async ({ request }) => {
    const response = await request.delete(`${API_BASE_URL}/delete/1`);

    expect([200, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    }
  });

  test('should handle request for invalid employee ID', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/employee/999999`);

    expect([200, 404, 429]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();

      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('data');
    }
  });
});
