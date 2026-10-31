
import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";

const levels = [
  { level: 1, name: "Starter", symbol: "★" },
  { level: 2, name: "Explorer", symbol: "◆" },
  { level: 3, name: "Achiever", symbol: "✦" },
  { level: 4, name: "Champion", symbol: "♛" },
  { level: 5, name: "Elite", symbol: "🏆" },
  { level: 6, name: "Legend", symbol: "♕" },
];

const currentXP = 4200;
const currentLevel = 4;
const nextLevelXP = 5000;
const progress = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

function ChampionBadge() {
  return (
    <svg viewBox="0 0 300 320" className={styles.championBadge}>
      <defs>
        <linearGradient id="badgeGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff2a8" />
          <stop offset="45%" stopColor="#ffc23e" />
          <stop offset="100%" stopColor="#a85b08" />
        </linearGradient>
        <linearGradient id="badgeShield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#493078" />
          <stop offset="100%" stopColor="#171127" />
        </linearGradient>
      </defs>

      <path
        d="M150 15 L180 43 L220 35 L235 75 L275 95 L258 135 L282 165 L255 198 L260 238 L218 250 L200 290 L160 275 L150 310 L140 275 L100 290 L82 250 L40 238 L45 198 L18 165 L42 135 L25 95 L65 75 L80 35 L120 43 Z"
        fill="url(#badgeGold)"
        stroke="#ffe49a"
        strokeWidth="5"
      />

      <path
        d="M150 55 L225 88 L215 190 Q195 240 150 260 Q105 240 85 190 L75 88 Z"
        fill="url(#badgeShield)"
        stroke="#ffdf80"
        strokeWidth="6"
      />

      <path
        d="M105 80 L120 48 L150 68 L180 48 L195 80 L183 100 L117 100 Z"
        fill="url(#badgeGold)"
        stroke="#fff0a8"
        strokeWidth="3"
      />

      <circle cx="120" cy="48" r="6" fill="#fff3b6" />
      <circle cx="150" cy="68" r="6" fill="#fff3b6" />
      <circle cx="180" cy="48" r="6" fill="#fff3b6" />

      <text
        x="150"
        y="165"
        textAnchor="middle"
        fill="#ffcf58"
        fontSize="66"
        fontWeight="bold"
      >
        04
      </text>

      <path
        d="M40 185 L260 185 L238 230 L62 230 Z"
        fill="url(#badgeGold)"
        stroke="#fff0a8"
        strokeWidth="3"
      />

      <text
        x="150"
        y="215"
        textAnchor="middle"
        fill="#29152c"
        fontSize="23"
        fontWeight="bold"
      >
        CHAMPION
      </text>

      <text
        x="150"
        y="263"
        textAnchor="middle"
        fill="#ffe08a"
        fontSize="23"
      >
        ★ ★ ★
      </text>
    </svg>
  );
}

function RewardGift() {
  return (
    <svg viewBox="0 0 320 300" className={styles.rewardGift}>
      <defs>
        <linearGradient id="giftGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3ad" />
          <stop offset="48%" stopColor="#ffc33f" />
          <stop offset="100%" stopColor="#b36a0c" />
        </linearGradient>
        <linearGradient id="giftBox" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#463064" />
          <stop offset="100%" stopColor="#171027" />
        </linearGradient>
      </defs>

      <ellipse
        cx="160"
        cy="268"
        rx="125"
        ry="17"
        fill="none"
        stroke="#ffc84f"
        strokeWidth="4"
      />

      <ellipse
        cx="160"
        cy="270"
        rx="95"
        ry="9"
        fill="#e5a42f"
        opacity="0.25"
      />

      <path
        d="M75 135 L245 135 L232 245 L88 245 Z"
        fill="url(#giftBox)"
        stroke="url(#giftGold)"
        strokeWidth="5"
      />

      <path
        d="M145 135 L175 135 L175 245 L145 245 Z"
        fill="url(#giftGold)"
      />

      <rect
        x="62"
        y="112"
        width="196"
        height="40"
        rx="8"
        fill="url(#giftBox)"
        stroke="url(#giftGold)"
        strokeWidth="5"
      />

      <path
        d="M160 112 C75 85 92 35 128 58 Q150 76 160 112 C170 76 192 35 228 58 Q245 88 160 112"
        fill="url(#giftGold)"
        stroke="#fff0a8"
        strokeWidth="5"
      />

      <text
        x="160"
        y="218"
        textAnchor="middle"
        fontSize="58"
        fontWeight="bold"
        fill="url(#giftGold)"
      >
        V
      </text>
    </svg>
  );
}

