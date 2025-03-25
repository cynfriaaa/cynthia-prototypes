"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import { useState, useCallback } from 'react';
import { DraggableAccessory } from './components/DraggableAccessory';
import styles from './styles.module.css';

const puppyEmojis = ['🐕', '🐶', '🐩', '🦮', '🐕‍🦺', '🐾', '🎀', '🌸', '💝', '💖', '🍰', '🧁', '🎈'];

export default function PuppyElegance() {
  const [accessories, setAccessories] = useState<{ emoji: string; position: { x: number; y: number } }[]>([]);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewDog = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAccessory = (emoji: string) => {
    const randomOffset = 100;
    const newPosition = {
      x: Math.random() * randomOffset - randomOffset / 2,
      y: Math.random() * randomOffset - randomOffset / 2
    };
    setAccessories(prev => [...prev, { emoji, position: newPosition }]);
  };

  const clearAccessories = () => {
    setAccessories([]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✨ Puppy Dress-Up Party! ✨</h1>
      
      <div className={styles.accessoryPalette}>
        {puppyEmojis.map((emoji, index) => (
          <button
            key={index}
            className={styles.paletteItem}
            onClick={() => addAccessory(emoji)}
            aria-label={`Add ${emoji} accessory`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className={styles.canvas}>
        {dogImage && (
          <img
            src={dogImage}
            alt="Random dog"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '12px'
            }}
          />
        )}
        {accessories.map((acc, index) => (
          <DraggableAccessory
            key={index}
            emoji={acc.emoji}
            defaultPosition={acc.position}
          />
        ))}
        {!dogImage && !isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#ff69b4',
            fontSize: '1.2rem' 
          }}>
            Click &quot;New Puppy&quot; to start decorating! 🐾
          </div>
        )}
        {isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: '#ff69b4',
            fontSize: '1.2rem' 
          }}>
            Finding a cute puppy... 🐾
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button 
          className={styles.button}
          onClick={fetchNewDog}
          disabled={isLoading}
        >
          {isLoading ? '🐾 Finding...' : '🐶 New Puppy'}
        </button>
        <button 
          className={styles.button}
          onClick={clearAccessories}
        >
          🧹 Clear Decorations
        </button>
      </div>
    </div>
  );
} 