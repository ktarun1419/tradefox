export const getSpacing = (props, propName) => {
  const value = props[propName];
  if (!value) return '0';
  if (typeof value === 'number') return `${value}px`;
  if (props.theme.spacing[value]) return props.theme.spacing[value];
  return value;
};

// Helper for responsive props
export const getResponsiveValue = (value, breakpoint) => {
  if (typeof value === 'object' && value[breakpoint]) {
    return value[breakpoint];
  }
  return value;
};
