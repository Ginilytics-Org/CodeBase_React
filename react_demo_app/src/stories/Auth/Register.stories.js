import React from 'react';
import { action } from '@storybook/addon-actions';
import Register from '../../components/Auth/Register';
import { userEvent, within, expect } from '@storybook/test';
import Title from 'antd/es/skeleton/Title';



export default {
  component: Register,
  title:"Auth/Register"
};

export const EmptyForm = {};

// Define a filled form scenario
export const FilledForm = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate interactions with the component
    await userEvent.type(canvas.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'john.doe@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'secure-password');

    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: /register/i }));

    // Wait for async actions to complete
    await new Promise((r) => setTimeout(r, 500));

    // Use a more flexible text matcher if the exact text is not found
    await expect(
      canvas.queryByText(/Registration successful/i) // Use a regex or partial text match
    ).toBeInTheDocument();
  },
};

