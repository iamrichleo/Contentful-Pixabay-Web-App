export default async function fetchRequest(url, options = {}) {
    try {
      const { method = 'GET', headers = {}, body, responseType = 'json' } = options;
  
      const response = await fetch(url, {
        method,
        headers: {
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
  
      // Parse the response based on the expected response type
      let data;
      if (responseType === 'json') {
        data = await response.json();
      } else if (responseType === 'text') {
        data = await response.text();
      } else {
        throw new Error('Unsupported response type');
      }
  
      return data;
    } catch (error) {
      // Log the error and rethrow it so it can be handled by the calling code
      console.error('Fetch request failed:', error);
      throw error;
    }
  }
  