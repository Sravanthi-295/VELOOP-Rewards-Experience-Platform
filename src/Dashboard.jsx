import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, Bell, CalendarCheck, Check, CircleHelp,
  Clock3, Coins, Gift, Gamepad2, Info, LockKeyhole, LogOut, Play, RotateCcw,
  Sparkles, Trophy, UsersRound, WalletCards, X, Zap
} from 'lucide-react';
import styles from './Dashboard.module.css';
import Login from './Login.jsx';
import Wallet from './Wallet.jsx';
import level1 from './assets/level-1.svg';
import level2 from './assets/level-2.svg';
import level3 from './assets/level-3.svg';
import level4 from './assets/level-4.svg';
import level5 from './assets/level-5.svg';
import level6 from './assets/level-6.svg';
import level7 from './assets/level-7.svg';
import level8 from './assets/level-8.svg';
import level9 from './assets/level-9.svg';
import level10 from './assets/level-10.svg';
import lockBadge from './assets/lock.svg';
import logo from './assets/logo.svg';

const badgeAssets = [
  level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10
];

const levelNames = [
  'Rookie', 'Riser', 'Achiever', 'Explorer', 'Trailblazer',
  'Pathfinder', 'Champion', 'Luminary', 'Elite', 'Legend'
];

const activitySeed = [
  { id: 'sample-1', title: 'Daily check-in', reward: '+10 XP', time: 'Today', demo: true },
  { id: 'sample-2', title: 'Coin Catch challenge', reward: '+20 XP', time: 'Yesterday', demo: true },
  { id: 'sample-3', title: 'Level 04 unlocked', reward: 'Explorer badge', time: 'This week', demo: true }
];

const getLevelForXp = (xp) => Math.min(10, xp < 8000 ? 4 : 5 + Math.floor((xp - 8000) / 2000));
const getNextLevelXp = (level) => level === 4 ? 8000 : 8000 + (level - 4) * 2000;
const formatNumber = (number) => number.toLocaleString('en-US');

