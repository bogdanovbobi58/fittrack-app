import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AppStack from './AppStack'; // Тук е твоят Профил
import AuthStack from './AuthStack';

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  // Докато зарежда, не показваме нищо
  if (isLoading) return null;

  return (
    <NavigationContainer>
      {/* АКО ИМА USER -> APPSTACK, АКО НЯМА -> AUTHSTACK */}
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}