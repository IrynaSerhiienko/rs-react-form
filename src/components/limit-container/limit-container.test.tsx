import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LimitContainer } from './limit-container';

describe('LimitContainer', () => {
  it('renders without crashing', () => {
    render(
      <LimitContainer>
        <div>Test Content</div>
      </LimitContainer>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <LimitContainer>
        <span>Child Element</span>
      </LimitContainer>
    );
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  it('applies additional className if provided', () => {
    const { container } = render(
      <LimitContainer className="custom-class">
        <div>Content</div>
      </LimitContainer>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
