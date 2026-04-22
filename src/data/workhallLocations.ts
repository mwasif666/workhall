export type WorkhallLocation = {
  id: string;
  name: string;
  area: string;
  address: string;
  description: string;
  longitude: number;
  latitude: number;
  image: string;
  mapsUrl: string;
};

export const workhallLocations: WorkhallLocation[] = [
  {
    id: "pechs",
    name: "Work Hall PECHS",
    area: "PECHS Block 6",
    address: "Plot 36, F Street 36, Block-6, P.E.C.H.S., Karachi, Sindh 75400",
    description: "A central PECHS address with quick access to Shahrah-e-Faisal and surrounding business districts.",
    latitude: 24.8642395,
    longitude: 67.071494,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+36,+F+Street+36,+Block-6,+PECHS,+Karachi",
  },
  {
    id: "tipu-sultan",
    name: "Work Hall Tipu Sultan",
    area: "Tipu Sultan Road",
    address:
      "Plot No. 32/75, Tipu Sultan, Shabbirabad Dawdi, Bohra CHS, Karachi, Sindh 74200",
    description: "A work-friendly stop near Mohammad Ali Society and one of Karachi's busiest business corridors.",
    latitude: 24.8730818,
    longitude: 67.0820728,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+32/75+Tipu+Sultan+Road+Karachi",
  },
  {
    id: "zamzama",
    name: "Work Hall Zamzama",
    area: "DHA Phase 5",
    address:
      "First Floor, Plot 18C E St, inside Bank Alfalah Digital, DHA Phase 5 Zamzama Commercial Area, Karachi, Sindh 75500",
    description: "A premium Zamzama address close to cafes, client-facing businesses, and DHA's commercial spine.",
    latitude: 24.8171047,
    longitude: 67.041119,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=18C+E+Street+Zamzama+Commercial+Area+Karachi",
  },
  {
    id: "gulshan",
    name: "Work Hall Gulshan",
    area: "Rashid Minhas Road",
    address:
      "Plot L7 Rashid Minhas Rd, Federal B Area Block 21, Gulshan-e-Iqbal, Karachi, Sindh 74000",
    description: "A northern Karachi location that serves Gulshan, FB Area, and nearby residential-commercial catchments.",
    latitude: 24.9410407,
    longitude: 67.0847977,
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+L7+Rashid+Minhas+Road+Karachi",
  },
  {
    id: "kda",
    name: "Work Hall KDA",
    area: "KDA Scheme 1",
    address:
      "Plot C, 32/7 Tipu Sultan Rd, near Mohammad Ali Society, KDA Scheme #1, Karachi, Sindh 75350",
    description: "A practical east-central Karachi base near Mohammad Ali Society and Tipu Sultan Road.",
    latitude: 24.8776353,
    longitude: 67.0860798,
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32/7+Tipu+Sultan+Road+KDA+Scheme+1+Karachi",
  },
  {
    id: "shahrah-e-faisal",
    name: "Work Hall Shahrah-e-Faisal",
    area: "Off Shahrah-e-Faisal",
    address:
      "Plot 245/X/2, off Shahrah-e-Faisal, behind Parsa Towers, Block-6 PECHS, Karachi, 75400",
    description: "A Shahrah-e-Faisal-facing address with fast access to Karachi's airport corridor and corporate belt.",
    latitude: 24.8701431,
    longitude: 67.0883381,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+245/X/2+Shahrah-e-Faisal+Karachi",
  },
];
