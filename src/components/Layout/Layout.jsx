import React from 'react';

import './Layout.scss';
import { Flexbox } from '../Flexbox/Flexbox';

// Column - Vertical stack
export const Column = ({ children, gap = 'md', align = 'stretch', className = '', ...props }) => (
  <Flexbox
    direction="column" 
    gap={gap} 
    align={align}
    className={`column ${className}`}
    {...props}
  >
    {children}
  </Flexbox>
);

// Stack - Horizontal row
export const Stack = ({ children, gap = 'md', align = 'center', responsive = false, className = '', ...props }) => (
  <Flexbox 
    direction="row" 
    gap={gap} 
    align={align}
    responsive={responsive}
    className={`stack ${className}`}
    {...props}
  >
    {children}
  </Flexbox>
);

// Box - Generic container with padding
export const Box = ({ 
  children, 
  padding = 'md',
  maxWidth,
  center = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'box',
    `box--padding-${padding}`,
    center && 'box--center',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes} 
      style={{ maxWidth }}
      {...props}
    >
      {children}
    </div>
  );
};

