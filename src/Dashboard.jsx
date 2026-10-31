
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

const progress = Math.min(
  100,
  Math.round((currentXP / nextLevelXP) * 100)
);

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

  function catchCoin() {
    if (gameState === "playing") {
      setScore((value) => value + 1);
    }
  }

  return (
    <main className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>V</span>
          <span>VELOOP REWARDS</span>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.demoTag}>IN PROGRESS</span>
          <span className={styles.avatar}>S</span>
        </div>
      </header>

      <div className={styles.container}>
        {/* Welcome */}
        <section className={styles.welcome}>
          <h1>Welcome to VELOOP Rewards!</h1>
          <p>
            Track your progress, earn rewards and level up
            your journey.
          </p>
        </section>

        {/* Level and Reward Cards */}
        <section className={styles.heroGrid}>
          <div className={styles.levelCard}>
            <h2>Your Current Level</h2>

            <div className={styles.levelNumber}>
              {String(currentLevel).padStart(2, "0")}
            </div>

            <div className={styles.levelName}>Champion ♛</div>

            <p className={styles.levelDescription}>
              You are making great progress. Keep going
              to unlock your next reward!
            </p>

            <div className={styles.levelStats}>
              <span>⚡ Total XP: {currentXP.toLocaleString()}</span>
              <span>🏆 Level {currentLevel}</span>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <h2>Your Next Reward</h2>

            <div className={styles.rewardAmount}>500 VEs</div>

            <p className={styles.rewardDescription}>
              Keep earning XP to reach your next milestone.
            </p>

            <span className={styles.statusPending}>
              🔒 Unlock at Level 5
            </span>

            <div className={styles.rewardProgress}>
              <div
                className={styles.rewardProgressBar}
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className={styles.rewardDescription}>
              {progress}% progress towards your next level
            </p>
          </div>
        </section>

        {/* XP Progress */}
        <section className={styles.levelCard}>
          <h2>⚡ XP Progress</h2>

          <div className={styles.levelStats}>
            <strong>{currentXP.toLocaleString()} XP</strong>
            <strong>{nextLevelXP.toLocaleString()} XP</strong>
          </div>

          <div className={styles.rewardProgress}>
            <div
              className={styles.rewardProgressBar}
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className={styles.levelDescription}>
            {nextLevelXP - currentXP} XP remaining to reach Level 5.
          </p>
        </section>

        {/* Level Roadmap */}
        <section className={styles.roadmap}>
          <h2>✦ Level Progression</h2>

          <div className={styles.roadmapList}>
            {levels.map((item) => {
              const active = item.level === currentLevel;
              const completed = item.level < currentLevel;
              const locked = item.level > currentLevel;

              return (
                <div
                  key={item.level}
                  className={`${styles.roadmapItem} ${
                    active ? styles.currentRoadmap : ""
                  } ${completed ? styles.completedRoadmap : ""}`}
                >
                  <div className={styles.earningIcon}>
                    {locked ? "🔒" : item.symbol}
                  </div>

                  <h3>Level {item.level}</h3>
                  <p>{item.name}</p>

                  {active && (
                    <span className={styles.status}>
                      Current Level
                    </span>
                  )}

                  {completed && (
                    <span className={styles.statusSuccess}>
                      Completed
                    </span>
                  )}

                  {locked && (
                    <span className={styles.statusPending}>
                      Locked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Mini Game */}
        <section className={styles.gameCard}>
          <h2>🎮 Level-Up Arcade</h2>

          <p>
            Catch coins, earn rewards and enjoy the game!
          </p>

          <div className={styles.gamePlayArea}>
            <div className={styles.gameIcon}>🪙</div>

            {gameState === "ready" && (
              <>
                <h3>Ready to play?</h3>
                <p>You have 15 seconds to catch as many coins as possible.</p>

                <button
                  className={styles.gameButton}
                  onClick={startGame}
                >
                  Start Game
                </button>
              </>
            )}

            {gameState === "playing" && (
              <>
                <div className={styles.gameScore}>
                  {score} Coins
                </div>

                <p>Time remaining: {timeLeft} seconds</p>

                <button
                  className={styles.gameButton}
                  onClick={catchCoin}
                >
                  Catch Coin ⚡
                </button>
              </>
            )}

            {gameState === "finished" && (
              <>
                <h3>Game Over!</h3>

                <div className={styles.gameScore}>
                  {score} Coins
                </div>

                <p>Great effort! Try again to beat your score.</p>

                <button
                  className={styles.gameButton}
                  onClick={startGame}
                >
                  Play Again ↻
                </button>
              </>
            )}
          </div>
        </section>

        {/* Earning Opportunities */}
        <section className={styles.earningCard}>
          <h2>✧ More Ways to Earn</h2>

          <p className={styles.rewardDescription}>
            Complete activities and keep moving towards
            your next level.
          </p>

          <div className={styles.earningGrid}>
            <div className={styles.earningItem}>
              <div className={styles.earningIcon}>🎯</div>
              <h3>Complete Challenges</h3>
              <p>Finish challenges to earn more XP.</p>
            </div>

            <div className={styles.earningItem}>
              <div className={styles.earningIcon}>🎮</div>
              <h3>Play Games</h3>
              <p>Enjoy games and improve your score.</p>
            </div>

            <div className={styles.earningItem}>
              <div className={styles.earningIcon}>🏆</div>
              <h3>Reach Milestones</h3>
              <p>Unlock new levels and rewards.</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.activitySection}>
          <h2>Recent Activity</h2>

          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <h3>Current Level Achieved</h3>
              <p>You reached Champion Level.</p>
            </div>
            <span className={styles.activityPoints}>Level 4</span>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <h3>XP Progress</h3>
              <p>Keep going to reach the next milestone.</p>
            </div>
            <span className={styles.activityPoints}>4,200 XP</span>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2026 VELOOP REWARDS</p>
          <p>LEVEL UP YOUR JOURNEY</p>
        </footer>
      </div>
    </main>
  );
}

