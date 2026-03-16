import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://699a2473377ac05ce28d5739.mockapi.io/api/v1/workouts';

const HomeScreen = ({ navigation }: any) => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      Alert.alert('Грешка', 'Проблем при зареждане на тренировките');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [])
  );

  const deleteWorkout = async (id: string) => {
    Alert.alert('Изтриване', 'Сигурни ли сте?', [
      { text: 'Отказ', style: 'cancel' },
      { text: 'Изтрий', style: 'destructive', onPress: async () => {
          try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setWorkouts(workouts.filter(w => w.id !== id));
          } catch (e) {
            Alert.alert('Грешка', 'Неуспешно изтриване');
          }
      }}
    ]);
  };

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2196F3" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ТОВА Е ПРАЗНОТО МЯСТО, КОЕТО БУТА ТЕКСТА ПОД ЧАСОВНИКА */}
      <View style={{ height: 50, backgroundColor: '#fff' }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Списък с Тренировки</Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutTitle}>{item.title}</Text>
              <Text style={styles.workoutDetails}>{item.duration} мин • {item.type}</Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteWorkout(item.id)}>
              <Text style={{ color: '#FF5252', fontWeight: 'bold' }}>Изтрий</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchWorkouts} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Все още нямате добавени тренировки.</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddWorkout')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    paddingHorizontal: 20, 
    paddingBottom: 15, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#2196F3' },
  card: { 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    marginVertical: 8, 
    padding: 20, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    elevation: 3 
  },
  workoutTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  workoutDetails: { color: '#666', marginTop: 4 },
  deleteBtn: { padding: 10, backgroundColor: '#FFF5F5', borderRadius: 8 },
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#2196F3', 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5 
  },
  fabText: { color: '#fff', fontSize: 35, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default HomeScreen;
