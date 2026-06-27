import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  as: Tag = 'p',
  textClassName = '',
  underlineClassName = '',
  underlineGradient,
  underlineHeight = 2,
  underlineOffset = 4,
  duration = 0.5,
  delay = 0,
  stagger = 0.06,
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  const underlineVar = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: delay + words.length * stagger + 0.2, ease: 'easeOut' },
    },
  };

  const gradient = underlineGradient || 'linear-gradient(90deg, #00d4ff, #7B5CFF)';

  return (
    <Tag className={`relative inline-block ${textClassName}`}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ marginRight: '0.3em' }}
            variants={child}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>

      <motion.span
        className={`absolute left-0 right-0 ${underlineClassName}`}
        style={{
          bottom: -underlineOffset,
          height: underlineHeight,
          borderRadius: underlineHeight / 2,
          background: gradient,
          transformOrigin: 'left center',
        }}
        variants={underlineVar}
        initial="hidden"
        animate="visible"
      />
    </Tag>
  );
};

export default AnimatedText;
