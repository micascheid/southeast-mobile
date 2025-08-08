import { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView, Pressable } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SPECIES, Species } from '@/features/harvest/constants';
import { useHarvestByArea, useHarvestBySpecies, useLastUpdated } from '@/features/harvest/hooks';
import { formatDateISOToShort, formatQty, formatUSD, formatWeightLbs } from '@/utils/format';

function Segmented({ value, onChange }: { value: 'area' | 'species'; onChange: (v: 'area' | 'species') => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 10 }}>
      <Pressable accessibilityRole="button" onPress={() => onChange('area')} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: value === 'area' ? '#10B981' : '#F3F4F6', borderWidth: 1, borderColor: value === 'area' ? '#10B981' : '#E5E7EB' }}>
        <Text style={{ color: value === 'area' ? 'white' : '#111827', fontWeight: '600' }}>By Fishery Area</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => onChange('species')} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: value === 'species' ? '#10B981' : '#F3F4F6', borderWidth: 1, borderColor: value === 'species' ? '#10B981' : '#E5E7EB' }}>
        <Text style={{ color: value === 'species' ? 'white' : '#111827', fontWeight: '600' }}>By Species</Text>
      </Pressable>
    </View>
  );
}

function SpeciesChips({ value, onChange }: { value: Species; onChange: (s: Species) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
      {SPECIES.map((s) => (
        <Pressable key={s} accessibilityRole="button" accessibilityLabel={`Filter species: ${s}`} onPress={() => onChange(s)}
          style={{ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: value === s ? '#10B981' : '#E5E7EB', backgroundColor: value === s ? '#10B981' : 'white' }}>
          <Text style={{ color: value === s ? 'white' : '#111827', fontWeight: '600' }}>{s}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function AreaCard({ name, openDate, closeDate, rows }: { name: string; openDate: string; closeDate: string; rows: Array<{ species: string; weight: string; price: string; qty: string }>; }) {
  return (
    <View style={{ borderWidth: 1, borderColor: '#D1FAE5', backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, marginHorizontal: 16 }}>
      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 4 }}>📍 {name}</Text>
      <Text style={{ color: '#6B7280', fontSize: 12, marginBottom: 12 }}>Dates: {formatDateISOToShort(openDate)} → {formatDateISOToShort(closeDate)}</Text>
      {rows.map((r) => (
        <View key={r.species} style={{ flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#E5E7EB' }}>
          <Text style={{ flex: 1, fontWeight: '600' }}>{r.species}</Text>
          <Text style={{ width: 80, textAlign: 'right' }}>{r.weight}</Text>
          <Text style={{ width: 80, textAlign: 'right' }}>{r.price}</Text>
          <Text style={{ width: 80, textAlign: 'right' }}>{r.qty}</Text>
        </View>
      ))}
    </View>
  );
}

function SpeciesResultCard({ name, species, openDate, closeDate, weight, price, qty }: { name: string; species: string; openDate: string; closeDate: string; weight: string; price: string; qty: string }) {
  return (
    <View style={{ borderWidth: 1, borderColor: '#D1FAE5', backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, marginHorizontal: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{name}</Text>
        <Text style={{ paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#E5E7EB', borderRadius: 999, fontSize: 12 }}>{species}</Text>
      </View>
      <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 4, marginBottom: 12 }}>Dates: {formatDateISOToShort(openDate)} → {formatDateISOToShort(closeDate)}</Text>
      <Text>Weight: {weight}   •   Price: {price}   •   Qty: {qty}</Text>
    </View>
  );
}

export default function HarvestScreen() {
  const [mode, setMode] = useState<'area' | 'species'>('area');
  const [selectedSpecies, setSelectedSpecies] = useState<Species>('Sockeye');
  const netInfo = useNetInfo();

  const areaQuery = useHarvestByArea();
  const speciesQuery = useHarvestBySpecies(selectedSpecies);
  const lastUpdatedQuery = useLastUpdated();

  const onRefresh = useCallback(() => {
    if (mode === 'area') {
      areaQuery.refetch();
    } else {
      speciesQuery.refetch();
    }
    lastUpdatedQuery.refetch();
  }, [mode, areaQuery, speciesQuery, lastUpdatedQuery]);

  const areaData = areaQuery.data ?? [];
  const speciesData = speciesQuery.data ?? [];

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Southeast Mobile</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Last updated: {lastUpdatedQuery.data ? formatDateISOToShort(lastUpdatedQuery.data) : '—'}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Refresh data" onPress={onRefresh}><Text>⟳</Text></Pressable>
      </View>

      {/* Offline banner */}
      {netInfo.isConnected === false && (
        <View style={{ padding: 8, backgroundColor: '#FEF3C7' }}>
          <Text style={{ fontSize: 12, color: '#92400E' }}>Offline. Showing cached data.</Text>
        </View>
      )}

      <Segmented value={mode} onChange={setMode} />

      {mode === 'area' ? (
        <FlatList
          data={areaData}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={areaQuery.isRefetching} onRefresh={onRefresh} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => {
            const rows = SPECIES.filter((s) => item.species[s]).map((s) => ({
              species: s,
              weight: formatWeightLbs(item.species[s]!.avgWeight),
              price: formatUSD(item.species[s]!.avgPrice),
              qty: formatQty(item.species[s]!.numbers),
            }));
            return (
              <AreaCard
                name={item.name}
                openDate={item.openDate}
                closeDate={item.closeDate}
                rows={rows}
              />
            );
          }}
        />
      ) : (
        <View>
          <SpeciesChips value={selectedSpecies} onChange={setSelectedSpecies} />
          <FlatList
            data={speciesData}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={speciesQuery.isRefetching} onRefresh={onRefresh} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ paddingVertical: 12 }}
            renderItem={({ item }) => (
              <SpeciesResultCard
                name={item.name}
                species={item.species}
                openDate={item.openDate}
                closeDate={item.closeDate}
                weight={formatWeightLbs(item.metrics.avgWeight)}
                price={formatUSD(item.metrics.avgPrice)}
                qty={formatQty(item.metrics.numbers)}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
