// Curated High-Definition Interior Designs across all home categories
export const ROOM_TYPES = [
  "All Spaces",
  "Living Room",
  "Modular Kitchen",
  "Master Bedroom",
  "Luxury Bath",
  "Dining & Bar",
  "Home Office",
  "Balcony & Deck",
  "Walk-in Closet",
  "Pooja Room"
];

export const DESIGN_STYLES = [
  "All Styles",
  "Modern Luxury",
  "Japandi",
  "Minimalist",
  "Neo-Classical",
  "Industrial Chic",
  "Bohemian",
  "Warm Organic"
];

export const HOME_DESIGNS = [
  {
    id: "des-1",
    title: "The Grand Travertine Living Lounge",
    roomType: "Living Room",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    sqft: "580 sq.ft",
    budget: "₹6.5L - ₹9L",
    duration: "25 Days",
    location: "Syamala Nagar, Guntur",
    featured: true,
    description: "Expansive double-height living pavilion featuring book-matched Italian travertine walls, recessed architectural cove lighting, and bespoke Italian linen low-profile sectional seating.",
    materials: ["Italian Travertine", "Brushed Brass", "Warm Walnut", "Belgian Linen"],
    palette: ["#E6DEC9", "#BFA779", "#2A2520", "#5C5346", "#F3EEE3"]
  },
  {
    id: "des-2",
    title: "Minimalist Calacatta Island Kitchen",
    roomType: "Modular Kitchen",
    style: "Minimalist",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    sqft: "240 sq.ft",
    budget: "₹5.5L - ₹8.5L",
    duration: "20 Days",
    location: "Koretipadu, Guntur",
    featured: true,
    description: "Seamless handleless acrylic cabinetry with waterfall Calacatta gold quartz island, integrated high-efficiency Bosch appliances, and concealed anti-glare profile lighting.",
    materials: ["Calacatta Quartz", "Anti-Fingerprint Acrylic", "Hafele Hardware", "Smoked Glass"],
    palette: ["#FFFFFF", "#D3C29E", "#1E1E1E", "#9A9386", "#F2EFEB"]
  },
  {
    id: "des-3",
    title: "Japandi Slatted Wood Master Suite",
    roomType: "Master Bedroom",
    style: "Japandi",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    sqft: "340 sq.ft",
    budget: "₹4.8L - ₹7.2L",
    duration: "18 Days",
    location: "Lakshmipuram, Guntur",
    featured: true,
    description: "A calming oasis of natural acoustic slatted white oak paneling, floating platform king bed, integrated bedside wireless charging, and textured Wabi-Sabi lime-wash accents.",
    materials: ["Natural White Oak", "Limewash Plaster", "Organic Cotton", "Ceramic Sconces"],
    palette: ["#D8CEBE", "#8F7E6B", "#3D352B", "#ECE6DC", "#594B3C"]
  },
  {
    id: "des-4",
    title: "Carrara Marble Freestanding Wellness Spa",
    roomType: "Luxury Bath",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=85",
    sqft: "160 sq.ft",
    budget: "₹3.8L - ₹5.5L",
    duration: "15 Days",
    location: "Vidya Nagar, Guntur",
    featured: true,
    description: "Spa-grade sanctuary featuring a freestanding resin stone bathtub, floor-to-ceiling bookmatched Carrara porcelain, thermo-controlled Grohe rain showers, and anti-fog LED smart vanity mirrors.",
    materials: ["Carrara Porcelain", "Champagne Gold Fixtures", "Fluted Glass", "Waterproof Teak"],
    palette: ["#F6F6F6", "#C7BA9C", "#242424", "#7F7B75", "#DDD7CD"]
  },
  {
    id: "des-5",
    title: "Royal Velvet & Molded Classical Suite",
    roomType: "Master Bedroom",
    style: "Neo-Classical",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    sqft: "380 sq.ft",
    budget: "₹6.0L - ₹9.5L",
    duration: "24 Days",
    location: "Amaravati Road, Guntur",
    featured: false,
    description: "Opulent neo-classical styling incorporating intricate Parisian wall moldings, a floor-to-ceiling emerald velvet tufted headboard, crystal bedside pendants, and hand-scraped chevron hardwood.",
    materials: ["Chevron Hardwood", "Jewel Velvet", "Gilded Brass", "Plaster Cornices"],
    palette: ["#1B382B", "#CBB279", "#EFE9DF", "#2A231C", "#605646"]
  },
  {
    id: "des-6",
    title: "Smoked Oak Executive Study & Library",
    roomType: "Home Office",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    sqft: "220 sq.ft",
    budget: "₹3.5L - ₹5.2L",
    duration: "14 Days",
    location: "Brodipet, Guntur",
    featured: false,
    description: "Purpose-built executive workspace with bespoke floor-to-ceiling library shelving, warm LED shelving profiles, leather-inlaid walnut desk, and acoustic felt baffles for soundproof meetings.",
    materials: ["Dark Smoked Oak", "Italian Leather", "Acoustic Felt", "Blackened Steel"],
    palette: ["#231F1C", "#8B7355", "#C2B299", "#3F372F", "#DCD5C9"]
  },
  {
    id: "des-7",
    title: "Backlit Onyx Grand Dining Pavilion",
    roomType: "Dining & Bar",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
    sqft: "320 sq.ft",
    budget: "₹5.8L - ₹8.0L",
    duration: "20 Days",
    location: "Pattabhipuram, Guntur",
    featured: true,
    description: "Custom 8-seater Sahara Noir marble dining table complemented by a show-stopping backlit amber onyx accent wall, architectural branching brass chandelier, and integrated wine display.",
    materials: ["Sahara Noir Marble", "Backlit Amber Onyx", "Champagne Velvet", "Cast Brass"],
    palette: ["#DCA34D", "#1C1814", "#7B5B2E", "#EFE2CE", "#3D3428"]
  },
  {
    id: "des-8",
    title: "Skyline Pergola & Teak Deck Oasis",
    roomType: "Balcony & Deck",
    style: "Warm Organic",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    sqft: "280 sq.ft",
    budget: "₹2.8L - ₹4.5L",
    duration: "12 Days",
    location: "Autonagar, Vijayawada",
    featured: false,
    description: "Outdoor living terrace with weather-treated composite teak decking, motorized louvred pergola, built-in vertical herb wall with drip irrigation, and weatherproof outdoor daybed.",
    materials: ["Composite Teak", "Powder-coated Aluminum", "Sunbrella Fabrics", "Natural Travertine"],
    palette: ["#7B8B6F", "#B4834A", "#E4DACB", "#372B20", "#54644B"]
  },
  {
    id: "des-9",
    title: "Boutique Tinted Glass Walk-in Wardrobe",
    roomType: "Walk-in Closet",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=85",
    sqft: "190 sq.ft",
    budget: "₹4.5L - ₹7.0L",
    duration: "16 Days",
    location: "Benz Circle, Vijayawada",
    featured: true,
    description: "Boutique fashion wardrobe with bronze tinted glass doors, aluminum slim frames, interior sensor illumination, suede-lined accessory drawers, and central quartz jewelry island.",
    materials: ["Bronze Fluted Glass", "Slim Aluminum Profiles", "Velvet & Suede", "LED Profiles"],
    palette: ["#3A3026", "#C4A265", "#EDE1CE", "#191613", "#74624D"]
  },
  {
    id: "des-10",
    title: "Modern Heritage Brass Jali Pooja Mandir",
    roomType: "Pooja Room",
    style: "Neo-Classical",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    sqft: "120 sq.ft",
    budget: "₹3.0L - ₹5.0L",
    duration: "15 Days",
    location: "Nallapadu, Guntur",
    featured: false,
    description: "Sanctified space with hand-carved solid teak doorway, CNC precision waterjet cut brass jali panels, backlit Thassos white marble backdrop, and concealed brass bell accents.",
    materials: ["Burma Teak Wood", "Solid Brass Jali", "Thassos Marble", "Warm Cove Lighting"],
    palette: ["#DAA520", "#FFFFFF", "#4A2E12", "#E8D8B8", "#784B1A"]
  },
  {
    id: "des-11",
    title: "Nordic Industrial Open-Plan Loft",
    roomType: "Living Room",
    style: "Industrial Chic",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    sqft: "650 sq.ft",
    budget: "₹6.0L - ₹8.8L",
    duration: "26 Days",
    location: "Kanuru, Vijayawada",
    featured: false,
    description: "Exposed micro-cement ceilings paired with matte black steel room dividers, cognac Italian leather sofa, reclaimed timber coffee table, and oversized gallery wall.",
    materials: ["Micro-cement", "Matte Black Steel", "Cognac Leather", "Reclaimed Timber"],
    palette: ["#96582A", "#33312E", "#8A8884", "#DCD8D0", "#1C1B19"]
  },
  {
    id: "des-12",
    title: "Warm Organic Terracotta Bistro Kitchen",
    roomType: "Modular Kitchen",
    style: "Warm Organic",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85",
    sqft: "210 sq.ft",
    budget: "₹4.6L - ₹6.8L",
    duration: "18 Days",
    location: "Ring Road, Guntur",
    featured: false,
    description: "Artisanal hand-glazed zellige backsplash tiles, terracotta floor accents, soft clay fluted cabinets, and brushed unlacquered brass bridge faucets.",
    materials: ["Handmade Zellige Tiles", "Clay Cabinetry", "Brushed Raw Brass", "Butcher Block"],
    palette: ["#B8694F", "#D7B594", "#F4EDE2", "#473C35", "#89503A"]
  },
  {
    id: "des-13",
    title: "Boho Sun-Drenched Master Sanctuary",
    roomType: "Master Bedroom",
    style: "Bohemian",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85",
    sqft: "310 sq.ft",
    budget: "₹3.8L - ₹5.6L",
    duration: "16 Days",
    location: "Mangalagiri, AP",
    featured: false,
    description: "Airy, natural master retreat featuring handwoven cane bedframe, rattan pendant lights, indoor olive tree in terracotta urn, and layering of washed linen and jute rugs.",
    materials: ["Natural Cane & Rattan", "Jute", "Washed Belgian Linen", "Raw Clay"],
    palette: ["#C59B6A", "#7A8267", "#F2EEE8", "#453C35", "#E0D3C1"]
  },
  {
    id: "des-14",
    title: "Double-Height Glass Villa Living",
    roomType: "Living Room",
    style: "Modern Luxury",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    sqft: "750 sq.ft",
    budget: "₹9.5L - ₹14.0L",
    duration: "32 Days",
    location: "Amaravati Capital City",
    featured: true,
    description: "Architectural masterpiece with 22-foot floor-to-ceiling glass curtain walls, motorized acoustic drapery, integrated bio-ethanol fireplace, and sculptural boucle armchairs.",
    materials: ["Architectural Glass", "Bio-Ethanol Marble Hearth", "Boucle Fabric", "Fluted Walnut"],
    palette: ["#1F1E1B", "#CBB281", "#E6E1D7", "#5E5649", "#918472"]
  },
  {
    id: "des-15",
    title: "Fluted Charcoal & Slate Powder Room",
    roomType: "Luxury Bath",
    style: "Minimalist",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    sqft: "90 sq.ft",
    budget: "₹2.2L - ₹3.4L",
    duration: "10 Days",
    location: "Gujjanagundla, Guntur",
    featured: false,
    description: "Moody dramatic powder room featuring monolith carved black granite pedestal basin, fluted charcoal tile walls, warm backlit mirror halo, and minimalist matte gold wall taps.",
    materials: ["Black Granite Basin", "Fluted Ceramic Tile", "Warm Backlight Halo", "Matte Gold"],
    palette: ["#141312", "#D2B06F", "#4D4841", "#8C8376", "#2B2824"]
  },
  {
    id: "des-16",
    title: "Biophilic Creative Studio & Office",
    roomType: "Home Office",
    style: "Warm Organic",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=85",
    sqft: "180 sq.ft",
    budget: "₹2.9L - ₹4.2L",
    duration: "14 Days",
    location: "Tadepalli, Vijayawada",
    featured: false,
    description: "Inspiring workspace with integrated living plant wall, natural light skylight simulation, dual ergonomic monitor mounting, and solid ash wood sit-stand work table.",
    materials: ["Living Foliage Wall", "Solid Ash Wood", "Linoleum Desk Mat", "Matte White Fixtures"],
    palette: ["#4E634F", "#C4A269", "#EDE6DC", "#283028", "#8B7355"]
  }
];

