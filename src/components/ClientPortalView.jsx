import { useState, useEffect } from "react";
import { api } from "../services/api";
import { BUSINESS_INFO } from "../data/designsData";
import "./Portals.css";

export default function ClientPortalView({
  currentUser,
  favorites = [],
  onNavigate,
  onOpenConsultation,
  onLogout
}) {
  const [myEnquiries, setMyEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const clientName = currentUser?.name || currentUser?.fullName || "Valued Client";
  const clientEmail = currentUser?.email || "";

  useEffect(() => {
    async function fetchUserEnquiries() {
      setLoading(false);
      try {
        const all = await api.getAllEnquiries();
        if (Array.isArray(all)) {
          // Filter enquiries that match this user's email or name
          const matched = all.filter(
            (e) =>
              (clientEmail && e.email && e.email.toLowerCase() === clientEmail.toLowerCase()) ||
              (e.customerName && e.customerName.toLowerCase().includes(clientName.toLowerCase().split(" ")[0]))
          );
          setMyEnquiries(matched.length > 0 ? matched : all.slice(0, 2)); // Show recent consultations
        }
      } catch (err) {
        console.error("Failed to load user consultations", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserEnquiries();
  }, [clientEmail, clientName]);

  return (
    <div className="portal-root">
      <div className="portal-container">
        {/* ===================================================================
            CLIENT HERO WELCOME BANNER
            =================================================================== */}
        <div className="client-hero-card">
          <div className="client-hero-info">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span className="portal-role-tag client">ROLE_CUSTOMER</span>
              <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                Client ID #ICON-CUST-{currentUser?.id || "2026"}
              </span>
            </div>
            <h2>Welcome back, {clientName}</h2>
            <p>
              Track your ongoing residential interior transformations, review CAD proposals, and collaborate directly with our Guntur flagship architectural studio.
            </p>
            <div className="client-badges">
              <span className="client-badge-item">📍 Guntur Flagship Studio</span>
              <span className="client-badge-item">🛡️ 10-Year Comprehensive Warranty</span>
              <span className="client-badge-item">⏱️ Guaranteed 45-Day Handover</span>
            </div>
          </div>

          <div className="client-hero-actions">
            <button
              className="btn-gold-primary"
              onClick={onOpenConsultation}
            >
              + Book New Site Consultation
            </button>
            <button className="portal-btn-secondary" onClick={() => onNavigate("home")}>
              Browse Portfolio
            </button>
            <button className="portal-btn-logout" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </div>

        {/* ===================================================================
            FOUR-STAGE TURNKEY ARCHITECTURAL PIPELINE TRACKER
            =================================================================== */}
        <div className="portal-card-section">
          <div className="portal-card-header">
            <h2>🏡 Your Architectural Transformation Journey</h2>
          </div>

          <div className="pipeline-steps-wrap">
            <div className="pipeline-step active">
              <div className="pipeline-step-num">STAGE 01 • COMPLETED</div>
              <div className="pipeline-step-title">Architectural Consultation</div>
              <div className="pipeline-step-desc">
                Site dimension mapping, lifestyle profiling, and space planning completed.
              </div>
            </div>

            <div className="pipeline-step active">
              <div className="pipeline-step-num">STAGE 02 • IN PROGRESS</div>
              <div className="pipeline-step-title">3D CAD & Material Sampling</div>
              <div className="pipeline-step-desc">
                Reviewing Italian marble, acrylic laminates, and acoustic timber veneers at Guntur Studio.
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-step-num">STAGE 03 • UPCOMING</div>
              <div className="pipeline-step-title">German Precision Joinery</div>
              <div className="pipeline-step-desc">
                BWP 710 marine ply carcass fabrication with Blum Servo-Drive hardware integration.
              </div>
            </div>

            <div className="pipeline-step">
              <div className="pipeline-step-num">STAGE 04 • FINAL MILE</div>
              <div className="pipeline-step-title">45-Day Move-in Handover</div>
              <div className="pipeline-step-desc">
                Deep cleaning, zero-VOC air quality audit, and 10-year warranty certificate delivery.
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            ACTIVE CONSULTATIONS & ENQUIRIES TABLE
            =================================================================== */}
        <div className="portal-card-section">
          <div className="portal-card-header">
            <h2>📋 My Active Consultation Requests</h2>
            <button
              className="portal-btn-secondary"
              style={{ fontSize: "0.8rem" }}
              onClick={onOpenConsultation}
            >
              + Schedule Another Visit
            </button>
          </div>

          {loading ? (
            <div className="empty-state-card">Loading consultation history...</div>
          ) : myEnquiries.length === 0 ? (
            <div className="empty-state-card">
              <div className="empty-state-icon">🛋️</div>
              <h3>No consultation requests yet</h3>
              <p>Schedule a visit with our Guntur Principal Architect team to get started.</p>
              <button
                className="btn-gold-primary"
                style={{ marginTop: "12px" }}
                onClick={onOpenConsultation}
              >
                Book Free Consultation
              </button>
            </div>
          ) : (
            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Ref Code</th>
                    <th>Scope / Category</th>
                    <th>Budget Tier</th>
                    <th>City / Studio</th>
                    <th>Status</th>
                    <th>Architect Assistance</th>
                  </tr>
                </thead>
                <tbody>
                  {myEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>
                        <strong style={{ color: "#e6ca65", fontFamily: "monospace" }}>
                          {enq.enquiryCode || `ENQ-${enq.id}`}
                        </strong>
                      </td>
                      <td>
                        <strong>{enq.roomType || "Full Home Interiors"}</strong>
                        {enq.notes && (
                          <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "2px" }}>
                            "{enq.notes}"
                          </div>
                        )}
                      </td>
                      <td>{enq.budgetRange || "Signature (₹1,950/sq.ft)"}</td>
                      <td>{enq.city || "Guntur Flagship Studio"}</td>
                      <td>
                        <span className={`status-badge ${(enq.status || "new").toLowerCase().replace(/_/g, "-")}`}>
                          {enq.status === "NEW" ? "New" : enq.status === "IN_REVIEW" ? "In-Review" : enq.status === "IN_PROGRESS" ? "In-Progress" : enq.status === "COMPLETED" ? "Completed" : (enq.status || "New")}
                        </span>
                      </td>
                      <td>
                        <a
                          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20ICON%20INTERIORS!%20I%20am%20inquiring%20about%20my%20consultation%20${enq.enquiryCode || enq.id}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="table-wa-btn"
                        >
                          💬 WhatsApp Studio
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===================================================================
            SAVED FAVORITES MOODBOARD
            =================================================================== */}
        <div className="portal-card-section">
          <div className="portal-card-header">
            <h2>⭐ My Curated Moodboard Wishlist ({favorites.length})</h2>
            <button className="portal-btn-secondary" onClick={() => onNavigate("design-ideas")}>
              Browse Full Catalog ›
            </button>
          </div>

          {favorites.length === 0 ? (
            <div className="empty-state-card">
              <div className="empty-state-icon">⭐</div>
              <h3>Your moodboard is currently empty</h3>
              <p>Explore our 11 design categories and click the heart icon on any design to bookmark it here.</p>
              <button
                className="btn-gold-primary"
                style={{ marginTop: "12px" }}
                onClick={() => onNavigate("design-ideas")}
              >
                Explore Design Ideas
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  style={{
                    background: "rgba(13, 16, 22, 0.9)",
                    border: "1px solid rgba(197, 160, 89, 0.25)",
                    borderRadius: "10px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#e6ca65", fontWeight: 700 }}>
                    {fav.id} • {fav.category}
                  </span>
                  <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{fav.name || fav.title}</strong>
                  <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{fav.style}</span>
                  <button
                    className="portal-btn-secondary"
                    style={{ marginTop: "10px", fontSize: "0.78rem", padding: "6px 10px" }}
                    onClick={() => onNavigate("design-ideas", fav.category)}
                  >
                    View in Gallery
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
