export type WorkhallLocation = {
  id: string;
  name: string;
  area: string;
  address: string;
  description: string;
  longitude: number;
  latitude: number;
  image: string;
  gallery: string[];
  mapsUrl: string;
  bookTourUrl: string;
  accent: string;
  highlights: string[];
  featuredHighlight: number;
};

export const workhallLocations: WorkhallLocation[] = [
  {
    id: "pechs",
    name: "Work Hall PECHS",
    area: "PECHS Block 6",
    address: "Plot 36, F Street 36, Block-6, P.E.C.H.S., Karachi, Sindh 75400",
    description:
      "Set in the middle of Karachi's business movement, the PECHS branch keeps Shahrah-e-Faisal, Tariq Road, Nursery, and Bahadurabad within easy reach for founders, freelancers, and client-facing teams.",
    latitude: 24.8642395,
    longitude: 67.071494,
    image:
      "https://blog.workhall.co/wp-content/uploads/2025/03/Work-Hall-PECHS_-The-perfect-workspace-in-the-heart-of-Karachi-1024x394.png",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2025/03/Work-Hall-PECHS_-The-perfect-workspace-in-the-heart-of-Karachi-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+36,+F+Street+36,+Block-6,+PECHS,+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#7eb5cb",
    highlights: [
      "1 minute from Shahrah-e-Faisal",
      "Close to Tariq Road",
      "Bahadurabad and Nursery nearby",
    ],
    featuredHighlight: 0,
  },
  {
    id: "tipu-sultan",
    name: "Work Hall Tipu Sultan",
    area: "Tipu Sultan Road",
    address:
      "Plot No. 32/75, Tipu Sultan, Shabbirabad Dawdi, Bohra CHS, Karachi, Sindh 74200",
    description:
      "Designed for growing startups, this branch places you in one of Karachi's busiest commercial corridors with restaurants, media companies, and client meetings all close to your workday.",
    latitude: 24.8730818,
    longitude: 67.0820728,
    image:
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Work-Hall-PECHS_-The-perfect-workspace-in-the-heart-of-Karachi-1024x394.png",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+32/75+Tipu+Sultan+Road+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#ff9460",
    highlights: [
      "Startup-friendly commercial strip",
      "Restaurants and cafes close by",
      "Easy client meeting access",
    ],
    featuredHighlight: 1,
  },
  {
    id: "zamzama",
    name: "Work Hall Zamzama",
    area: "DHA Phase 5",
    address:
      "First Floor, Plot 18C E St, inside Bank Alfalah Digital, DHA Phase 5 Zamzama Commercial Area, Karachi, Sindh 75500",
    description:
      "A premium DHA address for teams that need a polished front. Zamzama combines fast internet, meeting-ready rooms, and quick reach to upscale cafes, retail, and service providers.",
    latitude: 24.8171047,
    longitude: 67.041119,
    image:
      "https://blog.workhall.co/wp-content/uploads/2025/04/Work-Hall-Bank-Alfalah_-The-perfect-blend-of-banking-and-business-1024x394.png",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2025/04/Work-Hall-Bank-Alfalah_-The-perfect-blend-of-banking-and-business-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/05/Work-Hall-Shahrah-e-Faisal_-Designed-for-the-modern-workforce-1024x394.jpg",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=18C+E+Street+Zamzama+Commercial+Area+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#f4b04f",
    highlights: [
      "Premium client-facing address",
      "Conference-ready meeting spaces",
      "Close to retail and food spots",
    ],
    featuredHighlight: 0,
  },
  {
    id: "gulshan",
    name: "Work Hall Gulshan",
    area: "Rashid Minhas Road",
    address:
      "Plot L7 Rashid Minhas Rd, Federal B Area Block 21, Gulshan-e-Iqbal, Karachi, Sindh 74000",
    description:
      "A calmer north-city base for consultants, educators, and creative professionals who want focus without disconnecting from University Road, Civic Center, NIPA, and the rest of Gulshan.",
    latitude: 24.9410407,
    longitude: 67.0847977,
    image:
      "https://blog.workhall.co/wp-content/uploads/2024/11/Best-co-working-spaces-for-offices-near-Gulshan-1024x394.jpg",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2024/11/Best-co-working-spaces-for-offices-near-Gulshan-1024x394.jpg",
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+L7+Rashid+Minhas+Road+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#87b889",
    highlights: [
      "Near University Road",
      "Quiet focus-friendly setup",
      "Civic Center and NIPA access",
    ],
    featuredHighlight: 1,
  },
  {
    id: "kda",
    name: "Work Hall KDA",
    area: "KDA Scheme 1",
    address:
      "Plot C, 32/7 Tipu Sultan Rd, near Mohammad Ali Society, KDA Scheme #1, Karachi, Sindh 75350",
    description:
      "A practical east-central workspace for remote teams, freelancers, and small businesses that want a straightforward setup with fast Wi-Fi, meeting rooms, and flexible memberships.",
    latitude: 24.8776353,
    longitude: 67.0860798,
    image:
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Work-Hall-PECHS_-The-perfect-workspace-in-the-heart-of-Karachi-1024x394.png",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32/7+Tipu+Sultan+Road+KDA+Scheme+1+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#cf8cff",
    highlights: [
      "Near Mohammad Ali Society",
      "Flexible membership plans",
      "Fast Wi-Fi and conference rooms",
    ],
    featuredHighlight: 2,
  },
  {
    id: "shahrah-e-faisal",
    name: "Work Hall Shahrah-e-Faisal",
    area: "Off Shahrah-e-Faisal",
    address:
      "Plot 245/X/2, off Shahrah-e-Faisal, behind Parsa Towers, Block-6 PECHS, Karachi, 75400",
    description:
      "Built for visibility and fast access, this location sits close to Karachi's main corporate corridor with direct reach to major banks, international offices, FTC, Nursery, and Baloch Colony.",
    latitude: 24.8701431,
    longitude: 67.0883381,
    image:
      "https://blog.workhall.co/wp-content/uploads/2025/05/Work-Hall-Shahrah-e-Faisal_-Designed-for-the-modern-workforce-1024x394.jpg",
    gallery: [
      "https://blog.workhall.co/wp-content/uploads/2025/05/Work-Hall-Shahrah-e-Faisal_-Designed-for-the-modern-workforce-1024x394.jpg",
      "https://blog.workhall.co/wp-content/uploads/2025/03/Why-Work-Hall-is-Karachis-leading-coworking-space-1024x394.png",
      "https://blog.workhall.co/wp-content/uploads/2025/07/Work-Hall-%E2%80%93-One-of-the-first-coworking-spaces-in-Karachi-1024x394.png",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Plot+245/X/2+Shahrah-e-Faisal+Karachi",
    bookTourUrl: "https://www.workhall.co/",
    accent: "#5cb6b0",
    highlights: [
      "Direct Shahrah-e-Faisal access",
      "Major banks and FTC nearby",
      "High-visibility corporate address",
    ],
    featuredHighlight: 0,
  },
];
