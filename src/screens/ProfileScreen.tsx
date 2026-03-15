import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
             <Text style={{ fontSize: 40 }}>👤</Text>
          </View>
          <Text style={styles.name}>Моят Профил</Text>
          <Text style={styles.email}>{(user as any)?.email || 'Потребител'}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Статус: <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Активен</Text></Text>
            <Text style={styles.infoText}>Ниво: <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>Начинаещ</Text></Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Изход от профила</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', paddingVertical: 60 },
  header: { alignItems: 'center', marginBottom: 40, width: '100%' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E3F2FD', marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 16, color: '#666', marginBottom: 25 },
  infoContainer: { backgroundColor: '#f8f9fa', padding: 25, borderRadius: 20, width: '85%', alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  infoText: { fontSize: 18, marginVertical: 8, color: '#444' },
  logoutBtn: { backgroundColor: '#FF5252', padding: 18, borderRadius: 12, width: '85%', marginTop: 20 },
  logoutText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }
});