import { useEffect, useRef, useState } from 'react';

// Adapted from AngySim's design/primitives/Joystick.tsx (same author).
export default function Joystick({ disabled = false, resetSignal = false, onChange, onEngage }) {
  const held = useRef(null);
  const [axes, setAxes] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (disabled || resetSignal) { held.current = null; setAxes({ x: 0, y: 0 }); }
  }, [disabled, resetSignal]);
  const move = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const travel = rect.width / 2 - 18;
    if (travel <= 0) return;
    const x = (e.clientX - rect.left - rect.width / 2) / travel;
    const y = (rect.top + rect.height / 2 - e.clientY) / travel;
    const length = Math.max(1, Math.hypot(x, y));
    const next = { x: x / length, y: y / length };
    setAxes(next); onChange(next);
  };
  const release = e => {
    if (held.current !== e.pointerId) return;
    held.current = null;
    setAxes({ x: 0, y: 0 }); onChange({ x: 0, y: 0 });
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  return <div className={`drive-joystick ${disabled ? 'is-disabled' : ''}`} role="group" aria-label="Vehicle joystick" aria-disabled={disabled}
    onPointerDown={e => { if (disabled || e.button !== 0 || held.current !== null) return; e.preventDefault(); onEngage?.(); held.current = e.pointerId; e.currentTarget.setPointerCapture?.(e.pointerId); move(e); }}
    onPointerMove={e => { if (!disabled && held.current === e.pointerId) move(e); }}
    onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}>
    <span className="joystick-cross">＋</span><span className="joystick-thumb" style={{ transform: `translate(${axes.x * 32}px, ${-axes.y * 32}px)` }} />
  </div>;
}