export default function Dashboard() {
  const [gameState, setGameState] = useState("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  function startGame() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    setScore(0);
    setTimeLeft(15);
    setGameState("playing");

    timerRef.current = window.setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
          setGameState("finished");
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  }

  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>V</span>
            <span className={styles.brandText}>
              <strong>VELOOP</strong>
              <small>REWARDS</small>
            </span>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.demoTag}>● IN PROGRESS</span>
            <span className={styles.avatar}>S</span>
          </div>
        </header>

        {/* Current Level */}
        <section className={styles.levelCard}>
          <div className={styles.topLine}>
            <span className={styles.sectionLabel}>YOUR CURRENT LEVEL</span>
            <span className={styles.progressStatus}>● IN PROGRESS</span>
          </div>

          <div className={styles.championRow}>
            <div className={styles.championArtwork}>
              <ChampionBadge />
            </div>

            <div className={styles.championInfo}>
              <span className={styles.levelNumber}>LEVEL 04</span>
              <h1>Champion</h1>
              <p>You are making great progress.</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className={styles.xpSection}>
            <div className={styles.xpHeading}>
              <span>⚡ XP PROGRESS</span>
              <strong>
                {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}
              </strong>
            </div>

            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className={styles.progressMeta}>
              <span>{progress}% completed</span>
              <strong>{(nextLevelXP - currentXP).toLocaleString()} XP to go</strong>
            </div>
          </div>

          {/* Statistics */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>⚡</span>
              <small>Total XP</small>
              <strong>{currentXP.toLocaleString()}</strong>
            </div>

            <div className={styles.stat}>
              <span>🏆</span>
              <small>Current level</small>
              <strong>{currentLevel}</strong>
            </div>

            <div className={styles.stat}>
              <span>◎</span>
              <small>Next goal</small>
              <strong>Level 5</strong>
            </div>
          </div>
        </section>

        {/* Next Reward */}
        <section className={styles.rewardCard}>
          <div className={styles.rewardHeading}>
            <span className={styles.sectionLabel}>YOUR NEXT REWARD</span>
            <span className={styles.rewardSmallIcon}>♕</span>
          </div>

          <div className={styles.rewardArtwork}>
            <RewardGift />
          </div>

          <div className={styles.rewardTitle}>LEVEL 5 REWARD</div>
          <h2>500 VEs</h2>

          <p className={styles.rewardDescription}>
            Keep earning XP to reach your next milestone.
          </p>

          <div className={styles.rewardBottom}>
            <span>Unlock progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className={styles.unlockLabel}>🔒 Unlock at Level 5</span>
        </section>

        {/* Level Progression */}
        <section className={styles.roadmap}>
          <div className={styles.cardHeading}>
            <h2>✦ LEVEL PROGRESSION</h2>
            <span>YOUR JOURNEY</span>
          </div>

          <div className={styles.roadmapList}>
            {levels.map((item) => {
              const active = item.level === currentLevel;
              const completed = item.level < currentLevel;
              const locked = item.level > currentLevel;

              return (
                <div
                  className={`${styles.roadmapItem} ${
                    active ? styles.currentRoadmap : ""
                  } ${completed ? styles.completedRoadmap : ""}`}
                  key={item.level}
                >
                  <div className={styles.roadmapBadge}>
                    {locked ? "🔒" : item.symbol}
                  </div>
                  <strong>Level {item.level}</strong>
                  <small>{item.name}</small>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mini Game */}
        <section className={styles.gameCard}>
          <div className={styles.gameIcon}>🎮</div>

          <div className={styles.gameContent}>
            <span className={styles.gameKicker}>PLAY · EARN · LEVEL UP</span>
            <h2>Level-Up Arcade</h2>
            <p>Catch coins, earn rewards and boost your XP!</p>

            {gameState === "ready" && (
              <button className={styles.gameButton} onClick={startGame}>
                Play Now ›
              </button>
            )}

            {gameState === "playing" && (
              <div className={styles.gameControls}>
                <strong>Time: {timeLeft}s · Coins: {score}</strong>
                <button
                  className={styles.gameButton}
                  onClick={() => setScore((value) => value + 1)}
                >
                  Catch Coin ⚡
                </button>
              </div>
            )}

            {gameState === "finished" && (
              <div className={styles.gameControls}>
                <strong>Time's up! You caught {score} coins.</strong>
                <button className={styles.gameButton} onClick={startGame}>
                  Play Again ↻
                </button>
              </div>
            )}
          </div>

          <div className={styles.floatingCoin}>V</div>
        </section>

        {/* Earning Opportunities */}
        <section className={styles.earningCard}>
          <span className={styles.sectionLabel}>✧ KEEP YOUR MOMENTUM</span>
          <h2>More Ways to Earn</h2>
          <p>Complete activities and keep moving towards your next level.</p>

          <div className={styles.earningGrid}>
            <div className={styles.earningItem}>
              <span>🎯</span>
              <h3>Complete Challenges</h3>
              <p>Finish challenges to earn more XP.</p>
            </div>

            <div className={styles.earningItem}>
              <span>🎮</span>
              <h3>Play Games</h3>
              <p>Enjoy games and improve your score.</p>
            </div>

            <div className={styles.earningItem}>
              <span>🏆</span>
              <h3>Reach Milestones</h3>
              <p>Unlock new levels and rewards.</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.activitySection}>
          <h2>Recent Activity</h2>

          <div className={styles.activityItem}>
            <div>
              <strong>Current Level Achieved</strong>
              <p>You reached Champion Level.</p>
            </div>
            <strong>Level 4</strong>
          </div>

          <div className={styles.activityItem}>
            <div>
              <strong>XP Progress</strong>
              <p>Keep going to reach the next milestone.</p>
            </div>
            <strong>4,200 XP</strong>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© 2026 VELOOP REWARDS</span>
          <span>LEVEL UP YOUR JOURNEY</span>
        </footer>
      </div>
    </main>
  );
}

