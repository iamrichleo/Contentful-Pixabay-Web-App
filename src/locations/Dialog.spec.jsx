import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dialog from './Dialog';
import { searchPixabayImages } from '../services/api/pixabayService';
import { useSDK } from '@contentful/react-apps-toolkit';

// Mock the SDK and Pixabay service
jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: jest.fn(),
}));
jest.mock('../services/api/pixabayService');

describe('Dialog component', () => {
  const mockSDK = {
    parameters: { invocation: { maxImages: 5 } },
    close: jest.fn(),
  };

  const mockImageResults = {
    hits: [
      { id: '1', previewURL: 'image1.jpg', largeImageURL: 'image1-large.jpg', tags: 'Image 1' },
      { id: '2', previewURL: 'image2.jpg', largeImageURL: 'image2-large.jpg', tags: 'Image 2' },
    ],
    totalHits: 2,
  };

  beforeEach(() => {
    useSDK.mockReturnValue(mockSDK);
    searchPixabayImages.mockResolvedValue(mockImageResults); // Mock successful image search
  });

  it('renders the search input and search button', () => {
    render(<Dialog />);

    expect(screen.getByPlaceholderText('Search for images')).toBeInTheDocument();
    expect(screen.getByText('Search Images')).toBeInTheDocument();
  });

  it('calls the Pixabay service when searching for images', async () => {
    render(<Dialog />);

    const searchInput = screen.getByPlaceholderText('Search for images');
    const searchButton = screen.getByText('Search Images');

    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(searchPixabayImages).toHaveBeenCalledWith('test search', 1, 20);
      expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    });
  });

  it('displays an error message when the search fails', async () => {
    searchPixabayImages.mockRejectedValueOnce(new Error('Search failed'));

    render(<Dialog />);

    const searchButton = screen.getByText('Search Images');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });
  });

  it('allows selecting and removing images', async () => {
    render(<Dialog />);

    const searchButton = screen.getByText('Search Images');
    fireEvent.click(searchButton);

    await waitFor(() => {
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage); // Select the image

      expect(screen.getByText('Selected Images')).toBeInTheDocument();
      expect(screen.getByAltText('Selected thumbnail')).toBeInTheDocument();

      fireEvent.click(screen.getByAltText('Selected thumbnail')); // Remove the image
      expect(screen.queryByAltText('Selected thumbnail')).not.toBeInTheDocument();
    });
  });

  it('submits the selected images', async () => {
    render(<Dialog />);

    const searchButton = screen.getByText('Search Images');
    fireEvent.click(searchButton);

    await waitFor(() => {
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage); // Select the image
    });

    const submitButton = screen.getByText('Submit 1 Image');
    fireEvent.click(submitButton);

    expect(mockSDK.close).toHaveBeenCalledWith(['image1-large.jpg']);
  });
});
