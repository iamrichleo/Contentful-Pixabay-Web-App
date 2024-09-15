import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Field from './Field';
import { useSDK } from '@contentful/react-apps-toolkit';

// Mock the Contentful SDK
jest.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: jest.fn(),
}));

describe('Field component', () => {
  const mockSDK = {
    window: {
      startAutoResizer: jest.fn(),
    },
    field: {
      getValue: jest.fn(),
      setValue: jest.fn(),
    },
    dialogs: {
      openCurrentApp: jest.fn(),
    },
  };

  beforeEach(() => {
    useSDK.mockReturnValue(mockSDK);
  });

  it('renders images from the field value', () => {
    mockSDK.field.getValue.mockReturnValue(['image1.jpg', 'image2.jpg']);

    render(<Field />);

    const images = screen.getAllByAltText('Selected from Pixabay');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
  });

  it('removes an image when the remove button is clicked', async () => {
    mockSDK.field.getValue.mockReturnValue(['image1.jpg', 'image2.jpg']);

    render(<Field />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(mockSDK.field.setValue).toHaveBeenCalledWith(['image2.jpg']);
    });
  });

  it('opens the Pixabay dialog and adds new images', async () => {
    mockSDK.field.getValue.mockReturnValue(['image1.jpg']);
    mockSDK.dialogs.openCurrentApp.mockResolvedValue(['image2.jpg', 'image3.jpg']); // Mock dialog returning images

    render(<Field />);

    const addButton = screen.getByText('Add More Images');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockSDK.dialogs.openCurrentApp).toHaveBeenCalled();
      expect(mockSDK.field.setValue).toHaveBeenCalledWith(['image1.jpg', 'image2.jpg', 'image3.jpg']);
    });
  });

  it('shows the limit message when max images are selected', () => {
    mockSDK.field.getValue.mockReturnValue(['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']);

    render(<Field />);

    expect(screen.getByText('You can only select up to 5 images.')).toBeInTheDocument();
  });
});
