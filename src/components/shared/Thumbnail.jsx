/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

// Styled Components using Emotion
const ThumbnailImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid #ddd;
  cursor: pointer;
`;

// React Component
const Thumbnail = ({ src, onClick }) => {
  return <ThumbnailImage src={src} onClick={onClick} alt="Selected thumbnail" />;
};

export default Thumbnail;
