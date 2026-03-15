import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://699a2473377ac05ce28d5739.mockapi.io/api/v1/workouts';

const AddWorkoutScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');

  const handleSave = async () => {
    if (!title || !duration || !type) {
      Alert.alert('Грешка', 'Моля попълнете всички полета');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, duration, type }),
      });

      if (response.ok) {
        Alert.alert('Успех', 'Тренировката е добавена!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Грешка', 'Неуспешно записване');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ТОВА Е БУФЕРЪТ ЗА ЧАСОВНИКА */}
      <View style={{ height: 50, backgroundColor: '#fff' }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Добави Тренировка</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Заглавие</Text>
          <TextInput
            style={styles.input}
            placeholder="Напр. Бягане, Фитнес..."
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Продължителност (мин)</Text>
          <TextInput
            style={styles.input}
            placeholder="Напр. 45"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Вид тренировка</Text>
          <TextInput
            style={styles.input}
            placeholder="Напр. Кардио, Силова..."
            value={type}
            onChangeText={setType}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Запази тренировката</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelBtn} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>Отказ</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 20 },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#2196F3', 
    marginBottom: 30 
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, color: '#333', marginBottom: 8, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#F8F9FA'
  },
  saveBtn: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cancelBtn: {
    padding: 15,
    marginTop: 10,
    alignItems: 'center'
  },
  cancelBtnText: { color: '#666', fontSize: 16 }
});

export default AddWorkoutScreen;