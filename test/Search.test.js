import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from '../src/Components/Search';
import { useAuth } from '../src/Context/AuthContext';
import { getDocs, collection, query, where, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../src/Firebase/firebase';

// Mock the Firebase and Auth functions
jest.mock('../../Firebase/firebase');
jest.mock('firebase/firestore');
jest.mock('../../Context/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockUser = {
  uid: '123',
  displayName: 'Test User',
  photoURL: 'https://example.com/photo.jpg'
};

describe('Search Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      currentUser: {
        uid: 'testUserId',
        displayName: 'Current User'
      }
    });

    getDocs.mockResolvedValue({
      size: 1,
      forEach: (callback) => callback({ data: () => mockUser })
    });

    getDoc.mockResolvedValue({
      exists: jest.fn().mockReturnValue(false)
    });

    setDoc.mockResolvedValue({});
    updateDoc.mockResolvedValue({});
  });

  it('renders the search input correctly', () => {
    render(<Search />);
    const inputField = screen.getByPlaceholderText('Look up friends..');
    expect(inputField).toBeInTheDocument();
  });

  it('updates the input field when typing', () => {
    render(<Search />);
    const inputField = screen.getByPlaceholderText('Look up friends..');
    
    fireEvent.change(inputField, { target: { value: 'John Doe' } });
    expect(inputField.value).toBe('John Doe');
  });

  it('performs a search and finds a user on pressing Enter', async () => {
    render(<Search />);
    const inputField = screen.getByPlaceholderText('Look up friends..');
    
    fireEvent.change(inputField, { target: { value: 'Test User' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      const userDisplayName = screen.getByText('Test User');
      expect(userDisplayName).toBeInTheDocument();
    });
  });

  it('shows error when user is not found', async () => {
    getDocs.mockResolvedValueOnce({ size: 0 });  // Mock empty result

    render(<Search />);
    const inputField = screen.getByPlaceholderText('Look up friends..');
    
    fireEvent.change(inputField, { target: { value: 'Nonexistent User' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      const errorMessage = screen.getByText('User not found');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('calls handleResult when clicking on a search result', async () => {
    render(<Search />);
    const inputField = screen.getByPlaceholderText('Look up friends..');

    fireEvent.change(inputField, { target: { value: 'Test User' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      const userDisplayName = screen.getByText('Test User');
      fireEvent.click(userDisplayName); // Simulate clicking on the search result
    });

    await waitFor(() => {
      // Verify if Firebase functions are called
      expect(setDoc).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalledTimes(2); // Once for each user's inbox
    });
  });
});
