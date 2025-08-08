import { useState } from 'react';
import { View, Text, RefreshControl, FlatList, ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfo } from '@react-native-community/netinfo';

function Segmented({ value, onChange }: { value: 'area' | 'species'; onChange: (v: 'area' | 'species') => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, padding: 12 }}>
      <Text onPress={() => onChange('area')} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: value === 'area' ? '#10B981' : 'transparent', color: value === 'area' ? 'white' : '#111', borderWidth: 1, borderColor: '#d1d5db' }}>By Fishery Area</Text>
      <Text onPress={() => onChange('species')} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: value === 'species' ? '#10B981' : 'transparent', color: value === 'species' ? 'white' : '#111', borderWidth: 1, borderColor: '#d1d5db' }}>By Species</Text>
    </View>
  );
}

export default function HarvestScreen() {
  const [mode, setMode] = useState<'area' | 'species'>('area');
  const netInfo = useNetInfo();

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Southeast Mobile</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Last updated: —</Text>
        </View>
        <Text accessibilityRole="button" accessibilityLabel="Refresh data">⟳</Text>
      </View>

      {/* Offline banner */}
      {!netInfo.isConnected && (
        <View style={{ padding: 8, backgroundColor: '#FEF3C7' }}>
          <Text style={{ fontSize: 12, color: '#92400E' }}>Offline. Showing cached data.</Text>
        </View>
      )}

      <Segmented value={mode} onChange={setMode} />

      {/* Placeholder content; will be replaced with lists */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ borderWidth: 1, borderColor: '#D1FAE5', backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12 }}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Harvest UI scaffolding</Text>
          <Text style={{ color: '#6b7280', marginTop: 8 }}>Cards and lists will render here for mode: {mode}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
