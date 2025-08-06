import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './component';

describe('Button Component', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should display the correct text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeDefined();
  });
});