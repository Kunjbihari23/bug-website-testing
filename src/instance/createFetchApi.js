import { getAccessToken } from './getAccessToken';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const createFetchApi = () => {
  const fetchApi = async (endpoint, method = 'GET', revalidates = 0) => {
    const fullUrl = `${baseURL}${endpoint}`;
    const session = await getAccessToken();
    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${session}`,
        },
        next: { revalidate: revalidates },
      });

      if (!response.ok) {
        if (typeof window !== 'undefined') {
          console.log(response);
        }

        throw new Error(`Fetch request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Fetch request error:', error);
      throw error;
    }
  };

  fetchApi.get = (endpoint, revalidate = 0) => fetchApi(endpoint, 'GET', revalidate);

  return fetchApi;
};

export default createFetchApi;
