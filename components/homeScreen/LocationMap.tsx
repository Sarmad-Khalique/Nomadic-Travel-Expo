import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Major cities of Pakistan
const pakistanCities = [
  { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
  { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
  { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
  { name: "Peshawar", latitude: 34.0150, longitude: 71.5249 },
  { name: "Quetta", latitude: 30.1798, longitude: 66.9749 },
  { name: "Multan", latitude: 30.1575, longitude: 71.5249 },
  { name: "Faisalabad", latitude: 31.4504, longitude: 73.1350 },
  { name: "Rawalpindi", latitude: 33.5651, longitude: 73.0169 },
];

const LocationMap: React.FC = () => {
  return (
    <View className="mt-4">
      <Text className="text-[24px] font-merriweather-bold text-black mb-2">Location</Text>
      <View
        className="rounded-3xl overflow-hidden"
        style={{
          height: 296,
          borderWidth: 0.5,
          borderColor: '#FF6B6B80',
        }}
      >
        <MapView
          key="pakistan-map"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 30.5,
            longitude: 70.0,
            latitudeDelta: 20,
            longitudeDelta: 20,
          }}
          scrollEnabled={true}
          zoomEnabled={true}
          rotateEnabled={false}
          pitchEnabled={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          {pakistanCities.map((city, idx) => (
            <Marker
              key={idx}
              coordinate={{
                latitude: city.latitude,
                longitude: city.longitude,
              }}
              title={city.name}
              description="City in Pakistan"
            />
          ))}
        </MapView>
      </View>
    </View>
  );
};

export default LocationMap;
