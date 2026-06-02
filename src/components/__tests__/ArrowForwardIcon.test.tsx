import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ArrowForwardIcon } from '../ArrowForwardIcon';

describe('ArrowForwardIcon', () => {
  it('renders the SVG arrow forward icon', () => {
    render(<ArrowForwardIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe('svg');
  });

  it('has correct SVG attributes', () => {
    render(<ArrowForwardIcon />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg?.getAttribute('fill')).toBe('none');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
  });

  it('has path element for arrow shape', () => {
    render(<ArrowForwardIcon />);
    const svg = document.querySelector('svg');
    const path = svg?.querySelector('path');
    expect(path).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ArrowForwardIcon className="custom-class" />);
    const svg = document.querySelector('svg');
    expect(svg?.className.baseVal).toContain('custom-class');
  });
});