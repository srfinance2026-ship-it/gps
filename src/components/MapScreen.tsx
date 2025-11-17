import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { useAlerts } from '../hooks/useAlerts';

const MapScreen: React.FC = () => {
  const { location, loading, error } = useLocation();
  const { nearbyAlerts } = useAlerts(location);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'police':
        return 'blue';
      case 'radar':
        return 'red';
      case 'danger':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'police':
        return '🚔';
      case 'radar':
        return '📡';
      case 'danger':
        return '⚠️';
      default:
        return '📍';
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando localização...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Localização não disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {nearbyAlerts.map((alert) => (
          <React.Fragment key={alert.id}>
            <Marker
              coordinate={{
                latitude: alert.latitude,
                longitude: alert.longitude,
              }}
              title={alert.title}
              description={alert.description}
              pinColor={getMarkerColor(alert.type)}
            >
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>
                  {getMarkerIcon(alert.type)}
                </Text>
              </View>
            </Marker>
            <Circle
              center={{
                latitude: alert.latitude,
                longitude: alert.longitude,
              }}
              radius={alert.radius}
              strokeColor={getMarkerColor(alert.type)}
              fillColor={`${getMarkerColor(alert.type)}20`}
              strokeWidth={2}
            />
          </React.Fragment>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: 'gray',
  },
  markerText: {
    fontSize: 20,
  },
});

export default MapScreen;
