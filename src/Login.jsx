import React, { useState } from 'react';
import {
  ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles
} from 'lucide-react';
import styles from './Login.module.css';
import logo from './assets/logo.svg';

export default function Login({ onSignIn }) {
  const [mode, setMode] = useState('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isCreatingAccount = mode === 'create-account';

  function changeMode(nextMode) {
    setMode(nextMode);
    setError('');
    setShowPassword(false);
  }

  function submitDemoAccess(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address to continue.');
      return;
    }
    if (isCreatingAccount && name.trim().length < 2) {
      setError('Enter your name to create a demo account.');
      return;
    }
    if (password.length < (isCreatingAccount ? 8 : 6)) {
      setError(`Enter at least ${isCreatingAccount ? 8 : 6} characters for the demo password.`);
      return;
    }
    if (isCreatingAccount && password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    if (isCreatingAccount && !acceptedTerms) {
      setError('Accept the demo terms to continue.');
      return;
    }
    setError('');
    onSignIn();
  }

  return (
    <main className={styles.page}>
      <section className={styles.loginCard} aria-label="VELOOP Rewards sign-in">
        <div className={styles.brandPanel}>
          <a className={styles.brand} href="#sign-in" aria-label="VELOOP Rewards">
            <img src={logo} alt="VELOOP" />
            <span>REWARDS</span>
          </a>

          <div className={styles.brandContent}>
            <span className={styles.kicker}><Sparkles size={14} /> YOUR NEXT LEVEL STARTS HERE</span>
            <h1>Good things<br />come to those<br /><span>who keep going.</span></h1>
            <p>Your rewards journey, all in one place. Sign in to pick up where you left off.</p>
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

        <div className={styles.formPanel} id="sign-in">
          <div className={styles.mobileBrand}>
            <img src={logo} alt="VELOOP" /><span>REWARDS</span>
          </div>

          <div className={styles.formIntro}>
            <span className={styles.welcomeBack}>{isCreatingAccount ? 'START YOUR JOURNEY' : 'WELCOME BACK'}</span>
            <h2>{isCreatingAccount ? 'Create your account' : 'Sign in to VELOOP'}</h2>
            <p>{isCreatingAccount ? 'A few details and you’re ready to explore your rewards.' : 'Enter your details to continue to your rewards.'}</p>
          </div>

          <div className={styles.demoNote} role="note">
            <ShieldCheck size={15} />
            <span><strong>Demo {isCreatingAccount ? 'registration' : 'sign-in'}</strong> — this prototype does not create or verify real accounts. Details stay in this page session.</span>
          </div>

          <form className={styles.form} onSubmit={submitDemoAccess} noValidate>
            {isCreatingAccount && (
              <>
                <label htmlFor="register-name">Full name</label>
                <div className={styles.inputWrap}>
                  <input
                    autoComplete="name"
                    id="register-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => { setName(event.target.value); setError(''); }}
                    placeholder="Your name"
                    aria-invalid={Boolean(error && name.trim().length < 2)}
                    required
                  />
                </div>
              </>
            )}

            <label htmlFor="login-email">Email address</label>
            <div className={styles.inputWrap}>
              <Mail size={17} aria-hidden="true" />
              <input
                autoComplete={isCreatingAccount ? 'email' : 'username'}
                id="login-email"
                name="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setError(''); }}
                placeholder="you@example.com"
                aria-invalid={Boolean(error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))}
                required
              />
            </div>

            <div className={styles.passwordLabel}>
              <label htmlFor="login-password">{isCreatingAccount ? 'Create password' : 'Password'}</label>
              {!isCreatingAccount && <button type="button" className={styles.forgotButton} onClick={() => setError('Password recovery is not available in this demo.')}>Forgot password?</button>}
            </div>
            <div className={styles.inputWrap}>
              <LockKeyhole size={17} aria-hidden="true" />
              <input
                autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => { setPassword(event.target.value); setError(''); }}
                placeholder={isCreatingAccount ? 'At least 8 characters' : 'Enter your password'}
                aria-invalid={Boolean(error && password.length < (isCreatingAccount ? 8 : 6))}
                required
              />
              <button
                className={styles.passwordToggle}
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {isCreatingAccount && (
              <>
                <label className={styles.confirmLabel} htmlFor="confirm-password">Confirm password</label>
                <div className={styles.inputWrap}>
                  <LockKeyhole size={17} aria-hidden="true" />
                  <input
                    autoComplete="new-password"
                    id="confirm-password"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => { setConfirmPassword(event.target.value); setError(''); }}
                    placeholder="Enter your password again"
                    aria-invalid={Boolean(error && confirmPassword !== password)}
                    required
                  />
                </div>
                <label className={styles.termsCheck}>
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => { setAcceptedTerms(event.target.checked); setError(''); }} />
                  <span>I agree to the <a href="#terms" onClick={(event) => event.preventDefault()}>Terms</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</span>
                </label>
              </>
            )}

            {error && <p className={styles.errorMessage} role="alert">{error}</p>}

            {!isCreatingAccount && <p className={styles.sessionNote}>Demo access lasts until you refresh this page.</p>}

            <button className={styles.submitButton} type="submit">{isCreatingAccount ? 'Create demo account' : 'Continue to dashboard'} <ArrowRight size={17} /></button>
          </form>

          <p className={styles.switchMode}>
            {isCreatingAccount ? 'Already have an account?' : 'New to VELOOP Rewards?'}
            <button type="button" onClick={() => changeMode(isCreatingAccount ? 'sign-in' : 'create-account')}>
              {isCreatingAccount ? 'Sign in' : 'Create an account'}
            </button>
          </p>
          {!isCreatingAccount && <p className={styles.legal}>By continuing, you agree to VELOOP Rewards’ <a href="#terms" onClick={(event) => event.preventDefault()}>Terms</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</p>}
          <div className={styles.secureFooter}><span /> Your rewards are in good hands</div>
        </div>
      </section>
      <footer className={styles.pageFooter}>© 2026 VELOOP REWARDS <span>·</span> A better way to move forward</footer>
    </main>
  );
}
