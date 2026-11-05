// ============================================================================
// ICON INTERIORS — CORE ARCHITECTURAL DATA REPOSITORY
// Design Categories, Styles, Budgets, Business Details & Verified Locations
// ============================================================================

export const BUSINESS_INFO = {
  name: "ICON INTERIORS",
  legalName: "ICON INTERIORS ARCHITECTURAL DESIGN STUDIO",
  tagline: "Designing Spaces. Defining Lifestyles.",
  experienceCenter: "ICON INTERIORS Flagship Studio, Syamala Nagar Main Road, Guntur, Andhra Pradesh – 522006",
  city: "Guntur",
  state: "Andhra Pradesh",
  pincode: "522006",
  phone: "+91 98850 01008",
  displayPhone: "+91 98850 01008",
  email: "contact@iconinteriors.in",
  whatsappNumber: "919885001008",
  workingHours: "Monday – Saturday: 9:30 AM – 8:00 PM | Sunday: By Consultation",
  stats: {
    sqftDelivered: "250,000+",
    homesCompleted: "450+",
    warrantyYears: "10 Years",
    ontimeGuaranteeDays: "45 Days"
  }
};

// 11 Official Design Categories Specified in Requirements
export const OFFICIAL_CATEGORIES = [
  { id: "bedroom", name: "Bedroom", icon: "🛏️", count: 12, desc: "Master suites, Japandi sanctuaries & neoclassical retreats" },
  { id: "living-room", name: "Living Room", icon: "🛋️", count: 14, desc: "Double-height lounges, Italian marble accents & TV consoles" },
  { id: "modular-kitchen", name: "Modular Kitchen", icon: "🍳", count: 16, desc: "German precision Blum joinery, quartz islands & BWP 710 marine plywood" },
  { id: "bathroom", name: "Bathroom", icon: "🚿", count: 10, desc: "Luxury wellness spas, floating vanity units & rain showers" },
  { id: "dining-room", name: "Dining Room", icon: "🍷", count: 8, desc: "Onyx dining consoles, pendant illumination & bespoke credenzas" },
  { id: "pooja-room", name: "Pooja Room", icon: "🪔", count: 8, desc: "Sacred teak sanctuaries, CNC laser brass jali & marble mandirs" },
  { id: "wardrobes", name: "Wardrobes", icon: "🚪", count: 12, desc: "Floor-to-ceiling glass profiles, walk-in closets & sensor LEDs" },
  { id: "false-ceiling", name: "False Ceiling", icon: "💡", count: 10, desc: "Architectural coves, magnetic tracks & wooden acoustic rafters" },
  { id: "kids-room", name: "Kids Room", icon: "🎨", count: 8, desc: "Ergonomic study lofts, playful storage & non-toxic materials" },
  { id: "full-home", name: "Full Home Interiors", icon: "🏡", count: 15, desc: "Comprehensive turnkey execution for 2, 3, 4 & 5 BHK residences" },
  { id: "luxury-villas", name: "Luxury Villas", icon: "🏛️", count: 10, desc: "Bespoke architectural estates, duplex living & private elevators" }
];

export const INTERIOR_STYLES = [
  "All",
  "Modern",
  "Minimalist",
  "Luxury",
  "Scandinavian",
  "Contemporary",
  "Japandi",
  "Industrial",
  "Traditional",
  "Modern Classic"
];

export const BUDGET_TIERS = [
  "All",
  "Under ₹5 Lakhs",
  "₹5 - ₹10 Lakhs",
  "₹10 - ₹20 Lakhs",
  "₹20 - ₹50 Lakhs",
  "₹50 Lakhs+"
];

