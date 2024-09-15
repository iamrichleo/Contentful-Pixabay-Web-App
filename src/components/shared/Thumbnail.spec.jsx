import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Thumbnail from './Thumbnail';

describe('Thumbnail component', () => {
  const mockOnClick = jest.fn();
  const mockSrc = 'image1.jpg';

  it('renders the thumbnail image', () => {
    render(<Thumbnail src={mockSrc} onClick={mockOnClick} />);

    const thumbnail = screen.getByAltText('Selected thumbnail');
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', mockSrc);
  });

  it('calls onClick when the thumbnail is clicked', () => {
    render(<Thumbnail src={mockSrc} onClick={mockOnClick} />);

    const thumbnail = screen.getByAltText('Selected thumbnail');
    fireEvent.click(thumbnail);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
