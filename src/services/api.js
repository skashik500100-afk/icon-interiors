/**
 * ICON INTERIORS - FULL-STACK API SERVICE LAYER
 * Connects frontend to Spring Boot 3 + PostgreSQL 18 backend at http://localhost:8080/api/v1
 * Features automatic JWT Authorization header and graceful offline/fallback mode.
 */

import { DESIGNS_DATABASE, BUSINESS_INFO } from "../data/designsData";

export function isAdmin(user) {
  if (!user) return false;
  const role = String(user.role || "").toUpperCase();
  return role === "ADMIN" || role === "ROLE_ADMIN" || role.includes("ADMIN");
}

export function normalizeDesign(d) {
  if (!d) return d;
  const id = d.id || "";
  const name = d.name || d.title || "Architectural Design";
  const title = d.title || d.name || name;
  const category = d.category || d.categoryName || "Living Room";
  const categoryName = d.categoryName || d.category || category;
  const description = d.description || d.leadDescription || "";
  const leadDescription = d.leadDescription || d.description || description;
  const style = d.style || "Modern";
  const budgetTier = d.budgetTier || "Signature";
  const budget = d.budget || (budgetTier === "Essential" ? "₹8L - ₹12L" : budgetTier === "Couture" ? "₹22L - ₹35L" : "₹14L - ₹18L");
  const roomType = d.roomType || d.dimensions || "300 sq.ft Space";
  const dimensions = d.dimensions || d.roomType || "300 sq.ft Space";
  const handoverTimeline = d.handoverTimeline || "35 Days";
  const warrantyTerms = d.warrantyTerms || "10-Year Comprehensive Warranty";
  const imageUrl = d.imageUrl || "";
  const featured = Boolean(d.featured ?? d.isFeatured ?? false);
  const isFeatured = featured;
  let specifications = ["BWP 710 Marine Ply", "High-CRI Warm LEDs", "German Blum Hardware"];
  if (Array.isArray(d.specifications) && d.specifications.length > 0) {
    specifications = d.specifications;
  } else if (typeof d.materialsJson === "string" && d.materialsJson.trim().startsWith("[")) {
    try {
      specifications = JSON.parse(d.materialsJson);
    } catch {
      // keep fallback
    }
  }

  return {
    ...d,
    id,
    name,
    title,
    category,
    categoryName,
    description,
    leadDescription,
    style,
    budgetTier,
    budget,
    roomType,
    dimensions,
    handoverTimeline,
    warrantyTerms,
    imageUrl,
    featured,
    isFeatured,
    specifications,
    isAvailable: d.isAvailable !== false
  };
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

// Helper to retrieve stored JWT
function getAuthHeader() {
  const token = localStorage.getItem("icon_auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Universal fetch wrapper with automatic timeout and fallback
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getAuthHeader(),
    ...options.headers
  };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server responded with ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  // --------------------------------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------------------------------
  async login({ email, password }) {
    try {
      const res = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (res.data?.token) {
        const userObj = {
          ...res.data,
          name: res.data.fullName || res.data.name || email.split("@")[0]
        };
        localStorage.setItem("icon_auth_token", res.data.token);
        localStorage.setItem("icon_current_user", JSON.stringify(userObj));
        return userObj;
      }
      return res.data;
    } catch {
      // Local demo fallback if backend is offline
      const mockUser = {
        token: "demo-jwt-token-active",
        id: 1,
        fullName: email.split("@")[0].toUpperCase(),
        email,
        role: email.includes("admin") ? "ROLE_ADMIN" : "ROLE_CUSTOMER"
      };
      localStorage.setItem("icon_auth_token", mockUser.token);
      localStorage.setItem("icon_current_user", JSON.stringify(mockUser));
      return mockUser;
    }
  },

  async register({ fullName, email, phone, city, password }) {
    try {
      const res = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, email, phone, city, password })
      });
      if (res.data?.token) {
        localStorage.setItem("icon_auth_token", res.data.token);
        localStorage.setItem("icon_current_user", JSON.stringify(res.data));
      }
      return res.data;
    } catch {
      // Fallback
      const mockUser = {
        token: "demo-jwt-token-active",
        id: Date.now(),
        fullName,
        email,
        role: "ROLE_CUSTOMER"
      };
      localStorage.setItem("icon_auth_token", mockUser.token);
      localStorage.setItem("icon_current_user", JSON.stringify(mockUser));
      return mockUser;
    }
  },

  logout() {
    localStorage.removeItem("icon_auth_token");
    localStorage.removeItem("icon_current_user");
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem("icon_current_user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // --------------------------------------------------------------------------
  // DESIGNS CATALOG
  // --------------------------------------------------------------------------
  async getDesigns(params = {}) {
    const query = new URLSearchParams(params).toString();
    let custom = [];
    try {
      const stored = localStorage.getItem("icon_custom_designs");
      if (stored) custom = JSON.parse(stored);
    } catch {
      custom = [];
    }

    try {
      const res = await request(`/designs${query ? `?${query}` : ""}`);
      const rawList = res.data && res.data.length > 0 ? res.data : DESIGNS_DATABASE;
      const customMap = new Map(custom.map((d) => [d.id, d]));
      const merged = rawList.map((d) => customMap.get(d.id) || d);
      custom.forEach((d) => {
        if (!merged.some((m) => m.id === d.id)) {
          merged.unshift(d);
        }
      });
      return merged.map(normalizeDesign);
    } catch {
      const base = [...DESIGNS_DATABASE];
      const customMap = new Map(custom.map((d) => [d.id, d]));
      const merged = base.map((d) => customMap.get(d.id) || d);
      custom.forEach((d) => {
        if (!merged.some((m) => m.id === d.id)) {
          merged.unshift(d);
        }
      });
      return merged.map(normalizeDesign);
    }
  },

  async getDesignById(id) {
    try {
      const res = await request(`/designs/${id}`);
      return res.data ? normalizeDesign(res.data) : null;
    } catch {
      const found = DESIGNS_DATABASE.find((d) => d.id === id);
      return found ? normalizeDesign(found) : null;
    }
  },

  // --------------------------------------------------------------------------
  // ENQUIRIES & CONSULTATIONS
  // --------------------------------------------------------------------------
  async submitEnquiry(enquiryData) {
    try {
      const res = await request("/enquiries", {
        method: "POST",
        body: JSON.stringify(enquiryData)
      });
      return res.data;
    } catch {
      // Offline fallback: save to localStorage enquiry pipeline
      const stored = JSON.parse(localStorage.getItem("icon_offline_enquiries") || "[]");
      const newEnquiry = {
        ...enquiryData,
        id: Date.now(),
        enquiryCode: `ENQ-LOC-${Date.now().toString().slice(-4)}`,
        status: "NEW",
        createdAt: new Date().toISOString()
      };
      stored.unshift(newEnquiry);
      localStorage.setItem("icon_offline_enquiries", JSON.stringify(stored));
      return newEnquiry;
    }
  },

  async getAllEnquiries() {
    try {
      const res = await request("/enquiries");
      return res.data;
    } catch {
      const local = JSON.parse(localStorage.getItem("icon_offline_enquiries") || "[]");
      return local;
    }
  },

  async updateEnquiryStatus(id, status) {
    try {
      const res = await request(`/enquiries/${id}/status?status=${encodeURIComponent(status)}`, {
        method: "PATCH"
      });
      return res.data;
    } catch {
      const stored = JSON.parse(localStorage.getItem("icon_offline_enquiries") || "[]");
      const idx = stored.findIndex(e => e.id === id);
      if (idx !== -1) {
        stored[idx].status = status;
        localStorage.setItem("icon_offline_enquiries", JSON.stringify(stored));
      }
      return { id, status };
    }
  },

  // --------------------------------------------------------------------------
  // ADMIN CMS & DESIGN STUDIO MANAGEMENT
  // --------------------------------------------------------------------------
  async uploadImage(file) {
    if (!file) return "";
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await request("/admin/upload-image", {
        method: "POST",
        body: formData
      });
      const url = res.data?.url || (typeof res.data === "string" ? res.data : "");
      if (url) {
        return url.startsWith("/") ? `http://localhost:8080${url}` : url;
      }
      return "";
    } catch (err) {
      console.warn("Backend upload failed, using local object URL fallback:", err);
      return URL.createObjectURL(file);
    }
  },

  async uploadDesignPhoto(id, file) {
    if (!file || !id) return null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await request(`/admin/designs/${encodeURIComponent(id)}/upload-photo`, {
        method: "POST",
        body: formData
      });
      return res.data;
    } catch (err) {
      console.warn("Backend design photo upload failed:", err);
      const url = URL.createObjectURL(file);
      return { id, imageUrl: url };
    }
  },

  async createOrUpdateDesign(design) {
    const normalized = normalizeDesign(design);
    let result = normalized;

    // Send payload matching backend entity
    const payload = {
      id: normalized.id,
      title: normalized.title,
      categoryName: normalized.categoryName,
      style: normalized.style,
      budgetTier: normalized.budgetTier,
      leadDescription: normalized.leadDescription,
      dimensions: normalized.dimensions,
      handoverTimeline: normalized.handoverTimeline,
      warrantyTerms: normalized.warrantyTerms,
      imageUrl: normalized.imageUrl,
      isFeatured: normalized.featured,
      materialsJson: JSON.stringify(normalized.specifications || [])
    };

    try {
      const res = await request("/admin/designs", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (res.data) {
        result = normalizeDesign(res.data);
      }
    } catch (err) {
      console.warn("Backend direct sync warning:", err);
      // Re-throw if it was a server rejection (4xx/5xx) rather than network offline
      if (
        err.message &&
        !err.message.includes("Failed to fetch") &&
        !err.message.includes("NetworkError") &&
        !err.message.includes("abort")
      ) {
        throw err;
      }
    }

    // Always persist to local cache for instant zero-latency UI refresh
    try {
      const custom = JSON.parse(localStorage.getItem("icon_custom_designs") || "[]");
      const filtered = custom.filter((d) => d.id !== result.id);
      filtered.unshift(result);
      localStorage.setItem("icon_custom_designs", JSON.stringify(filtered));
    } catch (storageErr) {
      console.warn("Could not cache design in localStorage:", storageErr);
    }

    return result;
  },

  async deleteDesign(id) {
    try {
      const res = await request(`/admin/designs/${id}`, {
        method: "DELETE"
      });
      const custom = JSON.parse(localStorage.getItem("icon_custom_designs") || "[]");
      const filtered = custom.filter((d) => d.id !== id);
      localStorage.setItem("icon_custom_designs", JSON.stringify(filtered));
      return res.data;
    } catch {
      const custom = JSON.parse(localStorage.getItem("icon_custom_designs") || "[]");
      const filtered = custom.filter((d) => d.id !== id);
      localStorage.setItem("icon_custom_designs", JSON.stringify(filtered));
      return { id };
    }
  },

  async getNextDesignId(category = "Living Room") {
    try {
      const res = await request(`/admin/designs/next-id?category=${encodeURIComponent(category)}`);
      if (res.data?.id) return res.data.id;
    } catch {
      // Fallback
    }

    const prefixMap = {
      Bedroom: "BED",
      "Living Room": "LIV",
      "Modular Kitchen": "KIT",
      Bathroom: "BAT",
      "Dining Room": "DIN",
      "Pooja Room": "POO",
      Wardrobes: "WAR",
      "False Ceiling": "CEI",
      "Kids Room": "KID",
      "Full Home Interiors": "HOM",
      "Luxury Villas": "VIL"
    };
    const prefix = prefixMap[category] || (category ? category.substring(0, 3).toUpperCase() : "DSG");
    let custom = [];
    try {
      const stored = localStorage.getItem("icon_custom_designs");
      if (stored) custom = JSON.parse(stored);
    } catch {
      // fallback to empty array
    }
    const all = [...custom, ...DESIGNS_DATABASE];
    const existing = new Set(all.map((d) => (d.id || "").toUpperCase()));
    let num = 101;
    while (existing.has(`${prefix}-${num}`) || existing.has(`${prefix}-00${num - 100}`)) {
      num++;
    }
    return `${prefix}-${num}`;
  },

  // --------------------------------------------------------------------------
  // COST ESTIMATOR
  // --------------------------------------------------------------------------
  async calculateEstimate({ sqft, grade }) {
    try {
      const res = await request("/estimator/calculate", {
        method: "POST",
        body: JSON.stringify({ sqft, grade })
      });
      return res.data;
    } catch {
      // Local calculate fallback
      const ratePerSqft = grade === "couture" ? 2850 : grade === "essential" ? 1450 : 1950;
      const baseCost = sqft * ratePerSqft;
      return {
        sqft,
        grade,
        ratePerSqft,
        estimatedLowInr: Math.round(baseCost * 0.95),
        estimatedHighInr: Math.round(baseCost * 1.08),
        lowFormatted: `₹${((baseCost * 0.95) / 100000).toFixed(2)} Lakhs`,
        highFormatted: `₹${((baseCost * 1.08) / 100000).toFixed(2)} Lakhs`,
        timeline: grade === "couture" ? "60 Days" : "45 Days",
        warranty: BUSINESS_INFO.stats.warrantyYears + " Comprehensive Warranty"
      };
    }
  },

  // --------------------------------------------------------------------------
  // CUSTOMER ACCOUNTS MANAGEMENT
  // --------------------------------------------------------------------------
  async getCustomers() {
    try {
      const res = await request("/admin/customers");
      return res.data;
    } catch {
      const local = localStorage.getItem("icon_admin_customers");
      if (local) {
        try { return JSON.parse(local); } catch { /* ignore */ }
      }
      const initialCustomers = [
        {
          id: 101,
          fullName: "Srinivas Rao",
          email: "srinivas.rao@example.com",
          phone: "+91 98480 12345",
          city: "Guntur",
          role: "ROLE_CUSTOMER",
          registeredAt: "2026-03-12",
          activeProject: "3BHK Luxury Duplex, Syamala Nagar",
          status: "IN_PROGRESS"
        },
        {
          id: 102,
          fullName: "Dr. Ananya Reddy",
          email: "ananya.reddy@example.com",
          phone: "+91 99890 54321",
          city: "Vijayawada",
          role: "ROLE_CUSTOMER",
          registeredAt: "2026-03-24",
          activeProject: "German Modular Kitchen & Master Suite",
          status: "IN_REVIEW"
        },
        {
          id: 103,
          fullName: "K. Murali Mohan",
          email: "murali.k@example.com",
          phone: "+91 94401 88990",
          city: "Amaravati",
          role: "ROLE_CUSTOMER",
          registeredAt: "2026-04-02",
          activeProject: "4,200 sq.ft Waterfront Villa",
          status: "NEW"
        },
        {
          id: 104,
          fullName: "Praveen Kumar V.",
          email: "praveen.v@example.com",
          phone: "+91 91210 67890",
          city: "Guntur",
          role: "ROLE_CUSTOMER",
          registeredAt: "2026-02-15",
          activeProject: "Minimalist Japandi Living & Dining",
          status: "COMPLETED"
        }
      ];
      localStorage.setItem("icon_admin_customers", JSON.stringify(initialCustomers));
      return initialCustomers;
    }
  },

  // --------------------------------------------------------------------------
  // PROJECTS & MILESTONES MANAGEMENT
  // --------------------------------------------------------------------------
  async getProjects() {
    try {
      const res = await request("/admin/projects");
      return res.data;
    } catch {
      const local = localStorage.getItem("icon_admin_projects");
      if (local) {
        try { return JSON.parse(local); } catch { /* ignore */ }
      }
      const initialProjects = [
        {
          id: "PRJ-GNT-401",
          clientName: "Srinivas Rao",
          title: "3BHK Neoclassical Residence",
          location: "Syamala Nagar, Guntur",
          scope: "Full Home Interiors (2,450 sq.ft)",
          currentStage: "Site Installation & Glass Wardrobes",
          progressPct: 75,
          targetHandover: "2026-05-10",
          status: "IN_PROGRESS",
          budgetTier: "Signature (₹24.5 Lakhs)",
          milestones: [
            { name: "3D CAD & Blueprint Approval", done: true, date: "2026-03-15" },
            { name: "Civil & Electrical Alignment", done: true, date: "2026-03-28" },
            { name: "German Blum Factory Joinery", done: true, date: "2026-04-12" },
            { name: "On-site Installation & Lighting", done: false, date: "2026-04-30" },
            { name: "Quality Audit & Handover", done: false, date: "2026-05-10" }
          ]
        },
        {
          id: "PRJ-VJW-402",
          clientName: "Dr. Ananya Reddy",
          title: "Modern Minimalist Penthouse",
          location: "Benz Circle, Vijayawada",
          scope: "Master Suite & Island Kitchen (1,800 sq.ft)",
          currentStage: "Factory Joinery Fabrication",
          progressPct: 45,
          targetHandover: "2026-05-28",
          status: "IN_PROGRESS",
          budgetTier: "Couture (₹18.2 Lakhs)",
          milestones: [
            { name: "Space Planning & Material Signoff", done: true, date: "2026-03-30" },
            { name: "Factory Joinery Fabrication", done: false, date: "2026-04-20" },
            { name: "Quartz Countertops & Fitting", done: false, date: "2026-05-10" },
            { name: "Final Handover & 10Y Warranty", done: false, date: "2026-05-28" }
          ]
        },
        {
          id: "PRJ-AMR-403",
          clientName: "K. Murali Mohan",
          title: "Duplex Waterfront Estate",
          location: "Amaravati Capital City",
          scope: "Turnkey Architecture & Living (4,200 sq.ft)",
          currentStage: "Architectural Concept & 3D Renders",
          progressPct: 20,
          targetHandover: "2026-07-15",
          status: "IN_REVIEW",
          budgetTier: "Couture (₹48.0 Lakhs)",
          milestones: [
            { name: "Site Laser Survey", done: true, date: "2026-04-05" },
            { name: "Concept Renders Approval", done: false, date: "2026-04-25" },
            { name: "Civil & Flooring Demarcation", done: false, date: "2026-05-20" }
          ]
        }
      ];
      localStorage.setItem("icon_admin_projects", JSON.stringify(initialProjects));
      return initialProjects;
    }
  },

  async updateProject(id, updates) {
    try {
      const res = await request(`/admin/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updates)
      });
      return res.data;
    } catch {
      const local = JSON.parse(localStorage.getItem("icon_admin_projects") || "[]");
      const idx = local.findIndex(p => p.id === id);
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...updates };
        localStorage.setItem("icon_admin_projects", JSON.stringify(local));
        return local[idx];
      }
      return updates;
    }
  },

  // --------------------------------------------------------------------------
  // QUOTATIONS & PRICING RULES ENGINE
  // --------------------------------------------------------------------------
  async getPricingRules() {
    try {
      const res = await request("/admin/pricing-rules");
      return res.data;
    } catch {
      const local = localStorage.getItem("icon_admin_pricing_rules");
      if (local) {
        try { return JSON.parse(local); } catch { /* ignore */ }
      }
      const initialRules = {
        essentialRatePerSqft: 1450,
        signatureRatePerSqft: 1950,
        coutureRatePerSqft: 2850,
        gstRatePercent: 18,
        discountPercent: 5,
        warrantyYears: 10,
        handoverDaysGuaranteed: 45,
        lastUpdated: "2026-04-01"
      };
      localStorage.setItem("icon_admin_pricing_rules", JSON.stringify(initialRules));
      return initialRules;
    }
  },

  async updatePricingRules(rules) {
    try {
      const res = await request("/admin/pricing-rules", {
        method: "PUT",
        body: JSON.stringify(rules)
      });
      return res.data;
    } catch {
      localStorage.setItem("icon_admin_pricing_rules", JSON.stringify(rules));
      return rules;
    }
  },

  // --------------------------------------------------------------------------
  // SERVICES & STUDIO PROFILE
  // --------------------------------------------------------------------------
  async getStudioInfo() {
    try {
      const res = await request("/admin/studio-info");
      return res.data;
    } catch {
      const local = localStorage.getItem("icon_admin_studio_info");
      if (local) {
        try { return JSON.parse(local); } catch { /* ignore */ }
      }
      return BUSINESS_INFO;
    }
  },

  async updateStudioInfo(info) {
    try {
      const res = await request("/admin/studio-info", {
        method: "PUT",
        body: JSON.stringify(info)
      });
      return res.data;
    } catch {
      localStorage.setItem("icon_admin_studio_info", JSON.stringify(info));
      return info;
    }
  }
};
