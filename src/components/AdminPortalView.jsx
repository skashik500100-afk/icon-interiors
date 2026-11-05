import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  BUSINESS_INFO,
  OFFICIAL_CATEGORIES,
  INTERIOR_STYLES
} from "../data/designsData";
import "./Portals.css";

export default function AdminPortalView({ onNavigate, onLogout, currentUser }) {
  // Navigation Section: 'overview' | 'enquiries' | 'customers' | 'designs' | 'projects' | 'pricing' | 'studio'
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live Data States
  const [enquiries, setEnquiries] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pricingRules, setPricingRules] = useState({
    essentialRatePerSqft: 1450,
    signatureRatePerSqft: 1950,
    coutureRatePerSqft: 2850,
    gstRatePercent: 18,
    discountPercent: 5,
    warrantyYears: 10,
    handoverDaysGuaranteed: 45
  });
  const [studioInfo, setStudioInfo] = useState({
    name: BUSINESS_INFO.name,
    experienceCenter: BUSINESS_INFO.experienceCenter,
    city: BUSINESS_INFO.city,
    phone: BUSINESS_INFO.phone,
    whatsappNumber: BUSINESS_INFO.whatsappNumber,
    email: BUSINESS_INFO.email,
    workingHours: BUSINESS_INFO.workingHours
  });

  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  // Enquiries CRM Filters
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("ALL");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [selectedEnquiryForDetail, setSelectedEnquiryForDetail] = useState(null);

  // Designs CMS Filters
  const [designCategoryFilter, setDesignCategoryFilter] = useState("ALL");
  const [designSearch, setDesignSearch] = useState("");
  const [uploadingId, setUploadingId] = useState(null);

  // Helper for generating guaranteed unique design ID
  const getNextUniqueId = (categoryName, existingDesigns = []) => {
    const prefixMap = {
      "Bedroom": "BED",
      "Living Room": "LIV",
      "Modular Kitchen": "KIT",
      "Bathroom": "BAT",
      "Dining Room": "DIN",
      "Pooja Room": "POO",
      "Wardrobes": "WAR",
      "False Ceiling": "CEI",
      "Kids Room": "KID",
      "Full Home Interiors": "HOM",
      "Luxury Villas": "VIL"
    };
    const prefix = prefixMap[categoryName] || (categoryName ? categoryName.substring(0, 3).toUpperCase() : "DSG");
    const existingIds = new Set(existingDesigns.map((d) => (d.id || "").toUpperCase()));
    let num = 101;
    while (existingIds.has(`${prefix}-${num}`) || existingIds.has(`${prefix}-00${num - 100}`)) {
      num++;
    }
    return `${prefix}-${num}`;
  };

  // Photo Edit Modal State
  const [photoModalTarget, setPhotoModalTarget] = useState(null);
  const [photoModalFile, setPhotoModalFile] = useState(null);
  const [photoInputUrl, setPhotoInputUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  // Customers Search
  const [customerSearch, setCustomerSearch] = useState("");

  // New Design Modal & Publishing State
  const [isAddDesignOpen, setIsAddDesignOpen] = useState(false);
  const [newDesign, setNewDesign] = useState({
    id: "LIV-101",
    title: "",
    categoryName: "Living Room",
    style: "Modern Minimalist",
    budgetTier: "Signature",
    leadDescription: "",
    dimensions: "18 ft x 16 ft (288 sq.ft)",
    handoverTimeline: "35 Days",
    warrantyTerms: "10-Year Comprehensive Warranty",
    imageUrl: "",
    isFeatured: true
  });
  const [newDesignFile, setNewDesignFile] = useState(null);
  const [newDesignPreview, setNewDesignPreview] = useState("");
  const [newDesignUrl, setNewDesignUrl] = useState("");
  const [idOverriddenByUser, setIdOverriddenByUser] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatusText, setPublishStatusText] = useState("");
  const [formError, setFormError] = useState("");

  // Cost Calculator Testbench State
  const [testCalcSqft, setTestCalcSqft] = useState(2000);
  const [testCalcGrade, setTestCalcGrade] = useState("signature");

  const adminName = currentUser?.name || currentUser?.fullName || "Principal Architect";
  const adminEmail = currentUser?.email || "admin@iconinteriors.in";

  // Initial Data Load
  useEffect(() => {
    let ignore = false;
    const loadAllAdminData = async () => {
      try {
        const [enqs, dsgs, custs, prjs, rules, studio] = await Promise.all([
          api.getAllEnquiries(),
          api.getDesigns(),
          api.getCustomers(),
          api.getProjects(),
          api.getPricingRules(),
          api.getStudioInfo()
        ]);
        if (!ignore) {
          setEnquiries(Array.isArray(enqs) ? enqs : []);
          setDesigns(Array.isArray(dsgs) ? dsgs : []);
          setCustomers(Array.isArray(custs) ? custs : []);
          setProjects(Array.isArray(prjs) ? prjs : []);
          if (rules) setPricingRules(rules);
          if (studio) setStudioInfo((prev) => ({ ...prev, ...studio }));
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load admin data", err);
        if (!ignore) setLoading(false);
      }
    };
    loadAllAdminData();
    return () => {
      ignore = true;
    };
  }, []);

  const showFlash = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 4000);
  };

  // --------------------------------------------------------------------------
  // ENQUIRY CRM ACTIONS
  // --------------------------------------------------------------------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiryForDetail && selectedEnquiryForDetail.id === id) {
        setSelectedEnquiryForDetail((prev) => ({ ...prev, status: newStatus }));
      }
      showFlash(`Enquiry #${id} status updated to ${newStatus}`);
    } catch {
      showFlash("Failed to update status on server.");
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus =
      enquiryStatusFilter === "ALL" || item.status === enquiryStatusFilter;
    const term = enquirySearch.toLowerCase();
    const matchesSearch =
      !term ||
      (item.customerName && item.customerName.toLowerCase().includes(term)) ||
      (item.phone && item.phone.includes(term)) ||
      (item.enquiryCode && item.enquiryCode.toLowerCase().includes(term)) ||
      (item.roomType && item.roomType.toLowerCase().includes(term)) ||
      (item.city && item.city.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  // --------------------------------------------------------------------------
  // DESIGN CMS ACTIONS
  // --------------------------------------------------------------------------
  const handleOpenPhotoModal = (design) => {
    setPhotoModalTarget(design);
    setPhotoInputUrl(design.imageUrl || "");
    setPhotoPreview(design.imageUrl || "");
    setPhotoModalFile(null);
  };

  const handlePhotoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        showFlash("File size exceeds 15MB limit.");
        return;
      }
      setPhotoModalFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSavePhotoModal = async () => {
    if (!photoModalTarget) return;
    setUploadingId(photoModalTarget.id);
    try {
      let finalUrl = photoInputUrl.trim();
      if (photoModalFile) {
        const uploaded = await api.uploadDesignPhoto(photoModalTarget.id, photoModalFile);
        if (uploaded?.imageUrl) {
          finalUrl = uploaded.imageUrl.startsWith("/")
            ? `http://localhost:8080${uploaded.imageUrl}`
            : uploaded.imageUrl;
        } else {
          finalUrl = await api.uploadImage(photoModalFile);
        }
      }

      if (!finalUrl && !photoModalFile) {
        showFlash("Please select a photo file or provide an image URL.");
        setUploadingId(null);
        return;
      }

      const updatedDesigns = designs.map((d) =>
        d.id === photoModalTarget.id ? { ...d, imageUrl: finalUrl } : d
      );
      setDesigns(updatedDesigns);
      localStorage.setItem("icon_custom_designs", JSON.stringify(updatedDesigns));
      showFlash(`Photograph updated for design #${photoModalTarget.id}`);
      setPhotoModalTarget(null);
      setPhotoModalFile(null);
      setPhotoInputUrl("");
      setPhotoPreview("");
    } catch (err) {
      showFlash(err.message || "Failed to save photograph.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleDeleteDesign = async (id) => {
    if (!window.confirm(`Are you sure you want to delete design card ${id}?`)) return;
    try {
      await api.deleteDesign(id);
      const updated = designs.filter((d) => d.id !== id);
      setDesigns(updated);
      localStorage.setItem("icon_custom_designs", JSON.stringify(updated));
      showFlash(`Design ${id} removed.`);
    } catch (err) {
      showFlash(err.message || "Failed to delete design.");
    }
  };

  const handleOpenAddDesign = async () => {
    setFormError("");
    const initialCategory = "Living Room";
    let nextId = getNextUniqueId(initialCategory, designs);
    try {
      const serverId = await api.getNextDesignId(initialCategory);
      if (serverId) nextId = serverId;
    } catch {
      // Use local nextId
    }
    setNewDesign({
      id: nextId,
      title: "",
      categoryName: initialCategory,
      style: "Modern Minimalist",
      budgetTier: "Signature",
      leadDescription: "",
      dimensions: "18 ft x 16 ft (288 sq.ft)",
      handoverTimeline: "35 Days",
      warrantyTerms: "10-Year Comprehensive Warranty",
      imageUrl: "",
      isFeatured: true
    });
    setNewDesignFile(null);
    setNewDesignPreview("");
    setNewDesignUrl("");
    setIdOverriddenByUser(false);
    setIsAddDesignOpen(true);
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    let nextId = newDesign.id;
    if (!idOverriddenByUser) {
      nextId = getNextUniqueId(selectedCategory, designs);
      try {
        const serverId = await api.getNextDesignId(selectedCategory);
        if (serverId) nextId = serverId;
      } catch {
        // Fallback
      }
    }
    setNewDesign((prev) => ({
      ...prev,
      categoryName: selectedCategory,
      id: nextId
    }));
  };

  const handleNewDesignFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setFormError("Selected photo exceeds the 15MB file size limit. Please select a smaller photo.");
        return;
      }
      setFormError("");
      setNewDesignFile(file);
      const preview = URL.createObjectURL(file);
      setNewDesignPreview(preview);
    }
  };

  const handleClearNewDesignFile = () => {
    setNewDesignFile(null);
    setNewDesignPreview("");
  };

  const handleCreateDesignSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!newDesign.title.trim()) {
      setFormError("Design Title is required.");
      return;
    }
    if (!newDesign.leadDescription.trim()) {
      setFormError("Lead Description is required.");
      return;
    }

    const finalId = (newDesign.id || "").trim() || getNextUniqueId(newDesign.categoryName, designs);

    setIsPublishing(true);
    setPublishStatusText("Uploading high-resolution photograph to storage...");

    try {
      let finalImageUrl = newDesignUrl.trim() || newDesign.imageUrl || "";

      // 1. If an image file was selected, upload it to the server
      if (newDesignFile) {
        try {
          const uploadedUrl = await api.uploadImage(newDesignFile);
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.warn("Image upload warning:", uploadErr);
          if (!finalImageUrl) finalImageUrl = newDesignPreview;
        }
      }

      setPublishStatusText("Publishing architectural design to database...");

      // 2. Build design entity
      const designObj = {
        ...newDesign,
        id: finalId,
        imageUrl: finalImageUrl,
        isFeatured: true
      };

      // 3. Save via API
      const saved = await api.createOrUpdateDesign(designObj);

      // 4. Update designs state
      const updatedDesigns = [saved, ...designs.filter((d) => d.id !== saved.id)];
      setDesigns(updatedDesigns);

      showFlash(`✓ Architectural Design #${saved.id} "${saved.title || saved.name}" published successfully!`);

      // 5. Clean up & close modal
      setIsAddDesignOpen(false);
      setNewDesignFile(null);
      setNewDesignPreview("");
      setNewDesignUrl("");
      setFormError("");
    } catch (err) {
      console.error("Publishing design failed:", err);
      setFormError(
        err.message || "Failed to publish architectural design. Please check your connection and try again."
      );
    } finally {
      setIsPublishing(false);
      setPublishStatusText("");
    }
  };

  const filteredDesigns = designs.filter((item) => {
    const itemCat = item.categoryName || item.category || "";
    const matchesCat =
      designCategoryFilter === "ALL" ||
      itemCat.toLowerCase() === designCategoryFilter.toLowerCase();
    const term = designSearch.toLowerCase();
    const matchesSearch =
      !term ||
      (item.title && item.title.toLowerCase().includes(term)) ||
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.id && item.id.toLowerCase().includes(term)) ||
      (item.style && item.style.toLowerCase().includes(term));
    return matchesCat && matchesSearch;
  });

  // --------------------------------------------------------------------------
  // PROJECTS & MILESTONES ACTIONS
  // --------------------------------------------------------------------------
  const handleToggleProjectMilestone = async (projectId, milestoneIndex) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project || !project.milestones) return;

    const updatedMilestones = project.milestones.map((m, idx) =>
      idx === milestoneIndex ? { ...m, done: !m.done } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.done).length;
    const progressPct = Math.round((completedCount / updatedMilestones.length) * 100);
    const updatedStatus = progressPct === 100 ? "COMPLETED" : "IN_PROGRESS";

    const updatedProjects = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            milestones: updatedMilestones,
            progressPct,
            status: updatedStatus
          }
        : p
    );

    setProjects(updatedProjects);
    localStorage.setItem("icon_admin_projects", JSON.stringify(updatedProjects));
    showFlash(`Project ${projectId} milestone updated!`);
  };

  // --------------------------------------------------------------------------
  // PRICING RULES ACTIONS
  // --------------------------------------------------------------------------
  const handleSavePricingRules = async (e) => {
    e.preventDefault();
    try {
      await api.updatePricingRules(pricingRules);
      showFlash("Pricing rules and rate multipliers updated successfully!");
    } catch {
      showFlash("Failed to update pricing rules.");
    }
  };

  // --------------------------------------------------------------------------
  // STUDIO INFO ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveStudioInfo = async (e) => {
    e.preventDefault();
    try {
      await api.updateStudioInfo(studioInfo);
      showFlash("Studio address and concierge details updated successfully!");
    } catch {
      showFlash("Failed to update studio information.");
    }
  };

  // Derived KPIs
  const newEnquiriesCount = enquiries.filter((e) => e.status === "NEW").length;
  const inProgressProjectsCount = projects.filter(
    (p) => p.status === "IN_PROGRESS"
  ).length;

  return (
    <div className="admin-suite-root">
      {/* =====================================================================
          ADMIN SIDEBAR NAVIGATION
          ===================================================================== */}
      <aside className={`admin-suite-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand-lockup">
            <div className="admin-crown-badge">👑</div>
            <div className="admin-brand-text">
              <span className="admin-brand-title">ICON INTERIORS</span>
              <span className="admin-brand-sub">STUDIO ADMIN SUITE</span>
            </div>
          </div>
          <button
            className="admin-sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="admin-user-profile-card">
          <div className="admin-avatar">⚡</div>
          <div className="admin-user-info">
            <span className="admin-user-name">{adminName}</span>
            <span className="admin-role-badge">ROLE_ADMIN</span>
            <span className="admin-user-email">{adminEmail}</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeSection === "overview" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("overview");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">📊</span>
            <span className="admin-nav-label">Dashboard Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === "enquiries" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("enquiries");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">📋</span>
            <span className="admin-nav-label">Customer Enquiries</span>
            {newEnquiriesCount > 0 && (
              <span className="admin-nav-badge gold">{newEnquiriesCount} New</span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeSection === "customers" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("customers");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">👥</span>
            <span className="admin-nav-label">Customers & Accounts</span>
            <span className="admin-nav-badge">{customers.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === "designs" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("designs");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">🎨</span>
            <span className="admin-nav-label">Design Gallery & Photos</span>
            <span className="admin-nav-badge">{designs.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === "projects" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("projects");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">🏗️</span>
            <span className="admin-nav-label">Projects & Milestones</span>
            {inProgressProjectsCount > 0 && (
              <span className="admin-nav-badge active">{inProgressProjectsCount}</span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeSection === "pricing" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("pricing");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">💰</span>
            <span className="admin-nav-label">Quotations & Pricing</span>
          </button>

          <button
            className={`admin-nav-item ${activeSection === "studio" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("studio");
              setSidebarOpen(false);
            }}
          >
            <span className="admin-nav-icon">🏛️</span>
            <span className="admin-nav-label">Studio & Services</span>
          </button>
        </nav>

        {/* Sidebar Bottom Actions */}
        <div className="admin-sidebar-footer">
          <button
            className="admin-footer-btn public-web-btn"
            onClick={() => onNavigate("home")}
            title="Browse the customer-facing website without losing admin login"
          >
            <span className="footer-btn-icon">🌐</span>
            <span>View Public Website</span>
          </button>

          <button
            className="admin-footer-btn logout-btn"
            onClick={onLogout}
            title="End admin session"
          >
            <span className="footer-btn-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop for sidebar */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================================
          MAIN ADMIN WORKSPACE & TOP BAR
          ===================================================================== */}
      <div className="admin-suite-main">
        {/* Dedicated Admin Top Navigation Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>
            <div className="admin-breadcrumbs">
              <span className="crumb-root">ICON Studio Admin</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">
                {activeSection === "overview" && "Dashboard Overview"}
                {activeSection === "enquiries" && "Customer Enquiries CRM"}
                {activeSection === "customers" && "Customer Accounts & Directory"}
                {activeSection === "designs" && "Design Ideas Gallery & Photo CMS"}
                {activeSection === "projects" && "Projects & Milestones Manager"}
                {activeSection === "pricing" && "Quotations & Pricing Rules"}
                {activeSection === "studio" && "Studio Information & Core Services"}
              </span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-status-indicator">
              <span className="status-live-dot"></span>
              <span className="status-label">PostgreSQL 18 & Spring Boot Active</span>
            </div>

            {/* View Public Website CTA */}
            <button
              className="admin-btn-view-site"
              onClick={() => onNavigate("home")}
              title="Preview the live website as customer"
            >
              <span>🌐 View Public Website</span>
              <span className="arrow">›</span>
            </button>

            <button
              className="admin-btn-top-logout"
              onClick={onLogout}
              title="Sign Out"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Global Action Flash Alert */}
        {actionMessage && (
          <div className="admin-flash-banner">
            <span className="flash-icon">✓</span>
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Main Workspace Body */}
        <div className="admin-workspace-scrollable">
          {/* ===================================================================
              SECTION 1: DASHBOARD OVERVIEW
              =================================================================== */}
          {activeSection === "overview" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">Executive Studio Overview</h1>
                  <p className="admin-page-desc">
                    Real-time monitoring of client enquiries, turnkey projects across Guntur,
                    Amaravati and Vijayawada, and the 11-category architectural catalogue.
                  </p>
                </div>
                <div className="hero-quick-actions">
                  <button
                    className="btn-gold-primary"
                    onClick={() => setActiveSection("enquiries")}
                  >
                    📋 View Inbound Enquiries ({newEnquiriesCount} New)
                  </button>
                  <button
                    className="portal-btn-secondary"
                    onClick={() => setActiveSection("designs")}
                  >
                    🎨 Manage Design Photos
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="kpi-icon-wrap gold">📋</div>
                  <div className="kpi-content">
                    <span className="kpi-label">Total Inbound Enquiries</span>
                    <h2 className="kpi-value">{enquiries.length}</h2>
                    <span className="kpi-subtext">
                      {newEnquiriesCount} requiring initial review
                    </span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="kpi-icon-wrap blue">🏗️</div>
                  <div className="kpi-content">
                    <span className="kpi-label">Active Turnkey Projects</span>
                    <h2 className="kpi-value">{inProgressProjectsCount}</h2>
                    <span className="kpi-subtext">Guntur, Vijayawada & Amaravati</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="kpi-icon-wrap purple">🎨</div>
                  <div className="kpi-content">
                    <span className="kpi-label">Catalog Designs</span>
                    <h2 className="kpi-value">{designs.length}</h2>
                    <span className="kpi-subtext">Across 11 Room Categories</span>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="kpi-icon-wrap green">🏛️</div>
                  <div className="kpi-content">
                    <span className="kpi-label">Flagship Experience Studio</span>
                    <h2 className="kpi-value">4,500 sq.ft</h2>
                    <span className="kpi-subtext">Syamala Nagar Main Rd, Guntur</span>
                  </div>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="admin-panel-card">
                <div className="admin-panel-header">
                  <div>
                    <h3 className="panel-title">Recent Inbound Consultations</h3>
                    <p className="panel-sub">
                      Latest homeowner inquiries submitted via website modals and calculators.
                    </p>
                  </div>
                  <button
                    className="admin-link-btn"
                    onClick={() => setActiveSection("enquiries")}
                  >
                    View All Enquiries ({enquiries.length}) ›
                  </button>
                </div>

                <div className="portal-table-wrap">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Scope</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id}>
                          <td>
                            <strong className="code-pill">
                              {enq.enquiryCode || `ENQ-${enq.id}`}
                            </strong>
                          </td>
                          <td>
                            <strong>{enq.customerName}</strong>
                          </td>
                          <td>
                            <div>{enq.phone}</div>
                            <small className="muted-text">{enq.email}</small>
                          </td>
                          <td>{enq.roomType || "Full Home Interiors"}</td>
                          <td>{enq.city || "Guntur"}</td>
                          <td>
                            <select
                              className={`status-select status-${(enq.status || "NEW").toLowerCase()}`}
                              value={enq.status || "NEW"}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            >
                              <option value="NEW">New</option>
                              <option value="IN_REVIEW">In-Review</option>
                              <option value="IN_PROGRESS">In-Progress</option>
                              <option value="COMPLETED">Completed</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="table-action-pill"
                              onClick={() => {
                                setSelectedEnquiryForDetail(enq);
                              }}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Projects Tracker Preview */}
              <div className="admin-panel-card" style={{ marginTop: "24px" }}>
                <div className="admin-panel-header">
                  <div>
                    <h3 className="panel-title">Active Residential Transformations</h3>
                    <p className="panel-sub">
                      Milestone delivery timelines and turnkey execution status.
                    </p>
                  </div>
                  <button
                    className="admin-link-btn"
                    onClick={() => setActiveSection("projects")}
                  >
                    Manage All Projects ›
                  </button>
                </div>

                <div className="projects-overview-grid">
                  {projects.map((proj) => (
                    <div key={proj.id} className="project-kpi-card">
                      <div className="project-card-top">
                        <span className="project-code-tag">{proj.id}</span>
                        <span className={`status-badge-pill ${proj.status.toLowerCase()}`}>
                          {proj.status}
                        </span>
                      </div>
                      <h4 className="project-title">{proj.title}</h4>
                      <p className="project-client">Client: {proj.clientName} • {proj.location}</p>
                      <div className="progress-bar-wrap">
                        <div className="progress-bar-meta">
                          <span>Progress</span>
                          <span>{proj.progressPct}%</span>
                        </div>
                        <div className="progress-bar-track">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${proj.progressPct}%` }}
                          />
                        </div>
                      </div>
                      <div className="project-card-footer">
                        <span className="project-stage">📍 {proj.currentStage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 2: CUSTOMER ENQUIRIES CRM
              =================================================================== */}
          {activeSection === "enquiries" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">📋 Customer Enquiries CRM</h1>
                  <p className="admin-page-desc">
                    Manage client leads, consultation requests, budget criteria, and status transitions.
                  </p>
                </div>
              </div>

              <div className="admin-panel-card">
                <div className="enquiry-filter-toolbar">
                  <div className="search-box-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search client name, phone, enquiry code, city..."
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                    />
                  </div>

                  <div className="status-filter-pills-bar">
                    {["ALL", "NEW", "IN_REVIEW", "IN_PROGRESS", "COMPLETED"].map((st) => (
                      <button
                        key={st}
                        className={`filter-pill-btn ${enquiryStatusFilter === st ? "active" : ""}`}
                        onClick={() => setEnquiryStatusFilter(st)}
                      >
                        {st === "ALL"
                          ? `All (${enquiries.length})`
                          : st === "NEW"
                          ? `New (${enquiries.filter((e) => e.status === "NEW").length})`
                          : st === "IN_REVIEW"
                          ? `In-Review (${enquiries.filter((e) => e.status === "IN_REVIEW").length})`
                          : st === "IN_PROGRESS"
                          ? `In-Progress (${enquiries.filter((e) => e.status === "IN_PROGRESS").length})`
                          : `Completed (${enquiries.filter((e) => e.status === "COMPLETED").length})`}
                      </button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <div className="admin-empty-state">Loading enquiries from database...</div>
                ) : filteredEnquiries.length === 0 ? (
                  <div className="admin-empty-state">
                    <span className="empty-icon">📭</span>
                    <h3>No Enquiries Found</h3>
                    <p>No customer records matched your selected filter or search terms.</p>
                  </div>
                ) : (
                  <div className="portal-table-wrap">
                    <table className="portal-table">
                      <thead>
                        <tr>
                          <th>Enquiry Code</th>
                          <th>Client Name</th>
                          <th>Contact Details</th>
                          <th>Room / Scope</th>
                          <th>Budget Range</th>
                          <th>City</th>
                          <th>Status</th>
                          <th>Direct Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnquiries.map((enq) => {
                          const cleanPhone = (enq.phone || "").replace(/[^0-9]/g, "");
                          const waLink = `https://wa.me/${
                            cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone
                          }?text=Hello%20${encodeURIComponent(
                            enq.customerName || "Client"
                          )},%20this%20is%20the%20Principal%20Architect%20team%20at%20ICON%20INTERIORS%20Guntur.%20We%20received%20your%20consultation%20request%20(${
                            enq.enquiryCode
                          }).`;

                          return (
                            <tr key={enq.id}>
                              <td>
                                <strong className="code-pill">
                                  {enq.enquiryCode || `ENQ-${enq.id}`}
                                </strong>
                              </td>
                              <td>
                                <strong style={{ color: "#ffffff" }}>{enq.customerName}</strong>
                                {enq.notes && (
                                  <div className="table-notes-preview">
                                    "{enq.notes.slice(0, 45)}..."
                                  </div>
                                )}
                              </td>
                              <td>
                                <div>{enq.phone}</div>
                                {enq.email && (
                                  <small className="muted-text">{enq.email}</small>
                                )}
                              </td>
                              <td>{enq.roomType || "Full Home Interiors"}</td>
                              <td>{enq.budgetRange || "Standard"}</td>
                              <td>{enq.city || "Guntur"}</td>
                              <td>
                                <select
                                  className={`status-select status-${(
                                    enq.status || "NEW"
                                  ).toLowerCase()}`}
                                  value={enq.status || "NEW"}
                                  onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                                >
                                  <option value="NEW">New</option>
                                  <option value="IN_REVIEW">In-Review</option>
                                  <option value="IN_PROGRESS">In-Progress</option>
                                  <option value="COMPLETED">Completed</option>
                                </select>
                              </td>
                              <td>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="table-wa-btn"
                                    title="Message client on WhatsApp"
                                  >
                                    💬 WhatsApp
                                  </a>
                                  <button
                                    className="table-action-pill"
                                    onClick={() => setSelectedEnquiryForDetail(enq)}
                                  >
                                    Details
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 3: CUSTOMERS & USER ACCOUNTS
              =================================================================== */}
          {activeSection === "customers" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">👥 Customer Accounts & Directory</h1>
                  <p className="admin-page-desc">
                    Verified registered clients, consultation history, and assigned project associations.
                  </p>
                </div>
              </div>

              <div className="admin-panel-card">
                <div className="enquiry-filter-toolbar">
                  <div className="search-box-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search customers by name, email, phone, city..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="portal-table-wrap">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>Client ID</th>
                        <th>Customer Name</th>
                        <th>Contact Information</th>
                        <th>City / Region</th>
                        <th>Registered Date</th>
                        <th>Active Project Assignment</th>
                        <th>Role & Access</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers
                        .filter((c) => {
                          const term = customerSearch.toLowerCase();
                          return (
                            !term ||
                            c.fullName.toLowerCase().includes(term) ||
                            c.email.toLowerCase().includes(term) ||
                            c.phone.includes(term) ||
                            c.city.toLowerCase().includes(term)
                          );
                        })
                        .map((c) => (
                          <tr key={c.id}>
                            <td>
                              <strong className="code-pill">#ICON-CUST-{c.id}</strong>
                            </td>
                            <td>
                              <strong style={{ color: "#ffffff" }}>{c.fullName}</strong>
                            </td>
                            <td>
                              <div>{c.email}</div>
                              <small className="muted-text">{c.phone}</small>
                            </td>
                            <td>{c.city}</td>
                            <td>{c.registeredAt}</td>
                            <td>
                              <span style={{ color: "#e6ca65" }}>
                                {c.activeProject || "Consultation Pending"}
                              </span>
                            </td>
                            <td>
                              <span className="role-chip customer">ROLE_CUSTOMER</span>
                            </td>
                            <td>
                              <a
                                href={`mailto:${c.email}?subject=ICON%20INTERIORS%20Architecture%20Project%20Update`}
                                className="table-action-pill"
                              >
                                ✉ Email
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 4: DESIGN GALLERY CMS & PHOTO UPLOADER
              =================================================================== */}
          {activeSection === "designs" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">🎨 Design Ideas CMS & Photograph Manager</h1>
                  <p className="admin-page-desc">
                    Manage the 11 room categories, upload real completed interior photographs, and publish new design concepts.
                  </p>
                </div>
                <button
                  className="btn-gold-primary"
                  onClick={handleOpenAddDesign}
                >
                  ➕ Add New Design Idea
                </button>
              </div>

              {/* Category Pills */}
              <div className="admin-panel-card">
                <div className="design-cms-filters-bar">
                  <div className="category-scroll-bar">
                    <button
                      className={`cat-pill-btn ${designCategoryFilter === "ALL" ? "active" : ""}`}
                      onClick={() => setDesignCategoryFilter("ALL")}
                    >
                      All Categories ({designs.length})
                    </button>
                    {OFFICIAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        className={`cat-pill-btn ${
                          designCategoryFilter.toLowerCase() === cat.name.toLowerCase() ? "active" : ""
                        }`}
                        onClick={() => setDesignCategoryFilter(cat.name)}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="search-box-wrap" style={{ marginTop: "12px" }}>
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search design title, ID, style..."
                      value={designSearch}
                      onChange={(e) => setDesignSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-designs-grid" style={{ marginTop: "24px" }}>
                  {filteredDesigns.map((design) => {
                    const hasRealPhoto = Boolean(design.imageUrl && design.imageUrl.trim());

                    return (
                      <div key={design.id} className="admin-design-card">
                        <div className="admin-design-thumb">
                          {hasRealPhoto ? (
                            <img
                              src={
                                design.imageUrl.startsWith("data:") ||
                                design.imageUrl.startsWith("http")
                                  ? design.imageUrl
                                  : `http://localhost:8080${design.imageUrl}`
                              }
                              alt={design.title || design.name}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="thumb-empty-placeholder">
                              📐 CAD / Blueprint Specification Container
                              <div style={{ fontSize: "0.75rem", marginTop: "6px", color: "#e6ca65" }}>
                                Photography Reserved // Upload Real Photo Below
                              </div>
                            </div>
                          )}
                          <span className="thumb-id-tag">{design.id}</span>
                        </div>

                        <div className="admin-design-body">
                          <div className="admin-design-meta">
                            <span>{design.categoryName || design.category}</span>
                            <span>•</span>
                            <span>{design.style}</span>
                          </div>
                          <h4 className="admin-design-title">{design.title || design.name}</h4>
                          <p className="admin-design-specs">
                            {design.leadDescription || design.description || "Architectural specification."}
                          </p>

                          <div className="admin-card-actions">
                            <button
                              type="button"
                              className="upload-photo-cta-btn"
                              onClick={() => handleOpenPhotoModal(design)}
                            >
                              📷 {hasRealPhoto ? "Change Photo" : "Upload Real Photo"}
                            </button>
                            <button
                              type="button"
                              className="btn-delete-card"
                              onClick={() => handleDeleteDesign(design.id)}
                              title="Delete design card"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 5: PROJECTS & MILESTONES MANAGER
              =================================================================== */}
          {activeSection === "projects" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">🏗️ Projects & Turnkey Milestones</h1>
                  <p className="admin-page-desc">
                    Track residential interior execution stages from CAD design to final 45-day turnkey handover.
                  </p>
                </div>
              </div>

              <div className="admin-projects-list">
                {projects.map((proj) => (
                  <div key={proj.id} className="admin-project-detail-card">
                    <div className="project-detail-top">
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                          <span className="project-code-tag">{proj.id}</span>
                          <span className={`status-badge-pill ${proj.status.toLowerCase()}`}>
                            {proj.status}
                          </span>
                        </div>
                        <h2 className="project-detail-title">{proj.title}</h2>
                        <p className="project-detail-client">
                          Client: <strong>{proj.clientName}</strong> • {proj.location} • Scope: {proj.scope}
                        </p>
                      </div>

                      <div className="project-right-meta">
                        <div className="target-handover-box">
                          <span className="label">Target Handover</span>
                          <span className="val">{proj.targetHandover}</span>
                        </div>
                      </div>
                    </div>

                    <div className="progress-section-wrap">
                      <div className="progress-bar-meta">
                        <span>Overall Project Progress</span>
                        <strong>{proj.progressPct}% Completed</strong>
                      </div>
                      <div className="progress-bar-track large">
                        <div
                          className="progress-bar-fill gold"
                          style={{ width: `${proj.progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Milestone Checklist */}
                    <div className="milestones-checklist-container">
                      <h4 className="milestones-heading">Turnkey Milestones (Click to toggle completion)</h4>
                      <div className="milestones-grid">
                        {proj.milestones?.map((m, idx) => (
                          <div
                            key={idx}
                            className={`milestone-check-item ${m.done ? "done" : ""}`}
                            onClick={() => handleToggleProjectMilestone(proj.id, idx)}
                          >
                            <span className="milestone-box">{m.done ? "✓" : "○"}</span>
                            <div className="milestone-info">
                              <span className="milestone-name">{m.name}</span>
                              <span className="milestone-date">{m.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 6: QUOTATIONS & PRICING RULES ENGINE
              =================================================================== */}
          {activeSection === "pricing" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">💰 Quotations & Pricing Rules Engine</h1>
                  <p className="admin-page-desc">
                    Configure base sq.ft rate multipliers, GST rates, guarantee terms, and test instant cost estimation.
                  </p>
                </div>
              </div>

              <div className="pricing-grid-layout">
                {/* Rules Form */}
                <div className="admin-panel-card">
                  <h3 className="panel-title">Base Rate Multipliers (₹ / sq.ft)</h3>
                  <p className="panel-sub">
                    These rates drive the public cost estimator and proposal generation.
                  </p>

                  <form onSubmit={handleSavePricingRules} className="pricing-rules-form">
                    <div className="form-row-grid">
                      <div className="form-group">
                        <label>Essential Tier (₹/sq.ft)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.essentialRatePerSqft}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              essentialRatePerSqft: Number(e.target.value)
                            })
                          }
                        />
                        <span className="field-hint">BWP 710 marine ply, premium laminates</span>
                      </div>

                      <div className="form-group">
                        <label>Signature Tier (₹/sq.ft)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.signatureRatePerSqft}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              signatureRatePerSqft: Number(e.target.value)
                            })
                          }
                        />
                        <span className="field-hint">German Blum fittings, acrylic & veneer</span>
                      </div>

                      <div className="form-group">
                        <label>Couture Luxury Tier (₹/sq.ft)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.coutureRatePerSqft}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              coutureRatePerSqft: Number(e.target.value)
                            })
                          }
                        />
                        <span className="field-hint">Italian marble, acoustic fluted panels</span>
                      </div>
                    </div>

                    <div className="form-row-grid" style={{ marginTop: "16px" }}>
                      <div className="form-group">
                        <label>Applicable GST Rate (%)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.gstRatePercent}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              gstRatePercent: Number(e.target.value)
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Default Studio Margin / Discount (%)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.discountPercent}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              discountPercent: Number(e.target.value)
                            })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Guaranteed Turnkey Days</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={pricingRules.handoverDaysGuaranteed}
                          onChange={(e) =>
                            setPricingRules({
                              ...pricingRules,
                              handoverDaysGuaranteed: Number(e.target.value)
                            })
                          }
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-gold-primary" style={{ marginTop: "20px" }}>
                      💾 Save Pricing Rules to Database
                    </button>
                  </form>
                </div>

                {/* Live Estimator Testbench */}
                <div className="admin-panel-card">
                  <h3 className="panel-title">🧮 Live Calculator Testbench</h3>
                  <p className="panel-sub">
                    Verify quotation calculations before publishing to clients.
                  </p>

                  <div className="testbench-box">
                    <div className="testbench-inputs">
                      <div className="form-group">
                        <label>Total Built-up Area (sq.ft)</label>
                        <input
                          type="number"
                          className="admin-input"
                          value={testCalcSqft}
                          onChange={(e) => setTestCalcSqft(Number(e.target.value))}
                        />
                      </div>

                      <div className="form-group">
                        <label>Selected Specification Grade</label>
                        <select
                          className="admin-input"
                          value={testCalcGrade}
                          onChange={(e) => setTestCalcGrade(e.target.value)}
                        >
                          <option value="essential">Essential (₹{pricingRules.essentialRatePerSqft}/sq.ft)</option>
                          <option value="signature">Signature (₹{pricingRules.signatureRatePerSqft}/sq.ft)</option>
                          <option value="couture">Couture (₹{pricingRules.coutureRatePerSqft}/sq.ft)</option>
                        </select>
                      </div>
                    </div>

                    {/* Calculated Outcome */}
                    {(() => {
                      const rate =
                        testCalcGrade === "couture"
                          ? pricingRules.coutureRatePerSqft
                          : testCalcGrade === "essential"
                          ? pricingRules.essentialRatePerSqft
                          : pricingRules.signatureRatePerSqft;
                      const rawBase = testCalcSqft * rate;
                      const lowEstimate = rawBase * 0.95;
                      const highEstimate = rawBase * 1.08;
                      const gstAmount = rawBase * (pricingRules.gstRatePercent / 100);

                      return (
                        <div className="testbench-result-card">
                          <span className="result-label">ESTIMATED PROPOSAL RANGE</span>
                          <h2 className="result-price">
                            ₹{(lowEstimate / 100000).toFixed(2)}L – ₹{(highEstimate / 100000).toFixed(2)} Lakhs
                          </h2>
                          <div className="result-details">
                            <div>Base Subtotal: ₹{(rawBase / 100000).toFixed(2)} Lakhs</div>
                            <div>Estimated GST ({pricingRules.gstRatePercent}%): ₹{(gstAmount / 100000).toFixed(2)} Lakhs</div>
                            <div>Handover Commitment: {pricingRules.handoverDaysGuaranteed} Days</div>
                            <div>Warranty: {pricingRules.warrantyYears} Years Comprehensive</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 7: STUDIO & SERVICES INFORMATION
              =================================================================== */}
          {activeSection === "studio" && (
            <div className="admin-page-container">
              <div className="admin-page-hero">
                <div>
                  <h1 className="admin-page-title">🏛️ Flagship Studio & Services Profile</h1>
                  <p className="admin-page-desc">
                    Manage official Guntur Flagship Studio contact details, operating hours, and core service offerings.
                  </p>
                </div>
              </div>

              <div className="admin-panel-card">
                <form onSubmit={handleSaveStudioInfo} className="studio-info-form">
                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Studio Brand Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={studioInfo.name}
                        onChange={(e) => setStudioInfo({ ...studioInfo, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>City & Territory</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={studioInfo.city}
                        onChange={(e) => setStudioInfo({ ...studioInfo, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "16px" }}>
                    <label>Flagship Studio Physical Address (Guntur)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={studioInfo.experienceCenter}
                      onChange={(e) =>
                        setStudioInfo({ ...studioInfo, experienceCenter: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-row-grid" style={{ marginTop: "16px" }}>
                    <div className="form-group">
                      <label>Concierge Phone</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={studioInfo.phone}
                        onChange={(e) =>
                          setStudioInfo({ ...studioInfo, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>WhatsApp Consultation Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={studioInfo.whatsappNumber}
                        onChange={(e) =>
                          setStudioInfo({ ...studioInfo, whatsappNumber: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Official Concierge Email</label>
                      <input
                        type="email"
                        className="admin-input"
                        value={studioInfo.email}
                        onChange={(e) =>
                          setStudioInfo({ ...studioInfo, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "16px" }}>
                    <label>Studio Visiting Hours</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={studioInfo.workingHours}
                      onChange={(e) =>
                        setStudioInfo({ ...studioInfo, workingHours: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="btn-gold-primary" style={{ marginTop: "20px" }}>
                    💾 Save Studio Profile
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================================
          MODAL: ADD NEW DESIGN CARD
          ===================================================================== */}
      {isAddDesignOpen && (
        <div className="modal-backdrop-overlay" onClick={() => !isPublishing && setIsAddDesignOpen(false)}>
          <div
            className="consultation-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "620px" }}
          >
            <div className="consultation-modal-header">
              <h3>➕ Add New Architectural Design Card</h3>
              <button
                className="modal-close-btn"
                onClick={() => !isPublishing && setIsAddDesignOpen(false)}
                disabled={isPublishing}
              >
                ✕
              </button>
            </div>

            {formError && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  margin: "12px 0",
                  fontSize: "0.88rem"
                }}
              >
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleCreateDesignSubmit} className="admin-modal-form">
              <div className="form-row-grid">
                <div>
                  <label className="modal-label">Design ID (Auto-generated or Custom)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. LIV-101"
                    value={newDesign.id}
                    onChange={(e) => {
                      setIdOverriddenByUser(true);
                      setNewDesign({ ...newDesign, id: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className="modal-label">Design Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-input"
                    placeholder="e.g. Italian Calacatta Marble Living Salon"
                    value={newDesign.title}
                    onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-grid" style={{ marginTop: "12px" }}>
                <div>
                  <label className="modal-label">Category *</label>
                  <select
                    className="admin-input"
                    value={newDesign.categoryName}
                    onChange={handleCategoryChange}
                  >
                    {OFFICIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="modal-label">Style *</label>
                  <select
                    className="admin-input"
                    value={newDesign.style}
                    onChange={(e) => setNewDesign({ ...newDesign, style: e.target.value })}
                  >
                    {INTERIOR_STYLES.filter((s) => s !== "All").map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-grid" style={{ marginTop: "12px" }}>
                <div>
                  <label className="modal-label">Budget Tier</label>
                  <select
                    className="admin-input"
                    value={newDesign.budgetTier}
                    onChange={(e) =>
                      setNewDesign({ ...newDesign, budgetTier: e.target.value })
                    }
                  >
                    <option value="Essential">Essential (₹1,450/sq.ft)</option>
                    <option value="Signature">Signature (₹1,950/sq.ft)</option>
                    <option value="Couture">Couture (₹2,850/sq.ft)</option>
                  </select>
                </div>
                <div>
                  <label className="modal-label">Handover Timeline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newDesign.handoverTimeline}
                    onChange={(e) =>
                      setNewDesign({ ...newDesign, handoverTimeline: e.target.value })
                    }
                  />
                </div>
              </div>

              <div style={{ marginTop: "12px" }}>
                <label className="modal-label">Lead Description *</label>
                <textarea
                  rows={3}
                  required
                  className="admin-input"
                  placeholder="Describe architectural elements, materials, lighting..."
                  value={newDesign.leadDescription}
                  onChange={(e) =>
                    setNewDesign({ ...newDesign, leadDescription: e.target.value })
                  }
                />
              </div>

              <div style={{ marginTop: "12px" }}>
                <label className="modal-label">Design Photograph (Upload Real File or Paste URL)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Paste direct image URL (https://...)"
                  value={newDesignUrl}
                  onChange={(e) => setNewDesignUrl(e.target.value)}
                />
                <div style={{ marginTop: "8px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewDesignFileChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#111419",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "6px",
                      color: "#fff"
                    }}
                  />
                </div>

                {newDesignPreview && (
                  <div
                    style={{
                      position: "relative",
                      marginTop: "10px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      maxHeight: "180px"
                    }}
                  >
                    <img
                      src={newDesignPreview}
                      alt="Selected Preview"
                      style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
                    />
                    <button
                      type="button"
                      onClick={handleClearNewDesignFile}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(0, 0, 0, 0.75)",
                        color: "#ef4444",
                        border: "1px solid rgba(239, 68, 68, 0.5)",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "600"
                      }}
                    >
                      ✕ Remove Photo
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-gold-primary full-width"
                style={{ marginTop: "18px" }}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <span>⏳ {publishStatusText || "Publishing Design..."}</span>
                ) : (
                  <span>✨ Publish Architectural Design</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: UPLOAD / EDIT PHOTOGRAPH
          ===================================================================== */}
      {photoModalTarget && (
        <div className="modal-backdrop-overlay" onClick={() => setPhotoModalTarget(null)}>
          <div
            className="consultation-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "520px" }}
          >
            <div className="consultation-modal-header">
              <h3>📷 Upload Real Photograph</h3>
              <button className="modal-close-btn" onClick={() => setPhotoModalTarget(null)}>
                ✕
              </button>
            </div>

            <div style={{ padding: "16px 0" }}>
              <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 14px 0" }}>
                Updating visual imagery for: <strong>{photoModalTarget.title || photoModalTarget.name}</strong> ({photoModalTarget.id})
              </p>

              {photoPreview && (
                <div className="modal-preview-img-box">
                  <img src={photoPreview} alt="Preview" className="preview-img" />
                </div>
              )}

              <div className="form-group" style={{ marginTop: "12px" }}>
                <label className="modal-label">Option A: Upload Image File (JPEG, PNG, WebP)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileUpload}
                  style={{ width: "100%", padding: "8px", background: "#111419", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#fff" }}
                />
              </div>

              <div className="form-group" style={{ marginTop: "12px" }}>
                <label className="modal-label">Option B: Direct Image URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://..."
                  value={photoInputUrl}
                  onChange={(e) => {
                    setPhotoInputUrl(e.target.value);
                    setPhotoPreview(e.target.value);
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn-gold-primary"
                  style={{ flex: 1 }}
                  disabled={uploadingId !== null}
                  onClick={handleSavePhotoModal}
                >
                  {uploadingId ? "Saving..." : "Save Photograph"}
                </button>
                <button
                  type="button"
                  className="portal-btn-secondary"
                  onClick={() => setPhotoModalTarget(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER / MODAL: ENQUIRY DETAILS
          ===================================================================== */}
      {selectedEnquiryForDetail && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedEnquiryForDetail(null)}
        >
          <div
            className="consultation-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "560px" }}
          >
            <div className="consultation-modal-header">
              <h3>Enquiry Details: {selectedEnquiryForDetail.enquiryCode}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedEnquiryForDetail(null)}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="enquiry-detail-row">
                <span className="detail-label">Client Name:</span>
                <strong className="detail-val">{selectedEnquiryForDetail.customerName}</strong>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-val">{selectedEnquiryForDetail.phone}</span>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-val">{selectedEnquiryForDetail.email || "N/A"}</span>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">City:</span>
                <span className="detail-val">{selectedEnquiryForDetail.city || "Guntur"}</span>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">Room / Scope:</span>
                <span className="detail-val">{selectedEnquiryForDetail.roomType || "Full Home Interiors"}</span>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">Budget Range:</span>
                <span className="detail-val">{selectedEnquiryForDetail.budgetRange || "Standard"}</span>
              </div>

              <div className="enquiry-detail-row">
                <span className="detail-label">Status:</span>
                <select
                  className={`status-select status-${(selectedEnquiryForDetail.status || "NEW").toLowerCase()}`}
                  value={selectedEnquiryForDetail.status || "NEW"}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiryForDetail.id, e.target.value)
                  }
                >
                  <option value="NEW">New</option>
                  <option value="IN_REVIEW">In-Review</option>
                  <option value="IN_PROGRESS">In-Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              {selectedEnquiryForDetail.notes && (
                <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px", borderRadius: "8px" }}>
                  <span className="detail-label" style={{ display: "block", marginBottom: "4px" }}>
                    Client Notes / Special Requirements:
                  </span>
                  <p style={{ margin: 0, color: "#e5e7eb", fontSize: "0.9rem" }}>
                    {selectedEnquiryForDetail.notes}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <a
                  href={`https://wa.me/${(selectedEnquiryForDetail.phone || "").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-primary full-width"
                  style={{ textAlign: "center", textDecoration: "none" }}
                >
                  💬 Open WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
