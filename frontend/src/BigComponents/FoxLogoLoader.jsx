import React, { useEffect, useRef } from "react";

export default function FoxLogoLoader() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();


    path.style.strokeDasharray = `0 ${length}`;
    path.style.strokeDashoffset = 0;

    let start;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1500, 1); 

      const dashLength = (length / 2) * progress;
      path.style.strokeDasharray = `${dashLength} ${length - dashLength * 2} ${dashLength}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Restart after short pause
        setTimeout(() => {
          start = null;
          path.style.strokeDasharray = `0 ${length}`;
          requestAnimationFrame(animate);
        }, 300);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div
      className="loader-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        width="300"
        height="300"
        fill="none"
        stroke="white"
        strokeWidth="200"
        className="svg"
      >
        <path
          ref={pathRef}
          d="M2823 8320 c-69 -28 -146 -98 -177 -163 -14 -29 -93 -270 -175 -537
-642 -2078 -863 -2800 -870 -2853 -15 -104 9 -202 71 -290 26 -36 113 -108
538 -443 195 -154 906 -718 1580 -1254 674 -535 1239 -982 1255 -992 22 -14
43 -18 82 -15 45 3 62 11 130 62 89 67 684 537 1153 910 312 249 515 410 805
640 83 66 310 245 505 399 789 621 830 655 871 719 46 71 63 140 57 238 -3 59
-24 137 -105 389 -56 173 -237 751 -403 1284 -452 1454 -529 1697 -558 1749
-33 62 -100 122 -169 154 -49 23 -65 25 -141 21 -96 -5 -159 -30 -227 -89 -71
-63 -62 -37 -440 -1294 -245 -815 -260 -858 -309 -890 -22 -15 -140 -16 -1184
-13 -990 3 -1161 5 -1176 17 -46 39 -45 35 -401 1206 -135 446 -252 829 -261
852 -22 61 -93 134 -166 173 -55 30 -74 34 -148 37 -67 2 -96 -1 -137 -17z"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="scale(0.08,-0.08) translate(0,-9000)"
        />
      </svg>
    </div>
  );
}