export default function Dashboard() {
  const [xp, setXp] = useState(6420);
  const [notice, setNotice] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [activity, setActivity] = useState(activitySeed);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameMode, setGameMode] = useState('intro');
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [playsToday, setPlaysToday] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ left: '50%', top: '55%' });
  const [roundResult, setRoundResult] = useState({ score: 0, xpEarned: 0 });
  const [levelUp, setLevelUp] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [signedIn, setSignedIn] = useState(false);
  const previousLevel = useRef(getLevelForXp(6420));

  const currentLevel = getLevelForXp(xp);
  const nextLevelXp = getNextLevelXp(currentLevel);
  const currentLevelStartXp = currentLevel === 4 ? 0 : getNextLevelXp(currentLevel - 1);
  const progress = Math.min(
    100,
    Math.max(0, ((xp - currentLevelStartXp) / (nextLevelXp - currentLevelStartXp)) * 100)
  );
  const xpRemaining = Math.max(0, nextLevelXp - xp);
  const nextLevel = Math.min(currentLevel + 1, 10);

  useEffect(() => {
    if (gameMode !== 'playing') return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((remaining) => Math.max(0, remaining - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameMode]);

  useEffect(() => {
    if (gameMode !== 'playing' || timeLeft !== 0) return;
    const xpEarned = gameScore >= 8 ? 20 : 0;
    setRoundResult({ score: gameScore, xpEarned });
    setGameMode('result');
    setPlaysToday((plays) => plays + 1);
    if (xpEarned > 0) awardXp(xpEarned, 'Coin Catch challenge');
  }, [gameMode, timeLeft, gameScore]);

  useEffect(() => {
    if (currentLevel > previousLevel.current) {
      setLevelUp(currentLevel);
    }
    previousLevel.current = currentLevel;
  }, [currentLevel]);

  function awardXp(amount, source) {
    setXp((currentXp) => currentXp + amount);
    setActivity((items) => [
      { id: `${Date.now()}-${source}`, title: source, reward: `+${amount} XP`, time: 'Just now' },
      ...items.filter((item) => !item.demo)
    ].slice(0, 5));
    setNotice(`Demo reward added: +${amount} XP for ${source}.`);
  }

  function startGame() {
    if (playsToday >= 3) {
      setNotice('You have used all 3 demo rounds for today.');
      return;
    }
    setGameScore(0);
    setTimeLeft(20);
    setRoundResult({ score: 0, xpEarned: 0 });
    setTargetPosition({ left: '50%', top: '55%' });
    setGameMode('intro');
    setGameOpen(true);
    setNotice('');
  }

  function beginRound() {
    setGameScore(0);
    setTimeLeft(20);
    setTargetPosition({ left: `${15 + Math.random() * 70}%`, top: `${25 + Math.random() * 55}%` });
    setGameMode('playing');
  }

  function catchCoin() {
    if (gameMode !== 'playing') return;
    setGameScore((score) => score + 1);
    setTargetPosition({ left: `${15 + Math.random() * 70}%`, top: `${25 + Math.random() * 55}%` });
  }

  function finishGame() {
    if (gameMode === 'playing') {
      const xpEarned = gameScore >= 8 ? 20 : 0;
      setRoundResult({ score: gameScore, xpEarned });
      setGameMode('result');
      setPlaysToday((plays) => plays + 1);
      if (xpEarned > 0) awardXp(xpEarned, 'Coin Catch challenge');
      return;
    }
    setGameOpen(false);
  }

  function completeCheckIn() {
    if (checkedIn) return;
    setCheckedIn(true);
    awardXp(10, 'Daily check-in');
  }

  function closeLevelUp() {
    setLevelUp(null);
    setNotice(`Level ${String(currentLevel).padStart(2, '0')} unlocked. Your next milestone is ${formatNumber(nextLevelXp)} XP.`);
  }

  const roadmapLevels = Array.from({ length: 8 }, (_, index) => {
    const level = Math.max(1, Math.min(10, currentLevel - 3 + index));
    return level;
  }).filter((level, index, levels) => levels.indexOf(level) === index);

  if (!signedIn) {
    return <Login onSignIn={() => setSignedIn(true)} />;
  }

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="#dashboard" aria-label="VELOOP Rewards home">
          <img src={logo} alt="VELOOP" />
          <span>REWARDS</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          <a className={`${styles.navItem} ${activePage === 'dashboard' ? styles.navActive : ''}`} href="#dashboard" onClick={() => setActivePage('dashboard')}><Trophy size={18} /><span>Overview</span></a>
          <a className={styles.navItem} href="#progress" onClick={() => setActivePage('dashboard')}><Zap size={18} /><span>My journey</span></a>
          <a className={styles.navItem} href="#play" onClick={() => setActivePage('dashboard')}><Gamepad2 size={18} /><span>Play &amp; earn</span></a>
          <a className={styles.navItem} href="#earn" onClick={() => setActivePage('dashboard')}><Coins size={18} /><span>Opportunities</span></a>
          <a className={styles.navItem} href="#activity" onClick={() => setActivePage('dashboard')}><Clock3 size={18} /><span>XP activity</span></a>
          <button className={`${styles.navItem} ${activePage === 'wallet' ? styles.navActive : ''}`} type="button" onClick={() => { setActivePage('wallet'); setNotice(''); }}><WalletCards size={18} /><span>Wallet demo</span></button>
        </nav>

        <div className={styles.sidebarNote}>
          <span className={styles.sidebarNoteIcon}><Sparkles size={17} /></span>
          <p>Every action moves your journey forward.</p>
          <a href="#play">Find your next step <ArrowRight size={14} /></a>
        </div>

        <div className={styles.sidebarFooter}>
          <span className={styles.avatar}>AS</span>
          <span className={styles.profileText}><strong>Alex Smith</strong><small>Rewards member</small></span>
          <button className={styles.signOutButton} type="button" aria-label="Sign out" title="Sign out" onClick={() => { setSignedIn(false); setActivePage('dashboard'); }}><LogOut size={15} /></button>
        </div>
      </aside>

      {activePage === 'wallet' ? (
        <Wallet onBack={() => setActivePage('dashboard')} />
      ) : <main className={styles.main} id="dashboard">
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>REWARDS <span>/</span> LEVEL JOURNEY</div>
          <div className={styles.topbarActions}>
            <button className={styles.iconButton} aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}>
              <Bell size={18} />
              <span className={styles.notificationDot} />
            </button>
            <span className={styles.todayLabel}><span /> Your journey is active</span>
          </div>
        </header>

        {notice && (
          <div className={styles.notice} role="status">
            <Sparkles size={16} />
            <span>{notice}</span>
            <button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={15} /></button>
          </div>
        )}

        <section className={styles.welcome} aria-labelledby="welcome-title">
          <div>
            <p className={styles.overline}>YOUR REWARDS JOURNEY</p>
            <h1 id="welcome-title">Level up your rewards<span>.</span></h1>
            <p className={styles.welcomeText}>A little progress adds up. See where you are and choose what to do next.</p>
          </div>
          <a className={styles.welcomeLink} href="#play">Explore ways to earn <ArrowDownRight size={17} /></a>
        </section>

        <section className={styles.heroGrid} id="progress" aria-label="Level progress and next reward">
          <article className={styles.progressCard}>
            <div className={styles.progressCardTop}>
              <div>
                <span className={styles.cardEyebrow}><span className={styles.statusDot} /> CURRENT LEVEL</span>
                <h2>Level {String(currentLevel).padStart(2, '0')} <span>{levelNames[currentLevel - 1]}</span></h2>
              </div>
              <div className={styles.levelHeaderRight}>
                <button className={styles.infoButton} title="XP helps you progress through VELOOP levels. Thresholds on this prototype are demo configuration." aria-label="Level and XP information"><Info size={15} /></button>
                <span className={styles.levelLabel}><img src={badgeAssets[currentLevel - 1]} alt="" /> LEVEL {String(currentLevel).padStart(2, '0')}</span>
              </div>
            </div>

            <div className={styles.progressStats}>
              <div><span>Current XP</span><strong>{formatNumber(xp)} <small>XP</small></strong></div>
              <div className={styles.nextLevelStat}><span>XP to Level {String(nextLevel).padStart(2, '0')}</span><strong>{formatNumber(xpRemaining)} <small>XP</small></strong></div>
            </div>

            <div className={styles.progressTrack} role="progressbar" aria-label={`Progress to level ${nextLevel}`} aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.progressCaption}>
              <span>{formatNumber(xp)} / {formatNumber(nextLevelXp)} XP</span>
              <strong>{Math.round(progress)}%</strong>
            </div>
            <div className={styles.progressFoot}>
              <span><Check size={14} /> {formatNumber(xpRemaining)} XP remaining</span>
              <span>Next: Level {String(nextLevel).padStart(2, '0')}</span>
            </div>
          </article>

          <article className={styles.rewardCard}>
            <div className={styles.rewardHeader}>
              <div><span className={styles.cardEyebrow}>UP NEXT</span><h2>Your next reward awaits</h2></div>
              <button className={styles.infoButton} title="This is a demo reward preview. Actual rewards depend on VELOOP's approved reward configuration." aria-label="Reward information"><Info size={16} /></button>
            </div>
            <div className={styles.rewardShowcase}>
              <img className={styles.rewardBadge} src={badgeAssets[nextLevel - 1]} alt={`Level ${nextLevel} badge`} />
              <div className={styles.rewardCopy}>
                <span className={styles.lockedPill}><LockKeyhole size={12} /> LOCKED</span>
                <h3>500 VEs</h3>
                <p>Level {String(nextLevel).padStart(2, '0')} reward <span>· Demo preview</span></p>
              </div>
              <div className={styles.rewardOrbit} aria-hidden="true"><Gift size={18} /></div>
            </div>
            <a className={styles.rewardCta} href="#earn">See how to get there <ArrowRight size={15} /></a>
          </article>
        </section>

        <section className={styles.actionGrid} aria-label="Ways to progress">
          <article className={`${styles.panel} ${styles.gamePanel}`} id="play">
            <div className={styles.sectionHeading}>
              <span className={`${styles.sectionIcon} ${styles.gameIcon}`}><Gamepad2 size={19} /></span>
              <div><p className={styles.cardEyebrow}>PLAY · ENGAGE · PROGRESS</p><h2>VE Coin Catch</h2></div>
              <span className={styles.demoTag}>DEMO GAME</span>
            </div>
            <div className={styles.gameFeature}>
              <div className={styles.gameVisual} aria-hidden="true">
                <div className={styles.gameVisualGrid} />
                <span className={styles.gameGlow} />
                <span className={styles.coinLarge}>V</span>
                <span className={styles.coinSmall}>V</span>
                <span className={styles.gameSpark}>✦</span>
                <div className={styles.gameVisualCaption}><span>QUICK CHALLENGE</span><strong>20 seconds</strong></div>
              </div>
              <div className={styles.gameDetails}>
                <h3>Catch coins. Earn demo XP.</h3>
                <p>Tap the moving VE coin 8 times before the timer runs out to qualify for the demo XP reward.</p>
                <div className={styles.gameMeta}>
                  <span><Trophy size={14} /> 8 catches to qualify</span>
                  <span><Zap size={14} /> +20 XP demo reward</span>
                </div>
                <button className={styles.primaryButton} onClick={startGame} disabled={playsToday >= 3}>
                  {playsToday >= 3 ? 'Daily demo limit reached' : 'Play Coin Catch'}
                  {playsToday >= 3 ? <Check size={16} /> : <Play size={15} fill="currentColor" />}
                </button>
                <small className={styles.playLimit}>{playsToday}/3 demo rounds used this session</small>
              </div>
            </div>
            <p className={styles.demoDisclaimer}><CircleHelp size={13} /> Frontend prototype only. No VE currency is issued; XP shown is not connected to backend reward rules.</p>
          </article>

          <article className={`${styles.panel} ${styles.earnPanel}`} id="earn">
            <div className={styles.sectionHeading}>
              <span className={`${styles.sectionIcon} ${styles.earnIcon}`}><Zap size={18} /></span>
              <div><p className={styles.cardEyebrow}>YOUR NEXT STEP</p><h2>Earn more XP</h2></div>
              <button className={styles.infoButton} title="Only the check-in and mini-game actions are interactive demos. Other earning options are not yet supported." aria-label="Earning information"><Info size={16} /></button>
            </div>
            <div className={styles.earningList}>
              <div className={`${styles.earningItem} ${checkedIn ? styles.earningComplete : ''}`}>
                <span className={`${styles.earningIcon} ${styles.checkinIcon}`}>{checkedIn ? <Check size={17} /> : <CalendarCheck size={17} />}</span>
                <span className={styles.earningText}><strong>Daily check-in</strong><small>{checkedIn ? 'Completed in this demo session' : 'A small step to keep your streak'}</small></span>
                <span className={styles.earningReward}>+10 XP <small>demo</small></span>
                <button className={styles.earningAction} onClick={completeCheckIn} disabled={checkedIn} aria-label={checkedIn ? 'Daily check-in completed' : 'Complete daily check-in'}>{checkedIn ? <Check size={16} /> : <ArrowRight size={16} />}</button>
              </div>
              <div className={styles.earningItem}>
                <span className={`${styles.earningIcon} ${styles.watchIcon}`}><Play size={17} /></span>
                <span className={styles.earningText}><strong>Watch &amp; earn</strong><small>Eligible videos and offers</small></span>
                <span className={styles.comingSoon}>COMING SOON</span>
              </div>
              <div className={styles.earningItem}>
                <span className={`${styles.earningIcon} ${styles.referIcon}`}><UsersRound size={17} /></span>
                <span className={styles.earningText}><strong>Refer a friend</strong><small>Invite friends to VELOOP</small></span>
                <span className={styles.comingSoon}>COMING SOON</span>
              </div>
            </div>
            <p className={styles.demoDisclaimer}><CircleHelp size={13} /> Demo values only. Real earning options depend on approved VELOOP features.</p>
          </article>
        </section>

        <section className={`${styles.panel} ${styles.roadmapPanel}`} aria-labelledby="roadmap-title">
          <div className={styles.roadmapHeading}>
            <div className={styles.sectionHeading}>
              <span className={`${styles.sectionIcon} ${styles.roadmapIcon}`}><Trophy size={18} /></span>
              <div><p className={styles.cardEyebrow}>YOUR MILESTONES</p><h2 id="roadmap-title">Level progression</h2></div>
            </div>
            <div className={styles.roadmapLegend}><span><i className={styles.completeLegend} /> Completed</span><span><i className={styles.currentLegend} /> You are here</span><span><i className={styles.lockedLegend} /> Locked</span></div>
          </div>
          <div className={styles.roadmap} aria-label={`Level ${currentLevel} of 10`}>
            {roadmapLevels.map((level) => {
              const state = level < currentLevel ? 'completed' : level === currentLevel ? 'current' : level === nextLevel ? 'next' : 'locked';
              const reward = level === nextLevel ? '500 VEs · demo' : level < currentLevel ? 'Unlocked' : 'Reward preview';
              return (
                <div className={`${styles.levelStep} ${styles[state]}`} key={level}>
                  <div className={styles.levelNode}>
                    <img src={badgeAssets[level - 1]} alt={`Level ${level} badge`} />
                    {state === 'locked' && <span className={styles.nodeLock}><img src={lockBadge} alt="" /></span>}
                    {state === 'completed' && <span className={styles.nodeCheck}><Check size={11} /></span>}
                  </div>
                  <strong>Level {String(level).padStart(2, '0')}</strong>
                  <small>{level === currentLevel ? 'Current' : level === nextLevel ? 'Next goal' : level < currentLevel ? 'Completed' : 'Locked'}</small>
                  <span className={styles.levelReward}>{reward}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.roadmapNote}><LockKeyhole size={13} /> Future rewards are previews and may change with the approved level configuration.</div>
        </section>

        <section className={`${styles.panel} ${styles.activityPanel}`} id="activity">
          <div className={styles.activityHeading}>
            <div className={styles.sectionHeading}>
              <span className={`${styles.sectionIcon} ${styles.activityIcon}`}><Clock3 size={18} /></span>
              <div><p className={styles.cardEyebrow}>YOUR RECENT PROGRESS</p><h2>XP activity</h2></div>
            </div>
            <span className={styles.sampleLabel}>DEMO ACTIVITY</span>
          </div>
          <div className={styles.activityList}>
            {activity.map((item) => (
              <div className={styles.activityRow} key={item.id}>
                <span className={styles.activityMark}><Zap size={15} /></span>
                <span className={styles.activityTitle}>{item.title}{item.demo && <small>Sample</small>}</span>
                <span className={styles.activityReward}>{item.reward}</span>
                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>VELOOP REWARDS</span><span>Development preview · XP, levels and reward values are demo data</span>
        </footer>
      </main>}

      {gameOpen && (
        <div className={styles.modalBackdrop} role="presentation">
          <section className={styles.gameModal} role="dialog" aria-modal="true" aria-labelledby="game-title">
            <button className={styles.modalClose} onClick={finishGame} aria-label={gameMode === 'playing' ? 'End round' : 'Close game'}><X size={19} /></button>
            <div className={styles.modalKicker}><Gamepad2 size={15} /> VELOOP MINI GAME · DEMO ONLY</div>
            <h2 id="game-title">VE Coin Catch</h2>
            {gameMode === 'intro' && (
              <>
                <p className={styles.modalLead}>Catch the moving VE coin and make every second count.</p>
                <div className={styles.rulesGrid}>
                  <div><span>OBJECTIVE</span><strong>Catch 8 coins</strong></div>
                  <div><span>TIME LIMIT</span><strong>20 seconds</strong></div>
                  <div><span>QUALIFYING REWARD</span><strong>+20 XP · demo</strong></div>
                  <div><span>PLAY LIMIT</span><strong>{3 - playsToday} rounds left this session</strong></div>
                </div>
                <p className={styles.modalDisclosure}>No VE currency is awarded. This is a frontend-only prototype; qualifying demo XP is added to the on-screen total for this session only.</p>
                <button className={styles.primaryButton} onClick={beginRound}>Start round <Play size={15} fill="currentColor" /></button>
              </>
            )}
            {gameMode === 'playing' && (
              <>
                <div className={styles.liveGameStats}><span>TIME <strong>{timeLeft}s</strong></span><span>CAUGHT <strong>{gameScore}/8</strong></span><span>REWARD <strong>+20 XP</strong></span></div>
                <div className={styles.playField} aria-label="Tap the VE coin to catch it">
                  <span className={styles.fieldHint}>TAP THE COIN</span>
                  <button className={styles.catchCoin} style={targetPosition} onClick={catchCoin} aria-label="Catch the moving VE coin">V</button>
                </div>
                <p className={styles.modalDisclosure}>Reach 8 catches before the timer ends to qualify for +20 demo XP. This round uses 1 of your 3 daily attempts.</p>
              </>
            )}
            {gameMode === 'result' && (
              <div className={styles.resultState}>
                <div className={styles.resultBadge}>{roundResult.xpEarned > 0 ? <Sparkles size={28} /> : <Coins size={28} />}</div>
                <span className={styles.resultEyebrow}>{roundResult.xpEarned > 0 ? 'CHALLENGE COMPLETE' : 'ROUND COMPLETE'}</span>
                <h3>{roundResult.xpEarned > 0 ? 'Nice catch.' : 'Good try.'}</h3>
                <p>You caught <strong>{roundResult.score}</strong> coins in 20 seconds.</p>
                <div className={styles.resultReward}>{roundResult.xpEarned > 0 ? '+20 XP' : 'No XP this round'} <small>{roundResult.xpEarned > 0 ? 'demo reward added' : '8 catches needed to qualify'}</small></div>
                <button className={styles.primaryButton} onClick={finishGame}>{playsToday < 3 ? 'Back to dashboard' : 'Done'} <ArrowRight size={15} /></button>
                {playsToday < 3 && <button className={styles.replayButton} onClick={startGame}><RotateCcw size={14} /> Play another round ({3 - playsToday} left)</button>}
              </div>
            )}
          </section>
        </div>
      )}

      {levelUp && (
        <div className={styles.modalBackdrop} role="presentation">
          <section className={`${styles.gameModal} ${styles.levelUpModal}`} role="dialog" aria-modal="true" aria-labelledby="level-up-title">
            <button className={styles.modalClose} onClick={closeLevelUp} aria-label="Close level-up celebration"><X size={19} /></button>
            <div className={styles.levelUpBadge}><img src={badgeAssets[levelUp - 1]} alt={`Level ${levelUp} badge`} /></div>
            <p className={styles.modalKicker}><Sparkles size={15} /> MILESTONE UNLOCKED</p>
            <h2 id="level-up-title">Level {String(levelUp).padStart(2, '0')}</h2>
            <p className={styles.modalLead}>You have reached a new milestone. Keep going to discover what comes next.</p>
            <div className={styles.levelUpReward}><Gift size={18} /><span>Next-level reward preview</span><strong>500 VEs · demo</strong></div>
            <button className={styles.primaryButton} onClick={closeLevelUp}>Continue <ArrowRight size={15} /></button>
          </section>
        </div>
      )}
    </div>
  );
}