// Interactive Before / After Renovation Projects
export const BEFORE_AFTER_PROJECTS = [
  {
    id: "ba-1",
    title: "The Amaravati Penthouse Living Transformation",
    category: "Living Room Renovation",
    location: "Amaravati Road, Guntur",
    duration: "28 Days Turnkey Execution",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", // Raw, barren, bare concrete space
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", // Finished warm luxury interior
    beforeLabel: "Before (Raw Shell)",
    afterLabel: "After (Icon Interiors)",
    description: "Transformed an unfinished 600 sq.ft bare concrete shell into an editorial luxury living room with book-matched Italian marble, customized cove ceiling, and tailored acoustic wall paneling."
  },
  {
    id: "ba-2",
    title: "Compact 90s Layout to Sleek Modular Island Kitchen",
    category: "Complete Kitchen Overhaul",
    location: "Lakshmipuram, Guntur",
    duration: "18 Days Turnkey Execution",
    beforeImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80", // Dated, empty unfinished space
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", // Modern luxury modular kitchen
    beforeLabel: "Before (Dated Layout)",
    afterLabel: "After (Modular Italian Design)",
    description: "Demolished restrictive non-loadbearing partitions to install an open-concept acrylic island kitchen with Blum tandem boxes, Hafele pullouts, and Calacatta quartz countertops."
  },
  {
    id: "ba-3",
    title: "Drab Concrete Room to Japandi Master Sanctuary",
    category: "Master Bedroom Suite",
    location: "Brodipet, Guntur",
    duration: "21 Days Turnkey Execution",
    beforeImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80", // Plain empty bedroom
    afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85", // Japandi bedroom
    beforeLabel: "Before (Empty Room)",
    afterLabel: "After (Japandi Master Suite)",
    description: "Added bespoke natural white oak fluted paneling, floating platform bed with indirect nightlights, concealed walk-in wardrobe entryway, and custom Roman blinds."
  }
];

