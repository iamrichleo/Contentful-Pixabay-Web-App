/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@contentful/f36-components';

// Styled Components using Emotion
const PaginationControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
`;

// React Component
const PaginationControls = ({ onNextPage, onPrevPage, isNextDisabled, isPrevDisabled }) => {
  return (
    <PaginationControlsWrapper>
      <Button onClick={onPrevPage} isDisabled={isPrevDisabled}>
        Previous Page
      </Button>
      <Button onClick={onNextPage} isDisabled={isNextDisabled}>
        Next Page
      </Button>
    </PaginationControlsWrapper>
  );
};

export default PaginationControls;
