import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login }: any = useAuth(); // Добавихме : any тук, за да спре да свети

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Грешка', 'Моля, въведете имейл и парола');
      return;
    }
    try {
      // Пращаме ги като отделни аргументи, както е оригиналната логика
      await login(email, password);
    } catch (error) {
      Alert.alert('Грешка', 'Невалидни данни за вход');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitTrack Вход</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Имейл"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Парола"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Влез</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#2196F3' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkText: { marginTop: 20, color: '#2196F3', textAlign: 'center' }
});

export default LoginScreen;