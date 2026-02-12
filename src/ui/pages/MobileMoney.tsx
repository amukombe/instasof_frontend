import React from 'react'
import { useSearchParams } from 'react-router-dom';
import {depositToWallet,withdrawFromWallet} from  "../../api/PaymentsApi";
type Mode = "deposit" | "withdraw";
export function MobileMoney() {
  const [phone, setPhone] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const [message, setMessage] = React.useState<string | null>(null)
  const [requestId, setRequestId] = React.useState<string | null>(null);
  const [reference, setReference] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);

  const [params] = useSearchParams();
  const mode = params.get("mode") ?? "deposit";
  const isWithdraw = mode === "withdraw";

  const title = isWithdraw ? "Withdraw - Mobile Money" : "Deposit - Mobile Money";
  const submitText = loading ? "Submitting...": isWithdraw? "Withdraw" : "Deposit";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setReference(null);
    setStatus(null);

    if (!phone || !amount) {
      setMessage('Phone number and amount are required')
      return
    }

     const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setMessage("Amount must be greater than zero");
      return;
    }

      setLoading(true);
    try {
      // ✅ call correct endpoint based on mode
      const apiCall = isWithdraw ? withdrawFromWallet : depositToWallet;

      const res = await apiCall({
        phoneNumber: phone.trim(),
        amount: numericAmount,
      });

      setMessage( isWithdraw? "WithdrawwSuccessfull.": "Deposit request submitted. Please approve on your phone.");

      setReference(res.reference);
      setStatus(res.statusDesc || "SUCCESS");

      setPhone("");
      setAmount("");
    } catch (err: any) {
      setMessage(err?.message || "Failed to submit payment request");
    } finally {
      setLoading(false);
    }
  };


     return (
    <div className="container">
      {/* ✅ use dynamic title */}
      <h2 className="section-title">{title}</h2>

      <form className="card" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 14 }}>
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            placeholder="2567XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="form-label">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* ✅ use dynamic button text */}
        <button className="btn" type="submit" disabled={loading}>
          {submitText}
        </button>

        {(message || reference || status) && (
          <div className="footer-note" style={{ marginTop: 12 }}>
            {message && <div style={{ marginBottom: 6 }}>{message}</div>}
            {/* {reference && (
              <div>
                <strong>Reference:</strong> {reference}
              </div>
            )} */}
            {status && (
              <div>
                <strong>Status:</strong> {status}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 6,
  padding: '10px 12px',
  borderRadius: 12,
  border: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.05)',
  color: 'var(--text)',
  outline: 'none'
}
