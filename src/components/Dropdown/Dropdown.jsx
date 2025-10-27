import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Dropdown.scss";

export default function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  getOptionLabel = (opt) => (typeof opt === "object" && opt !== null && "label" in opt ? opt.label : String(opt)),
  getOptionValue = (opt) => (typeof opt === "object" && opt !== null && "value" in opt ? opt.value : opt),
  renderValue,
  placeholder = "Select…",
  disabled = false,
  size = "md",
  className = "",
  portal = true,
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const currentValue = isControlled ? value : internal;

  const uid = useId();
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const hoverCloseTimer = useRef(null);
  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  };
  const scheduleClose = (delay = 120) => {
    clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = setTimeout(() => setOpen(false), delay);
  };
  const cancelScheduledClose = () => clearTimeout(hoverCloseTimer.current);

  const onHoverEnter = () => {
    cancelScheduledClose();
    if (!open) openList();
  };
  const onHoverLeave = () => {
    scheduleClose();
  };

  const normalized = useMemo(
    () => (options || []).map((o, i) => ({ raw: o, value: getOptionValue(o), label: getOptionLabel(o), key: `opt-${i}` })),
    [options, getOptionLabel, getOptionValue]
  );

  const currentIndex = normalized.findIndex((o) => o.value === currentValue);
  const currentLabel = currentIndex >= 0 ? normalized[currentIndex].label : "";

  function selectIndex(idx) {
    if (idx < 0 || idx >= normalized.length) return;
    const sel = normalized[idx];
    if (!isControlled) setInternal(sel.value);
    onChange && onChange(sel.value, sel.raw);
    setOpen(false);
    requestAnimationFrame(() => btnRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      const t = e.target;
      if (!popRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Position portal popover
  const [portalStyle, setPortalStyle] = useState({ top: 0, left: 0, minWidth: 0 });
  const positionPopover = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setPortalStyle({ top: Math.round(r.bottom + 8), left: Math.round(r.left), minWidth: Math.round(r.width) });
  };
  useLayoutEffect(() => { if (open) positionPopover(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = () => positionPopover();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open]);

  function onButtonKeyDown(e) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault();
        openList();
        break;
      case "Escape":
        setOpen(false);
        break;
      default:
        break;
    }
  }
  function onListKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(normalized.length - 1, (i < 0 ? 0 : i) + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, (i < 0 ? 0 : i) - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(normalized.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) selectIndex(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => btnRef.current?.focus());
        break;
      default:
        break;
    }
  }

  const btnId = `dd-btn-${uid}`;
  const listId = `dd-list-${uid}`;

  const popover = open ? (
    <div
      ref={popRef}
      id={listId}
      role="listbox"
      aria-labelledby={btnId}
      tabIndex={-1}
      className={`dd__popover ${portal ? "dd__popover--portal" : ""}`}
      onKeyDown={onListKeyDown}
      style={portal ? portalStyle : undefined}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      {normalized.map((o, i) => {
        const selected = i === currentIndex;
        const active = i === activeIndex;
        return (
          <div
            key={o.key}
            role="option"
            aria-selected={selected}
            className={`dd__option ${selected ? "is-selected" : ""} ${active ? "is-active" : ""}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => selectIndex(i)}
          >
            {o.label}
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div
      className={`dd ${size} ${disabled ? "is-disabled" : ""} ${className}`}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <button
        ref={btnRef}
        id={btnId}
        type="button"
        className="dd__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onKeyDown={onButtonKeyDown}
        disabled={disabled}
      >
        <span className={`dd__value ${currentIndex < 0 ? "is-placeholder" : ""}`}>
          {currentIndex >= 0
            ? (renderValue ? renderValue(normalized[currentIndex].value, currentLabel) : currentLabel)
            : placeholder}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="3" viewBox="0 0 6 3" fill="none" aria-hidden="true">
          <path d="M0.0516 0.2987L2.4291 2.6763c.0683.0683.1791.0683.2475 0L5.0541.2987C5.1644.1885 5.0863 0 4.9303 0H.1754C.0194 0-.0586.1885.0516.2987Z" fill="#96979A"/>
        </svg>
      </button>

     
      {!portal && popover}
      {portal && open && createPortal(popover, document.body)}
    </div>
  );
}