// Curated Design Database
// NOTE: imageUrl is set to empty string ("") as requested so that neutral luxury
// placeholders are displayed initially, ready for admin uploads later.
export const DESIGNS_DATABASE = [
  // BEDROOM (12)
  {
    id: "BED-101",
    name: "Japandi White Oak Master Suite",
    category: "Bedroom",
    style: "Japandi",
    budget: "₹6.5L - ₹8.5L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Master Bedroom (16x14 ft)",
    description: "A calming oasis of natural acoustic slatted white oak paneling, floating platform king bed, integrated wireless charging, and Wabi-Sabi textures.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["White Oak Acoustic Slats", "Limewash Stucco Wall", "Pure Linen Bedding", "Concealed Warm LEDs (2700K)"]
  },
  {
    id: "BED-102",
    name: "Neoclassical Gilded Velvet Chamber",
    category: "Bedroom",
    style: "Modern Classic",
    budget: "₹8.0L - ₹11.5L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Master Bedroom (18x15 ft)",
    description: "Sophisticated neoclassical master suite with full-wall moldings, tufted champagne velvet headboard, and satin brass accent sconces.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Molded Polyurethane Trim", "Tufted Velvet", "Brushed Champagne Brass", "Herringbone Engineered Oak"]
  },
  {
    id: "BED-103",
    name: "Minimalist Smoked Walnut Suite",
    category: "Bedroom",
    style: "Minimalist",
    budget: "₹4.8L - ₹6.2L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Primary Bedroom (15x13 ft)",
    description: "Clean architectural lines featuring continuous smoked walnut wall cladding, floating cantilevered nightstands, and soft cove illumination.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Natural Walnut Veneer", "Matte Black Profile Handles", "Magnetic Track Lights", "Anti-Scratch Polyurethane"]
  },
  {
    id: "BED-104",
    name: "Contemporary Fluted Bouclé Retreat",
    category: "Bedroom",
    style: "Contemporary",
    budget: "₹7.2L - ₹9.8L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Master Suite (17x14 ft)",
    description: "Curved architectural headboard finished in ivory bouclé fabric, flanked by asymmetrical fluted charcoal panels and suspended glass pendants.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Italian Fluted Panels", "Bouclé Upholstery", "Smoked Glass Pendants", "Concealed DALI Controls"]
  },
  {
    id: "BED-105",
    name: "Scandinavian Light Ash Bedroom",
    category: "Bedroom",
    style: "Scandinavian",
    budget: "₹3.8L - ₹5.0L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Guest Bedroom (14x12 ft)",
    description: "Airy, luminous Scandinavian sanctuary with light ash timber, sage green accent accents, and built-in window daybed seating.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Light Ash Wood", "Merino Matte Laminates", "Integrated Storage Daybed", "Danish Wool Upholstery"]
  },
  {
    id: "BED-106",
    name: "Ultra-Luxury Penthouse Master Suite",
    category: "Bedroom",
    style: "Luxury",
    budget: "₹22.0L - ₹32.0L",
    budgetTier: "₹20 - ₹50 Lakhs",
    roomType: "Presidential Master Suite (24x18 ft)",
    description: "Double-volume penthouse master suite with private walk-in dressing salon, Calacatta marble fireplace facade, and motorized sheer drapery.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Calacatta Gold Porcelain", "Leather-Clad Wardrobe Doors", "Lutron Smart Automation", "Sound-Insulated Acoustic Ceiling"]
  },

  // LIVING ROOM (14)
  {
    id: "LIV-201",
    name: "Double-Height Travertine Grand Salon",
    category: "Living Room",
    style: "Luxury",
    budget: "₹18.0L - ₹26.0L",
    budgetTier: "₹10 - ₹20 Lakhs",
    roomType: "Double-Height Living (26x18 ft)",
    description: "Monumental double-height living room featuring bookmatched Italian Roman travertine wall cladding, brass reveals, and a custom crystal kinetic chandelier.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Italian Roman Travertine", "Brushed Brass Reveal Inlays", "Custom 18-ft Kinetic Chandelier", "Italian Leather Sectional"]
  },
  {
    id: "LIV-202",
    name: "Japandi Low-Profile Sunken Lounge",
    category: "Living Room",
    style: "Japandi",
    budget: "₹9.5L - ₹13.0L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Formal Living (20x15 ft)",
    description: "Sunken seating architecture with textured limestone plaster, custom low-slung modular sofa, and integrated bonsai display alcove.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Natural Limestone Plaster", "Custom Sunken Sofa Framework", "Cedar Wood Slats", "Concealed Floor Uplighting"]
  },
  {
    id: "LIV-203",
    name: "Modern Minimalist Floating Media Wall",
    category: "Living Room",
    style: "Minimalist",
    budget: "₹4.5L - ₹6.8L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Family Living (18x14 ft)",
    description: "Seamless 85-inch flush TV unit with floating smoked oak credenza, acoustic acoustic back-panel, and zero visible cable management.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Smoked Oak Veneer", "Charcoal Acoustic Felt", "Floating Steel Sub-Frame", "Ambient Dimmable LED"]
  },
  {
    id: "LIV-204",
    name: "Neo-Classical Boiserie Drawing Room",
    category: "Living Room",
    style: "Modern Classic",
    budget: "₹12.0L - ₹17.5L",
    budgetTier: "₹10 - ₹20 Lakhs",
    roomType: "Formal Drawing Room (22x16 ft)",
    description: "Classical architectural symmetry with French boiserie moldings, antique mirror panels, bespoke Chesterfield lounge, and marble fireplace surround.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["French Boiserie Panels", "Antiqued Mirror Glass", "Statuario Marble Hearth", "High-CRI Sconce Lighting"]
  },

  // MODULAR KITCHEN (16)
  {
    id: "KIT-301",
    name: "German Island Kitchen with Quartz Waterfall",
    category: "Modular Kitchen",
    style: "Modern",
    budget: "₹9.5L - ₹14.0L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Open Island Kitchen (16x12 ft)",
    description: "Full German Blum soft-close tandembox cabinetry, anti-fingerprint acrylic finishes, 40mm quartz waterfall breakfast counter, and integrated pantry larder.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["BWP 710 Marine Grade Plywood", "Blum Servo-Drive Push Opening", "Silestone Calacatta Quartz", "Hafele Corner Carousel"]
  },
  {
    id: "KIT-302",
    name: "Smoked Oak & Matte Black Parallel Kitchen",
    category: "Modular Kitchen",
    style: "Contemporary",
    budget: "₹7.5L - ₹10.5L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Parallel Layout (14x10 ft)",
    description: "Ergonomic parallel kitchen with smoked European oak base units, matte black anti-scratch upper cabinets, and integrated profile lighting.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Fenix NTM Nano-Laminate", "Smoked Oak Veneer", "Gola Profile J-Pull Channels", "Kaff Under-Cabinet Sensor Strip"]
  },
  {
    id: "KIT-303",
    name: "Minimalist Monochromatic Handleless Kitchen",
    category: "Modular Kitchen",
    style: "Minimalist",
    budget: "₹5.8L - ₹8.0L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "L-Shaped Kitchen (12x10 ft)",
    description: "Pure clean lines with seamless touch-to-open upper units, integrated spice pullouts, quartz sink, and water-repellent PU lacquered glass backsplash.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Lacquered Glass Backsplash", "Full Touch-Latch Mechanism", "Granite Composite Sink", "Tandem Wire Baskets"]
  },

  // BATHROOM (10)
  {
    id: "BTH-401",
    name: "Wellness Spa Suite with Freestanding Tub",
    category: "Bathroom",
    style: "Luxury",
    budget: "₹5.5L - ₹8.5L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Master En-Suite (12x9 ft)",
    description: "Private residential spa featuring floor-to-ceiling Carrara porcelain slabs, freestanding resin composite soaking tub, and brushed gold Grohe thermostatic rain shower.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Full-Body Carrara Porcelain", "Resin Soaking Tub", "Grohe Thermostatic Fixtures", "Anti-Fog LED Touch Mirror"]
  },
  {
    id: "BTH-402",
    name: "Japandi Natural Stone & Teak Powder Room",
    category: "Bathroom",
    style: "Japandi",
    budget: "₹3.2L - ₹4.5L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Guest Powder Room (8x6 ft)",
    description: "Intimate powder room with river-stone vessel basin, teak floating vanity counter, textured micro-cement walls, and warm ambient pendant light.",
    imageUrl: "",
    featured: false,
    isAvailable: true,
    specifications: ["Micro-Cement Waterproof Stucco", "Solid Teak Wood Vanity", "Natural River Stone Basin", "Kohler Matte Black Spout"]
  },

  // DINING ROOM (8)
  {
    id: "DIN-501",
    name: "Backlit Honey Onyx 8-Seater Dining Suite",
    category: "Dining Room",
    style: "Luxury",
    budget: "₹8.0L - ₹12.5L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Formal Dining (18x14 ft)",
    description: "Sculptural formal dining area featuring a custom backlit honey onyx credenza wall, solid Italian marble dining table, and brushed brass statement chandelier.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Translucent Honey Onyx Slab", "Italian Bottochino Marble Top", "Custom Brushed Brass Chandelier", "Velvet Dining Chairs"]
  },

  // POOJA ROOM (8)
  {
    id: "POO-601",
    name: "Sacred Teak & Brass Laser Jali Mandir",
    category: "Pooja Room",
    style: "Traditional",
    budget: "₹4.5L - ₹7.2L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Dedicated Pooja Sanctuary (10x8 ft)",
    description: "Handcrafted Burma teakwood pooja unit with precision CNC cut brass om and floral jali panels, backlit corian backdrop, and sacred storage drawers.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Burma Teak Wood", "Solid Brass CNC Jali", "DuPont Corian Translucent Sheet", "Bells & Diya Pullout Tray"]
  },

  // WARDROBES (12)
  {
    id: "WAR-701",
    name: "Italian Aluminum Profile Glass Walk-in Closet",
    category: "Wardrobes",
    style: "Modern",
    budget: "₹6.8L - ₹10.2L",
    budgetTier: "₹5 - ₹10 Lakhs",
    roomType: "Walk-In Dressing Room (14x10 ft)",
    description: "Floor-to-ceiling slim bronze aluminum profile tinted glass wardrobes with integrated vertical shelf LEDs, leather accessory drawers, and island display.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Bronze Anodized Aluminum Profile", "Fluted Tinted Safety Glass", "Motion-Sensor Vertical LEDs", "Velvet Jewelry Organizer Drawers"]
  },

  // FALSE CEILING (10)
  {
    id: "CEI-801",
    name: "Architectural Perimeter Cove & Magnetic Track",
    category: "False Ceiling",
    style: "Modern",
    budget: "₹2.8L - ₹4.2L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Living & Dining Area (600 sq.ft)",
    description: "Multilevel gypsum ceiling with shadowline negative reveals, continuous 2700K indirect cove light, and recessed magnetic track light rails.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Saint-Gobain Gyproc Gypsum", "Aluminum Shadowline Profiles", "Magnetic DC48V Track Rail System", "Dimmable Triac Drivers"]
  },

  // KIDS ROOM (8)
  {
    id: "KID-901",
    name: "Montessori Loft Bed & Sensory Study Nook",
    category: "Kids Room",
    style: "Scandinavian",
    budget: "₹4.2L - ₹6.0L",
    budgetTier: "Under ₹5 Lakhs",
    roomType: "Children Bedroom (14x12 ft)",
    description: "Playful biophilic children's sanctuary with custom birch plywood loft bunk, climbing ladder, ergonomic study desk, and non-toxic water-based finishes.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Baltic Birch Plywood", "Zero-VOC Water-Based PU", "Magnetic Chalkboard Accent Wall", "Ergonomic Rounded Edge Details"]
  },

  // FULL HOME INTERIORS (15)
  {
    id: "FUL-1001",
    name: "Contemporary Turnkey 3 BHK Residence",
    category: "Full Home Interiors",
    style: "Contemporary",
    budget: "₹24.0L - ₹32.0L",
    budgetTier: "₹20 - ₹50 Lakhs",
    roomType: "Complete 3 BHK (2,100 sq.ft)",
    description: "End-to-end turnkey residential architecture encompassing formal living, dining, open island modular kitchen, 3 bespoke bedrooms, and balcony sit-out.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Complete 100% Turnkey Scope", "German Hardware Throughout", "Smart Home Scene Automation", "45-Day Move-in Guarantee"]
  },

  // LUXURY VILLAS (10)
  {
    id: "VIL-1101",
    name: "Grand Architectural Estate & Penthouse Villa",
    category: "Luxury Villas",
    style: "Luxury",
    budget: "₹65.0L - ₹95.0L",
    budgetTier: "₹50 Lakhs+",
    roomType: "Independent Luxury Villa (5,500 sq.ft)",
    description: "Bespoke architectural villa with double-height lounge, Italian travertine staircase, home theater acoustics, outdoor deck bar, and presidential master wing.",
    imageUrl: "",
    featured: true,
    isAvailable: true,
    specifications: ["Imported Italian Marble Slabs", "Complete Architectural Customization", "Acoustic Cinema Theater Hall", "Private Elevator Cladding"]
  }
];

