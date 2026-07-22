import type { AircraftFeed, AircraftObservation, AircraftSourceType } from "@slipstream/shared";

const AIRPLANES_LIVE_URL =
  "https://opendata.adsb.fi/api/v2/mil" //Will need to change this to be modular at a different time

interface AdsbFiAircraft {
  hex: string;
  type?: AircraftSourceType;
  r?: string;
  t?: string;
  desc?: string;
  ownOp?: string;
  year?: string;
  alt_baro?: number | "ground";
  gs?: number;
  track?: number;
  baro_rate?: number;
  squawk?: string;
  lat?: number;
  lon?: number;
  nic?: number;
  rc?: number;
  seen_pos?: number;
  alert?: 0 | 1 | boolean;
  spi?: 0 | 1 | boolean;
  messages?: number;
  seen?: number;
  rssi?: number;
}

interface AdsbFiResponse {
  ac: AdsbFiAircraft[];
  msg: string;
  now: number;
  total: number;
}

async function fetchAircraft(): Promise<AircraftFeed> {
  const response = await fetch(AIRPLANES_LIVE_URL);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Feeder API request failed (${response.status}): ${body}`,
    );
  }

  const data = (await response.json()) as AdsbFiResponse;

  return normalizeAircraftFeed(data);
}

function normalizeAircraftFeed(data: AdsbFiResponse): AircraftFeed {
  return {
    message: data.msg,
    observedAt: data.now,
    total: data.total,
    aircraft: data.ac.map((aircraft) =>
      normalizeAircraftObservation(aircraft, data.now),
    ),
  };
}

function normalizeAircraftObservation(
  aircraft: AdsbFiAircraft,
  observedAt: number,
): AircraftObservation {
  const observation: AircraftObservation = {
    hex: aircraft.hex,
    observedAt,
  };

  const year = aircraft.year ? Number(aircraft.year) : undefined;

  if (aircraft.r !== undefined) observation.registration = aircraft.r;
  if (aircraft.t !== undefined) observation.aircraftType = aircraft.t;
  if (aircraft.desc !== undefined) observation.description = aircraft.desc;
  if (aircraft.ownOp !== undefined) observation.operator = aircraft.ownOp;
  if (year !== undefined && Number.isFinite(year)) observation.year = year;
  if (aircraft.lat !== undefined) observation.latitude = aircraft.lat;
  if (aircraft.lon !== undefined) observation.longitude = aircraft.lon;
  if (aircraft.alt_baro !== undefined) observation.barometricAltitude = aircraft.alt_baro;
  if (aircraft.gs !== undefined) observation.groundSpeed = aircraft.gs;
  if (aircraft.track !== undefined) observation.track = aircraft.track;
  if (aircraft.baro_rate !== undefined) observation.barometricVerticalRate = aircraft.baro_rate;
  if (aircraft.squawk !== undefined) observation.squawk = aircraft.squawk;
  if (aircraft.alert !== undefined) observation.emergencyAlert = Boolean(aircraft.alert);
  if (aircraft.spi !== undefined) observation.specialPositionIdentification = Boolean(aircraft.spi);
  if (aircraft.type !== undefined) observation.sourceType = aircraft.type;
  if (aircraft.nic !== undefined) observation.navigationIntegrityCategory = aircraft.nic;
  if (aircraft.rc !== undefined) observation.radiusOfContainment = aircraft.rc;
  if (aircraft.seen !== undefined) observation.secondsSinceSeen = aircraft.seen;
  if (aircraft.seen_pos !== undefined) observation.secondsSincePositionSeen = aircraft.seen_pos;
  if (aircraft.messages !== undefined) observation.messageCount = aircraft.messages;
  if (aircraft.rssi !== undefined) observation.signalStrength = aircraft.rssi;

  return observation;
}

async function main() {
  const aircraft = await fetchAircraft();
  console.log(aircraft);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
