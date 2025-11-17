import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AlertPoint, Location } from '../types';
import { sampleAlerts } from '../data/sampleAlerts';
import { getNearbyAlerts } from '../utils/location';

export function useAlerts(userLocation: Location | null) {
  const [alerts] = useState<AlertPoint[]>(sampleAlerts);
  const [nearbyAlerts, setNearbyAlerts] = useState<AlertPoint[]>([]);
  const [alertedPoints, setAlertedPoints] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (userLocation) {
      const nearby = getNearbyAlerts(userLocation, alerts);
      setNearbyAlerts(nearby);

      // Check for new alerts
      nearby.forEach((alert) => {
        if (!alertedPoints.has(alert.id)) {
          showAlert(alert);
          setAlertedPoints((prev) => new Set(prev).add(alert.id));
        }
      });
    }
  }, [userLocation, alerts, alertedPoints]);

  const showAlert = (alert: AlertPoint) => {
    const alertType = {
      police: '🚔 Alerta de Polícia',
      radar: '📡 Alerta de Radar',
      danger: '⚠️ Área Perigosa',
    };

    Alert.alert(
      alertType[alert.type],
      `${alert.title}\n${alert.description}`,
      [{ text: 'OK' }]
    );
  };

  return {
    alerts,
    nearbyAlerts,
  };
}
