-- ============================================================================
-- ICON INTERIORS - POSTGRESQL 18 PRODUCTION DATABASE SCHEMA
-- ============================================================================

-- 1. USERS & AUTHENTICATION TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    phone VARCHAR(25),
    city VARCHAR(100) DEFAULT 'Guntur, AP',
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'ROLE_CUSTOMER', -- 'ROLE_CUSTOMER', 'ROLE_ADMIN'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. CATEGORIES TABLE (The 11 Official Categories)
CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    slug VARCHAR(80) UNIQUE NOT NULL,
    icon VARCHAR(20),
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. DESIGNS TABLE (Design Ideas Gallery with Admin Upload Support)
CREATE TABLE IF NOT EXISTS designs (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'BED-001', 'LIV-002'
    title VARCHAR(200) NOT NULL,
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    category_name VARCHAR(80) NOT NULL,
    style VARCHAR(80) NOT NULL,
    budget_tier VARCHAR(50) NOT NULL, -- 'Essential', 'Signature', 'Couture', 'Luxury'
    image_url TEXT DEFAULT '',
    lead_description TEXT,
    dimensions VARCHAR(100),
    handover_timeline VARCHAR(100),
    warranty_terms VARCHAR(100),
    materials_json TEXT, -- JSON array of strings
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_designs_category ON designs(category_name);
CREATE INDEX IF NOT EXISTS idx_designs_style ON designs(style);
CREATE INDEX IF NOT EXISTS idx_designs_budget ON designs(budget_tier);

-- 4. ENQUIRIES TABLE (Consultations & WhatsApp Lead Pipeline)
CREATE TABLE IF NOT EXISTS enquiries (
    id BIGSERIAL PRIMARY KEY,
    enquiry_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'ENQ-2026-1042'
    customer_name VARCHAR(120) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(180),
    city VARCHAR(100) DEFAULT 'Guntur, AP',
    room_type VARCHAR(100),
    budget_range VARCHAR(80),
    notes TEXT,
    source VARCHAR(50) DEFAULT 'WEBSITE_CONSULTATION', -- 'WEBSITE_CONSULTATION', 'WHATSAPP', 'DESIGN_MODAL', 'AI_MAKEOVER'
    design_id VARCHAR(50),
    status VARCHAR(50) DEFAULT 'NEW', -- 'NEW', 'IN_REVIEW', 'IN_PROGRESS', 'COMPLETED'
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- 5. QUOTATIONS TABLE (Instant Cost Estimator Projections)
CREATE TABLE IF NOT EXISTS quotations (
    id BIGSERIAL PRIMARY KEY,
    quote_ref VARCHAR(60) UNIQUE NOT NULL, -- e.g. 'QUO-3BHK-8921'
    customer_name VARCHAR(120),
    phone VARCHAR(25),
    email VARCHAR(180),
    bhk_type VARCHAR(50) NOT NULL,
    builtup_sqft INT NOT NULL,
    package_grade VARCHAR(80) NOT NULL,
    rate_per_sqft INT NOT NULL,
    selected_rooms_json TEXT,
    estimated_low_inr NUMERIC(14, 2),
    estimated_high_inr NUMERIC(14, 2),
    handover_days INT DEFAULT 45,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. STORE LOCATIONS TABLE (Authentic Physical Studio Preservation)
CREATE TABLE IF NOT EXISTS store_locations (
    id BIGSERIAL PRIMARY KEY,
    studio_name VARCHAR(150) NOT NULL,
    is_physical_flagship BOOLEAN DEFAULT FALSE,
    address_line TEXT NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    visiting_hours VARCHAR(120),
    google_maps_url TEXT
);

