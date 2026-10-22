import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePortal from "./components/HomePortal";
import DesignIdeasView from "./components/DesignIdeasView";
import HowItWorksView from "./components/HowItWorksView";
import ModularJourneySection from "./components/ModularJourneySection";
import CostEstimator from "./components/CostEstimator";
import RoomCustomizer from "./components/RoomCustomizer";
import StoreLocatorView from "./components/StoreLocatorView";
import Footer from "./components/Footer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import "./App.css";
import "./Views.css";

function App() {
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'design-ideas' | 'how-it-works' | 'modular-journey' | 'price-calculators' | 'store-locator'
  const [currentCategory, setCurrentCategory] = useState("Master Bedroom Designs");
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("icon_selected_city") || "Guntur, AP";
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("icon_user_favorites");
      return saved ? JSON.parse(saved) : ["mbr-1", "mbr-2", "kit-1"];
    } catch {
      return ["mbr-1", "mbr-2", "kit-1"];
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

  return (
    <div className="icon-luxury-app">
      {/* 2-Tier Livspace-Style Luxury Navbar with Clean View Routing */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
      />

      <main className="main-view-container">
        {/* VIEW 1: HOME PORTAL */}
        {currentView === "home" && (
          <HomePortal onNavigate={handleNavigate} />
        )}

        {/* VIEW 2: DESIGN IDEAS (Matching Image 2 with 10+ images) */}
        {currentView === "design-ideas" && (
          <DesignIdeasView
            category={currentCategory}
            onSelectCategory={setCurrentCategory}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            selectedCity={selectedCity}
          />
        )}

        {/* VIEW 3: HOW IT WORKS (Matching Image 5: 5 Steps) */}
        {currentView === "how-it-works" && (
          <HowItWorksView
            onNavigate={handleNavigate}
            selectedCity={selectedCity}
          />
        )}

        {/* VIEW 4: THE MODULAR JOURNEY (Matching Image 3 & 4) */}
        {currentView === "modular-journey" && (
          <ModularJourneySection selectedCity={selectedCity} />
        )}

        {/* VIEW 5: PRICE CALCULATORS & ROOM CUSTOMIZER */}
        {currentView === "price-calculators" && (
          <div className="calculators-page-wrap">
            <CostEstimator />
            <RoomCustomizer />
          </div>
        )}

        {/* VIEW 6: STORE LOCATOR (Exclusively Guntur City Flagship) */}
        {currentView === "store-locator" && (
          <StoreLocatorView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Footer on all views */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action WhatsApp Button for Instant Consultation in Guntur */}
      <div className="floating-actions-bar">
        <a
          href={`https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20consult%20with%20your%20Guntur%20architectural%20team%20regarding%20my%20home%20design.`}
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

      {/* Saved Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

export default App;
