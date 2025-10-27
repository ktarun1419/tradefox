// src/components/Flexbox.jsx
import React from 'react';
import './Flexbox.scss';

export const Flexbox = ({ 
  children, 
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = 'md',
  className = '',
  responsive = false,
  ...props 
}) => {
  const classes = [
    'flexbox',
    `flexbox--${direction}`,
    `flexbox--justify-${justify}`,
    `flexbox--align-${align}`,
    `flexbox--wrap-${wrap}`,
    `flexbox--gap-${gap}`,
    responsive && 'flexbox--responsive',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};