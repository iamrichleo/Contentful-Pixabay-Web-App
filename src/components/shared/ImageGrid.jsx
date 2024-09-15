/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

// Styled Components using Emotion
const ImageGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const Image = styled.img`
  cursor: pointer;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: ${(props) => (props.isSelected ? '3px solid blue' : 'none')};
`;

// React Component
const ImageGrid = ({ images, onImageClick, selectedImages }) => {
  return (
    <ImageGridWrapper>
      {images.map((image) => {
        const isSelected = selectedImages.includes(image.largeImageURL);

        return (
          <Image
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            isSelected={isSelected}
            onClick={() => onImageClick(image.largeImageURL)}
          />
        );
      })}
    </ImageGridWrapper>
  );
};

export default ImageGrid;
