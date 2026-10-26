import React from 'react';
import { useState } from 'react';
import {
  LayoutDashboard, Gamepad2, Coins, Gift, Trophy, UserRound, Bell, ChevronDown,
  Crown, LockKeyhole, CalendarDays, Play, UsersRound, Clock3, ArrowRight,
  Zap, Check, Sparkles, RotateCcw, X
} from 'lucide-react';
import styles from './Dashboard.module.css';

const taskItems = [
  { icon: CalendarDays, title: 'Daily Login', reward: '+10 XP', color: 'blue' },
  { icon: Play, title: 'Watch a Video', reward: '+15 XP', color: 'blue' },
  { icon: Gamepad2, title: 'Complete a Game', reward: '+20 XP', color: 'purple' },
  { icon: UsersRound, title: 'Refer a Friend', reward: 'Coming soon', color: 'teal' }
];

const activityItems = [
  { icon: CalendarDays, title: 'Completed Daily Login', reward: '+10 XP', time: '2 hours ago', color: 'blue' },
  { icon: Gamepad2, title: 'Played Coin Catcher', reward: '+25 VEs', time: '3 hours ago', color: 'teal' },
  { icon: Gift, title: 'Reached Level 04', reward: '+500 XP', time: '1 day ago', color: 'purple' },
  { icon: UsersRound, title: 'Completed Task', reward: '+15 XP', time: '1 day ago', color: 'green' },
  { icon: Gift, title: 'Claimed Reward', reward: '+100 VEs', time: '2 days ago', color: 'orange' }
];

