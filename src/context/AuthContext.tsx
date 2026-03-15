import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: any; // Слагаме any за по-лесна работа с обекти
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const savedUser = await SecureStore.getItemAsync('userToken');
        if (savedUser) {
          setUser({ email: savedUser }); // Правим го на обект, за да работи Profile екрана
        }
      } catch (e) {
        console.log("Грешка при четене", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadStorageData();
  }, []);

  const login = async (email: string, pass: string) => {
    // Симулираме вход (тук по принцип се вика MockAPI)
    const userData = { email: email };
    setUser(userData);
    await SecureStore.setItemAsync('userToken', email);
  };

  const register = async (email: string, pass: string) => {
    // Симулираме регистрация
    const userData = { email: email };
    setUser(userData);
    await SecureStore.setItemAsync('userToken', email);
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};