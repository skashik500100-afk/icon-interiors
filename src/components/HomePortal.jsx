import HeroSection from "./HeroSection";

export default function HomePortal({ onNavigate }) {
  const quickLinks = [
    {
      title: "Design Ideas",
      subtitle: "10+ High-Resolution Curated Designs Per Room",
      action: () => onNavigate("design-ideas", "Master Bedroom Designs"),
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "How It Works",
      subtitle: "Your Dream Home in 5 Simple Milestone Steps",
      action: () => onNavigate("how-it-works"),
      tag: "5 Steps",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Modular Journey",
      subtitle: "German Precision CNC Joinery & BWP 710 Plywood",
      action: () => onNavigate("modular-journey"),
      tag: "German Joinery",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Price Calculators",
      subtitle: "Instant Transparent Cost Estimates & Material Customizer",
      action: () => onNavigate("price-calculators"),
      tag: "Instant Quote",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Guntur Flagship Store",
      subtitle: "Visit Our 4,500 sq.ft Experience Center in Syamala Nagar",
      action: () => onNavigate("store-locator"),
      tag: "Exclusive Guntur",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="home-portal-container">
      {/* Editorial Hero */}
      <HeroSection onNavigate={onNavigate} />

      {/* Quick Menu Selection Cards */}
      <section className="home-portal-shortcuts">
        <div className="portal-shortcuts-header">
          <span className="section-eyebrow">EXPLORE BY SECTION</span>
          <h2>Select a category to view bespoke details</h2>
          <p>Click any option to view its dedicated showcase.</p>
        </div>

        <div className="portal-cards-grid">
          {quickLinks.map((item) => (
            <div
              key={item.title}
              className="portal-shortcut-card"
              onClick={item.action}
            >
              <div className="portal-card-thumb">
                <img src={item.image} alt={item.title} />
                <span className="portal-tag">{item.tag}</span>
              </div>
              <div className="portal-card-body">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <span className="portal-link-arrow">Open Section ›</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
