// components/SkeletonLoader.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface SkeletonLoaderProps {
   width?: string;
   height?: string;
   borderRadius?: string;
   className?: string;
   id?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
   width = '100%',
   height = '1rem',
   borderRadius = '0.5rem',
   className = '',
   id = '',
}) => {
   return (
      <motion.div
         initial={{ backgroundPositionX: '0%' }}
         animate={{ backgroundPositionX: '100%' }}
         transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 1.2,
            ease: 'linear',
         }}
         style={{
            width,
            height,
            borderRadius,
            backgroundImage: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
            backgroundSize: '200% 100%',
         }}
         className={className}
         id={id}
      />
   );
};
