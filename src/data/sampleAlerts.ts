import { AlertPoint } from '../types';

export const sampleAlerts: AlertPoint[] = [
  // Police stations (amostras no Brasil)
  {
    id: 'police1',
    type: 'police',
    latitude: -23.5505,
    longitude: -46.6333,
    title: 'Delegacia de São Paulo',
    description: 'Delegacia Central',
    radius: 500,
  },
  {
    id: 'police2',
    type: 'police',
    latitude: -22.9068,
    longitude: -43.1729,
    title: 'Delegacia do Rio de Janeiro',
    description: 'Delegacia Central',
    radius: 500,
  },

  // Radars (amostras)
  {
    id: 'radar1',
    type: 'radar',
    latitude: -23.5489,
    longitude: -46.6388,
    title: 'Radar Avenida Paulista',
    description: 'Radar de velocidade',
    radius: 100,
  },
  {
    id: 'radar2',
    type: 'radar',
    latitude: -22.9035,
    longitude: -43.2096,
    title: 'Radar Copacabana',
    description: 'Radar de velocidade',
    radius: 100,
  },

  // Dangerous areas (amostras)
  {
    id: 'danger1',
    type: 'danger',
    latitude: -23.5400,
    longitude: -46.6400,
    title: 'Área de Alto Risco',
    description: 'Zona conhecida por assaltos',
    radius: 300,
  },
  {
    id: 'danger2',
    type: 'danger',
    latitude: -22.9100,
    longitude: -43.1800,
    title: 'Área Perigosa',
    description: 'Zona com alta incidência de crimes',
    radius: 300,
  },
];