// Cost Estimation Matrix
export const ESTIMATION_PACKAGES = [
  {
    id: "essential",
    name: "Essential Luxury",
    tagline: "Smart Elegance for Everyday Living",
    ratePerSqFt: 1250,
    warranty: "5-Year Structural Warranty",
    timeline: "35 Working Days",
    features: [
      "Commercial grade BWR Marine Plywood (IS 710)",
      "Premium 1mm Anti-fingerprint Matte Laminates",
      "Soft-close Hettich / Ebco German fittings",
      "Standard false ceiling with Philips COB LED warm lighting",
      "Standard Asian Paints Royale luxury emulsion",
      "Modular kitchen with quartz stone countertop"
    ]
  },
  {
    id: "signature",
    name: "Signature Elegance",
    tagline: "Our Most Popular Bespoke Grade",
    ratePerSqFt: 1850,
    popular: true,
    warranty: "10-Year Comprehensive Warranty",
    timeline: "45 Working Days",
    features: [
      "BWP Marine Grade Plywood + HDHMR waterproof boards",
      "High-gloss Acrylic & PU Paint finish cabinetry",
      "Blum / Hafele soft-close tandem drawers & lifts",
      "Architectural magnetic track lighting & cove illumination",
      "Fluted charcoal & wooden louvre wall accents",
      "Italian design modular kitchen with built-in appliance tall units",
      "Bespoke upholstered headboards & vanity dressing zones"
    ]
  },
  {
    id: "ultra",
    name: "Ultra-Luxury Bespoke",
    tagline: "Uncompromising Architectural Grandeur",
    ratePerSqFt: 2750,
    warranty: "15-Year Lifetime Guarantee",
    timeline: "60 Working Days",
    features: [
      "Imported Italian bookmatched marble flooring & wall cladding",
      "Real wood veneer with bespoke Italian polyester PU polish",
      "Smart motorized home automation (lighting, blinds & HVAC)",
      "Fluted tinted glass wardrobes with integrated LED sensors",
      "Monolith quartz island kitchen with hidden breakfast bar",
      "Custom Italian imported leather & bouclé furnishings",
      "Dedicated senior architect supervision & 3D VR walkthrough"
    ]
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Dr. K. Srinivas Rao & Smt. Lakshmi",
    location: "Amaravati Road, Guntur",
    project: "4 BHK Luxury Penthouse (3,400 sq.ft)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote: "ICON INTERIORS transformed our penthouse into something you only see in Architectural Digest. The attention to wood fluting, lighting angles, and on-time 45-day delivery blew us away!"
  },
  {
    id: "t-2",
    name: "Rajesh Varma & Family",
    location: "Benz Circle, Vijayawada",
    project: "Complete Villa Interiors (4,200 sq.ft)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "From 3D renders to exact material matching, the transparency was remarkable. Their modular kitchen and living room backlit onyx wall are the talk of everyone who visits our home."
  },
  {
    id: "t-3",
    name: "Pooja & Ananth Reddy",
    location: "Lakshmipuram, Guntur",
    project: "3 BHK Contemporary Flat (1,850 sq.ft)",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    quote: "Being working professionals, we had zero time for site coordination. ICON INTERIORS handled everything turnkey without a single headache. Truly top tier craftsmanship."
  }
];

