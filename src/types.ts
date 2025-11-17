export interface AlertPoint {
  id: string;
  type: 'police' | 'radar' | 'danger';
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  radius: number; // in meters
}

export interface Location {
  latitude: number;
  longitude: number;
}
