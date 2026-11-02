import React, { useState } from 'react';
import {
  ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3,
  Info, WalletCards
} from 'lucide-react';
import styles from './Wallet.module.css';

const initialBalance = 1250;
const minimumPayout = 100;
const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2
});

const formatDate = (date) => new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short'
}).format(date);

function validatePayout({ amount, method, upiId, accountName, accountNumber, ifscCode }, balance) {
  const errors = {};
  const parsedAmount = Number(amount);

  if (!amount || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    errors.amount = 'Enter a valid payout amount.';
  } else if (!Number.isInteger(parsedAmount)) {
    errors.amount = 'Enter a whole amount in rupees.';
  } else if (parsedAmount < minimumPayout) {
    errors.amount = `The minimum payout is ${currency.format(minimumPayout)}.`;
  } else if (parsedAmount > balance) {
    errors.amount = `Amount exceeds your available balance of ${currency.format(balance)}.`;
  }

  if (method === 'upi') {
    if (!/^[\w.-]{2,256}@[A-Za-z][A-Za-z0-9.-]{1,63}$/.test(upiId.trim())) {
      errors.upiId = 'Enter a valid demo UPI ID, for example demo@bank.';
    }
  } else {
    if (accountName.trim().length < 2) errors.accountName = 'Enter the account holder name.';
    if (!/^\d{9,18}$/.test(accountNumber.trim())) errors.accountNumber = 'Enter a valid 9–18 digit account number.';
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.trim().toUpperCase())) errors.ifscCode = 'Enter a valid 11-character IFSC code.';
  }

  return errors;
}

