import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello Chatters!', () => {
  render(<App />);
  const linkElement = screen.getByText("Hello Chatters!");
  expect(linkElement).toBeInTheDocument();
});
