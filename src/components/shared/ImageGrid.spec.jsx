import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGrid from './ImageGrid'; 

describe('ImageGrid component', () => {
  const mockImages = [
    { id: '1', previewURL: 'image1.jpg', largeImageURL: 'image1-large.jpg', tags: 'Image 1' },
    { id: '2', previewURL: 'image2.jpg', largeImageURL: 'image2-large.jpg', tags: 'Image 2' },
  ];
  
  const mockOnImageClick = jest.fn();
  const selectedImages = ['image1-large.jpg'];

  it('renders the correct number of images', () => {
    render(<ImageGrid images={mockImages} onImageClick={mockOnImageClick} selectedImages={[]} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);  // There should be 2 images
  });

  it('applies the correct styles for selected images', () => {
    render(<ImageGrid images={mockImages} onImageClick={mockOnImageClick} selectedImages={selectedImages} />);

    const firstImage = screen.getByAltText('Image 1');
    const secondImage = screen.getByAltText('Image 2');

    expect(firstImage).toHaveStyle('border: 3px solid blue');
    
    expect(secondImage).toHaveStyle('border: none');
  });

  it('calls onImageClick with the correct URL when an image is clicked', () => {
    render(<ImageGrid images={mockImages} onImageClick={mockOnImageClick} selectedImages={[]} />);

    const firstImage = screen.getByAltText('Image 1');
    
    fireEvent.click(firstImage);

    expect(mockOnImageClick).toHaveBeenCalledWith('image1-large.jpg');
  });
});
