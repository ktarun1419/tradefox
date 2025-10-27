import React from "react";
import "./ThemedText.scss";

const ThemedText = ({ variant = "body", children, color, colorVariant, align = "left", className = "", weight, hoverEffect,  ...props }) => {
  const classes = ["theme-text", `theme-text--${variant}`, colorVariant && `theme-text--${colorVariant}`, `theme-text--${weight}`,`theme-text--align-${align}`,hoverEffect && `theme-text--hover` , className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={{ color }} {...props}>
      {children}
    </div>
  );
};

// Convenient variants
ThemedText.h1 = (props) => <ThemedText variant="h1" {...props} />;
ThemedText.h2 = (props) => <ThemedText variant="h2" {...props} />;
ThemedText.h3 = (props) => <ThemedText variant="h3" {...props} />;
ThemedText.h4 = (props) => <ThemedText variant="h4" {...props} />;
ThemedText.body = (props) => <ThemedText variant="body" {...props} />;
ThemedText.small = (props) => <ThemedText variant="small" {...props} />;

export default ThemedText;
