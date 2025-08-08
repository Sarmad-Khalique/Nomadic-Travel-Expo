import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useHomeStore } from '../../store/homeStore';
import { City, LocationMapProps } from '../../types/homeScreen';

const LocationMap: React.FC<LocationMapProps> = () => {
  const { cities } = useHomeStore();

  // Default region for Pakistan
  const defaultRegion = {
    latitude: 30.5,
    longitude: 70.0,
    latitudeDelta: 25,
    longitudeDelta: 25,
  };

  return (
    <View className="mt-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-2xl mr-2">📍</Text>
        <Text className="text-[24px] font-merriweather-bold text-black">Location</Text>
      </View>
      <View
        className="rounded-3xl overflow-hidden"
        style={{
          height: 296,
          borderWidth: 0.5,
          borderColor: '#FF6B6B80',
        }}
      >
        <MapView
          key={`pakistan-map-${Date.now()}`}
          style={{ flex: 1 }}
          initialRegion={defaultRegion}
          scrollEnabled={true}
          zoomEnabled={true}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          {cities.map((city: City, idx: number) => (
            <Marker
              key={idx}
              coordinate={{
                latitude: city.latitude,
                longitude: city.longitude,
              }}
              title={city.name}
              description="City in Pakistan"
              pinColor="yellow"
            />
          ))}
        </MapView>
      </View>
    </View>
  );
};

export default LocationMap;