// Instant AI Presets for Gemini Demo Mode
export const AI_PRESETS = [
  {
    room: "Living Room",
    style: "Japandi",
    prompt: "Warm Japandi living space with fluted white oak walls, travertine coffee table, and soft diffused cove lighting",
    concept: "Komorebi Serenity Lounge",
    summary: "A harmonious marriage of Japanese minimalism and Scandinavian warmth, prioritizing natural textures, uncluttered lines, and warm 3000K ambient illumination.",
    palette: [
      { name: "Raw Travertine", hex: "#E8E0D2" },
      { name: "Fluted White Oak", hex: "#B89973" },
      { name: "Wabi Charcoal", hex: "#2E2A27" },
      { name: "Oatmeal Linen", hex: "#F3ECE1" },
      { name: "Olive Leaf", hex: "#636856" }
    ],
    materials: [
      "Natural White Oak fluted slats",
      "Hand-applied lime wash plaster",
      "Textured boucle and Belgian linen upholstery",
      "Brushed aged brass accents"
    ],
    lighting: "Concealed 2700K LED ceiling coves, ceramic paper pendants, and low-level floor wash lights.",
    budgetRange: "₹4.5L - ₹6.5L",
    tips: "Keep furniture below eye level to maximize the feeling of vertical space and airy tranquility."
  },
  {
    room: "Modular Kitchen",
    style: "Modern Luxury",
    prompt: "High-end Italian kitchen with Calacatta gold island, matte anthracite cabinets, and smart LED pantry",
    concept: "Milano Culinary Atelier",
    summary: "Sleek architectural kitchen prioritizing hidden functionality, seamless anti-fingerprint surfaces, and an imposing monolithic marble island.",
    palette: [
      { name: "Calacatta Gold", hex: "#F9F6F0" },
      { name: "Anthracite Matte", hex: "#1C1D1E" },
      { name: "Champagne Brass", hex: "#CCA96A" },
      { name: "Smoked Bronze Glass", hex: "#56483B" },
      { name: "Concrete Greige", hex: "#A8A29A" }
    ],
    materials: [
      "Seamless Calacatta Gold sintered stone island",
      "Super-matte FENIX NTM cabinetry",
      "Bronze tinted glass upper cabinets with interior profile LEDs",
      "Built-in induction with downdraft ventilation"
    ],
    lighting: "Magnetic architectural track lights, under-cabinet task illumination (4000K), and island pendant bar.",
    budgetRange: "₹6.0L - ₹9.5L",
    tips: "Plan a dedicated appliance garage with pocket sliding doors to keep counters completely free of small gadgets."
  },
  {
    room: "Master Bedroom",
    style: "Neo-Classical",
    prompt: "Royal master suite with emerald velvet wall padding, brass moldings, and champagne lighting",
    concept: "Palais Royal Sanctuary",
    summary: "Timeless Parisian-inspired suite bringing symmetrical wall moldings, opulent jewel velvet textures, and bespoke warm crystal illumination.",
    palette: [
      { name: "Imperial Emerald", hex: "#19352A" },
      { name: "Burnished Gold", hex: "#CEAB61" },
      { name: "Warm Alabaster", hex: "#F5EFE6" },
      { name: "Smoked Walnut", hex: "#3B2F25" },
      { name: "Champagne Sheen", hex: "#DFD2BE" }
    ],
    materials: [
      "Floor-to-ceiling emerald velvet acoustic headboard paneling",
      "Polyurethane classical wall trim and moldings",
      "Chevron smoked oak engineered wood floor",
      "Brushed brass hardware and crystal pendants"
    ],
    lighting: "Dual-circuit chandelier, dimmable bedside drop pendants, and indirect baseboard lighting.",
    budgetRange: "₹5.5L - ₹8.0L",
    tips: "Use blackout layered velvet drapes combined with sheer organza curtains to evoke high-end 5-star hotel luxury."
  }
];
