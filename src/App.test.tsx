import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('renders the Dashboard component on the /dashboard route', () => {
    render(<App />);

    window.history.pushState({}, '', '/dashboard');

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('renders the Order component for valid order IDs', () => {
    render(<App />);

    window.history.pushState({}, '', '/orders/1');

    expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
  });

  it('renders NotFound component for non-existent routes', () => {
    window.history.pushState({}, '', '/non-existent-path');
    render(<App />);

    expect(screen.getByText(/Not Found :\(/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to Dashboard/i)).toBeInTheDocument();
  });

  it('navigates to the Order component when clicking a Link', () => {


    window.history.pushState({}, '', '/dashboard');
    render(<App />);

    fireEvent.click(screen.getByText(/Order 1/i));

    expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
  });
});