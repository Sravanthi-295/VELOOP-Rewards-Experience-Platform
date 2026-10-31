
{/* Level Progression */}
<section className={styles.roadmap}>
  <div className={styles.cardHeading}>
    <h2>📊 LEVEL PROGRESSION</h2>
    <span>View All →</span>
  </div>

  <div className={styles.badgeRoadmap}>
    {levels.map((item) => {
      const active = item.level === currentLevel;
      const completed = item.level < currentLevel;
      const locked = item.level > currentLevel;

      const badgeType =
        item.level === 1 ? "bronze" :
        item.level === 2 ? "silver" :
        item.level === 3 ? "gold" :
        item.level === 4 ? "champion" : "locked";

      return (
        <div className={styles.badgeItem} key={item.level}>

          <div className={`${styles.badgeWrapper} ${active ? styles.activeBadge : ""}`}>

            {item.level === 4 && (
              <span className={styles.badgeCrown}>♛</span>
            )}

            <div className={`${styles.levelBadge} ${styles[badgeType]}`}>
              <div className={styles.badgeInner}>
                <span className={styles.badgeSymbol}>
                  {locked ? "★" : item.level === 4 ? "♛" : "★"}
                </span>
              </div>
            </div>
          </div>

          <div className={`${styles.badgeCheck} ${
            locked ? styles.lockedCheck : ""
          } ${active ? styles.currentCheck : ""}`}>
            {locked ? "♙" : "✓"}
          </div>

          <div className={`${styles.badgeText} ${
            active ? styles.activeBadgeText : ""
          }`}>
            <strong>Level {item.level}</strong>
            <span>{item.name}</span>
          </div>

        </div>
      );
    })}
  </div>
</section>
