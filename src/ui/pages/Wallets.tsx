import React from "react";
import { useNavigate } from "react-router-dom";
import { getWalletBalance } from "../../api/WalletApi";
import { getWalletIdFromToken } from "../../Auth/Auth";

export function WalletsPage() {
  const navigate = useNavigate();

  const [balance, setBalance] = React.useState<number | null>(null);
  const [balanceError, setBalanceError] = React.useState<string | null>(null);
  const [showWalletActions, setShowWalletActions] = React.useState(false);

  const walletId = getWalletIdFromToken();

  const refreshBalance = React.useCallback(async () => {
    if (!walletId) return;
    try {
      setBalanceError(null);
      const r = await getWalletBalance(walletId);
      setBalance(r.balance);
    } catch (e: any) {
      setBalanceError(e?.message ?? "Failed to load balance");
    }
  }, [walletId]);

  React.useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  const openDeposit = () => {
    setShowWalletActions(false);
    navigate("/wallets/mobile-money?mode=deposit");
  };

  const openWithdraw = () => {
    setShowWalletActions(false);
    navigate("/wallets/mobile-money?mode=withdraw");
  };

  return (
    <div className="container">
      <h2 className="section-title">Wallet & Accounts</h2>

      <div className="grid modules">
        {/* Wallet Balance card opens modal */}
        <div
          className="card module-card"
          onClick={() => setShowWalletActions(true)}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
        >
          <h3 className="module-name">Wallet Balance</h3>

          {balanceError ? (
            <span style={{ opacity: 0.8 }}>Balance unavailable</span>
          ) : balance === null ? (
            <span style={{ opacity: 0.8 }}>Loading balance…</span>
          ) : (
            <strong>Balance: {balance.toLocaleString()} UGX</strong>
          )}

          <div className="footer-note" style={{ marginTop: 10 }}>
            Click to Deposit / Withdraw
          </div>
        </div>

        {/* Bank Transfer card */}
        <div
          className="card module-card"
          onClick={() => navigate("/wallets/bank-transfer")}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
        >
          <h3 className="module-name">Bank Transfer</h3>
          <p className="module-desc">Bank accounts, EFTs, settlements, reconciliation</p>
        </div>
      </div>

      {/* Modal for Deposit/Withdraw */}
      {showWalletActions && (
        <div style={modalBackdrop} onClick={() => setShowWalletActions(false)}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Wallet Actions</div>
              <button className="btn" onClick={() => setShowWalletActions(false)} style={closeBtn}>
                ✕
              </button>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn" onClick={openDeposit} style={{ flex: 1 ,background: "var(--primary)",border: "1px solid rgba(24,166,137,0.35)",color: "#fff",}}>
                Deposit
              </button>

              <button
                className="btn"
                onClick={openWithdraw}
                style={{ flex: 1,  background: "rgba(239,68,68,0.10)",border: "1px solid rgba(239,68,68,0.25)", color: "#991B1B", }}
              >
                Withdraw
              </button>
            </div>

            <div className="footer-note" style={{ marginTop: 12 }}>
              Choose what you want to do with your wallet.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Modal styles */
const modalBackdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.45)", // softer than pure black
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 9999,
};

const modalCard: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "var(--surface)",               // white card
  border: "1px solid var(--border)",          // light border
  borderRadius: 18,
  padding: 18,
  boxShadow: "0 20px 50px rgba(15,23,42,0.18)",
  color: "var(--text)",
};

const closeBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 12,
  background: "rgba(15,23,42,0.04)",
  border: "1px solid var(--border)",
};