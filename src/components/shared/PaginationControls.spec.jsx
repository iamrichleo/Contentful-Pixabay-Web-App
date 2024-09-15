import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from './PaginationControls';  // Adjust the path if necessary

describe('PaginationControls component', () => {
  const mockOnNextPage = jest.fn();
  const mockOnPrevPage = jest.fn();

  it('renders both the "Previous Page" and "Next Page" buttons', () => {
    render(
      <PaginationControls
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        isNextDisabled={false}
        isPrevDisabled={false}
      />
    );

    const prevButton = screen.getByText(/previous page/i);
    const nextButton = screen.getByText(/next page/i);
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls onNextPage when "Next Page" button is clicked', () => {
    render(
      <PaginationControls
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        isNextDisabled={false}
        isPrevDisabled={false}
      />
    );

    const nextButton = screen.getByText(/next page/i);

    fireEvent.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalled();
  });

  it('calls onPrevPage when "Previous Page" button is clicked', () => {
    render(
      <PaginationControls
        onNextPage={mockOnNextPage}
        onPrevPage={mockOnPrevPage}
        isNextDisabled={false}
        isPrevDisabled={false}
      />
    );

    const prevButton = screen.getByText(/previous page/i);

    fireEvent.click(prevButton);

    expect(mockOnPrevPage).toHaveBeenCalled();
  });
});
