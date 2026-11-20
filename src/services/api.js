let token = localStorage.getItem('token');

export function setToken(value) {
  token = value;
  if (value) localStorage.setItem('token', value);
  else localStorage.removeItem('token');
}

async function request(url, { method = 'GET', body, requiresAuth } = {}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'}${url}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (res.status === 401) {
    setToken(null);
    throw new Error('Sesión expirada. Inicia sesión de nuevo.');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Error en la petición.');
  }
  return res.status === 204 ? null : res.json();
}

export const get = (url, options) => request(url, { ...options, method: 'GET' });
export const post = (url, body, options) => request(url, { ...options, method: 'POST', body });
export const put = (url, body, options) => request(url, { ...options, method: 'PUT', body });
export const del = (url, options) => request(url, { ...options, method: 'DELETE' });
