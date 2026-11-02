import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './Login.module.css';
import logo from './assets/logo.svg';

export default function Login({ onSignIn }) {
  return (
    <main className={styles.page}>
      <section className={styles.loginCard} aria-label="VELOOP Rewards demo">
        <div className={styles.brandPanel}>
          <a className={styles.brand} href="#demo-entry" aria-label="VELOOP Rewards">
            <img src={logo} alt="VELOOP" />
            <span>REWARDS</span>
          </a>

          <div className={styles.brandContent}>
            <span className={styles.kicker}><Sparkles size={14} /> YOUR NEXT LEVEL STARTS HERE</span>
            <h1>Good things<br />come to those<br /><span>who keep going.</span></h1>
            <p>Your rewards journey, all in one place. Explore the experience and see what you can earn.</p>
          </div>

          <div className={styles.progressPreview} aria-hidden="true">
            <span className={styles.previewBadge}>04</span>
            <span className={styles.previewLine} />
            <span className={styles.previewBadgeMuted}>05</span>
            <span className={styles.previewCopy}><strong>One step closer</strong><small>Every action moves you forward</small></span>
          </div>

          <div className={styles.brandFooter}><ShieldCheck size={14} /> A more rewarding way forward</div>
          <span className={styles.orbit} aria-hidden="true" />
        </div>

        <div className={styles.formPanel} id="demo-entry">
          <div className={styles.formIntro}>
            <span className={styles.welcomeBack}>INTERACTIVE DEMO</span>
            <h2>Explore VELOOP Rewards</h2>
            <p>Preview your rewards dashboard and see how the journey works.</p>
          </div>

          <div className={styles.demoNote} role="note">
            <ShieldCheck size={15} />
            <span><strong>No account needed.</strong> This is a demo experience. Do not enter or share passwords or personal information.</span>
          </div>

          <div className={styles.form}>
            <button className={styles.submitButton} type="button" onClick={onSignIn}>
              Explore demo dashboard <ArrowRight size={17} />
            </button>
          </div>
          <p className={styles.sessionNote}>No sign-in or personal details required.</p>
          <div className={styles.secureFooter}><span /> Demo only — no account required</div>
        </div>
      </section>
      <footer className={styles.pageFooter}>© 2026 VELOOP REWARDS <span>·</span> A better way to move forward</footer>
    </main>
  );
}
