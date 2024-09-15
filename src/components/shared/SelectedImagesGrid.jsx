/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import Thumbnail from './Thumbnail';

// Styled Components using Emotion
const SelectedImagesGridWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// React Component
const SelectedImagesGrid = ({ selectedImages, onRemoveImage }) => {
  return (
    <SelectedImagesGridWrapper>
      {selectedImages.map((imageUrl) => (
        <Thumbnail key={imageUrl} src={imageUrl} onClick={() => onRemoveImage(imageUrl)} />
      ))}
    </SelectedImagesGridWrapper>
  );
};

export default SelectedImagesGrid;
