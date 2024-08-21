import React from 'react';
import { expressionColors } from '../utils/expressionColors';

interface EmotionDotProps {
  emotion: any;
}

const EmotionDot: React.FC<EmotionDotProps> = ({ emotion }) => {
  const color = expressionColors[emotion as keyof typeof expressionColors];

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'inline-block',
      }}
      title={emotion}
    ></div>
  );
};

export default EmotionDot;