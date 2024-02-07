export const STATUS_COLORS = {
  active: "red",
  "under-construction": "orange",
  approved: "green",
  proposed: "cyan",
} as const;

export const STATUS_KEYS = Object.keys(STATUS_COLORS) as Array<
  keyof typeof STATUS_COLORS
>;

export const TERMINALS: Array<{
  key: string;
  bcfd: number;
  latitude: number;
  longitude: number;
  status: (typeof STATUS_KEYS)[number];
}> = [
  // STATUS ACTIVE
  // 1. Kenai, AK:0.2 Bcfd(Trans-Foreland)2. Sabine, LA: 4.55 Bcfd(Cheniere/Sabine Pass LNG –Trains 1-6)3. Cove Point, MD:  0.79 Bcfd(Dominion–Cove Point LNG)4. Corpus Christi, TX:  2.40 Bcfd(Cheniere – Corpus Christi LNG Trains 1-3)
  // 5. Hackberry, LA:  2.06 Bcfd(Sempra–Cameron LNG, Trains 1-3)6. Elba Island, GA:0.35 Bcd(Southern LNG Company Units 1-10)7. Freeport, TX:  2.38 Bcfd(Freeport LNG Dev/Freeport LNG Expansion/FLNG Liquefaction Trains 1-3)8. Cameron Parish, LA:  1.71 Bcfd(Venture Global Calcasieu Pass Units 1-9
  {
    key: "Sabine, LA",
    bcfd: 4.55,
    latitude: 29.735,
    longitude: -93.855,
    status: "active",
  },
  {
    key: "Cove Point, MD",
    bcfd: 0.79,
    latitude: 38.41,
    longitude: -76.37,
    status: "active",
  },
  {
    key: "Corpus Christi, TX",
    bcfd: 2.4,
    latitude: 27.8,
    longitude: -97.4,
    status: "active",
  },
  {
    key: "Hackberry, LA",
    bcfd: 2.06,
    latitude: 29.996,
    longitude: -93.3421,
    status: "active",
  },
  {
    key: "Elba Island, GA",
    bcfd: 0.35,
    latitude: 32.0,
    longitude: -80.9,
    status: "active",
  },
  {
    key: "Freeport, TX",
    bcfd: 2.38,
    latitude: 28.9,
    longitude: -95.3,
    status: "active",
  },
  {
    key: "Cameron Parish, LA",
    bcfd: 1.71,
    latitude: 29.8,
    longitude: -93.3,
    status: "active",
  },
  // STATUS APPROVED, UNDER CONSTRUCTION
  // 1. Sabine Pass, TX:  2.57 Bcfd(ExxonMobil – Golden Pass) (CP14-517, CP20-459)2. Plaquemines Parish, LA:  3.32 Bcfd(Venture Global Plaquemines)  (CP17-66)3. Calcasieu Parish, LA:  3.81 Bcfd(Driftwood LNG) (CP17-117)4. Corpus Christi, TX:  1.58 Bcfd(Cheniere Corpus Christi Stage III) (CP18-512)5. Port Arthur, TX:  1.86 Bcfd(Sempra - Port Arthur LNG Trains 1 & 2) (CP17-20)6. Brownsville, TX:  3.73 Bcfd(Rio Grande LNG – NextDecade) (CP16-454)7. Cameron Parish, LA:  No Bcfd(Venture Global Calcasieu Pass) (CP15-550)
  {
    key: "Sabine Pass, TX",
    bcfd: 2.57,
    latitude: 29.77,
    longitude: -93.92,
    status: "under-construction",
  },
  {
    key: "Plaquemines Parish, LA",
    bcfd: 3.32,
    // lat lng of Plaquemines Parish, LA
    latitude: 29.324,
    longitude: -89.4742,
    status: "under-construction",
  },
  {
    key: "Calcasieu Parish, LA",
    bcfd: 3.81,
    latitude: 30.2089,
    longitude: -93.3389,
    status: "under-construction",
  },
  {
    key: "Corpus Christi, TX",
    bcfd: 1.58,
    latitude: 27.8006,
    longitude: -97.3964,
    status: "under-construction",
  },
  {
    key: "Port Arthur, TX",
    bcfd: 1.86,
    latitude: 29.735,
    longitude: -93.855,
    status: "under-construction",
  },
  {
    key: "Brownsville, TX",
    bcfd: 3.73,
    // lat lng of Brownsville, TX
    latitude: 25.9017,
    longitude: -97.4975,
    status: "under-construction",
  },
  {
    key: "Cameron Parish, LA",
    bcfd: 0,
    // lat lng of Cameron Parish, LA
    latitude: 29.7994,
    longitude: -93.3398,
    status: "under-construction",
  },
  // STATUS APPROVED, NOT UNDER CONSTRUCTION
  // A. Lake Charles, LA:  2.27 Bcfd(Lake Charles LNG) (CP14-120)B. Lake Charles, LA:  1.22 Bcfd(Magnolia LNG) (CP14-347)C. Hackberry, LA:0.93 Bcfd(Sempra - Cameron LNG Train 4) (CP15-560, CP22-41)D. Freeport, TX:  0.74 Bcfd(Freeport LNG Dev Train 4) (CP17-470)E. Pascagoula, MS:  1.50 Bcfd(Gulf LNG Liquefaction) (CP15-521)F. Jacksonville, FL:  0.13 Bcf/d (Eagle LNG Partners) (CP17-41)G. Brownsville, TX:  0.62 Bcfd(Texas LNG Brownsville) (CP16-116)H. Nikiski, AK: 2.76 Bcfd(Alaska Gasline) (CP17-178)I. Cameron Parish, LA:1.21 Bcfd(Commonwealth LNG) (CP19-502)J. Port Arthur, TX:  1.86 Bcfd(Sempra - Port Arthur LNG Trains 3 & 4) (CP20-55)MARAD/USCG– APPROVED, NOT UNDER CONSTRUCTION MC
  // 1. Gulf of Mexico:  1.8 Bcfd(Delfin LNG
  {
    key: "Lake Charles, LA",
    bcfd: 2.27,
    latitude: 30.2266,
    longitude: -93.2174,
    status: "approved",
  },
  {
    key: "Lake Charles, LA",
    bcfd: 1.22,
    latitude: 29.935,
    longitude: -93.2174,
    status: "approved",
  },
  {
    key: "Hackberry, LA",
    bcfd: 0.93,
    latitude: 29.735,
    longitude: -93.855,
    status: "approved",
  },
  {
    key: "Freeport, TX",
    bcfd: 0.74,
    latitude: 28.9541,
    longitude: -95.3597,
    status: "approved",
  },
  {
    key: "Pascagoula, MS",
    bcfd: 1.5,
    latitude: 30.3658,
    longitude: -88.5561,
    status: "approved",
  },
  {
    key: "Jacksonville, FL",
    bcfd: 0.13,
    latitude: 30.3322,
    longitude: -81.6557,
    status: "approved",
  },
  {
    key: "Brownsville, TX",
    bcfd: 0.62,
    latitude: 25.9017,
    longitude: -97.4975,
    status: "approved",
  },
  {
    key: "Nikiski, AK",
    bcfd: 2.76,
    latitude: 60.7069,
    longitude: -151.2636,
    status: "approved",
  },
  {
    key: "Cameron Parish, LA",
    bcfd: 1.21,
    latitude: 29.8434,
    longitude: -93.178,
    status: "approved",
  },
  {
    key: "Port Arthur, TX",
    bcfd: 1.86,
    latitude: 29.885,
    longitude: -93.9399,
    status: "approved",
  },
  {
    key: "Gulf of Mexico",
    bcfd: 1.8,
    latitude: 29.735,
    longitude: -93.855,
    status: "approved",
  },

  // STATUS PROPOSED
  // 1. Cameron Parish, LA: 3.96 Bcfd(Venture Global CP2 Blocks 1-9) (CP22-21)2. Plaquemines Parish, LA:0.45 Bcfd(Venture Global Plaquemines) (CP22-92)3. Corpus Christi, TX:  0.45 Bcfd(CheniereCorpus Christi MidscaleTrains 8-9) (CP23-129)4. Elba Island, GA:0.06 Bcd(Elba Liquefaction Optimization Project) (CP23-375)Projects in Pre-filing:A. LaFourcheParish, LA:0.69 Bcfd(Port Fourchon LNG) (PF17-9)B. Plaquemines Parish, LA:  2.76 Bcfd(Delta LNG -Venture Global) (PF19-4)C. Sabine, LA:0.9 Bcfd(Cheniere/Sabine Pass – Stage 5 Expansion) (PF23-2
  {
    key: "Cameron Parish, LA",
    bcfd: 3.96,
    latitude: 29.8434,
    longitude: -93.178,
    status: "proposed",
  },
  {
    key: "Plaquemines Parish, LA",
    bcfd: 0.45,
    latitude: 29.324,
    longitude: -89.4742,
    status: "proposed",
  },
  {
    key: "Corpus Christi, TX",
    bcfd: 0.45,
    latitude: 27.8006,
    longitude: -97.3964,
    status: "proposed",
  },
  {
    key: "Elba Island, GA",
    bcfd: 0.06,
    latitude: 32.0877,
    longitude: -81.0029,
    status: "proposed",
  },
  {
    key: "LaFourche Parish, LA",
    bcfd: 0.69,
    latitude: 29.6952,
    longitude: -90.5258,
    status: "proposed",
  },
  {
    key: "Plaquemines Parish, LA",
    bcfd: 2.76,
    latitude: 29.324,
    longitude: -89.4742,
    status: "proposed",
  },
  {
    key: "Sabine, LA",
    bcfd: 0.9,
    latitude: 29.8951,
    longitude: -93.8452,
    status: "proposed",
  },

  {
    key: "Chester, PA",
    bcfd: 1.2,
    latitude: 39.8496,
    longitude: -75.3557,
    status: "proposed",
  },
];
