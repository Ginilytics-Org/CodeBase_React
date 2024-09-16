import React, { useState } from 'react';
import { Input, Button, List, Tag, Space, Modal, Form, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './TodoList.css';

const { TextArea } = Input;
const { Option } = Select;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() && selectedCategory) {
      setTodos([...todos, { id: Date.now(), text: newTodo, category: selectedCategory }]);
      setNewTodo('');
      setSelectedCategory('');
    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditTodoText(todo.text);
  };

  const handleSaveEditTodo = () => {
    setTodos(todos.map((todo) =>
      todo.id === editTodoId ? { ...todo, text: editTodoText } : todo
    ));
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  const handleSaveEditCategory = () => {
    setCategories(categories.map(cat =>
      cat === editingCategory ? newCategoryName : cat
    ));
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
    setSelectedCategory(selectedCategory === category ? '' : selectedCategory);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-sidebar">
        <div className="todo-list-section">
          <h3>Categories</h3>
          {editingCategory ? (
            <div className="category-edit">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button type="primary" onClick={handleSaveEditCategory}>
                Save
              </Button>
              <Button onClick={() => setEditingCategory(null)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="category-add">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add a new category..."
              />
              <Button
                type="primary"
                onClick={handleAddCategory}
                style={{ marginTop: '10px' }} // Added margin-top
              >
                Add Category
              </Button>
            </div>
          )}
          <div className="category-list">
            {categories.map((category) => (
              <div key={category} className="category-item">
                <Tag color="default">{category}</Tag>
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => handleEditCategory(category)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => handleDeleteCategory(category)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="todo-list-section">
          <h3>Todo History</h3>
          <List
            bordered
            dataSource={todos}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEditTodo(item.id)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDeleteTodo(item.id)} />,
                ]}
              >
                <div>{item.text}</div>
                {item.category && <Tag color="blue">{item.category}</Tag>}
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="todo-create-section">
        <h3>Create Todo</h3>
        <TextArea
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          rows={4}
          placeholder="Add a new todo..."
        />
        <div style={{ marginTop: '10px' }}>
          <label>Select Category</label>
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            placeholder="Select a category"
            style={{ width: '100%', marginTop: '5px' }}
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <Space style={{ marginTop: '10px' }}>
          <Button type="primary" onClick={handleAddTodo}>
            Add Todo
          </Button>
          <Button type="default" onClick={() => setNewTodo('')}>
            Clear
          </Button>
        </Space>
      </div>

      <Modal
        title="Edit Todo"
        open={editTodoId !== null}
        onOk={handleSaveEditTodo}
        onCancel={() => setEditTodoId(null)}
      >
        <Form>
          <Form.Item label="Todo">
            <Input
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
