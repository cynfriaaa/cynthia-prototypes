import { motion } from 'framer-motion';
import styles from '../styles.module.css';

const puppyEmojis = ['🐕', '🐶', '🐾', '🦮', '🐩'];

export const Puppy = ({ index }: { index: number }) => {
  const puppy = puppyEmojis[index % puppyEmojis.length];
  
  return (
    <motion.div
      className={styles.puppy}
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: 1,
        rotate: 0,
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    >
      {puppy}
    </motion.div>
  );
}; 