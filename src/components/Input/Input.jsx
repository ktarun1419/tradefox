import React, { useEffect, useId, useMemo, useState } from "react";
import "./Input.scss";

export default function Input({ label, type = "text", placeholder, value, defaultValue, onChange, validate, required = false, disabled = false, className = "", setError }) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState(defaultValue || "");
  const [touched, setTouched] = useState(false);
  const id = useId();

  const val = isControlled ? value : inner;

  const rawError = useMemo(() => {
    const base = validate ? validate(val) : null;
    if (base) return base;
    if (required && !String(val ?? "").trim()) return "This field is required.";
    return null;
  }, [val, validate, required]);

  const showError = touched ? rawError : null;

  function handleChange(e) {
    const v = e.target.value;
    if (!isControlled) setInner(v);
    onChange && onChange(v);
  }

  useEffect(() => {
    if (!setError) return;
    setError(!!rawError);
  }, [rawError, setError]);

  return (
    <div className={`in ${showError ? "has-error" : ""} ${disabled ? "is-disabled" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="in__label">
          {label} {required ? <span aria-hidden="true">*</span> : null}
        </label>
      )}

      <input
        id={id}
        className="in__field"
        type={type}
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${id}-err` : undefined}
        required={required}
        disabled={disabled}
      />

      <div className="in__error" role="alert" id={`${id}-err`}>
        {showError}
      </div>
    </div>
  );
}