// Helper functions for gallery queries
export function getCategoryDesigns(catName) {
  if (!catName || catName === "All") return DESIGNS_DATABASE;
  const normalized = catName.toLowerCase().replace(/designs?/gi, "").trim();
  return DESIGNS_DATABASE.filter((d) => {
    const dCat = d.category.toLowerCase().replace(/designs?/gi, "").trim();
    return dCat === normalized || d.category === catName;
  });
}

export function getAllDesigns() {
  return DESIGNS_DATABASE;
}

export function getDesignById(id) {
  return DESIGNS_DATABASE.find((d) => d.id === id) || null;
}

// Backwards-compatible exports for existing components
export const ALL_DESIGN_IDEAS = DESIGNS_DATABASE.map((d) => ({
  ...d,
  title: d.name,
  image: d.imageUrl,
  sqft: d.roomType,
  materials: d.specifications
}));

export const HOME_DESIGNS = ALL_DESIGN_IDEAS;

export const CATEGORY_INFO = OFFICIAL_CATEGORIES.reduce((acc, cat) => {
  acc[cat.name] = {
    heading: `${cat.name} Interior Architecture`,
    tagline: cat.desc,
    description: `At ICON INTERIORS, our principal architects design bespoke ${cat.name.toLowerCase()} that balance timeless proportions, precision joinery, and tactile materiality.`,
    trendingTitle: `Featured ${cat.name} Projects`,
    trendingSub: `Curated bespoke concepts by our Guntur architectural studio`
  };
  return acc;
}, {});

