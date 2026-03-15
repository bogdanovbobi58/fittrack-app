import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const WorkoutDetailsScreen = ({ route, navigation }: any) => {
  const { workout } = route.params; // Данните идват от HomeScreen
  const [title, setTitle] = useState(workout.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Грешка", "Името не може да е празно!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://699a2473377ac05ce28d5739.mockapi.io/api/v1/workouts/${workout.id}`, {
        method: 'PUT', // ТОВА Е EDIT ОПЕРАЦИЯТА (15 точки)
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        Alert.alert("Успех", "Тренировката е обновена!");
        navigation.goBack(); 
      }
    } catch (error) {
      Alert.alert("Грешка", "Неуспешно обновяване");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" color="#2196F3" /></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Редактирай име на тренировката:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Продължителност: {workout.duration} мин.</Text>
        <Text style={styles.infoText}>Вид: {workout.type}</Text>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Запази промените</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  infoCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, elevation: 2 },
  infoText: { fontSize: 14, color: '#666', marginBottom: 5 },
  updateButton: { backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default WorkoutDetailsScreen;