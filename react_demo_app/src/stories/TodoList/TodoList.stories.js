import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import TodoList from '../../components/TodoList/TodoList'; 

export default {
  component: TodoList,
  title:"Pages/TodoList"
};

export const Default = () => <TodoList />;

export const WithInitialData = () => {
  const initialTodos = [
    { id: 1, text: 'Buy groceries', category: 'Personal' },
    { id: 2, text: 'Complete project report', category: 'Work' },
  ];
  const initialCategories = ['Personal', 'Work'];

  return (
    <div style={{ width: '600px' }}>
      <TodoList />
      {/* Mock initial data */}
      <script>
        {`
          localStorage.setItem('todos', ${JSON.stringify(initialTodos)});
          localStorage.setItem('categories', ${JSON.stringify(initialCategories)});
        `}
      </script>
    </div>
  );
};

export const AddingTodo = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate adding a new category
    await userEvent.type(canvas.getByPlaceholderText(/add a new category/i), 'New Category');
    await userEvent.click(canvas.getByText(/add category/i));

    // Simulate adding a new todo
    await userEvent.type(canvas.getByPlaceholderText(/add a new todo/i), 'New Todo Item');
    await userEvent.selectOptions(canvas.getByLabelText(/select category/i), 'New Category');
    await userEvent.click(canvas.getByText(/add todo/i));

    // Assert that the new todo appears in the list
    await expect(canvas.getByText('New Todo Item')).toBeInTheDocument();
    await expect(canvas.getByText('New Category')).toBeInTheDocument();
  },
};

export const EditingTodo = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a todo item first
    await userEvent.type(canvas.getByPlaceholderText(/add a new todo/i), 'Todo to Edit');
    await userEvent.selectOptions(canvas.getByLabelText(/select category/i), 'Personal');
    await userEvent.click(canvas.getByText(/add todo/i));

    // Trigger edit modal
    const editButton = canvas.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    // Edit the todo text
    await userEvent.clear(canvas.getByLabelText(/todo/i));
    await userEvent.type(canvas.getByLabelText(/todo/i), 'Updated Todo Text');
    await userEvent.click(canvas.getByRole('button', { name: /save/i }));

    // Assert that the updated text is shown in the todo list
    await expect(canvas.getByText('Updated Todo Text')).toBeInTheDocument();
  },
};

export const DeletingTodo = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a todo item first
    await userEvent.type(canvas.getByPlaceholderText(/add a new todo/i), 'Todo to Delete');
    await userEvent.selectOptions(canvas.getByLabelText(/select category/i), 'Personal');
    await userEvent.click(canvas.getByText(/add todo/i));

    // Delete the todo item
    const deleteButton = canvas.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    // Assert that the todo item is no longer in the list
    await expect(canvas.queryByText('Todo to Delete')).not.toBeInTheDocument();
  },
};

export const AddingCategory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate adding a new category
    await userEvent.type(canvas.getByPlaceholderText(/add a new category/i), 'Work');
    await userEvent.click(canvas.getByText(/add category/i));

    // Assert that the new category appears in the category list
    await expect(canvas.getByText('Work')).toBeInTheDocument();
  },
};

export const EditingCategory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a category first
    await userEvent.type(canvas.getByPlaceholderText(/add a new category/i), 'Old Category');
    await userEvent.click(canvas.getByText(/add category/i));

    // Trigger edit category
    const editButton = canvas.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    // Edit the category name
    await userEvent.clear(canvas.getByLabelText(/category/i));
    await userEvent.type(canvas.getByLabelText(/category/i), 'Updated Category');
    await userEvent.click(canvas.getByRole('button', { name: /save/i }));

    // Assert that the updated category name appears in the list
    await expect(canvas.getByText('Updated Category')).toBeInTheDocument();
  },
};

export const DeletingCategory = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Add a category first
    await userEvent.type(canvas.getByPlaceholderText(/add a new category/i), 'Category to Delete');
    await userEvent.click(canvas.getByText(/add category/i));

    // Delete the category
    const deleteButton = canvas.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    // Assert that the category is no longer in the list
    await expect(canvas.queryByText('Category to Delete')).not.toBeInTheDocument();
  },
};
