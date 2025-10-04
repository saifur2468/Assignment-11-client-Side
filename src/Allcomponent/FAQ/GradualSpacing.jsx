

import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

export function GradualSpacing({ text = 'Gradual Spacing', className = '' }) {
  const [animateTrigger, setAnimateTrigger] = React.useState(false);

  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTrigger((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex space-x-1 justify-center ${className}`}>
      <AnimatePresence>
        {animateTrigger &&
          text.split('').map((char, i) => (
            <motion.p
              key={i + '-' + animateTrigger} 
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
            >
              {char === ' ' ? <span>&nbsp;</span> : char}
            </motion.p>
          ))}
      </AnimatePresence>
    </div>
  );
}