const levels = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Dashboard() {
  const [xp, setXp] = useState(6420);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [notice, setNotice] = useState('');

  const levelStart = 0;
  const nextLevelXp = 8000;
  const progress = Math.min((xp / nextLevelXp) * 100, 100);
  const xpRemaining = Math.max(nextLevelXp - xp, 0);

  function startGame() {
    setGameScore(0);
    setGameOpen(true);
    setNotice('');
  }

  function catchCoin() {
    setGameScore((score) => score + 1);
  }

  function finishGame() {
    const earned = gameScore * 5;
    setXp((current) => Math.min(current + earned, nextLevelXp));
    setPlayed((current) => current + 1);
    setNotice(`Demo game complete! You caught ${gameScore} coins and earned ${earned} XP.`);
    setGameOpen(false);
  }

  function completeDailyLogin() {
    setXp((current) => Math.min(current + 10, nextLevelXp));
    setNotice('Demo task completed: +10 XP added.');
  }

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>V</div>
          <div><strong>VELOOP</strong><span>REWARDS</span></div>
        </div>
        <nav className={styles.nav}>
          {[
            [LayoutDashboard, 'Dashboard', true],
            [Gamepad2, 'Games'],
            [Coins, 'Earn More'],
            [Gift, 'Rewards'],
            [Trophy, 'Leaderboard'],
            [UserRound, 'Profile']
          ].map(([Icon, label, active]) => (
            <button key={label} className={`${styles.navItem} ${active ? styles.navActive : ''}`} onClick={() => label !== 'Dashboard' && setNotice(`${label} section is a demo placeholder.`)}>
              <Icon size={19} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarPromo}>
          <Crown size={30} className={styles.goldIcon} />
          <h3>More Play<br />More Rewards</h3>
          <p>Complete challenges, earn XP, and unlock exclusive rewards!</p>
          <button className={styles.goldButton} onClick={() => setNotice('Explore more earning opportunities — more features coming soon.')}>Explore Now <ArrowRight size={15} /></button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h1>Good Morning, Alex! <span className={styles.wave}>👋</span></h1>
            <p>Keep earning XP, unlock new levels, and discover better rewards<br className="d-none d-md-block" /> along the way.</p>
          </div>
          <div className={styles.userArea}>
            <button className={styles.bell} aria-label="Notifications" onClick={() => setNotice('You are all caught up!')}><Bell size={20}/><i /></button>
            <div className={styles.avatar}>AS</div>
            <button className={styles.userName} onClick={() => setNotice('Profile menu is a demo placeholder.')}>Alex Smith <ChevronDown size={15}/></button>
          </div>
        </header>

        {notice && <div className={styles.notice} role="status"><Sparkles size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}

        <section className={styles.heroGrid}>
          <div className={styles.levelCard}>
            <div className={styles.levelBadge}><Crown size={22}/><strong>04</strong></div>
            <div className={styles.levelDetails}>
              <span className={styles.eyebrow}>Current Level</span>
              <h2>Level 04</h2><p className={styles.rank}>Explorer</p>
              <div className={styles.progressLine}><div><span style={{width: `${progress}%`}} /></div><b>{nextLevelXp.toLocaleString()} XP</b></div>
              <div className={styles.xpRow}><strong>{xp.toLocaleString()} XP</strong><span>(Next Level)</span></div>
              <small><Crown size={13}/> {xpRemaining.toLocaleString()} XP remaining to reach Level 05</small>
            </div>
            <div className={styles.mountainGlow} />
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.cardHeading}><span className={styles.headingIcon}><Gift size={19}/></span><h2>Next-Level Reward</h2></div>
            <div className={styles.rewardContent}>
              <div className={styles.coinArt}>🪙</div>
              <div><h3>500 VEs</h3><p>Level 05 Reward</p></div>
              <span className={styles.lock}><LockKeyhole size={20}/></span>
            </div>
            <button className={styles.mutedButton} onClick={() => setNotice(`Earn ${xpRemaining.toLocaleString()} more XP to reach Level 05.`)}>Reach Level 05 to unlock this reward</button>
          </div>
        </section>

        <section className={styles.contentGrid}>
          <div className={`${styles.panel} ${styles.gamePanel}`}>
            <div className={styles.cardHeading}><span className={`${styles.headingIcon} ${styles.purpleIcon}`}><Gamepad2 size={22}/></span><div><h2>Play &amp; Earn</h2><p>Complete fun games, earn XP and rewards!</p></div></div>
            <div className={styles.gameCard}>
              <div className={styles.gameArtwork}><div className={styles.spaceStars}>✦　·　✧　·　✦</div><span className={styles.rocket}>🚀</span><span className={styles.floatingCoin}>🪙</span></div>
              <div className={styles.gameInfo}>
                <h3>Coin Catcher</h3><p>Catch falling VE coins and earn XP!</p>
                <button className={styles.goldButton} onClick={startGame}>Play Now <ArrowRight size={15}/></button>
              </div>
              <div className={styles.gameRewards}>
                <strong>Rewards</strong>
                <span>⭐ <b>+20 XP</b></span><span>🪙 <b>+25 VEs</b></span>
                <label>Time Limit</label><span><Clock3 size={15}/> 60 seconds</span>
                <small>{Math.min(played, 3)}/3 plays today</small>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.cardHeading}><span className={styles.headingIcon}><Zap size={21}/></span><div><h2>Earn More XP</h2><p>Complete daily tasks and challenges</p></div></div>
            <div className={styles.taskList}>
              {taskItems.map(({icon: Icon, title, reward, color}, index) => (
                <button className={styles.taskItem} key={title} onClick={index === 0 ? completeDailyLogin : () => setNotice(reward === 'Coming soon' ? `${title} — Coming Soon` : `${title} is a demo task. Full functionality can be added next.`)}>
                  <span className={`${styles.taskIcon} ${styles[color]}`}><Icon size={19}/></span><span className={styles.taskText}><strong>{title}</strong><small>{reward === 'Coming soon' ? reward : reward}</small></span><ArrowRight size={18} className={styles.taskArrow}/>
                </button>
              ))}
            </div>
            <button className={styles.mutedButton} onClick={() => setNotice('More tasks will be added here.')}>View All Tasks <ArrowRight size={15}/></button>
          </div>

          <div className={styles.panel}>
            <div className={styles.cardHeading}><span className={styles.headingIcon}><Clock3 size={21}/></span><div><h2>Recent Activity</h2><p>Your latest XP and reward activity</p></div></div>
            <div className={styles.activityList}>
              {activityItems.map(({icon: Icon, title, reward, time, color}) => (
                <div className={styles.activityItem} key={title}><span className={`${styles.activityIcon} ${styles[color]}`}><Icon size={17}/></span><span className={styles.activityText}><strong>{title}</strong><small>{reward}</small></span><time>{time}</time></div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.panel} ${styles.roadmapPanel}`}>
          <div className={styles.roadmapHeader}><div className={styles.cardHeading}><span className={styles.headingIcon}><Gift size={20}/></span><div><h2>Level Progression</h2><p>Your journey to bigger rewards</p></div></div><button className={styles.mutedButton} onClick={() => setNotice('Full level roadmap is coming soon.')}>View All Levels <ArrowRight size={15}/></button></div>
          <div className={styles.roadmap}>
            {levels.map((level) => {
              const state = level < 4 ? 'completed' : level === 4 ? 'current' : level === 5 ? 'next' : 'locked';
              return <div className={`${styles.levelStep} ${styles[state]}`} key={level}><div className={styles.levelNode}>{state === 'completed' ? <><b>{String(level).padStart(2,'0')}</b><Check size={13}/></> : state === 'current' ? <><Crown size={13}/><b>{String(level).padStart(2,'0')}</b></> : <><b>{String(level).padStart(2,'0')}</b>{state === 'locked' && <LockKeyhole size={10}/>}</>}</div><span>{state === 'completed' ? 'Completed' : state === 'current' ? 'Current' : state === 'next' ? 'Next' : 'Locked'}</span></div>;
            })}
          </div>
        </section>
        <footer className={styles.footer}>VELOOP Rewards <span>•</span> Dashboard preview · Demo XP and reward values</footer>
      </main>

      {gameOpen && <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="game-title">
        <div className={styles.gameModal}>
          <button className={styles.modalClose} onClick={() => setGameOpen(false)} aria-label="Close game"><X size={20}/></button>
          <span className={styles.modalKicker}><Gamepad2 size={16}/> MINI GAME · DEMO</span>
          <h2 id="game-title">Coin Catcher</h2>
          <p>Tap the coin to catch it and build your score.</p>
          <div className={styles.playField}><div className={styles.gameScore}>Coins caught <strong>{gameScore}</strong></div><button className={styles.catchCoin} onClick={catchCoin} aria-label="Catch coin">🪙</button><span className={styles.fieldRocket}>🚀</span></div>
          <div className={styles.modalActions}><button className={styles.mutedButton} onClick={() => setGameScore(0)}><RotateCcw size={15}/> Reset</button><button className={styles.goldButton} onClick={finishGame}>Finish &amp; collect XP</button></div>
          <small className={styles.demoDisclaimer}>Demo game: XP is stored only in this page session.</small>
        </div>
      </div>}
    </div>
  );
}