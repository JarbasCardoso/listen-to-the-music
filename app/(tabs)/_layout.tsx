import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopColor: '#334155',
        },
        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#94A3B8',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Desabafo',
        }}
      />
      <Tabs.Screen
        name="ressonancia"
        options={{
          title: 'Mural de Escuta',
        }}
      />
      <Tabs.Screen
        name="devocionais"
        options={{
          title: 'Trilha da Esperança',
        }}
      />
    </Tabs>
  );
}