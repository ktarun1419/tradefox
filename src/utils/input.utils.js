export const validators = {
    required: (msg = "This field is required.") => (v) => (!v?.trim() ? msg : null),
    email: (msg = "Please enter a valid email.") => (v) =>
      !v
        ? null
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? null
        : msg,
  };