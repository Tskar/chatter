import App from "../src/App";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAuth } from '../src/Context/AuthContext';


// Mocking useAuth hook
jest.mock('./Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe(App, () => {

  test('renders Login component when currentUser is null', () => {
    useAuth.mockReturnValue({
      currentUser: null,  // No user logged in
    });

    render(<App />);

    // Expect Login component to be rendered
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
  });

})