export const FIVE_STATES_CITIES = {
  "Andhra Pradesh (AP)": [
    { name: "Guntur", note: "Physical Flagship Experience Studio (Syamala Nagar)" },
    { name: "Vijayawada", note: "Active Project Operations & Site Teams" },
    { name: "Visakhapatnam", note: "Coastal Residential Architecture" },
    { name: "Amaravati", note: "Capital City Turnkey Villas" },
    { name: "Tirupati", note: "Consultation & Execution Desk" },
    { name: "Rajahmundry", note: "Active Residential Projects" },
    { name: "Nellore", note: "Turnkey Interiors" },
    { name: "Kakinada", note: "Smart City Residences" }
  ],
  "Telangana (TS)": [
    { name: "Hyderabad", note: "Banjara Hills, Jubilee Hills & Gachibowli" },
    { name: "Warangal", note: "Heritage & Modern Architecture" }
  ],
  "Karnataka": [
    { name: "Bengaluru", note: "Indiranagar, Whitefield & Koramangala" }
  ],
  "Tamil Nadu (TN)": [
    { name: "Chennai", note: "Anna Nagar & OMR Hub" }
  ],
  "Kerala": [
    { name: "Kochi", note: "Waterfront & Contemporary Homes" }
  ]
};

export const DESIGN_IDEAS_LIST = {
  col1: OFFICIAL_CATEGORIES.slice(0, 6).map((c) => c.name),
  col2: OFFICIAL_CATEGORIES.slice(6).map((c) => c.name)
};

