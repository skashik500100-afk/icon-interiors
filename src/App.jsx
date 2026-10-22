import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GallerySection from "./components/GallerySection";
import BeforeAfterSection from "./components/BeforeAfterSection";
import RoomCustomizer from "./components/RoomCustomizer";
import CostEstimator from "./components/CostEstimator";
import AboutServicesSection from "./components/AboutServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AIStudioModal from "./components/AIStudioModal";
import FavoritesDrawer from "./components/FavoritesDrawer";
import { getStoredGeminiKey } from "./services/apiService";
import "./App.css";

function App() {
  const [isAIStudioOpen, setIsAIStudioOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("icon_user_favorites");
      return saved ? JSON.parse(saved) : ["des-1", "des-2", "des-3"];
    } catch {
      return ["des-1", "des-2", "des-3"];
    }
  });
  const [hasApiKey, setHasApiKey] = useState(Boolean(getStoredGeminiKey()));

  useEffect(() => {
    try {
      localStorage.setItem("icon_user_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Failed to persist favorites:", e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const handleKeysUpdated = () => {
    setHasApiKey(Boolean(getStoredGeminiKey()));
  };

  return (
    <div className="icon-luxury-app">
      {/* Navbar */}
      <Navbar
        onOpenAIStudio={() => setIsAIStudioOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
        hasApiKey={hasApiKey}
      />

      <main>
        {/* Editorial Hero */}
        <HeroSection onOpenAIStudio={() => setIsAIStudioOpen(true)} />

        {/* Mega Gallery: All Types of Home Designs */}
        <GallerySection
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenAIStudio={() => setIsAIStudioOpen(true)}
        />

        {/* Interactive Before & After Renovation Slider */}
        <BeforeAfterSection />

        {/* Interactive Tactile Material Studio */}
        <RoomCustomizer />

        {/* Interactive Home Cost & Package Estimator */}
        <CostEstimator />

        {/* About & 4-Step Architectural Process */}
        <AboutServicesSection />

        {/* Homeowner Testimonials */}
        <TestimonialsSection />

        {/* Luxury Consultation Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAIStudio={() => setIsAIStudioOpen(true)} />

      {/* Floating Action Button for Quick AI Studio Launch */}
      <div className="floating-actions-bar">
        <button
          className="floating-ai-btn"
          onClick={() => setIsAIStudioOpen(true)}
          title="Open Gemini AI Interior Designer"
        >
          <span className="sparkle-anim">✦</span>
          <span>Gemini AI Studio</span>
          <span className={`fab-key-dot ${hasApiKey ? "active" : ""}`} />
        </button>

        <a
          href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20consult%20with%20an%20architect%20about%20my%20home%20design."
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp-btn"
          title="Direct WhatsApp Consultation"
          aria-label="Direct WhatsApp Consultation"
        >
          <span>💬 WhatsApp</span>
        </a>
      </div>

      {/* AI Studio & API Key Modal */}
      <AIStudioModal
        isOpen={isAIStudioOpen}
        onClose={() => setIsAIStudioOpen(false)}
        onKeysUpdated={handleKeysUpdated}
      />

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
