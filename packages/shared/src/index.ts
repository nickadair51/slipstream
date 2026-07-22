export type AircraftSourceType =
  | "adsb_icao"
  | "adsr_icao"
  | "mlat"
  | "mode_s"
  | "tisb_icao";

export interface AircraftObservation {
  hex: string;
  observedAt: number;

  registration?: string;
  aircraftType?: string;
  description?: string;
  operator?: string;
  year?: number;

  latitude?: number;
  longitude?: number;
  barometricAltitude?: number | "ground";
  groundSpeed?: number;
  track?: number;
  barometricVerticalRate?: number;

  squawk?: string;
  emergencyAlert?: boolean;
  specialPositionIdentification?: boolean;

  sourceType?: AircraftSourceType;
  navigationIntegrityCategory?: number;
  radiusOfContainment?: number;
  secondsSinceSeen?: number;
  secondsSincePositionSeen?: number;
  messageCount?: number;
  signalStrength?: number;
}

export interface AircraftFeed {
  message: string;
  observedAt: number;
  total: number;
  aircraft: AircraftObservation[];
}
