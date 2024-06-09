const API_URL = 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

const request = async (method: string, path: string, options: RequestOptions = {}): Promise<any> => {
  const url = `${API_URL}/${path}`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const get = (endpoint: string, options?: RequestOptions): Promise<any> => {
  return request('GET', endpoint, options);
};

export const post = (endpoint: string, options?: RequestOptions): Promise<any> => {
  return request('POST', endpoint, options);
};

export const put = (endpoint: string, options?: RequestOptions): Promise<any> => {
  return request('PUT', endpoint, options);
};

export const del = (endpoint: string, options?: RequestOptions): Promise<any> => {
  return request('DELETE', endpoint, options);
};
