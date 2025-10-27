import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./BottomSheet.scss";

export default function BottomSheet({
  open,
  onClose,
  snapTo = 360,
  maxHeight,
  children,
  title = "",
}) {
  const sheetRef = useRef(null);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);
  const lastDeltaRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);


  useEffect(() => { if (open) setDragY(0); }, [open]);

  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!open || !el) return;

    const onPointerDown = (e) => {
  
      const target = e.target;
      const isHandle =
        target.closest?.(".bs__handle") || target.closest?.(".bs__header");
      if (!isHandle) return;

      draggingRef.current = true;
      startYRef.current = getY(e);
      lastDeltaRef.current = 0;
      el.style.setProperty("--bs-transition", "0ms");

      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const dy = Math.max(0, getY(e) - startYRef.current);
      lastDeltaRef.current = dy;
     
      const vh = window.innerHeight;
      const limit = vh * 0.9;
      const eased = dy <= limit ? dy : limit + (dy - limit) * 0.2;
      setDragY(eased);
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      el.style.setProperty("--bs-transition", "280ms");

      const threshold = 120;
      if (lastDeltaRef.current > threshold) {
        onClose?.();
      } else {
        setDragY(0); 
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose]);

  const sheet = (
    <div
      className={`bs ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      style={{ "--bs-height": `${snapTo}px`, "--bs-transition": "280ms", "--bs-max": maxHeight ? `${maxHeight}px` : "90vh" }}
    >
      <button className="bs__backdrop" onClick={onClose} aria-label="Close sheet" />

     
      <div
        ref={sheetRef}
        className="bs__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title || "Bottom sheet"}
        style={{ transform: `translateY(${open ? dragY : window.innerHeight}px)` }}
      >
        <div className="bs__header">
          <div className="bs__handle" aria-hidden="true" />
          {title ? <div className="bs__title">{title}</div> : null}
          <button className="bs__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="bs__content">
          {children}
         
          <div style={{ height: 12 }} />
        </div>
      </div>
    </div>
  );

  return createPortal(sheet, document.body);
}

function getY(e) {
  if (e.touches && e.touches[0]) return e.touches[0].clientY;
  return e.clientY;
}
