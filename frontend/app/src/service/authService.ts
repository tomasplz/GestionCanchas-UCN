const API_URL = 'http://localhost:3000/api/v1/auth';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');
  return data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role: "user" }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al registrarse');
  return data;
};
export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.error('Error durante logout:', error);
  }
};

// Función para obtener usuario actual
export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (!token || !user) return null;

  try {
    // Verificar el token
    const res = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Token inválido');
    
    return JSON.parse(user);
  } catch (error) {
    console.error('Error al validar usuario:', error);
    return null;
  }
};
// Función adicional útil: verificar autenticación
export const isAuthenticated = async (): Promise<boolean> => {
  return !!(await getCurrentUser());
};