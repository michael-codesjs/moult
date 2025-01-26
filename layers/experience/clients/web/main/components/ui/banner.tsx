import styles from './banner.module.css';
import { useMemo } from 'react';

export function Banner() {
  const birdIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 160;
      const baseY = (gridY * 270) + 90;
      const offsetX = (Math.random() * 160 - 80) + (gridX * 40);
      const offsetY = (Math.random() * 160 - 80) + (gridY * 40);
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, offsetX, offsetY, rotation };
    }), 
    []
  );

  const shoeIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 320;
      const baseY = (gridY * 270) + 180;
      const offsetX = (Math.random() * 160 - 80) + (gridX * 40);
      const offsetY = (Math.random() * 160 - 80) + (gridY * 40);
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, offsetX, offsetY, rotation };
    }), 
    []
  );

  const casualShoeIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 240;
      const baseY = (gridY * 270) + 135;
      const offsetX = (Math.random() * 160 - 80) + (gridX * 40);
      const offsetY = (Math.random() * 160 - 80) + (gridY * 40);
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, offsetX, offsetY, rotation };
    }), 
    []
  );

  const giftBagIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 400;
      const baseY = (gridY * 270) + 225;
      const offsetX = (Math.random() * 160 - 80) + (gridX * 40);
      const offsetY = (Math.random() * 160 - 80) + (gridY * 40);
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, offsetX, offsetY, rotation };
    }), 
    []
  );

  const floatingParticles = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => {
      const section = i % 20;
      const gridX = (section % 5) * 384;
      const gridY = Math.floor(section / 5) * 270;
      const offsetX = Math.random() * 384;
      const offsetY = Math.random() * 270;
      const opacity = 0.2 + Math.random() * 0.3;
      return { gridX, gridY, offsetX, offsetY, opacity };
    }), 
    []
  );

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
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
            <stop offset="0%" style={{ stopColor: "#9333EA", stopOpacity: 0.05 }} />
            <stop offset="100%" style={{ stopColor: "#7928CA", stopOpacity: 0.15 }} />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" />

        {/* Grid Pattern */}
        <path
          d="M0 540 H1920 M0 270 H1920 M0 810 H1920"
          stroke="#9333EA"
          strokeWidth="0.5"
          opacity="0.1"
        />
        <path
          d="M480 0 V1080 M960 0 V1080 M1440 0 V1080"
          stroke="#9333EA"
          strokeWidth="0.5"
          opacity="0.1"
        />

        {/* Floating Bubbles */}
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

        {/* Additional Bubbles */}
        <circle
          cx="480"
          cy="540"
          r="15"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay5}`}
        />
        <circle
          cx="1440"
          cy="540"
          r="7"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay6}`}
        />
        <circle
          cx="960"
          cy="540"
          r="9"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay1}`}
        />
        <circle
          cx="1680"
          cy="900"
          r="11"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay3}`}
        />
        <circle
          cx="240"
          cy="900"
          r="13"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay4}`}
        />
        <circle
          cx="960"
          cy="900"
          r="8"
          stroke="#9333EA"
          strokeWidth="0.67"
          fill="none"
          className={`${styles.iconBounce} ${styles.delay5}`}
        />

        {/* Bird Icons */}
        {birdIcons.map((icon, i) => (
          <g key={`bird-${i}`} 
            transform={`translate(${icon.baseX + icon.offsetX}, ${icon.baseY + icon.offsetY}) rotate(${icon.rotation}) scale(0.6)`}
          >
            <svg height="64" width="64" version="1.1" viewBox="0 0 64 64">
              <g>
                <circle cx="32" cy="32" r="32" fill="none" stroke="#9333EA" strokeWidth="0.67"/>
                <path d="M16,16c0,0-4,4-4,8s4,10,4,22h4V32c0,0,4,0,8,8s8,8,12,8s12-0.2,12-1.7c0-1.7,0.4-3.3-1.8-4.9
                  c-2-1.5-8.4-4.2-8.4-4.2s-7,5.4-14-6C19.7,18,16,16,16,16z" fill="none" stroke="#9333EA" strokeWidth="0.67"/>
                <path d="M20,46c0,1.1-0.9,2-2,2l0,0c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2l0,0C19.1,44,20,44.9,20,46L20,46z" fill="none" stroke="#9333EA" strokeWidth="0.67"/>
              </g>
            </svg>
          </g>
        ))}

        {/* Shoe Icons */}
        {shoeIcons.map((icon, i) => (
          <g key={`shoe-${i}`} 
            transform={`translate(${icon.baseX + icon.offsetX}, ${icon.baseY + icon.offsetY}) rotate(${icon.rotation}) scale(0.08)`}
          >
            <svg viewBox="0 0 511.903 511.903">
              <g transform="translate(0 -1)">
                <path
                  d="M511.834,309.815c0.043-0.734-0.017-1.502-0.111-2.278c-0.009-0.068,0.026-0.128,0.017-0.196
                  c-0.009-0.068-0.026-0.145-0.034-0.213v-0.017c0,0-0.009-0.009-0.009-0.017c-1.169-9.19-8.235-29.534-45.969-28.689
                  c-23.091,0.623-49.442-13.423-49.707-13.568c-0.273-0.145-0.572-0.29-0.862-0.401l-58.487-23.398
                  c5.265-10.786,2.372-24.166-7.561-31.676c-11.264-8.491-27.341-6.238-35.849,5.009l-3.43,4.54
                  c-3.883-2.364-7.885-4.966-12.134-7.902c8.448-11.264,6.195-27.298-5.052-35.797c-10.547-7.962-25.216-6.391-34.031,3.046
                  c-3.908-3.977-7.586-7.876-10.82-11.674c-41.6-48.759-60.177-52.002-70.468-50.185c-5.163,0.905-10.197,2.398-15.369,4.267
                  v55.339c0,14.123-11.477,25.6-25.6,25.6h-51.2c-14.114,0-25.6-11.477-25.6-25.6v-26.573c-7.927,0.606-16.401,0.973-25.634,0.973
                  c-4.719,0-8.533,3.823-8.533,8.533v81.527c-10.76,11.051-44.646,52.642-10.573,106.052c-11.29,18.167-5.53,31.334-0.725,37.828
                  c6.255,8.465,16.828,13.525,28.271,13.525h337.493c39.1,0,78.413-8.926,113.681-25.813l4.181-2.005
                  C510.238,364.104,512.346,334.399,511.834,309.815z"
                  stroke="#9333EA"
                  strokeWidth="2.34"
                  fill="none"
                />
              </g>
            </svg>
          </g>
        ))}

        {/* Casual Shoe Icons */}
        {casualShoeIcons.map((icon, i) => (
          <g key={`casual-shoe-${i}`} 
            transform={`translate(${icon.baseX + icon.offsetX}, ${icon.baseY + icon.offsetY}) rotate(${icon.rotation}) scale(0.06)`}
          >
            <svg viewBox="0 0 100 100">
              <path
                d="M67.3,45c0-12.6-3-20.5-15.7-20.5c-12.5,0-15.6,6.6-15.7,16.5H6.2c-3.3,0-5.6,3.8-4.5,7.4c3.1,10.2,10.8,27.2,26.5,27.2
                c22.4,0,45.7-22.2,69.3-22.2C97.5,53.3,83.4,48.6,67.3,45z M40.3,39.9c0.7,0,16.8-0.9,23.2,2.2c0.5,0.2,0.7,0.8,0.5,1.3
                c-0.2,0.4-0.5,0.6-0.9,0.6c-0.1,0-0.3,0-0.4-0.1c-6-2.9-22.1-2-22.3-2c-0.6,0-1-0.4-1.1-0.9C39.3,40.4,39.7,40,40.3,39.9z
                M78.8,53.3c-4.5,0-10.9,3.1-18.4,6.7C50.3,65,38.7,70.6,27.3,70.6c-7.4,0-12.8-5.9-16.1-10.9c-3.6-5.5-5.5-11.3-5.5-12.7
                c0-0.6,0.4-1,1-1s1,0.4,1,1c0,2,7.3,21.6,19.6,21.6c11,0,22.3-5.5,32.3-10.3c7.6-3.7,14.2-6.9,19.2-6.9c0.6,0,1,0.4,1,1
                S79.3,53.3,78.8,53.3z M62.8,67.4c-2.3,1.1-4.7,2.2-7,3.3c2.8,2,8.3,4.9,16.8,4.9c11.6,0,26.2-11.8,26-19.3
                C87.3,56.5,74,62,62.8,67.4z M90.9,61.8c-7,7.7-13.7,9.2-18.1,9.2c-2.9,0-4.7-0.7-4.9-0.7c-0.5-0.2-0.8-0.8-0.6-1.3
                c0.2-0.5,0.8-0.8,1.3-0.6c0.4,0.2,10.1,3.7,20.7-8c0.4-0.4,1-0.4,1.4-0.1C91.2,60.8,91.3,61.4,90.9,61.8z"
                stroke="#9333EA"
                strokeWidth="0.34"
                fill="none"
              />
            </svg>
          </g>
        ))}

        {/* Gift Bag Icons */}
        {giftBagIcons.map((icon, i) => (
          <g key={`gift-bag-${i}`} 
            transform={`translate(${icon.baseX + icon.offsetX}, ${icon.baseY + icon.offsetY}) rotate(${icon.rotation}) scale(0.03)`}
          >
            <svg viewBox="0 0 1024 1024">
              <path
                d="M545.7 254.4H160.2l3-22.6c6-45.7 28.4-87.7 63.1-118.3 35-30.9 80-47.9 126.7-47.9s91.7 17 126.7 47.9c34.7 30.6 57.1 72.6 63.1 118.3l2.9 22.6z m-338.1-40h290.7C479.8 151 420.9 105.5 353 105.5S226.2 151 207.6 214.4z M641 960.2H136.7c-39.6 0-71.8-32.1-71.8-71.8v-674H641v745.8z M834.3 488.3H448.8l3-22.6c6-45.7 28.4-87.7 63.1-118.3 35-30.9 80-47.9 126.7-47.9s91.7 17 126.7 47.9C803 378 825.4 420 831.4 465.7l2.9 22.6z m-338.1-40h290.7c-18.6-63.4-77.5-108.8-145.3-108.8-67.9 0-126.8 45.4-145.4 108.8z M890.8 959.6H392.4c-39.4 0-71.4-32-71.4-71.4v-440h641.3v439.9c-0.1 39.5-32 71.5-71.5 71.5z"
                stroke="#9333EA"
                strokeWidth="0.34"
                fill="none"
              />
            </svg>
          </g>
        ))}

        {/* Floating particles */}
        {floatingParticles.map((particle, i) => (
          <circle
            key={i}
            cx={particle.gridX + particle.offsetX}
            cy={particle.gridY + particle.offsetY}
            r="2"
            fill="#9333EA"
            opacity={particle.opacity}
          />
        ))}
      </svg>
    </div>
  );
} 