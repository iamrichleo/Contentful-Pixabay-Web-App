/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { Button } from '@contentful/f36-components';
import styled from '@emotion/styled';

const MAX_IMAGES = 5;  // Limit to 5 images

// Styled Components using Emotion
const Container = styled.div`
  overflow-y: auto;
`;

const ImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const RemoveButton = styled(Button)`
  margin-top: 5px;
`;

const AddMoreButton = styled(Button)`
  margin-top: 15px;
`;

// React Component
const Field = () => {
  const sdk = useSDK();  // Access the Contentful SDK
  const [imageUrls, setImageUrls] = useState([]);  // Initialize as an empty array

  useEffect(() => {
    // Start the auto-resizer to automatically adjust the iFrame size
    sdk.window.startAutoResizer();

    // Load the initial value from the field (if exists) and ensure it's an array
    const initialValue = sdk.field.getValue();

    if (Array.isArray(initialValue)) {
      setImageUrls(initialValue);  // If the value is an array, set it
    } else {
      setImageUrls([]);  // Otherwise, initialize as an empty array
    }
  }, [sdk]);

  // Open dialog to select multiple images from Pixabay
  const openPixabayDialog = async () => {
    // Pass current images to the dialog and allow selecting multiple
    const selectedImages = await sdk.dialogs.openCurrentApp({
      title: 'Select Images from Pixabay',
      width: 'fullWidth',
      minHeight: '80vh',
      parameters: {
        maxImages: MAX_IMAGES - imageUrls.length,  // Limit the selection to the remaining slots
      },
    });

    // After the dialog closes, merge the new images with the existing ones
    if (selectedImages && Array.isArray(selectedImages)) {
      const updatedImageUrls = [...imageUrls, ...selectedImages].slice(0, MAX_IMAGES);
      setImageUrls(updatedImageUrls);
      sdk.field.setValue(updatedImageUrls);  // Store the updated image URLs in the field
    }
  };

  // Remove an individual image
  const removeImage = (index) => {
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index); // Filter out image to remove
    setImageUrls(updatedImageUrls);
    sdk.field.setValue(updatedImageUrls);  // Update the field with the remaining images
  };

  return (
    <Container>
      <ImageRow>
        {imageUrls.map((imageUrl, index) => (
          <ImageContainer key={index}>
            <StyledImage src={imageUrl} alt="Selected from Pixabay" />
            <RemoveButton onClick={() => removeImage(index)} size="small">
              Remove
            </RemoveButton>
          </ImageContainer>
        ))}
      </ImageRow>

      {imageUrls.length < MAX_IMAGES && (
        <AddMoreButton onClick={openPixabayDialog}>
          {imageUrls.length > 0 ? 'Add More Images' : 'Select Images'}
        </AddMoreButton>
      )}

      {imageUrls.length >= MAX_IMAGES && <p>You can only select up to {MAX_IMAGES} images.</p>}
    </Container>
  );
};

export default Field;