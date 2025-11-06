const DEFAULT_BASE_URL = 'http://localhost:3001';

const getBaseUrl = () => {
  // In future, can use process.env.REACT_APP_API_BASE_URL
  return DEFAULT_BASE_URL;
};

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** Perform a GET request to backend API with basic error handling. */
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}
