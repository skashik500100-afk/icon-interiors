-- ============================================================================
-- ICON INTERIORS - INITIAL SEED DATA
-- ============================================================================

-- 1. SEED 11 OFFICIAL CATEGORIES
INSERT INTO categories (name, slug, icon, description, display_order)
VALUES
('Bedroom', 'bedroom', '🛏️', 'Master sanctuaries, guest retreats, and boutique suites with acoustic paneling', 1),
('Living Room', 'living-room', '🛋️', 'Double-height salons, travertine claddings, and Italian lounge layouts', 2),
('Modular Kitchen', 'modular-kitchen', '🍳', 'Precision German joinery, BWP 710 marine ply, and Blum servo drawers', 3),
('Bathroom', 'bathroom', '🛁', 'Spa-inspired wellness suites with fluted travertine and ambient sconces', 4),
('Dining Room', 'dining-room', '🍷', 'Monolithic marble dining islands and backlit onyx feature installations', 5),
('Pooja Room', 'pooja-room', '🪔', 'Sacred architectural mandirs with hand-carved brass and teakwood details', 6),
('Wardrobes', 'wardrobes', '🚪', 'Floor-to-ceiling walk-in dressing salons with bronze tinted glass', 7),
('False Ceiling', 'false-ceiling', '✨', 'Architectural coffered ceilings with concealed DALI magnetic tracks', 8),
('Kids Room', 'kids-room', '🧸', 'Ergonomic study suites with modular lofts and non-toxic finishes', 9),
('Full Home Interiors', 'full-home-interiors', '🏡', 'End-to-end turnkey transformation with guaranteed 45-day move-in', 10),
('Luxury Villas', 'luxury-villas', '🏛️', 'Bespoke multi-level private residences and architectural duplexes', 11)
ON CONFLICT (name) DO NOTHING;

-- 2. SEED AUTHENTIC GUNTUR FLAGSHIP STUDIO
INSERT INTO store_locations (studio_name, is_physical_flagship, address_line, city, state, pincode, phone, whatsapp_number, visiting_hours, google_maps_url)
VALUES
('ICON INTERIORS Flagship Studio', TRUE, 'Syamala Nagar Main Road', 'Guntur', 'Andhra Pradesh', '522006', '+91 98850 01008', '919885001008', '10:00 AM – 8:30 PM (Mon – Sun)', 'https://maps.google.com/?q=Syamala+Nagar+Main+Road+Guntur+522006')
ON CONFLICT DO NOTHING;

-- 3. SEED DEFAULT ADMIN & DEMO CUSTOMER
-- Default BCrypt hash for password 'IconAdmin@2026'
INSERT INTO users (full_name, email, phone, city, password_hash, role)
VALUES
('ICON Principal Architect', 'admin@iconinteriors.com', '+91 98850 01008', 'Guntur, AP', '$2a$10$YvtcU5KF5TlEeagg00rvTuX.VGjDRRh9Ke2bHKtagAd9huLbShLuq', 'ROLE_ADMIN'),
('Dr. Srinivas Rao', 'srinivas.rao@example.com', '+91 98480 12345', 'Guntur, AP', '$2a$10$YvtcU5KF5TlEeagg00rvTuX.VGjDRRh9Ke2bHKtagAd9huLbShLuq', 'ROLE_CUSTOMER')
ON CONFLICT (email) DO NOTHING;

-- 4. SEED SAMPLE DESIGNS WITH NEUTRAL CAD PLACEHOLDERS
INSERT INTO designs (id, title, category_name, style, budget_tier, image_url, lead_description, dimensions, handover_timeline, warranty_terms, materials_json, is_featured)
VALUES
('BED-001', 'Statuario Minimalist Master Suite', 'Bedroom', 'Modern Minimalist', 'Signature', '', 'Bespoke floating platform bed with integrated leatherette headboard wall and concealed reading sconces.', '18 ft x 16 ft (288 sq.ft)', '35 Days', '10-Year Comprehensive Warranty', '["BWP 710 Marine Ply", "Italian Statuario Marble", "Blum Soft-Close Hinges", "High-CRI Warm LED"]', TRUE),
('BED-002', 'Japandi Fluted Oak Master Retreat', 'Bedroom', 'Japandi', 'Couture', '', 'Calming natural wood sanctuary featuring acoustic slatted wall cladding and concealed warm cove uplighting.', '20 ft x 17 ft (340 sq.ft)', '40 Days', '10-Year Comprehensive Warranty', '["Natural White Oak Veneer", "Acoustic Slats", "Limewash Stucco", "DALI Dimming Tracks"]', TRUE),
('LIV-001', 'Double-Height Roman Travertine Salon', 'Living Room', 'Luxury Italian', 'Couture', '', 'Monumental double-height drawing room with bookmatched Roman travertine and recessed brass architectural reveals.', '28 ft x 22 ft (616 sq.ft)', '45 Days', '10-Year Comprehensive Warranty', '["Imported Roman Travertine", "Brushed Champagne Gold Trims", "Custom Bouclé Furniture"]', TRUE),
('KIT-001', 'Handleless German Island Kitchen', 'Modular Kitchen', 'Modern Minimalist', 'Signature', '', 'Parallel layout with anti-fingerprint charcoal acrylic fronts and 40mm Calacatta quartz waterfall breakfast counter.', '16 ft x 14 ft (224 sq.ft)', '25 Days', 'Lifetime Hardware Warranty', '["BWP 710 Calibrated Ply", "Blum Servo-Drive Drawers", "Calacatta Quartz", "Anti-Fingerprint Acrylic"]', TRUE),
('BTH-001', 'Spa Wellness Suite with Fluted Stone', 'Bathroom', 'Contemporary', 'Couture', '', 'Private residential spa with freestanding composite stone tub, heated towel rails, and thermostatic rain shower.', '14 ft x 12 ft (168 sq.ft)', '20 Days', '10-Year Waterproofing Warranty', '["Grohe SmartControl", "Fluted Beige Limestone", "Frameless Fluted Glass", "Anti-Fog LED Mirror"]', FALSE),
('DIN-001', 'Honey Onyx Backlit Dining Suite', 'Dining Room', 'Art Deco', 'Couture', '', 'Architectural 10-seater dining space with bookmatched honey onyx backlit wall and brushed brass chandelier.', '20 ft x 15 ft (300 sq.ft)', '30 Days', '10-Year Comprehensive Warranty', '["Translucent Honey Onyx", "Smoked Walnut Veneer", "Brushed Brass Chandelier"]', TRUE)
ON CONFLICT (id) DO NOTHING;

