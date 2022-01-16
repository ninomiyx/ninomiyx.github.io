const root = 'http://localhost:3001';

async function withoutBody<ResponseType>(endpoint: string, method: string): Promise<ResponseType> {
  const res = await fetch(root + endpoint, {
    method,
    credentials: 'include',
  });
  const body = await res.json();
  if (res.status >= 400) {
    throw body;
  }
  return body as ResponseType;
}

async function withBody<RequestType, ResponseType>(
  endpoint: string,
  method: string,
  request: RequestType,
): Promise<ResponseType> {
  const res = await fetch(root + endpoint, {
    method,
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(request),
  });
  return (await res.json()) as ResponseType;
}

async function get<ResponseType>(endpoint: string): Promise<ResponseType> {
  return withoutBody(endpoint, 'GET');
}

async function del(endpoint: string) {
  await fetch(root + endpoint, { method: 'DELETE' });
}

async function post<RequestType, ResponseType>(
  endpoint: string,
  request: RequestType,
): Promise<ResponseType> {
  return withBody(endpoint, 'POST', request);
}

async function put<RequestType, ResponseType>(
  endpoint: string,
  request: RequestType,
): Promise<ResponseType> {
  return withBody(endpoint, 'PUT', request);
}

export default {
  get,
  del,
  post,
  put,
};
