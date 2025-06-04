import { ReactLenis } from 'lenis/react';

function SmoothScrolling({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,
        duration: 1.2,
        smoothTouch: true,
        direction: 'vertical',
        smooth: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
