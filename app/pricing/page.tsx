"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function PricingPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    };

    loadUser();
  }, [supabase]);

  async function startCheckout(plan: "pro" | "unlimited") {
    try {
      if (!email) {
        alert("Please log in to your account first.");
        window.location.href = "/auth";
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Payment error.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert("Missing checkout URL.");
    } catch (error) {
      console.error("Checkout fetch error:", error);
      alert("Stripe connection problem.");
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.overlay} />

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Pricing Plans</h1>
          <p style={styles.subtitle}>
            Unlock deeper analysis, advanced metrics, AI insights and premium market tools.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div>
              <div style={styles.planName}>Basic</div>
              <div style={styles.price}>Free</div>
              <p style={styles.planText}>Best for testing the platform and getting started.</p>

              <div style={styles.features}>
                <div style={styles.feature}>• 3 analyses per day</div>
                <div style={styles.feature}>• Limited market data</div>
                <div style={styles.feature}>• Basic access</div>
                <div style={styles.featureDisabled}>• Alerts not included</div>
                <div style={styles.featureDisabled}>
                  • Watchlist and premium features are limited
                </div>
              </div>
            </div>

            <button
              style={styles.secondaryButton}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Get Started
            </button>
          </div>

          <div style={{ ...styles.card, ...styles.featuredCard }}>
            <div>
              <div style={styles.badge}>Most Popular</div>
              <div style={styles.planName}>Pro</div>
              <div style={styles.price}>€9.99 / month</div>
              <p style={styles.planText}>
                For serious users and investors who need deeper analysis.
              </p>

              <div style={styles.features}>
                <div style={styles.feature}>• 20 analyses per day</div>
                <div style={styles.feature}>• Full stock metrics</div>
                <div style={styles.feature}>• AI analysis</div>
                <div style={styles.feature}>• Better access to market data</div>
                <div style={styles.feature}>• Stock and crypto charts</div>
                <div style={styles.feature}>• Price alerts</div>
                <div style={styles.feature}>• Watchlist</div>
              </div>
            </div>

            <button style={styles.primaryButton} onClick={() => startCheckout("pro")}>
              Buy Pro
            </button>
          </div>

          <div style={styles.card}>
            <div>
              <div style={styles.planName}>Unlimited</div>
              <div style={styles.price}>€19.99 / month</div>
              <p style={styles.planText}>Maximum access with no analysis limits.</p>

              <div style={styles.features}>
                <div style={styles.feature}>• Unlimited analyses</div>
                <div style={styles.feature}>• All premium features</div>
                <div style={styles.feature}>• Priority access</div>
                <div style={styles.feature}>• Future premium updates</div>
                <div style={styles.feature}>• Stock and crypto charts</div>
                <div style={styles.feature}>• Alerts with live prices</div>
                <div style={styles.feature}>• Watchlist</div>
              </div>
            </div>

            <button
              style={styles.primaryButtonDark}
              onClick={() => startCheckout("unlimited")}
            >
              Buy Unlimited
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    background:
      "radial-gradient(circle at top, #0f274d 0%, #08152f 40%, #050d1f 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(3, 10, 25, 0.25)",
    backdropFilter: "blur(2px)",
  },
  wrapper: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "1200px",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    color: "white",
    fontSize: "42px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "18px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "rgba(10, 20, 40, 0.92)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "520px",
  },
  featuredCard: {
    border: "1px solid rgba(59,130,246,0.45)",
    boxShadow: "0 22px 50px rgba(37,99,235,0.18)",
  },
  badge: {
    display: "inline-block",
    alignSelf: "flex-start",
    background: "rgba(37,99,235,0.18)",
    color: "#93c5fd",
    border: "1px solid rgba(59,130,246,0.35)",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: "16px",
  },
  planName: {
    fontSize: "28px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  price: {
    fontSize: "30px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  planText: {
    color: "#94a3b8",
    marginTop: 0,
    marginBottom: "24px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "28px",
  },
  feature: {
    color: "#e2e8f0",
    fontSize: "15px",
  },
  featureDisabled: {
    color: "#64748b",
    fontSize: "15px",
  },
  primaryButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
  },
  primaryButtonDark: {
    background: "#111827",
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
  },
  secondaryButton: {
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    width: "100%",
  },
};