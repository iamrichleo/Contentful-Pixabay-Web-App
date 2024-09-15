/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { Button, TextInput } from '@contentful/f36-components';
import styled from '@emotion/styled';
import ImageGrid from '../components/shared/ImageGrid';
import SelectedImagesGrid from '../components/shared/SelectedImagesGrid';
import PaginationControls from '../components/shared/PaginationControls';
import { searchPixabayImages } from '../services/api/pixabayService';  // Import the Pixabay service

// Styled Components using Emotion
const Container = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

const Message = styled.p`
  margin-top: 20px;
  color: #666;
`;

const ErrorMessage = styled.p`
  margin-top: 20px;
  color: red;
  font-weight: bold;
`;

// React Component
const Dialog = () => {
  const sdk = useSDK();
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const { maxImages } = sdk.parameters.invocation;
  const imagesPerPage = 20;

  // Search images from Pixabay via the pixabayService
  const searchImages = async (newPage = 1) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchPixabayImages(query, newPage, imagesPerPage);  // Use the service

      if (data.hits.length === 0) {
        setImages([]);
      } else {
        setImages(data.hits);
        setTotalHits(data.totalHits);
        setPage(newPage);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
    } else if (selectedImages.length < maxImages) {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const removeSelectedImage = (imageUrl) => {
    setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
  };

  const handleSubmit = () => {
    sdk.close(selectedImages);
  };

  const nextPage = () => {
    if (page * imagesPerPage < totalHits) {
      searchImages(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      searchImages(page - 1);
    }
  };

  return (
    <Container>
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
        css={{ marginBottom: '10px' }}
      />
      <Button onClick={() => searchImages(1)} isDisabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search Images'}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && images.length === 0 && hasSearched && !isLoading && (
        <Message>No images found for this query. Try a different search term.</Message>
      )}

      {selectedImages.length > 0 && (
        <>
          <h4>Selected Images</h4>
          <SelectedImagesGrid selectedImages={selectedImages} onRemoveImage={removeSelectedImage} />
        </>
      )}

      <ImageGrid images={images} onImageClick={handleImageClick} selectedImages={selectedImages} />

      <PaginationControls
        onNextPage={nextPage}
        onPrevPage={prevPage}
        isNextDisabled={page * imagesPerPage >= totalHits}
        isPrevDisabled={page === 1}
      />

      <Button onClick={handleSubmit} isDisabled={selectedImages.length === 0}>
        Submit {selectedImages.length} Image{selectedImages.length !== 1 && 's'}
      </Button>

      {selectedImages.length >= maxImages && <Message>You can only select up to {maxImages} images.</Message>}
    </Container>
  );
};

export default Dialog;