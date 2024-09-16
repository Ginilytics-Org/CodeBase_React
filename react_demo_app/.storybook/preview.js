/** @type { import('@storybook/react').Preview } */
import '../src/index.css'; // Import your global styles if needed
import 'antd/dist/reset.css'; // Import Ant Design styles
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];
