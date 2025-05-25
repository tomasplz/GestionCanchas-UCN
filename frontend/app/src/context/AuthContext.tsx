import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as logoutService } from '../service/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User, token: string) => void;
  signIn: (email: string, password: string) => Promise<void>; 
  logout: () => Promise<void>;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar autenticación al cargar la app
  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        console.log('Usuario autenticado:', currentUser);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
      setIsAuthenticated(false);
      // Limpiar datos inválidos
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Función para hacer signIn (proceso completo de autenticación)
  const signIn = async (email: string, password: string) => {
    try {
      // Hacer la petición de login al servidor
      const response = await fetch('http://localhost:3000/api/v1/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      
      // Si el login es exitoso, usar la función login para guardar los datos
      login(data.user, data.token);
      
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error; // Re-lanzar el error para que lo maneje el componente
    }
  };

  // Función para hacer login (llamada después de login exitoso)
  const login = (userData: User, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    console.log('Login exitoso:', userData);
  };

  // Función para hacer logout
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      console.log('Logout exitoso');
    }
  };

  // Función para actualizar datos del usuario
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  // Debug: mostrar estado actual
  useEffect(() => {
    console.log('AuthContext estado:', {
      user,
      isAuthenticated,
      loading,
      hasToken: !!localStorage.getItem('authToken')
    });
  }, [user, isAuthenticated, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signIn, // Agregamos signIn al valor del contexto
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};