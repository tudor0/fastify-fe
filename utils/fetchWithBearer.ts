import { getCookie } from "./cookies";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function fetchWithBearer(
  url: string,
  options: FetchOptions = {},
  token?: string
) {
  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers["Authorization"] = `Bearer ${
      token || getCookie("jw-token")
    }`;
  }
  console.log(url, options)
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response as Response;
  } catch (err) {
    console.log("in fetch w bearer", err);
    return Response.error();
  }
}

export default fetchWithBearer;