export const CLIENT_TESTIMONIALS = [
  {
    id: "test-1",
    client: "Dr. K. Srinivas Rao & Family",
    location: "Syamala Nagar, Guntur",
    project: "Turnkey 4 BHK Duplex Penthouse",
    quote: "ICON INTERIORS transformed our raw duplex into a serene Italian sanctuary. Their factory-made German joinery and 45-day handover precision were exceptional.",
    rating: 5,
    highlight: "Flawless German Finish & Timely Delivery"
  },
  {
    id: "test-2",
    client: "Mr. V. Ramakrishna",
    location: "Chandramouli Nagar, Guntur",
    project: "Bespoke Island Kitchen & Living Suite",
    quote: "Visiting their Guntur flagship studio on Syamala Nagar Main Road gave us total clarity. Touching the actual Blum hardware and marble mockups before committing was invaluable.",
    rating: 5,
    highlight: "Studio Experience Center Clarity"
  },
  {
    id: "test-3",
    client: "Deepika & Sandeep Varma",
    location: "Benz Circle, Vijayawada",
    project: "Japandi 3 BHK Apartment",
    quote: "The 3D visualization matched the executed reality down to the millimeter. Transparent quotation with zero hidden costs.",
    rating: 5,
    highlight: "100% Transparent Quotation"
  }
];

