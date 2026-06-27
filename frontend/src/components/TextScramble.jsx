import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = '!<>-_\\/[]{}—=+*^?#________';

const TextScramble = ({
  text,
  as: Tag = 'p',
  className = '',
  duration = 2,
  delay = 0,
  inView = false,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const frameRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const shouldStart = inView ? isInView : true;
    if (!shouldStart) return;

    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay, inView, isInView]);

  useEffect(() => {
    if (!started) return;

    const step = 30;
    const totalFrames = Math.floor((duration * 1000) / step);
    let frame = 0;

    const scramble = () => {
      frame++;
      const progress = frame / totalFrames;
      const result = [];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
          result.push(' ');
          continue;
        }
        const settleAt = (i + 1) / text.length;
        if (progress >= settleAt) {
          result.push(char);
        } else {
          result.push(chars[Math.floor(Math.random() * chars.length)]);
        }
      }

      setDisplayText(result.join(''));
      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(scramble);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, text, duration]);

  return (
    <Tag ref={ref} className={className}>
      {displayText || '\u00A0'.repeat(text.length)}
    </Tag>
  );
};

export default TextScramble;
