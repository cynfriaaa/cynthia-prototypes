'use client';

import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styles from '../styles.module.css';

interface DraggableAccessoryProps {
  emoji: string;
  defaultPosition?: { x: number; y: number };
}

export const DraggableAccessory: React.FC<DraggableAccessoryProps> = ({ emoji, defaultPosition = { x: 0, y: 0 } }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState(defaultPosition);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const adjustSize = (e: React.MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    setScale(newScale);
  };

  const containerStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div ref={nodeRef} className={styles.accessory} style={containerStyle}>
        {emoji}
        <div className={styles.sizeControls}>
          <button 
            className={styles.sizeButton} 
            onClick={(e) => adjustSize(e, -0.2)}
            type="button"
            aria-label="Decrease size"
          >
            -
          </button>
          <button 
            className={styles.sizeButton} 
            onClick={(e) => adjustSize(e, 0.2)}
            type="button"
            aria-label="Increase size"
          >
            +
          </button>
        </div>
      </div>
    </Draggable>
  );
}; 