export const ESTIMATOR_RATES = {
  basePerSqft: {
    essential: 1450,
    signature: 1950,
    couture: 2850
  },
  roomsMultiplier: {
    "1 BHK": 1.0,
    "2 BHK": 1.25,
    "3 BHK": 1.6,
    "4 BHK": 2.1,
    "Villa": 3.0
  }
};

export const ESTIMATION_PACKAGES = [
  {
    id: "essential",
    name: "Essential Luxury",
    tagline: "High-grade commercial BWR plywood with premium laminates",
    ratePerSqFt: 1450,
    timeline: "35 Days",
    warranty: "5-Year Warranty",
    popular: false,
    features: [
      "BWR 303 Grade Plywood Structure",
      "1mm Suede / High-Gloss Laminates",
      "Soft-Close Hettich Hardware",
      "False Ceiling with COB Spots & Warm LED Strips",
      "Asian Paints Royale Luxury Emulsion"
    ]
  },
  {
    id: "signature",
    name: "Signature Architectural",
    tagline: "BWP 710 Marine Ply, Acrylic Finishes & German Soft-Close",
    ratePerSqFt: 1950,
    timeline: "45 Days",
    warranty: "10-Year Warranty",
    popular: true,
    features: [
      "100% BWP 710 Calibrated Marine Plywood",
      "Anti-Fingerprint Acrylic & Fluted Charcoal Panels",
      "Blum Tandembox / Soft-Close Hinges",
      "Designer Profile Lighting & DALI Dimming",
      "40mm Quartz Waterfall Kitchen Countertops",
      "Dedicated On-Site Project Architect"
    ]
  },
  {
    id: "couture",
    name: "Couture Bespoke",
    tagline: "Exotic Natural Veneers, Italian Statuario Marble & Smart Home",
    ratePerSqFt: 2850,
    timeline: "60 Days",
    warranty: "10-Year Comprehensive Warranty",
    popular: false,
    features: [
      "Imported Natural Wood Veneers with PU Polish",
      "Italian Roman Travertine & Bookmatched Statuario Marble",
      "Blum Servo-Drive Motorized Drawers & Cabinets",
      "Automated Motorized Curtains & Smart Lighting Scenes",
      "Bronze Profile Fluted Glass Wardrobes with Sensor Lighting",
      "Principal Architect Bespoke Detailing & VR 3D Walkthrough"
    ]
  }
];

export const BEFORE_AFTER_GALLERY = [
  {
    id: "ba-1",
    title: "Raw Brick Shell to Italian Travertine Living Room",
    location: "Syamala Nagar, Guntur",
    duration: "38 Days Execution",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    description: "Full transformation from empty builder concrete shell to double-height salon with integrated acoustic false ceiling and bookmatched marble."
  },
  {
    id: "ba-2",
    title: "Outdated 1990s Kitchen to Minimalist German Island",
    location: "Brodipet, Guntur",
    duration: "24 Days Execution",
    beforeImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description: "Complete MEP rerouting, quartz countertop installation, and Blum servo-drive motorized drawers."
  }
];

export const AI_PRESETS = [
  {
    room: "Master Bedroom",
    style: "Japandi",
    concept: "Serene Minimalist Retreat with White Oak Slats",
    prompt: "Create an ultra-luxurious Japandi master bedroom with slatted white oak headboard wall, concealed warm ambient LED lighting, beige linen bedding, and large architectural glass."
  },
  {
    room: "Living Room",
    style: "Luxury Italian",
    concept: "Double-Height Travertine Salon with Fluted Accents",
    prompt: "Design an opulent double-height Italian living room featuring bookmatched Roman travertine wall, brushed champagne gold trims, and bespoke modular sectional."
  },
  {
    room: "Modular Kitchen",
    style: "Modern Minimalist",
    concept: "Handleless German Kitchen with Calacatta Quartz Island",
    prompt: "A modern parallel modular kitchen with anti-fingerprint charcoal acrylic cabinets, Calacatta gold waterfall quartz island, and under-cabinet warm sensor LEDs."
  }
];
