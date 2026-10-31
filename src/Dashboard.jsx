
import { useEffect, useRef, useState } from "react";
import "./Dashboard.css";

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
          setGameState("finished");
          return 0;
        }

        return time - 1;
      });
    }, 1000);
  }

  return (
    <main className="vl-page">
      <div className="vl-glow" />

      <div className="vl-container">

        {/* Header */}
        <header className="vl-header">
          <a className="vl-brand" href="/">
            <span className="vl-brand-mark">V</span>
            <span>
              <strong>VELOOP</strong>
              <small>REWARDS</small>
            </span>
          </a>

          <div className="vl-header-right">
            <span className="vl-status">
              <i /> IN PROGRESS
            </span>
            <span className="vl-avatar">S</span>
          </div>
        </header>

        {/* Current Level */}
        <section className="vl-hero">
          <div className="vl-hero-medal">
            <div className="vl-medal">
              <span>04</span>
              <b>♛</b>
            </div>
            <span className="vl-medal-ribbon">
              CHAMPION
            </span>
          </div>

          <div className="vl-hero-copy">
            <span className="vl-eyebrow">
              ♛ YOUR CURRENT LEVEL
            </span>

            <p className="vl-level-number">LEVEL 04</p>
            <h1>Champion</h1>

            <p className="vl-muted">
              You are making great progress. Keep going
              to unlock your next reward.
            </p>
          </div>
        </section>

        {/* XP Progress */}
        <section className="vl-panel vl-xp">
          <div className="vl-section-line">
            <span className="vl-section-label">
              ⚡ XP PROGRESS
            </span>

            <strong>
              {currentXP.toLocaleString()}
              <span> / {nextLevelXP.toLocaleString()}</span>
            </strong>
          </div>

          <div className="vl-progress-track">
            <div
              className="vl-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="vl-progress-meta">
            <span>
              <b>{progress}%</b> completed
            </span>

            <strong>
              {(nextLevelXP - currentXP).toLocaleString()} XP to go
            </strong>
          </div>
        </section>

        {/* Statistics */}
        <section className="vl-stats">
          <div className="vl-stat">
            <span>⚡</span>
            <small>Total XP</small>
            <strong>{currentXP.toLocaleString()}</strong>
          </div>

          <div className="vl-stat">
            <span>🏆</span>
            <small>Current Level</small>
            <strong>{currentLevel}</strong>
          </div>

          <div className="vl-stat">
            <span>◎</span>
            <small>Next Goal</small>
            <strong>Level 5</strong>
          </div>
        </section>

        {/* Next Reward */}
        <section className="vl-panel vl-reward">
          <div>
            <span className="vl-section-label">
              🎁 YOUR NEXT REWARD
            </span>

            <h2>500 VEs</h2>

            <p className="vl-muted">
              Keep earning XP to reach your next milestone.
            </p>

            <span className="vl-unlock">
              🔒 Unlock at Level 5
            </span>
          </div>

          <div
            className="vl-gift"
            aria-label="Reward gift illustration"
          >
            <div className="vl-gift-bow">∞</div>
            <div className="vl-gift-lid" />

            <div className="vl-gift-box">
              <span>V</span>
            </div>
          </div>
        </section>

        {/* Level Progression */}
        <section className="vl-panel vl-progression">
          <div className="vl-card-heading">
            <h2>✦ LEVEL PROGRESSION</h2>
            <span>YOUR JOURNEY</span>
          </div>

          <div className="vl-level-track">
            {levels.map((item) => {
              const active = item.level === currentLevel;
              const locked = item.level > currentLevel;

              return (
                <div
                  className={`vl-level-step ${
                    active ? "active" : ""
                  } ${locked ? "locked" : ""}`}
                  key={item.level}
                >
                  <div className="vl-small-medal">
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
        <section className="vl-game">
          <div className="vl-game-icon">🎮</div>

          <div className="vl-game-content">
            <span className="vl-game-kicker">
              PLAY · EARN · LEVEL UP
            </span>

            <h2>Level-Up Arcade</h2>

            <p>
              Catch coins, earn rewards and boost your XP!
            </p>

            {gameState === "ready" && (
              <button
                className="vl-button"
                onClick={startGame}
              >
                Play Now <span>›</span>
              </button>
            )}

            {gameState === "playing" && (
              <div className="vl-game-controls">
                <strong>
                  Time: {timeLeft}s · Coins: {score}
                </strong>

                <button
                  className="vl-button"
                  onClick={() => setScore((value) => value + 1)}
                >
                  Catch Coin ⚡
                </button>
              </div>
            )}

            {gameState === "finished" && (
              <div className="vl-game-controls">
                <strong>
                  Time's up! You caught {score} coins.
                </strong>

                <button
                  className="vl-button"
                  onClick={startGame}
                >
                  Play Again ↻
                </button>
              </div>
            )}
          </div>

          <div className="vl-floating-coin">V</div>
        </section>

        {/* Earning Opportunities */}
        <section className="vl-panel vl-earn">
          <div>
            <span className="vl-section-label">
              ✧ KEEP YOUR MOMENTUM
            </span>

            <h2>More Ways to Earn</h2>

            <p className="vl-muted">
              Complete activities and keep moving towards
              your next level.
            </p>
          </div>

          <div className="vl-earn-icon">✧</div>
        </section>

        {/* Footer */}
        <footer className="vl-footer">
          <span>© 2026 VELOOP REWARDS</span>
          <span>LEVEL UP YOUR JOURNEY</span>
        </footer>

      </div>
    </main>
  );
}
