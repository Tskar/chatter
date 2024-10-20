import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../src/Login/Login';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../src/Firebase/firebase';

// Mock Firebase modules
jest.mock('../Firebase/firebase');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// Mock app logo image
jest.mock('../Images/App-logo.png', () => 'mocked-logo.png');

describe('Login Component', () => {
  const mockUser = {
    uid: '12345',
    displayName: 'Test User',
    email: 'testuser@example.com',
    photoURL: 'https://example.com/photo.jpg',
  };

  beforeEach(() => {
    GoogleAuthProvider.mockImplementation(() => ({
      addScope: jest.fn(),
      setCustomParameters: jest.fn(),
    }));

    signInWithPopup.mockResolvedValue({
      user: mockUser,
    });

    getDoc.mockResolvedValue({
      exists: jest.fn().mockReturnValue(false), // Simulate user doesn't exist
    });

    setDoc.mockResolvedValue({});
  });

  it('renders the login component correctly', () => {
    render(<Login />);
    expect(screen.getByAltText('')).toBeInTheDocument(); // App logo
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('calls Google login on button click and creates a user', async () => {
    render(<Login />);
    const loginButton = screen.getByText('Sign in with Google');

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(GoogleAuthProvider));
    });

    await waitFor(() => {
      // Verify user creation and inbox creation in Firestore
      expect(setDoc).toHaveBeenCalledTimes(2); // One for the user, one for the user inbox
      expect(getDoc).toHaveBeenCalledTimes(2); // One for the user, one for the user inbox
    });

    await waitFor(() => {
      expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument(); // Button should disappear
    });
  });

  it('shows an error message when Google login fails', async () => {
    signInWithPopup.mockRejectedValueOnce(new Error('Login failed')); // Simulate login error

    render(<Login />);
    const loginButton = screen.getByText('Sign in with Google');

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
    });

    await waitFor(() => {
      const errorMessage = screen.getByText('Oops! Try again.');
      expect(errorMessage).toBeInTheDocument(); // Error message should appear
    });
  });

  it('checks user creation only if not already existing', async () => {
    getDoc.mockResolvedValueOnce({
      exists: jest.fn().mockReturnValue(true), // Simulate user already exists
    });

    render(<Login />);
    const loginButton = screen.getByText('Sign in with Google');

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
    });

    // Ensure setDoc is not called for existing user
    await waitFor(() => {
      expect(setDoc).not.toHaveBeenCalled();
    });
  });
});
