"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import Link from 'next/link';
import styles from './styles.module.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DraggableAccessory } from './components/DraggableAccessory';
import Image from 'next/image';

export default function PuppyElegance() {
  const [dogImage, setDogImage] = useState<string>('');
  const [accessories, setAccessories] = useState<Array<{ emoji: string; id: number; position: { x: number; y: number } }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const accessoryEmojis = ['🎩', '👓', '🎀', '👔', '🧣', '🦮', '🎾', '🦴'];
  
  useEffect(() => {
    fetchNewDog();
  }, []);

  const fetchNewDog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Failed to fetch dog image');
      }
      const data = await response.json();
      if (data.status === 'success') {
        // Preload the image
        const img = new window.Image();
        img.src = data.message;
        img.onload = () => {
          setDogImage(data.message);
          setIsLoading(false);
        };
        img.onerror = () => {
          setError('Failed to load image. Please try again.');
          setIsLoading(false);
        };
      } else {
        throw new Error('Invalid response from Dog API');
      }
    } catch (error) {
      console.error('Error fetching dog image:', error);
      setError('Failed to load dog image. Please try again.');
      setIsLoading(false);
    }
  };

  const addAccessory = (emoji: string) => {
    const randomPosition = {
      x: Math.random() * 300 - 150,  // Wider range for x position
      y: Math.random() * 300 - 150   // Wider range for y position
    };
    setAccessories(prev => [...prev, { emoji, id: Date.now(), position: randomPosition }]);
  };

  const clearAccessories = () => {
    setAccessories([]);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/" className={styles.backButton}>
          ←
        </Link>
        
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            BAUHAUS PETS
          </motion.h1>
        </motion.div>

        <div className={styles.designArea}>
          <div className={styles.accessoryPalette}>
            <div className={styles.paletteTitle}>ACCESSORIES</div>
            <div className={styles.accessoryGrid}>
              {accessoryEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className={styles.accessoryButton}
                  onClick={() => addAccessory(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button 
              className={styles.utilityButton} 
              onClick={clearAccessories}
            >
              CLEAR ALL
            </button>
            <button 
              className={styles.utilityButton} 
              onClick={fetchNewDog}
            >
              NEW DOG
            </button>
          </div>

          <div className={styles.dogCanvas}>
            {isLoading ? (
              <div className={styles.loading}>LOADING...</div>
            ) : error ? (
              <div className={styles.error}>
                {error}
                <button 
                  className={styles.utilityButton} 
                  onClick={fetchNewDog}
                  style={{ marginTop: '1rem' }}
                >
                  TRY AGAIN
                </button>
              </div>
            ) : dogImage ? (
              <div className={styles.imageContainer}>
                <Image
                  src={dogImage}
                  alt="Random dog"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  unoptimized
                />
                {accessories.map(acc => (
                  <DraggableAccessory
                    key={acc.id}
                    emoji={acc.emoji}
                    defaultPosition={acc.position}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <span>Manual</span>
            <span>Exchange</span>
            <span>Practice</span>
            <span>Network</span>
          </div>
        </footer>
      </main>
    </div>
  );
} 