import fetchRequest from './fetchRequest';

const PIXABAY_API_KEY = '45979271-945d910b95e96769c55111ae5';

export const searchPixabayImages = async (query, page = 1, imagesPerPage = 20) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${imagesPerPage}`;

  try {
    const response = await fetchRequest(url, {
      method: 'GET',
      responseType: 'json',
    });

    return response;
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error);
    throw error; // Re-throw the error to handle it in the calling code.
  }
};
