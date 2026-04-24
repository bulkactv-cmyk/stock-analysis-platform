"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type PlanType = "basic" | "pro" | "unlimited";

export default function PricingPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) setEmail(user.email);
    };

    loadUser();
  }, [supabase]);

  async function startCheckout(plan: PlanType) {
    try {
      if (!email) {
        alert("Please log in to your account first.");
        window.location.href = "/auth";
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const features = [
    ["Analyses per day", "10", "20", "∞"],
    ["Stock analysis", "Yes", "Yes", "Yes"],
    ["Crypto analysis", "No", "No", "Yes"],
    ["Basic metrics", "Yes", "Yes", "Yes"],
    ["Advanced metrics", "No", "Yes", "Yes"],
    ["AI analysis", "Limited", "Yes", "Yes"],
    ["Charts", "No", "Yes", "Yes"],
    ["Market overview", "No", "Limited", "Yes"],
  ];

  return (
    <main style={styles.page}>
      <div style={styles.overlay} />

      <div style={styles.wrapper}>
        <div style={styles.topBar}>
          <div style={styles.brandBlock}>
            <div style={styles.logoBox}>FA</div>
            <div>
              <div style={styles.brandName}>Fundamental AI</div>
              <div style={styles.brandSubtext}>Subscription plans</div>
            </div>
          </div>

          <div style={styles.navButtons}>
            <button style={styles.navButton} onClick={() => (window.location.href = "/")}>
              Home
            </button>
            <button style={styles.navButton} onClick={() => (window.location.href = "/dashboard")}>
              Dashboard
            </button>
          </div>
        </div>

        <div style={styles.header}>
          <div style={styles.heroBadge}>Choose the right plan</div>
          <h1 style={styles.title}>Pricing Plans for Every Type of Investor</h1>
          <p style={styles.subtitle}>
            Start with Basic, upgrade to Pro for deeper analysis, or unlock full potential with Unlimited.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div>
              <div style={styles.planName}>Basic</div>
              <div style={styles.planSub}>Starter paid plan</div>
              <div style={styles.price}>€4.99 <span style={styles.month}>/ month</span></div>
              <p style={styles.planText}>
                Ideal for users who want access to stock analysis.
              </p>

              <div style={styles.features}>
                <div style={styles.feature}>• 10 analyses per day</div>
                <div style={styles.feature}>• Stocks only</div>
                <div style={styles.feature}>• Basic fundamental metrics</div>
                <div style={styles.feature}>• Quick financial overview</div>
                <div style={styles.feature}>• 1 month access</div>
              </div>

              <div style={styles.bestForBox}>
                <strong>Best for:</strong>
                <br />
                Quick company evaluation without the need for full premium features.
              </div>
            </div>

            <button style={styles.secondaryButton} onClick={() => startCheckout("basic")}>
              Buy Basic
            </button>
          </div>

          <div style={{ ...styles.card, ...styles.featuredCard }}>
            <div>
              <div style={styles.badge}>Most Popular</div>
              <div style={styles.planName}>Pro</div>
              <div style={styles.planSub}>Advanced analysis</div>
              <div style={styles.price}>€9.99 <span style={styles.month}>/ month</span></div>
              <p style={styles.planText}>
                For investors who want deeper company analysis and better data.
              </p>

              <div style={styles.features}>
                <div style={styles.feature}>• 20 analyses per day</div>
                <div style={styles.feature}>• Stocks only</div>
                <div style={styles.feature}>• Everything in Basic</div>
                <div style={styles.feature}>• Full stock metrics</div>
                <div style={styles.feature}>• AI analysis and fair value view</div>
                <div style={styles.feature}>• Stock charts</div>
              </div>

              <div style={styles.bestForBox}>
                <strong>Best for:</strong>
                <br />
                Investors comparing companies and looking for deeper fundamentals.
              </div>
            </div>

            <button style={styles.primaryButton} onClick={() => startCheckout("pro")}>
              Buy Pro
            </button>
          </div>

          <div style={styles.card}>
            <div>
              <div style={styles.planName}>Unlimited</div>
              <div style={styles.planSub}>Full access</div>
              <div style={styles.price}>€19.99 <span style={styles.month}>/ month</span></div>
              <p style={styles.planText}>
                Maximum access for users who want stocks, crypto and all premium tools.
              </p>

              <div style={styles.features}>
                <div style={styles.feature}>• Unlimited analyses</div>
                <div style={styles.feature}>• Stocks + Crypto</div>
                <div style={styles.feature}>• Everything in Pro</div>
                <div style={styles.feature}>• Advanced premium metrics</div>
                <div style={styles.feature}>• Full AI analysis package</div>
                <div style={styles.feature}>• Crypto charts and market overview</div>
                <div style={styles.feature}>• Future premium updates</div>
              </div>

              <div style={styles.bestForBox}>
                <strong>Best for:</strong>
                <br />
                Active investors and traders who want a complete market view in one platform.
              </div>
            </div>

            <button style={styles.primaryButtonDark} onClick={() => startCheckout("unlimited")}>
              Buy Unlimited
            </button>
          </div>
        </div>

        <section style={styles.compareSection}>
          <h2 style={styles.compareTitle}>Feature Comparison</h2>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Feature</th>
                  <th style={styles.th}>Basic</th>
                  <th style={styles.th}>Pro</th>
                  <th style={styles.th}>Unlimited</th>
                </tr>
              </thead>

              <tbody>
                {features.map((row) => (
                  <tr key={row[0]}>
                    <td style={styles.td}>{row[0]}</td>
                    <td style={styles.td}>{row[1]}</td>
                    <td style={styles.td}>{row[2]}</td>
                    <td style={styles.td}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    background: "radial-gradient(circle at top, #0f274d 0%, #08152f 40%, #050d1f 100%)",
    padding: "32px 20px 60px",
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
    maxWidth: "1120px",
    margin: "0 auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "34px",
    gap: "16px",
  },
  brandBlock: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoBox: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    boxShadow: "0 12px 28px rgba(37,99,235,0.35)",
  },
  brandName: {
    color: "white",
    fontSize: "18px",
    fontWeight: 800,
  },
  brandSubtext: {
    color: "#94a3b8",
    fontSize: "12px",
  },
  navButtons: {
    display: "flex",
    gap: "10px",
  },
  navButton: {
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },
  header: {
    textAlign: "center",
    marginBottom: "34px",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(37,99,235,0.18)",
    color: "#bfdbfe",
    border: "1px solid rgba(59,130,246,0.35)",
    borderRadius: "999px",
    padding: "7px 13px",
    fontSize: "12px",
    fontWeight: 800,
    marginBottom: "18px",
  },
  title: {
    color: "white",
    fontSize: "42px",
    fontWeight: 900,
    lineHeight: 1.25,
    maxWidth: "760px",
    margin: "0 auto 14px",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },
  card: {
    position: "relative",
    background: "rgba(10, 20, 40, 0.92)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "470px",
  },
  featuredCard: {
    border: "1px solid rgba(59,130,246,0.65)",
    boxShadow: "0 22px 50px rgba(37,99,235,0.22)",
  },
  badge: {
    position: "absolute",
    top: "-13px",
    left: "22px",
    background: "#2563eb",
    color: "white",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "11px",
    fontWeight: 800,
  },
  planName: {
    fontSize: "26px",
    fontWeight: 900,
    marginBottom: "6px",
  },
  planSub: {
    color: "#94a3b8",
    fontSize: "12px",
    marginBottom: "18px",
  },
  price: {
    fontSize: "30px",
    fontWeight: 900,
    marginBottom: "16px",
  },
  month: {
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: 500,
  },
  planText: {
    color: "#cbd5e1",
    fontSize: "13px",
    lineHeight: 1.7,
    marginTop: 0,
    marginBottom: "20px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "18px",
  },
  feature: {
    color: "#e2e8f0",
    fontSize: "13px",
    lineHeight: 1.4,
  },
  bestForBox: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "13px",
    padding: "13px",
    color: "#cbd5e1",
    fontSize: "12px",
    lineHeight: 1.6,
    marginBottom: "20px",
  },
  primaryButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "11px",
    padding: "13px 16px",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    width: "100%",
  },
  primaryButtonDark: {
    background: "#111827",
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "11px",
    padding: "13px 16px",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    width: "100%",
  },
  secondaryButton: {
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "11px",
    padding: "13px 16px",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    width: "100%",
  },
  compareSection: {
    marginTop: "34px",
  },
  compareTitle: {
    color: "white",
    textAlign: "center",
    fontSize: "26px",
    fontWeight: 900,
    marginBottom: "18px",
  },
  tableWrap: {
    overflowX: "auto",
    background: "rgba(10, 20, 40, 0.92)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "760px",
  },
  th: {
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: 900,
    padding: "16px",
    textAlign: "center",
    background: "rgba(255,255,255,0.02)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  td: {
    color: "white",
    fontSize: "13px",
    fontWeight: 800,
    padding: "16px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
};