export default function Wallet({ onBack }) {
  const [availableBalance, setAvailableBalance] = useState(initialBalance);
  const [reservedBalance, setReservedBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [form, setForm] = useState({
    amount: '500',
    upiId: '',
    accountName: '',
    accountNumber: '',
    ifscCode: ''
  });
  const [errors, setErrors] = useState({});
  const [requests, setRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'ifscCode' ? value.toUpperCase() : value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitted(null);
  }

  function submitPayout(event) {
    event.preventDefault();
    const nextErrors = validatePayout({ ...form, method: paymentMethod }, availableBalance);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const amount = Number(form.amount);
    const request = {
      id: `DEMO-${Date.now().toString().slice(-8)}`,
      amount,
      method: paymentMethod,
      status: 'Pending',
      createdAt: new Date()
    };

    setAvailableBalance((balance) => balance - amount);
    setReservedBalance((balance) => balance + amount);
    setRequests((current) => [request, ...current]);
    setTransactions((current) => [
      { ...request, kind: 'Payout request' },
      ...current
    ]);
    setSubmitted(request);
    setErrors({});
    setForm((current) => ({ ...current, amount: '' }));
  }

  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 4);

  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <button className={styles.backButton} type="button" onClick={onBack}><ArrowLeft size={16} /> Rewards dashboard</button>
        <span className={styles.previewLabel}><span /> DEMO WALLET</span>
      </header>

      <section className={styles.pageIntro}>
        <p className={styles.eyebrow}>WITHDRAW REWARDS</p>
        <h1>Wallet &amp; payouts</h1>
        <p>Review your rewards balance and request a payout.</p>
      </section>

      <div className={styles.demoNotice} role="note">
        <Info size={16} />
        <p><strong>Preview only.</strong> Sample balance and payout requests are held in this browser session. No money is transferred. Use fictional payment details only.</p>
      </div>

      <section className={styles.balanceCard} aria-label="Available payout balance">
        <span className={styles.balanceIcon}><WalletCards size={23} /></span>
        <div>
          <span>Available for payout <span className={styles.sampleTag}>SAMPLE</span></span>
          <strong>{currency.format(availableBalance)}</strong>
          <small>Reserved funds are shown separately below.</small>
        </div>
        <span className={styles.balanceShine} aria-hidden="true" />
      </section>

      <section className={styles.statsGrid} aria-label="Wallet summary">
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Available balance</span><span className={`${styles.statIcon} ${styles.blue}`}><WalletCards size={17} /></span></div>
          <strong>{currency.format(availableBalance)}</strong><small>Ready for a demo payout</small>
        </article>
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Reserved balance</span><span className={`${styles.statIcon} ${styles.amber}`}><Clock3 size={17} /></span></div>
          <strong>{currency.format(reservedBalance)}</strong><small>Pending payout requests</small>
        </article>
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Recent credits</span><span className={`${styles.statIcon} ${styles.green}`}><ArrowDownLeft size={17} /></span></div>
          <strong>{currency.format(0)}</strong><small>Sample transactions</small>
        </article>
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Recent debits</span><span className={`${styles.statIcon} ${styles.purple}`}><ArrowUpRight size={17} /></span></div>
          <strong>{currency.format(0)}</strong><small>Sample transactions</small>
        </article>
      </section>

      {submitted && (
        <section className={styles.successCard} role="status">
          <span className={styles.successIcon}><Check size={18} /></span>
          <div><strong>Demo payout request created</strong><p>{currency.format(submitted.amount)} is now marked as pending. Reference: {submitted.id}</p></div>
          <span className={styles.pendingBadge}>PENDING</span>
        </section>
      )}

      <section className={styles.contentGrid}>
        <form className={styles.formCard} onSubmit={submitPayout} noValidate>
          <div className={styles.cardHeading}>
            <div><h2>Request a payout</h2><p>Choose an amount and demo payment method.</p></div>
            <span className={styles.formIcon}><WalletCards size={19} /></span>
          </div>

          <label className={styles.fieldLabel} htmlFor="payout-amount">Amount (₹)</label>
          <div className={`${styles.inputShell} ${errors.amount ? styles.invalid : ''}`}>
            <span aria-hidden="true">₹</span>
            <input id="payout-amount" name="amount" type="number" inputMode="decimal" min={minimumPayout} max={availableBalance} step="1" value={form.amount} onChange={updateField} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'amount-error' : 'amount-help'} placeholder="Enter amount" />
          </div>
          {errors.amount ? <small id="amount-error" className={styles.fieldError}>{errors.amount}</small> : <small id="amount-help" className={styles.fieldHint}>Minimum payout {currency.format(minimumPayout)} · Available {currency.format(availableBalance)}</small>}

          <label className={styles.fieldLabel} htmlFor="payment-method">Payment method</label>
          <div className={styles.selectShell}>
            <select id="payment-method" value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); setErrors({}); setSubmitted(null); }}>
              <option value="upi">UPI transfer</option>
              <option value="bank">Bank transfer</option>
            </select>
          </div>

          {paymentMethod === 'upi' ? (
            <>
              <label className={styles.fieldLabel} htmlFor="upi-id">UPI ID</label>
              <input className={`${styles.textInput} ${errors.upiId ? styles.invalid : ''}`} id="upi-id" name="upiId" autoComplete="off" value={form.upiId} onChange={updateField} aria-invalid={Boolean(errors.upiId)} aria-describedby={errors.upiId ? 'upi-error' : 'upi-help'} placeholder="demo@bank" />
              {errors.upiId ? <small id="upi-error" className={styles.fieldError}>{errors.upiId}</small> : <small id="upi-help" className={styles.fieldHint}>For this prototype, use a fictional UPI ID such as demo@bank.</small>}
            </>
          ) : (
            <div className={styles.bankFields}>
              <label className={styles.fieldLabel} htmlFor="account-name">Account holder name</label>
              <input className={`${styles.textInput} ${errors.accountName ? styles.invalid : ''}`} id="account-name" name="accountName" autoComplete="off" value={form.accountName} onChange={updateField} aria-invalid={Boolean(errors.accountName)} placeholder="Demo Account Holder" />
              {errors.accountName && <small className={styles.fieldError}>{errors.accountName}</small>}
              <label className={styles.fieldLabel} htmlFor="account-number">Account number</label>
              <input className={`${styles.textInput} ${errors.accountNumber ? styles.invalid : ''}`} id="account-number" name="accountNumber" type="password" inputMode="numeric" autoComplete="new-password" value={form.accountNumber} onChange={updateField} aria-invalid={Boolean(errors.accountNumber)} placeholder="9–18 digit demo number" />
              {errors.accountNumber && <small className={styles.fieldError}>{errors.accountNumber}</small>}
              <label className={styles.fieldLabel} htmlFor="ifsc-code">IFSC code</label>
              <input className={`${styles.textInput} ${errors.ifscCode ? styles.invalid : ''}`} id="ifsc-code" name="ifscCode" autoComplete="off" maxLength={11} value={form.ifscCode} onChange={updateField} aria-invalid={Boolean(errors.ifscCode)} placeholder="ABCD0123456" />
              {errors.ifscCode && <small className={styles.fieldError}>{errors.ifscCode}</small>}
            </div>
          )}

          <button className={styles.submitButton} type="submit" onClick={submitPayout}>Submit demo payout request <ArrowRight size={17} /></button>
          <p className={styles.formDisclaimer}>Prototype only — never enter real banking or payment details here.</p>
        </form>

        <aside className={styles.sideColumn}>
          <section className={styles.requestCard}>
            <div className={styles.cardHeading}>
              <div><h2>Payout requests</h2><p>Track request status</p></div>
              <span className={styles.formIcon}><Clock3 size={18} /></span>
            </div>
            {requests.length ? (
              <div className={styles.requestList}>
                {requests.map((request) => (
                  <article className={styles.requestRow} key={request.id}>
                    <span className={styles.requestMark}><ArrowUpRight size={15} /></span>
                    <span className={styles.requestInfo}><strong>{currency.format(request.amount)}</strong><small>{request.method === 'upi' ? 'UPI transfer' : 'Bank transfer'} · {formatDate(request.createdAt)}</small><small>Ref. {request.id}</small></span>
                    <span className={styles.pendingBadge}>PENDING</span>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}><span><Clock3 size={20} /></span><strong>No requests yet</strong><p>Your demo payout requests will appear here.</p></div>
            )}
          </section>

          <section className={styles.quickCard}>
            <p className={styles.eyebrow}>HOW PAYOUTS WORK</p>
            <h2>Simple, clear, in control.</h2>
            <ol>
              <li><span>01</span>Enter an amount within your available balance.</li>
              <li><span>02</span>Choose UPI or bank transfer details.</li>
              <li><span>03</span>Track the request status in your wallet.</li>
            </ol>
            <small>Steps shown for the frontend prototype. Real processing requires an approved payout provider and backend.</small>
          </section>
        </aside>
      </section>

      <section className={styles.transactionsCard}>
        <div className={styles.transactionHeader}>
          <div><h2>Recent transactions</h2><p>Your latest wallet activity</p></div>
          {transactions.length > 4 && <button className={styles.viewAllButton} type="button" onClick={() => setShowAllTransactions((show) => !show)}>{showAllTransactions ? 'Show less' : 'View all'} <ArrowRight size={15} /></button>}
        </div>
        {visibleTransactions.length ? (
          <div className={styles.transactionList}>
            {visibleTransactions.map((transaction) => (
              <article className={styles.transactionRow} key={transaction.id}>
                <span className={styles.transactionIcon}><ArrowUpRight size={16} /></span>
                <span className={styles.transactionText}><strong>Payout request</strong><small>{transaction.method === 'upi' ? 'UPI transfer' : 'Bank transfer'} · Ref. {transaction.id}</small></span>
                <span className={styles.transactionAmount}>− {currency.format(transaction.amount)}</span>
                <span className={styles.pendingBadge}>PENDING</span>
                <time>{formatDate(transaction.createdAt)}</time>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.transactionEmpty}><span><ArrowDownLeft size={22} /></span><strong>No transactions yet</strong><p>Your wallet activity will appear here after a demo payout request.</p></div>
        )}
      </section>

      <footer className={styles.footer}><span>VELOOP REWARDS</span><span>Demo wallet · No real payment processing</span></footer>
    </main>
  );
}
