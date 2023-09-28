import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogIn from "../components/Login";

// Test Case 1: Renders LogIn component without crashing
test('renders LogIn component without crashing', () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/LogIn/i);
  expect(linkElement).toBeInTheDocument();
});

// Test Case 2: Test LogIn functionality
test('LogIn functionality works', async () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email Id');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('LogIn');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
  fireEvent.click(submitButton);

  // You may need to update the below expectation based on your actual implementation
  await waitFor(() => {
    expect(screen.getByText(/Log in successful/i)).toBeInTheDocument();
  });
});

// Test Case 3: Test SignUp functionality
test('SignUp functionality works', async () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email Id');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const signUpButton = screen.getByText('SignUp');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
  fireEvent.click(signUpButton);

  // You may need to update the below expectation based on your actual implementation
  await waitFor(() => {
    expect(screen.getByText(/Your account is created successfully/i)).toBeInTheDocument();
  });
});

// Test Case 4: Test error message display for incorrect credentials
test('Displays error message for incorrect credentials', async () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email Id');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('LogIn');

  fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/An error occurred. Please try again later./i)).toBeInTheDocument();
  });
});

// Test Case 5: Test password mismatch error for SignUp
test('Displays password mismatch error for SignUp', async () => {
  render(
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email Id');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const signUpButton = screen.getByText('SignUp');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
  fireEvent.click(signUpButton);

  await waitFor(() => {
    expect(screen.getByText(/Your confirm password did not match!/i)).toBeInTheDocument();
  });
});
