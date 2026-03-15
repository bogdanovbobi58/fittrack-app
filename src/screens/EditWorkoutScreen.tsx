import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const API_URL = 'https://699a2473377ac05ce28d5739.mockapi.io/api/v1/workouts';

const EditWorkoutScreen = ({ route, navigation }: any) => {
  // Вземаме съществуващите данни за тренировката от навигацията
  const { workout } = route.params;

  const [title, setTitle] = useState(workout.title);
  const [duration, setDuration] = useState(workout.duration.toString());
  const [type, setType] = useState(workout.type || 'Strength');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    // Валидация (10 pts)
    if (title.length < 3) {
      Alert.alert("Грешка", "Името трябва да е поне 3 символа.");
      return;
    }

    setIsUpdating(true);

    try {
      // CRUD: UPDATE (PUT) операция
      const response = await fetch(`${API_URL}/${workout.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          duration: Number(duration),
          type,
        }),
      });

      if (response.ok) {
        Alert.alert("Успех", "Тренировката беше обновена!");
        // Връщаме се директно в началния екран
        navigation.navigate('Home');
      } else {
        throw new Error();
      }
    } catch (error) {
      Alert.alert("Грешка", "Неуспешно обновяване на данните.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Редактирай име:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Минути:</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Тип тренировка:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Силова (Strength)" value="Strength" />
          <Picker.Item label="Кардио (Cardio)" value="Cardio" />
          <Picker.Item label="Йога (Yoga)" value="Yoga" />
          <Picker.Item label="Друго" value="Other" />
        </Picker>
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, isUpdating && { opacity: 0.7 }]} 
        onPress={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Запази Промените</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 20
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  saveText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default EditWorkoutScreen;