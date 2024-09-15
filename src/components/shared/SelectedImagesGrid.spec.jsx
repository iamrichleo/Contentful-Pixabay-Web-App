import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedImagesGrid from './SelectedImagesGrid';

describe('SelectedImagesGrid component', () => {
  const mockOnRemoveImage = jest.fn();
  const mockSelectedImages = ['image1.jpg', 'image2.jpg'];

  it('renders the correct number of thumbnails', () => {
    render(
      <SelectedImagesGrid selectedImages={mockSelectedImages} onRemoveImage={mockOnRemoveImage} />
    );

    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails).toHaveLength(mockSelectedImages.length);
  });

  it('calls onRemoveImage when a thumbnail is clicked', () => {
    render(
      <SelectedImagesGrid selectedImages={mockSelectedImages} onRemoveImage={mockOnRemoveImage} />
    );

    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    expect(mockOnRemoveImage).toHaveBeenCalledWith('image1.jpg');
  });
});
