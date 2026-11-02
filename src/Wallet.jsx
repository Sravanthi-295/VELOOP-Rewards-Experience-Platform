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

function validateDemoAmount(amount, balance) {
  const errors = {};
  const parsedAmount = Number(amount);

  if (!amount || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    errors.amount = 'Enter an amount to simulate.';
  } else if (!Number.isInteger(parsedAmount)) {
    errors.amount = 'Enter a whole rupee amount.';
  } else if (parsedAmount < minimumPayout) {
    errors.amount = `The demo minimum is ${currency.format(minimumPayout)}.`;
  } else if (parsedAmount > balance) {
    errors.amount = `Amount exceeds the sample balance of ${currency.format(balance)}.`;
  }

  return errors;
}

export default function Wallet({ onBack }) {
  const [availableBalance, setAvailableBalance] = useState(initialBalance);
  const [reservedBalance, setReservedBalance] = useState(0);
  const [amount, setAmount] = useState('500');
  const [errors, setErrors] = useState({});
  const [simulations, setSimulations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  function updateField(event) {
    setAmount(event.target.value);
    setErrors({});
    setSubmitted(null);
  }

  function simulatePayout(event) {
    event.preventDefault();
    const nextErrors = validateDemoAmount(amount, availableBalance);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payoutAmount = Number(amount);
    const simulation = {
      id: `DEMO-${Date.now().toString().slice(-8)}`,
      amount: payoutAmount,
      createdAt: new Date()
    };

    setAvailableBalance((balance) => balance - payoutAmount);
    setReservedBalance((balance) => balance + payoutAmount);
    setSimulations((current) => [simulation, ...current]);
    setTransactions((current) => [simulation, ...current]);
    setSubmitted(simulation);
    setErrors({});
    setAmount('');
  }

  const visibleTransactions = showAllTransactions ? transactions : transactions.slice(0, 4);

  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <button className={styles.backButton} type="button" onClick={onBack}><ArrowLeft size={16} /> Rewards dashboard</button>
        <span className={styles.previewLabel}><span /> DEMO WALLET</span>
      </header>

      <section className={styles.pageIntro}>
        <p className={styles.eyebrow}>DEMO WALLET</p>
        <h1>Wallet preview</h1>
        <p>Explore sample rewards and try a simulated payout. No transfer or financial details.</p>
      </section>

      <div className={styles.demoNotice} role="note">
        <Info size={16} />
        <p><strong>Demo only.</strong> Balances and payout simulations stay in this browser session. No payment details are collected, no provider is connected, and no money is transferred.</p>
      </div>

      <section className={styles.balanceCard} aria-label="Sample wallet balance">
        <span className={styles.balanceIcon}><WalletCards size={23} /></span>
        <div>
          <span>Available sample balance <span className={styles.sampleTag}>DEMO</span></span>
          <strong>{currency.format(availableBalance)}</strong>
          <small>Sample amount only; it has no cash value.</small>
        </div>
        <span className={styles.balanceShine} aria-hidden="true" />
      </section>

      <section className={styles.statsGrid} aria-label="Wallet summary">
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Available balance</span><span className={`${styles.statIcon} ${styles.blue}`}><WalletCards size={17} /></span></div>
          <strong>{currency.format(availableBalance)}</strong><small>Available for simulation</small>
        </article>
        <article className={styles.statCard}>
          <div className={styles.statHeading}><span>Reserved demo balance</span><span className={`${styles.statIcon} ${styles.amber}`}><Clock3 size={17} /></span></div>
          <strong>{currency.format(reservedBalance)}</strong><small>Simulated amounts in this session</small>
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
          <div><strong>Demo simulation complete</strong><p>{currency.format(submitted.amount)} is marked pending in this demo only. No payment was sent. Reference: {submitted.id}</p></div>
          <span className={styles.pendingBadge}>DEMO</span>
        </section>
      )}

      <section className={styles.contentGrid}>
        <form className={styles.formCard} onSubmit={simulatePayout} noValidate>
          <div className={styles.cardHeading}>
            <div><h2>Simulate a payout</h2><p>Try the sample flow with an amount only.</p></div>
            <span className={styles.formIcon}><WalletCards size={19} /></span>
          </div>

          <label className={styles.fieldLabel} htmlFor="payout-amount">Demo amount (₹)</label>
          <div className={`${styles.inputShell} ${errors.amount ? styles.invalid : ''}`}>
            <span aria-hidden="true">₹</span>
            <input id="payout-amount" name="amount" type="number" inputMode="decimal" min={minimumPayout} max={availableBalance} step="1" value={amount} onChange={updateField} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'amount-error' : 'amount-help'} placeholder="Enter amount" />
          </div>
          {errors.amount ? <small id="amount-error" className={styles.fieldError}>{errors.amount}</small> : <small id="amount-help" className={styles.fieldHint}>Demo minimum {currency.format(minimumPayout)} · Sample balance {currency.format(availableBalance)}</small>}

          <button className={styles.submitButton} type="submit">Simulate demo payout <ArrowRight size={17} /></button>
          <p className={styles.formDisclaimer}>Simulation only. No account, UPI, or bank details are requested or used.</p>
        </form>

        <aside className={styles.sideColumn}>
          <section className={styles.requestCard}>
            <div className={styles.cardHeading}>
              <div><h2>Demo simulations</h2><p>Sample activity in this session</p></div>
              <span className={styles.formIcon}><Clock3 size={18} /></span>
            </div>
            {simulations.length ? (
              <div className={styles.requestList}>
                {simulations.map((simulation) => (
                  <article className={styles.requestRow} key={simulation.id}>
                    <span className={styles.requestMark}><ArrowUpRight size={15} /></span>
                    <span className={styles.requestInfo}><strong>{currency.format(simulation.amount)}</strong><small>Demo simulation · {formatDate(simulation.createdAt)}</small><small>Ref. {simulation.id}</small></span>
                    <span className={styles.pendingBadge}>DEMO</span>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}><span><Clock3 size={20} /></span><strong>No simulations yet</strong><p>Demo activity will appear here when you try the sample flow.</p></div>
            )}
          </section>

          <section className={styles.quickCard}>
            <p className={styles.eyebrow}>SIMULATION FLOW</p>
            <h2>Try the sample experience.</h2>
            <ol>
              <li><span>01</span>Enter a sample amount within the displayed balance.</li>
              <li><span>02</span>See the sample balance update; no payment details are needed.</li>
              <li><span>03</span>Review the simulated status in this wallet.</li>
            </ol>
            <small>This is only an on-screen simulation. No payout provider or payment processing is connected.</small>
          </section>
        </aside>
      </section>

      <section className={styles.transactionsCard}>
        <div className={styles.transactionHeader}>
          <div><h2>Demo activity</h2><p>Sample activity for this session</p></div>
          {transactions.length > 4 && <button className={styles.viewAllButton} type="button" onClick={() => setShowAllTransactions((show) => !show)}>{showAllTransactions ? 'Show less' : 'View all'} <ArrowRight size={15} /></button>}
        </div>
        {visibleTransactions.length ? (
          <div className={styles.transactionList}>
            {visibleTransactions.map((transaction) => (
              <article className={styles.transactionRow} key={transaction.id}>
                <span className={styles.transactionIcon}><ArrowUpRight size={16} /></span>
                <span className={styles.transactionText}><strong>Demo payout simulation</strong><small>On-screen only · Ref. {transaction.id}</small></span>
                <span className={styles.transactionAmount}>− {currency.format(transaction.amount)}</span>
                <span className={styles.pendingBadge}>DEMO</span>
                <time>{formatDate(transaction.createdAt)}</time>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.transactionEmpty}><span><ArrowDownLeft size={22} /></span><strong>No demo activity yet</strong><p>Sample wallet activity will appear here after a simulation.</p></div>
        )}
      </section>

      <footer className={styles.footer}><span>VELOOP REWARDS</span><span>Demo wallet · No real payment processing</span></footer>
    </main>
  );
}
