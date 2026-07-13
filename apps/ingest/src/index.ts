const AIRPLANES_LIVE_URL =
  "https://api.airplanes.live/v2/point/41.9779/-91.6656/50"; //Will need to change this to be modular at a different time. Currently set to be Cedar Rapids

async function fetchAircraft() {
  const response = await fetch(AIRPLANES_LIVE_URL);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Airplanes.live request failed (${response.status}): ${body}`,
    );
  }

  return response.json();
}

async function main() {
  const aircraft = await fetchAircraft();
  console.log(aircraft);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
