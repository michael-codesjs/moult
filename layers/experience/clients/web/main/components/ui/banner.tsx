import styles from './banner.module.css';
import { useMemo } from 'react';

export function Banner() {
  const birdIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 160;
      const baseY = (gridY * 270) + 90;
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, rotation };
    }), 
    []
  );

  const shoeIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 320;
      const baseY = (gridY * 270) + 180;
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, rotation };
    }), 
    []
  );

  const glassesIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 240;
      const baseY = (gridY * 270) + 135;
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, rotation };
    }), 
    []
  );

  const hatIcons = useMemo(() => 
    Array.from({ length: 16 }).map((_, i) => {
      const gridX = i % 4;
      const gridY = Math.floor(i / 4);
      const baseX = (gridX * 480) + 400;
      const baseY = (gridY * 270) + 225;
      const rotation = Math.random() * 40 - 20;
      return { baseX, baseY, rotation };
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
          d="M0 540 C480 520, 960 560, 1920 540 M0 270 C480 250, 960 290, 1920 270 M0 810 C480 790, 960 830, 1920 810"
          stroke="#9333EA"
          strokeWidth="0.5"
          opacity="0.1"
        />
        <path
          d="M480 0 C460 360, 500 720, 480 1080 M960 0 C940 360, 980 720, 960 1080 M1440 0 C1420 360, 1460 720, 1440 1080"
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
            transform={`translate(${icon.baseX}, ${icon.baseY}) rotate(${icon.rotation}) scale(0.628)`}
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
            transform={`translate(${icon.baseX}, ${icon.baseY}) rotate(${icon.rotation}) scale(0.06)`}
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

        {/* Glasses Icons */}
        {glassesIcons.map((icon, i) => (
          <g key={`glasses-${i}`} 
            transform={`translate(${icon.baseX}, ${icon.baseY}) rotate(${icon.rotation}) scale(0.054)`}
          >
            <svg viewBox="0 0 32 32">
              <path
                d="M3,11v10c0,1.1,0.9,2,2,2h6.2c0.5,0,1-0.2,1.4-0.6l2-2c0.8-0.8,2-0.8,2.8,0l2,2c0.4,0.4,0.9,0.6,1.4,0.6H27
                c1.1,0,2-0.9,2-2V11c0-1.1-0.9-2-2-2H5C3.9,9,3,9.9,3,11z"
                stroke="#9333EA"
                strokeWidth="0.176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="16"
                r="3"
                stroke="#9333EA"
                strokeWidth="0.176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="23"
                cy="16"
                r="3"
                stroke="#9333EA"
                strokeWidth="0.176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </g>
        ))}

        {/* Hat Icons */}
        {hatIcons.map((icon, i) => (
          <g key={`hat-${i}`} 
            transform={`translate(${icon.baseX}, ${icon.baseY}) rotate(${icon.rotation}) scale(0.05)`}
          >
            <svg viewBox="0 0 512 512">
              <g>
                <path
                  d="M421.056,23.544c-2.227,64.02-81.681,115.542-179.485,115.542
                  c-97.448,0-176.814-51.2-179.396-114.978l78.564-23.705c0.089,0.081,0.178,0.161,0.267,0.161
                  c28.593,12.82,63.243,20.238,100.566,20.238c37.322,0,71.883-7.418,100.565-20.238c0.356-0.161,0.802-0.323,1.158-0.484
                  L421.056,23.544z M483.141,266.966L469.42,488.988C468.622,501.9,456.823,512,442.536,512H40.604
                  c-14.286,0-26.086-10.1-26.884-23.012L0,266.966c44.626-20.237,39.816-62.004,39.816-109.979V30.882l22.358-6.774l78.564-23.705
                  c-0.357-0.081-0.624-0.242-0.98-0.404h1.247v0.565c0,7.902,0.534,15.48,1.515,22.979c0,0.08,0.089,0.241,0.089,0.322
                  c8.285,64.021,49.437,112.64,98.962,112.64s90.678-48.619,98.962-112.64c0-0.081,0.089-0.242,0.089-0.322
                  c0.98-7.499,1.514-15.078,1.514-22.979V0h1.336c-0.089,0-0.089,0.081-0.178,0.081l77.762,23.464l22.269,6.692v126.75
                  C443.324,204.962,438.515,246.728,483.141,266.966z"
                  stroke="#9333EA"
                  strokeWidth="2.34"
                  fill="none"
                />
              </g>
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