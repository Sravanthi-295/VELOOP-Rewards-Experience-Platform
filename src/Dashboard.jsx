import React, { useState } from "react";
import {
  Trophy,
  Zap,
  Gift,
  Gamepad2,
  Target,
  Clock3,
  LockKeyhole,
  CheckCircle2,
  ArrowRight,
  Star,
  RotateCcw,
  Flame,
  Info,
} from "lucide-react";

import styles from "./Dashboard.module.css";

const levels = [
  { level: 1, name: "Starter", xp: 0, badge: "/badges/level-1.png" },
  { level: 2, name: "Explorer", xp: 500, badge: "/badges/level-2.png" },
  { level: 3, name: "Achiever", xp: 1500, badge: "/badges/level-3.png" },
  { level: 4, name: "Champion", xp: 3000, badge: "/badges/level-4.png" },
  { level: 5, name: "Elite", xp: 5000, badge: "/badges/level-5.png" },
  { level: 6, name: "Legend", xp: 8000, badge: "/badges/level-6.png" },
];

// DEMO DATA ONLY: replace with approved values when available.
const currentXP = 4200;
const currentLevel = 4;
const nextLevelXP = 5000;
const demoReward = "500 VEs";

function BadgeImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${styles.badgeFallback} ${className || ""}`}>
        <Trophy size={28} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function Dashboard() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [activityMessage, setActivityMessage] = useState("");

  const progress = Math.min(
    100,
    Math.round((currentXP / nextLevelXP) * 100)
  );

  const xpRemaining = Math.max(0, nextLevelXP - currentXP);

  function startGame() {
    setScore(0);
    setSeconds(20);
    setGameOver(false);
    setGameStarted(true);

    let remaining = 20;

    const timer = setInterval(() => {
      remaining -= 1;
      setSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        setGameStarted(false);
        setGameOver(true);
      }
    }, 1000);
  }

  function catchCoin() {
    if (gameStarted && seconds > 0) {
      setScore((previous) => previous + 1);
    }
  }

  function resetGame() {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setSeconds(20);
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <a href="#home" className={styles.brand}>
          <span className={styles.brandIcon}>V</span>
          <span>VELOOP <small>REWARDS</small></span>
        </a>

        <div className={styles.headerRight}>
          <span className={styles.demoTag}>DEMO EXPERIENCE</span>
          <div className={styles.avatar}>S</div>
        </div>
      </header>

      <div className={styles.container} id="home">
        <section className={styles.welcome}>
          <div>
            <span className={styles.eyebrow}>YOUR REWARDS JOURNEY</span>
            <h1>Every step takes you <span>higher.</span></h1>
            <p>
              Earn XP, explore challenges, and discover what awaits at your
              next level.
            </p>
          </div>

          <div className={styles.streak}>
            <Flame size={22} />
            <div>
              <strong>Keep going!</strong>
              <span>Your next achievement awaits.</span>
            </div>
          </div>
        </section>

        <section className={styles.heroGrid}>
          <article className={styles.levelCard}>
            <div className={styles.cardTop}>
              <span className={styles.eyebrow}>YOUR CURRENT LEVEL</span>
              <span className={styles.status}>
                <span /> IN PROGRESS
              </span>
            </div>

            <div className={styles.levelMain}>
              <BadgeImage
                src="/badges/level-4.png"
                alt="Current level badge"
                className={styles.heroBadge}
              />

              <div>
                <span className={styles.levelNumber}>
                  LEVEL {String(currentLevel).padStart(2, "0")}
                </span>
                <h2>Champion</h2>
                <p>You are making great progress.</p>
              </div>
            </div>

            <div className={styles.xpHeading}>
              <span><Zap size={16} /> XP PROGRESS</span>
              <strong>{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()}</strong>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="XP progress to next level"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className={styles.progressBottom}>
              <span>{progress}% completed</span>
              <strong>{xpRemaining.toLocaleString()} XP to go</strong>
            </div>

            <div className={styles.levelStats}>
              <div>
                <Zap size={18} />
                <span>Total XP</span>
                <strong>{currentXP.toLocaleString()}</strong>
              </div>
              <div>
                <Trophy size={18} />
                <span>Current level</span>
                <strong>{currentLevel}</strong>
              </div>
              <div>
                <Target size={18} />
                <span>Next goal</span>
                <strong>Level {currentLevel + 1}</strong>
              </div>
            </div>
          </article>

          <article className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.eyebrow}>YOUR NEXT REWARD</span>
              <Gift size={21} />
            </div>

            <div className={styles.rewardVisual}>
              <div className={styles.rewardGlow}>
                <Gift size={52} strokeWidth={1.3} />
              </div>
              <span className={styles.lockIcon}>
                <LockKeyhole size={16} />
              </span>
            </div>

            <span className={styles.rewardLabel}>LEVEL {currentLevel + 1} REWARD</span>
            <h2>{demoReward}</h2>
            <p>Keep earning XP to reach your next milestone.</p>

            <div className={styles.rewardProgress}>
              <div>
                <span>Unlock progress</span>
                <strong>{progress}%</strong>
              </div>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className={styles.disclaimer}>
              <Info size={14} /> Illustrative reward only. Official reward
              values are not connected.
            </p>
          </article>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>YOUR JOURNEY</span>
              <h2>Level progression</h2>
              <p>Look how far you have come. Your next goal is waiting.</p>
            </div>
          </div>

          <div className={styles.roadmap}>
            {levels.map((item) => {
              const completed = item.level < currentLevel;
              const current = item.level === currentLevel;

              return (
                <article
                  key={item.level}
                  className={`${styles.roadmapItem} ${
                    current ? styles.currentRoadmap : ""
                  } ${completed ? styles.completedRoadmap : ""}`}
                >
                  <div className={styles.roadmapBadge}>
                    <BadgeImage
                      src={item.badge}
                      alt={`${item.name} badge`}
                      className={styles.roadmapImage}
                    />
                    {completed && (
                      <span className={styles.completedIcon}>
                        <CheckCircle2 size={17} />
                      </span>
                    )}
                    {!completed && !current && (
                      <span className={styles.lockedIcon}>
                        <LockKeyhole size={13} />
                      </span>
                    )}
                  </div>

                  <span className={styles.levelCaption}>
                    LEVEL {String(item.level).padStart(2, "0")}
                  </span>
                  <strong>{item.name}</strong>
                  <span className={styles.levelXP}>
                    {item.xp.toLocaleString()} XP
                  </span>

                  {current && (
                    <span className={styles.currentPill}>YOU ARE HERE</span>
                  )}
                  {completed && (
                    <span className={styles.completedPill}>COMPLETED</span>
                  )}
                  {!completed && !current && (
                    <span className={styles.lockedPill}>LOCKED</span>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>PLAY • ENGAGE • PROGRESS</span>
              <h2>Level-Up Arcade</h2>
              <p>Take a short break and try the coin-catching challenge.</p>
            </div>
            <span className={styles.gameTag}><Gamepad2 size={16} /> MINI GAME</span>
          </div>

          <article className={styles.gameCard}>
            <div className={styles.gameInfo}>
              <div className={styles.gameIcon}>
                <Gamepad2 size={30} />
              </div>
              <span className={styles.eyebrow}>SKILL CHALLENGE</span>
              <h3>Coin Catcher</h3>
              <p>
                Tap the coin as many times as you can before the timer ends.
                Improve your score and see your result.
              </p>

              <div className={styles.gameRules}>
                <div><Clock3 size={16} /><span>20 seconds</span></div>
                <div><Target size={16} /><span>One tap = one point</span></div>
                <div><Star size={16} /><span>Demo score only</span></div>
              </div>

              <p className={styles.disclaimer}>
                This prototype does not award real XP or VEs.
              </p>
            </div>

            <div className={styles.gamePlayArea}>
              {!gameStarted && !gameOver && (
                <div className={styles.gameStart}>
                  <div className={styles.coin}>V</div>
                  <h3>Ready to play?</h3>
                  <p>Start the timer and catch the coin.</p>
                  <button className={styles.primaryButton} onClick={startGame}>
                    Start challenge <ArrowRight size={17} />
                  </button>
                </div>
              )}

              {gameStarted && (
                <div className={styles.gameActive}>
                  <div className={styles.gameCounters}>
                    <div><span>TIME LEFT</span><strong>{seconds}s</strong></div>
                    <div><span>YOUR SCORE</span><strong>{score}</strong></div>
                  </div>
                  <button
                    className={styles.coinButton}
                    onClick={catchCoin}
                    aria-label="Catch coin"
                  >
                    V
                  </button>
                  <p>Tap the coin!</p>
                </div>
              )}

              {gameOver && (
                <div className={styles.gameResult}>
                  <Trophy size={38} />
                  <span className={styles.eyebrow}>CHALLENGE COMPLETE</span>
                  <h3>{score} points!</h3>
                  <p>Great effort. Try again to beat your score.</p>
                  <button className={styles.primaryButton} onClick={resetGame}>
                    <RotateCcw size={16} /> Play again
                  </button>
                </div>
              )}
            </div>
          </article>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>YOUR NEXT MOVE</span>
              <h2>Earn more XP & rewards</h2>
              <p>Explore activities that can help you progress.</p>
            </div>
          </div>

          <div className={styles.earningGrid}>
            <article className={styles.earningCard}>
              <div className={styles.earningIcon}><Target size={22} /></div>
              <span className={styles.comingSoon}>COMING SOON</span>
              <h3>Daily challenge</h3>
              <p>Complete a daily mission and track your progress.</p>
              <button
                className={styles.textButton}
                onClick={() => setActivityMessage("Daily challenges are a concept and are not active yet.")}
              >
                Explore activity <ArrowRight size={16} />
              </button>
            </article>

            <article className={styles.earningCard}>
              <div className={styles.earningIcon}><Gift size={22} /></div>
              <span className={styles.comingSoon}>COMING SOON</span>
              <h3>Refer & earn</h3>
              <p>Invite friends when the referral feature becomes available.</p>
              <button
                className={styles.textButton}
                onClick={() => setActivityMessage("Referral rewards are not connected in this prototype.")}
              >
                Explore activity <ArrowRight size={16} />
              </button>
            </article>

            <article className={styles.earningCard}>
              <div className={styles.earningIcon}><Gamepad2 size={22} /></div>
              <span className={styles.availableTag}>PLAY NOW</span>
              <h3>Coin Catcher</h3>
              <p>Play the mini-game and test your reaction speed.</p>
              <button
                className={styles.textButton}
                onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore dashboard <ArrowRight size={16} />
              </button>
            </article>
          </div>

          {activityMessage && (
            <div className={styles.notice} role="status">
              {activityMessage}
              <button onClick={() => setActivityMessage("")}>Dismiss</button>
            </div>
          )}
        </section>

        <section className={styles.activitySection}>
          <div>
            <span className={styles.eyebrow}>KEEP MOVING FORWARD</span>
            <h2>Your next level is within reach.</h2>
            <p>
              You need {xpRemaining.toLocaleString()} more XP to reach Level{" "}
              {currentLevel + 1}.
            </p>
          </div>
          <div className={styles.activityIcon}><Zap size={28} /></div>
        </section>

        <footer className={styles.footer}>
          <span>VELOOP REWARDS</span>
          <span>Frontend prototype · Demo data only</span>
        </footer>
      </div>
    </main>
  );
}
