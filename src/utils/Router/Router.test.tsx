import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import { Router } from './Router';

const MockDashboard = () => <div>Dashboard Page</div>;
const MockProfile = () => <div>Profile Page</div>;

const testConfig = [
  {
    path: '/',
    element: <MockDashboard />,
  },
  {
    path: '/profile',
    element: <MockProfile />,
  },
  {
    path: '/users/:id',
    element: <div>User Profile</div>,
  },
];

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

describe('Router Component Unit Tests', () => {
  describe('Basic Routing', () => {
    it('should render component for exact path match', () => {
      window.history.pushState({}, '', '/profile');
      render(<Router config={testConfig} />);

      expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });

    it('should render root path component when on "/"', () => {
      render(<Router config={testConfig} />);
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });
  });

  describe('Dynamic Route Parameters', () => {
    it('should match dynamic routes with parameters', () => {
      window.history.pushState({}, '', '/users/123');
      render(<Router config={testConfig} />);

      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    it('should match different parameter values in dynamic routes', () => {
      window.history.pushState({}, '', '/users/456');
      render(<Router config={testConfig} />);

      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });
  });

  describe('Not Found Handling', () => {
    it('should render default NotFound if no match and no wildcard route', () => {
      window.history.pushState({}, '', '/non-existent');
      render(<Router config={testConfig} />);

      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
  });

  describe('Route Pattern Matching', () => {
    it('should not match partial path segments', () => {
      window.history.pushState({}, '', '/prof');
      render(<Router config={testConfig} />);

      expect(screen.queryByText('Profile Page')).not.toBeInTheDocument();
    });

    it('should match exact path only', () => {
      window.history.pushState({}, '', '/profile/extra');
      render(<Router config={testConfig} />);

      expect(screen.queryByText('Profile Page')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty config', () => {
      render(<Router config={[]} />);
      expect(document.body).toBeInTheDocument();
    });

    it('should handle config with only dynamic routes', () => {
      const dynamicConfig = [
        {
          path: '/:any',
          element: <div>Dynamic Page</div>,
        },
      ];

      window.history.pushState({}, '', '/something');
      render(<Router config={dynamicConfig} />);

      expect(screen.getByText('Dynamic Page')).toBeInTheDocument();
    });
  });
});