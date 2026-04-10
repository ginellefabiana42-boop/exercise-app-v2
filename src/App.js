import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, Card } from 'react-native-elements';

// 1. DATA STRUCTURE (Now includes "Suggested" links)
const EXERCISES = [
  { id: '1', name: 'Push Ups', type: 'repetition', suggested: 'Plank' },
  { id: '2', name: 'Running', type: 'duration', suggested: 'Push Ups' },
  { id: '3', name: 'Plank', type: 'duration', suggested: 'Running' },
];

// 2. HOME SCREEN (Using FlatList and RNE Buttons)
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>Go Fitness!</Text>
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            buttonStyle={styles.mainButton}
            onPress={() => navigation.navigate(
              item.type === 'repetition' ? 'Repetition' : 'Duration', 
              { activity: item } 
            )}
          />
        )}
      />
    </View>
  );
}

// 3. REPETITION SCREEN (Push Ups)
function RepetitionExercise({ route, navigation }) {
  const { activity } = route.params;
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title h4>{activity.name}</Card.Title>
        <Card.Divider />
        <Text style={styles.counterText}>{count}</Text>
        <Button title="Add Rep" onPress={() => setCount(count + 1)} />
        <Button 
            title="Reset" 
            type="outline" 
            onPress={() => setCount(0)} 
            containerStyle={{ marginTop: 10 }} 
        />
      </Card>

      <View style={styles.navButtons}>
        <Button 
          title={`Suggested: ${activity.suggested}`} 
          onPress={() => {
            const next = EXERCISES.find(e => e.name === activity.suggested);
            navigation.push(next.type === 'repetition' ? 'Repetition' : 'Duration', { activity: next });
          }} 
        />
        <Button title="Back to Home" type="clear" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

// 4. DURATION SCREEN (Running / Plank)
function DurationExercise({ route, navigation }) {
  const { activity } = route.params;
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title h4>{activity.name}</Card.Title>
        <Card.Divider />
        <Text style={styles.counterText}>{formatTime(time)}</Text>
        <Button title={running ? "Pause" : "Start"} onPress={() => setRunning(!running)} />
        <Button 
          title="Reset" 
          type="outline" 
          onPress={() => { setTime(0); setRunning(false); }} 
          containerStyle={{ marginTop: 10 }} 
        />
      </Card>

      <View style={styles.navButtons}>
        <Button 
          title={`Suggested: ${activity.suggested}`} 
          onPress={() => {
            const next = EXERCISES.find(e => e.name === activity.suggested);
            navigation.push(next.type === 'repetition' ? 'Repetition' : 'Duration', { activity: next });
          }} 
        />
        <Button title="Back to Home" type="clear" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

// 5. STYLES
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fdfdfd' },
  header: { textAlign: 'center', marginVertical: 30, color: '#333' },
  mainButton: { marginVertical: 8, borderRadius: 12, height: 60, backgroundColor: '#2089dc' },
  card: { borderRadius: 15, padding: 20, elevation: 5 },
  counterText: { fontSize: 72, textAlign: 'center', marginVertical: 20, fontWeight: 'bold' },
  navButtons: { marginTop: 30 }
});

// 6. NAVIGATION STACK
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Exercise Tracker' }} />
        <Stack.Screen name="Repetition" component={RepetitionExercise} />
        <Stack.Screen name="Duration" component={DurationExercise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}