import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Link } from './Link';

describe('<Link />', () => {
    it('renders the link with the correct href', () => {
        render(
            <Link to="/orders/:id" params={{ id: 1 }}>
                Order 1
            </Link>
        );

        const link = screen.getByText(/Order 1/i);
        expect(link).toHaveAttribute('href', '/orders/1');
    });

    it('renders the link without params correctly', () => {
        render(
            <Link to="/dashboard">
                Dashboard
            </Link>
        );

        const link = screen.getByText(/Dashboard/i);
        expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('handles clicks correctly', () => {
        const pushStateMock = vi.spyOn(window.history, 'pushState');

        render(
            <Link to="/orders/:id" params={{ id: 2 }}>
                Order 2
            </Link>
        );

        const link = screen.getByText(/Order 2/i);
        fireEvent.click(link);

        expect(pushStateMock).toHaveBeenCalledWith({}, '', '/orders/2');
        expect(window.location.pathname).toBe('/orders/2');
    });

    it('does not crash when no params are provided', () => {
        render(
            <Link to="/orders">
                Orders
            </Link>
        );

        const link = screen.getByText(/Orders/i);
        fireEvent.click(link);

        expect(window.location.pathname).toBe('/orders');
    });

    it('handles missing params correctly', () => {
        render(
            <Link to="/orders/:id">
                Missing Order
            </Link>
        );

        const link = screen.getByText(/Missing Order/i);
        expect(link).toHaveAttribute('href', '/orders/:id');
    });
});
