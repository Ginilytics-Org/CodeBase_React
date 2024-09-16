import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest'; // Import from @storybook/jest
import Login from '../../components/Auth/Login'; // Adjust the import path if necessary

export default {
  component: Login,
  title:"Auth/Login"
};



export const EmptyForm = {};

export const SuccessfulLogin = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mock Swal.fire globally
    window.Swal = {
      fire: async (title, text, icon) => {
        console.log('Swal.fire called with:', { title, text, icon });
        return Promise.resolve({ title, text, icon });
      },
    };

    // Mock localStorage
    const mockLocalStorage = {
      storage: {},
      getItem(key) {
        return this.storage[key] || null;
      },
      setItem(key, value) {
        this.storage[key] = value;
      },
      removeItem(key) {
        delete this.storage[key];
      },
      clear() {
        this.storage = {};
      },
    };

    // Replace global localStorage with mock
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Set up mock data
    mockLocalStorage.setItem('users', JSON.stringify([
      { email: 'email@provider.com', password: 'a-random-password' }
    ]));

    // Simulate user input
    await userEvent.type(canvas.getByLabelText(/email/i), 'email@provider.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'a-random-password');

    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: /login/i }));

    // Assert Swal.fire is called with success message
    await expect(
      window.Swal.fire
    ).toHaveBeenCalledWith('Success', 'Login successful!', 'success');

    // Restore original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  },
};

export const UnsuccessfulLogin = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Mock Swal.fire globally
    window.Swal = {
      fire: async (title, text, icon) => {
        console.log('Swal.fire called with:', { title, text, icon });
        return Promise.resolve({ title, text, icon });
      },
    };

    // Mock localStorage
    const mockLocalStorage = {
      storage: {},
      getItem(key) {
        return this.storage[key] || null;
      },
      setItem(key, value) {
        this.storage[key] = value;
      },
      removeItem(key) {
        delete this.storage[key];
      },
      clear() {
        this.storage = {};
      },
    };

    // Replace global localStorage with mock
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Set up mock data
    mockLocalStorage.setItem('users', JSON.stringify([
      { email: 'email@provider.com', password: 'a-random-password' }
    ]));

    // Simulate user input with invalid credentials
    await userEvent.type(canvas.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'wrongpassword');

    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: /login/i }));

    // Assert Swal.fire is called with error message
    await expect(
      window.Swal.fire
    ).toHaveBeenCalledWith('Error', 'Invalid credentials', 'error');

    // Restore original localStorage
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  },
};