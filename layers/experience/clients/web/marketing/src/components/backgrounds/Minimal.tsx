import styles from './styles.module.css'

export function MinimalBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background with radial gradient */}
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="70%">
            <stop offset="0%" style={{ stopColor: '#9333EA', stopOpacity: 0.15 }} />
            <stop offset="50%" style={{ stopColor: '#4F46E5', stopOpacity: 0.08 }} />
            <stop offset="100%" style={{ stopColor: '#0F172A', stopOpacity: 0.3 }} />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />

        {/* Grid Pattern */}
        <path
          d="M0 540 C480 520, 960 560, 1920 540 M0 270 C480 250, 960 290, 1920 270 M0 810 C480 790, 960 830, 1920 810"
          stroke="#9333EA"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <path
          d="M480 0 C460 360, 500 720, 480 1080 M960 0 C940 360, 980 720, 960 1080 M1440 0 C1420 360, 1460 720, 1440 1080"
          stroke="#9333EA"
          strokeWidth="0.5"
          opacity="0.15"
        />

        {/* Floating Bubbles - First Row */}
        <circle
          cx="240"
          cy="180"
          r="8"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay1}`}
        />
        <circle
          cx="1680"
          cy="180"
          r="12"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay2}`}
        />
        <circle
          cx="720"
          cy="180"
          r="6"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay3}`}
        />
        <circle
          cx="1200"
          cy="180"
          r="10"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay4}`}
        />

        {/* Additional Floating Bubbles - Second Row */}
        <circle
          cx="480"
          cy="360"
          r="15"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay5}`}
        />
        <circle
          cx="960"
          cy="360"
          r="9"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay6}`}
        />
        <circle
          cx="1440"
          cy="360"
          r="7"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay1}`}
        />

        {/* Additional Floating Bubbles - Third Row */}
        <circle
          cx="240"
          cy="540"
          r="11"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay2}`}
        />
        <circle
          cx="720"
          cy="540"
          r="13"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay3}`}
        />
        <circle
          cx="1200"
          cy="540"
          r="8"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay4}`}
        />
        <circle
          cx="1680"
          cy="540"
          r="10"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay5}`}
        />

        {/* Additional Floating Bubbles - Fourth Row */}
        <circle
          cx="480"
          cy="720"
          r="9"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay6}`}
        />
        <circle
          cx="960"
          cy="720"
          r="14"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay1}`}
        />
        <circle
          cx="1440"
          cy="720"
          r="6"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay2}`}
        />

        {/* Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => {
          const section = i % 20
          const gridX = (section % 5) * 384
          const gridY = Math.floor(section / 5) * 270
          const offsetX = Math.random() * 384
          const offsetY = Math.random() * 270
          const opacity = 0.3 + Math.random() * 0.4
          const extraOffset = i >= 20 ? 192 : 0
          
          return (
            <circle
              key={i}
              cx={gridX + offsetX + extraOffset}
              cy={gridY + offsetY}
              r={i >= 20 ? 1.5 : 2}
              fill="#9333EA"
              opacity={opacity}
            />
          )
        })}
      </svg>
    </div>
  )
} 