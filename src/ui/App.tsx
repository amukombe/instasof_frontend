import React from 'react'
import { fetchKpis, fetchModules, type Kpis, type Module } from '../api/DashboardApi'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { WalletsPage } from './pages/Wallets'
import {MobileMoney} from './pages/MobileMoney'
import { BankTransfer } from './pages/BankTransfer'
import { getWalletIdFromToken } from '../Auth/Auth'
import { getWalletBalance } from '../api/WalletApi'


function formatPct(n: number) {
  const sign = n >= 0 ? '+' : ''
  return `${sign}${n.toFixed(1)}%`
}



export function App() {
  console.log('App rendered')
  const navigate = useNavigate()
  const stored = localStorage.getItem("wallet_user");
  const me = stored ? JSON.parse(stored) : null;
  const [kpis, setKpis] = React.useState<Kpis | null>(null);
  const [modules, setModules] = React.useState<Module[]>([]);
  const [error, setError] = React.useState<string | null>(null);
   const walletId = getWalletIdFromToken();
  const [balance, setBalance] = React.useState<number | null>(null);
  const [balanceError, setBalanceError] = React.useState<string | null>(null);
  const [showWalletActions, setShowWalletActions] = React.useState(false);

  const openDeposit = () => {
  setShowWalletActions(false);
  navigate("/wallets/mobile-money?mode=deposit");
  };

  const openWithdraw = () => {
  setShowWalletActions(false);
  navigate("/wallets/mobile-money?mode=withdraw");
  };

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
  

  React.useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);


  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [k, m] = await Promise.all([fetchKpis(), fetchModules()])
        if (cancelled) return
        setKpis(k)
        setModules(m)
      } catch (e: any) {
        if (cancelled) return
        setError(e?.message ?? 'Unknown error')
      }
    })()
    return () => { cancelled = true }
  }, [])



    const handleLogout = () => {
    localStorage.removeItem("wallet_token");
    localStorage.removeItem("wallet_user");

    // redirect to login
    navigate('/login');
  };

  

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div>
            <div className="badge">Welcome back,</div>
            <h1 className="h1">{me?.fullName ?? me?.email ?? "User"}</h1>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" onClick={() => alert("Profile coming soon")}>
              Profile
            </button>

            <button
              className="btn"
              style={{ background: "rgba(239,68,68,0.15)" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Routes>
      {/* Dashboard stays your current UI */}
      <Route
        path="/"
        element={
          <div className="container">
             {error && (
          <div className="card" style={{ borderColor: 'rgba(239,68,68,0.45)' }}>
            <strong>Couldn’t load data from the API.</strong>
            <div className="footer-note">Error: {error}</div>
            <div className="footer-note">Tip: start the backend (`dotnet run`) and ensure CORS allows http://localhost:5173</div>
          </div>
        )}

        <div className="grid kpis" style={{ marginTop: 18 }}>
          <KpiCard
            title="Total Volume"
            value={kpis?.totalVolume ?? '—'}
            delta={kpis ? formatPct(kpis.totalVolumeDeltaPct) : '—'}
          />
          <KpiCard
            title="Active Merchants"
            value={kpis ? kpis.activeMerchants.toLocaleString() : '—'}
            delta={kpis ? formatPct(kpis.activeMerchantsDeltaPct) : '—'}
          />
          <KpiCard
            title="Transactions Today"
            value={kpis ? kpis.transactionsToday.toLocaleString() : '—'}
            delta={kpis ? formatPct(kpis.transactionsTodayDeltaPct) : '—'}
          />
        </div>

        <div className="section-title">Platform Modules</div>
        <div className="grid modules">
          {modules.map(m => (
            <div
              key={m.key}
              className="card module-card"
             onClick={() => {
                              if (m.key === 'wallet') {
                                navigate('/wallets')
                                return
                              }
                              alert(`Open module: ${m.name}\n\nIntegrate routing + APIs here.`)
                            }}
            >
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div className="pill">{m.key}</div>
                <div className="pill">Open →</div>
              </div>
              <h3 className="module-name">{m.name}</h3>
              <p className="module-desc">{m.description}</p>
            </div>
          ))}
        </div>

          </div>
        }
      />

      {/* Wallet-only pages */}
      <Route path="/wallets" element={<WalletsPage />} />
      <Route path="/wallets/mobile-money" element={<MobileMoney />} />
      <Route path="/wallets/bank-transfer" element={<BankTransfer />} />
      <Route
            path="/"
            element={
              <div className="container">
                ...everything...
                <div className="footer-note">
                  This is a starter shell. Swap the stub endpoints in the backend for your real integrations and map modules to routes/pages.
                </div>
              </div>
            }
        />
    </Routes>
    </>
  )
}

function KpiCard(props: { title: string; value: string; delta: string }) {
  return (
    <div className="card">
      <div className="kpi-top">
        <span>{props.title}</span>
        <span className="pill">live</span>
      </div>
      <div className="kpi-value">{props.value}</div>
      <div className="kpi-delta">{props.delta}</div>
    </div>
  )
}
