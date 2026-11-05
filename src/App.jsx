import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import HomePortal from "./components/HomePortal";
import DesignIdeasView from "./components/DesignIdeasView";
import ServicesView from "./components/ServicesView";
import ProjectsView from "./components/ProjectsView";
import AIMakeoverView from "./components/AIMakeoverView";
import CostEstimator from "./components/CostEstimator";
import RoomCustomizer from "./components/RoomCustomizer";
import CitiesView from "./components/CitiesView";
import StoreLocatorView from "./components/StoreLocatorView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import Footer from "./components/Footer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import GlobalSearchModal from "./components/GlobalSearchModal";
import ConsultationModal from "./components/ConsultationModal";
import AuthModal from "./components/AuthModal";
import AdminPortalView from "./components/AdminPortalView";
import ClientPortalView from "./components/ClientPortalView";
import { BUSINESS_INFO, DESIGNS_DATABASE } from "./data/designsData";
import { api, isAdmin } from "./services/api";
import "./App.css";
import "./Views.css";

const HouseConstructionIntro = lazy(() => import("./components/HouseConstructionIntro"));

function App() {
  // Navigation State
  // Views: 'home' | 'design-ideas' | 'services' | 'projects' | 'ai-makeover' | 'cost-estimator' | 'cities' | 'store-locator' | 'about' | 'contact'
  const [currentView, setCurrentView] = useState("home");
  const [currentCategory, setCurrentCategory] = useState("Bedroom");

  // Modals & Drawers
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [consultationPreselect, setConsultationPreselect] = useState(null);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("icon_user_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Selected City & Favorites Persistence
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("icon_selected_city") || "Guntur, AP";
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("icon_user_favorites");
      return saved ? JSON.parse(saved) : ["BED-101", "LIV-201", "KIT-301"];
    } catch {
      return ["BED-101", "LIV-201", "KIT-301"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("icon_user_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Failed to persist favorites:", e);
    }
  }, [favorites]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem("icon_selected_city", city);
  };

  const handleNavigate = (view, payload) => {
    setCurrentView(view);
    if (view === "design-ideas" && payload) {
      setCurrentCategory(payload);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const handleOpenConsultationWithDesign = (design) => {
    setConsultationPreselect(design);
    setIsConsultationOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("icon_user_session", JSON.stringify(user));
    } catch (e) {
      console.warn("Failed to store user session:", e);
    }
    // Direct Role-Based Navigation: Admins land on Admin Dashboard; Customers land on Home/Account
    if (isAdmin(user)) {
      setCurrentView("admin");
    } else {
      setCurrentView("home");
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    try {
      localStorage.removeItem("icon_user_session");
    } catch (e) {
      console.warn("Failed to clear session:", e);
    }
    setCurrentView("home");
  };

  // Dedicated Full-Screen Enterprise Studio Admin Suite
  if (currentView === "admin" && isAdmin(currentUser)) {
    return (
      <div className="icon-luxury-app">
        <AdminPortalView
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          currentUser={currentUser}
        />
        {/* Global Modals for Admin */}
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => {
            setIsConsultationOpen(false);
            setConsultationPreselect(null);
          }}
          preselectedDesign={consultationPreselect}
          selectedCity={selectedCity}
        />
      </div>
    );
  }

  return (
    <div className="icon-luxury-app">
      {/* =====================================================================
          PERSISTENT ADMIN BANNER (WHEN ADMIN IS BROWSING PUBLIC WEBSITE)
          ===================================================================== */}
      {isAdmin(currentUser) && (
        <div className="admin-browsing-banner">
          <div className="admin-banner-inner">
            <div className="admin-banner-left">
              <span className="admin-banner-crest">👑</span>
              <span className="admin-banner-text">
                <strong>Studio Admin Mode Active:</strong> Browsing live customer website as Principal Architect ({currentUser?.name || currentUser?.fullName || "Admin"}).
              </span>
            </div>
            <div className="admin-banner-right">
              <button
                className="admin-banner-btn-dashboard"
                onClick={() => handleNavigate("admin")}
              >
                ⚡ Return to Admin Dashboard ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          REDESIGNED LUXURY NAVBAR
          ===================================================================== */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenConsultation={() => {
          setConsultationPreselect(null);
          setIsConsultationOpen(true);
        }}
        currentUser={currentUser}
      />

      {/* =====================================================================
          MAIN VIEW ROUTING CONTAINER
          ===================================================================== */}
      <main className="main-view-container">
        {/* VIEW 1: HOME PORTAL (Full 14-Section Conversion Homepage) */}
        {currentView === "home" && (
          <HomePortal
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
            selectedCity={selectedCity}
          />
        )}

        {/* VIEW 2: SMART DESIGN IDEAS GALLERY (11 Categories, Neutral Placeholders) */}
        {currentView === "design-ideas" && (
          <DesignIdeasView
            category={currentCategory}
            onSelectCategory={setCurrentCategory}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            selectedCity={selectedCity}
            onOpenEnquiry={handleOpenConsultationWithDesign}
            currentUser={currentUser}
          />
        )}

        {/* VIEW 3: OUR SERVICES */}
        {currentView === "services" && (
          <ServicesView
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
          />
        )}

        {/* VIEW 4: COMPLETED PROJECTS */}
        {currentView === "projects" && (
          <ProjectsView
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
          />
        )}

        {/* VIEW 5: AI ROOM MAKEOVER */}
        {currentView === "ai-makeover" && (
          <AIMakeoverView
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
          />
        )}

        {/* VIEW 6: COST ESTIMATOR & ROOM CUSTOMIZER */}
        {currentView === "cost-estimator" && (
          <div className="calculators-page-wrap">
            <CostEstimator />
            <RoomCustomizer />
          </div>
        )}

        {/* VIEW 7: CITIES WE SERVE (5 States Preserved) */}
        {currentView === "cities" && (
          <CitiesView
            onNavigate={handleNavigate}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        )}

        {/* VIEW 8: STORE LOCATOR (Guntur Flagship Experience Center) */}
        {currentView === "store-locator" && (
          <StoreLocatorView onNavigate={handleNavigate} />
        )}

        {/* VIEW 9: ABOUT US */}
        {currentView === "about" && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
          />
        )}

        {/* VIEW 10: CONTACT & DIRECT CONSULTATION */}
        {currentView === "contact" && (
          <ContactView
            selectedCity={selectedCity}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW 11: RESTRICTED ADMIN CMS (Access Denied for Non-Admin Guests/Customers) */}
        {currentView === "admin" && !isAdmin(currentUser) && (
          <div className="access-denied-view">
            <div className="access-denied-card">
              <div className="access-denied-icon">🛡️</div>
              <h2>Access Denied — Restricted Studio Area</h2>
              <p>
                The Studio Admin Suite requires verified administrative credentials (ROLE_ADMIN).
                Customers and guest visitors are restricted from management controls.
              </p>
              <div className="access-denied-actions">
                <button
                  className="btn-gold-primary"
                  onClick={() => handleNavigate("home")}
                >
                  ← Return to Homepage
                </button>
                <button
                  className="portal-btn-secondary"
                  onClick={() => setIsAuthOpen(true)}
                >
                  Log In as Administrator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 12: CLIENT PROJECT & CONSULTATION HUB */}
        {currentView === "client-portal" && (
          <ClientPortalView
            currentUser={currentUser}
            favorites={DESIGNS_DATABASE.filter((d) => favorites.includes(d.id))}
            onNavigate={handleNavigate}
            onOpenConsultation={() => {
              setConsultationPreselect(null);
              setIsConsultationOpen(true);
            }}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* =====================================================================
          PERSISTENT LUXURY FOOTER
          ===================================================================== */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => {
          setConsultationPreselect(null);
          setIsConsultationOpen(true);
        }}
      />

      {/* =====================================================================
          FLOATING ACTION WHATSAPP BUTTON (Guntur Direct Helpline)
          ===================================================================== */}
      <div className="floating-actions-bar">
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20consult%20with%20your%20architectural%20team.`}
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp-btn"
          title="Direct WhatsApp Consultation - Guntur Flagship Studio"
          aria-label="Direct WhatsApp Consultation"
        >
          <span className="wa-icon">💬</span>
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* =====================================================================
          GLOBAL MODALS & DRAWERS
          ===================================================================== */}
      {/* 1. Saved Favorites Moodboard Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />

      {/* 2. Global Architectural Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 3. Free Consultation Enquiry Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationPreselect(null);
        }}
        preselectedDesign={consultationPreselect}
        selectedCity={selectedCity}
      />

      {/* 4. Customer Login / Registration Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {/* =====================================================================
          3D ARCHITECTURAL HOUSE CONSTRUCTION INTRO ANIMATION
          (Plays once per session, code-split via React.lazy)
          ===================================================================== */}
      <Suspense fallback={null}>
        <HouseConstructionIntro />
      </Suspense>
    </div>
  );
}

export default App;
