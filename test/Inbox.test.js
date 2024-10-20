import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Inbox from '../src/Components/Inbox';
import { useAuth } from '../src/Context/AuthContext';
import { useChatAuth } from '../src/Context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';

// Mock the necessary modules
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(),
}));

jest.mock('../../Context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../Context/ChatContext', () => ({
  useChatAuth: jest.fn(),
}));

describe('Inbox Component', () => {
  const mockUser = {
    uid: '12345',
    displayName: 'Test User',
  };

  const mockChats = {
    chat1: {
      userInfo: {
        displayName: 'John Doe',
        photoURL: 'https://example.com/photo.jpg',
      },
      lastMessage: { text: 'Hello!' },
      date: { toDate: () => new Date() },
    },
    chat2: {
      userInfo: {
        displayName: 'Jane Smith',
        photoURL: 'https://example.com/photo2.jpg',
      },
      lastMessage: { text: 'How are you?' },
      date: { toDate: () => new Date(Date.now() - 86400000) }, // 1 day ago
    },
  };

  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the useAuth hook to return a mock user
    useAuth.mockReturnValue({
      currentUser: mockUser,
    });

    // Mock the useChatAuth hook to provide a dispatch function
    useChatAuth.mockReturnValue({
      dispatch: mockDispatch,
    });

    // Mock Firestore onSnapshot behavior to simulate real-time chat data
    onSnapshot.mockImplementation((docRef, callback) => {
      callback({ data: () => mockChats });
      return jest.fn(); // return unsub function
    });
  });

  test('renders chats from Firestore', async () => {
    // Render the component
    render(<Inbox />);

    // Wait for the chats to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Ensure the last messages are displayed
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  test('dispatches correct user info on chat click', async () => {
    // Render the component
    render(<Inbox />);

    // Wait for the chat items to render
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Simulate clicking on the first chat
    const chatItem = screen.getByText('John Doe');
    fireEvent.click(chatItem);

    // Expect the dispatch function to be called with the correct payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'CHANGE_USER',
      payload: mockChats.chat1.userInfo,
    });
  });
});
