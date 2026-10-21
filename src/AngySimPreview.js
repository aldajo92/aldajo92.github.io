import { useEffect, useRef, useState } from 'react';
import Joystick from './Joystick';
import arena from './data/angysim/arena.json';

const vehicle = arena.entities.find(entity => entity.kind === 'vehicle');
const sensor = arena.sensors[0];
const walls = arena.entities.filter(entity => entity.rectangle);
const pillars = arena.entities.filter(entity => entity.shape === 'circle');
const toX = x => 250 + x * 45;
const toY = y => 250 - y * 45;

// Lightweight adaptation of the AngySim scene, without its application shell.
export function sensorOrigin(pose) {
  return { x: pose.x + sensor.pose.x * Math.cos(pose.yaw) - sensor.pose.y * Math.sin(pose.yaw),
    y: pose.y + sensor.pose.x * Math.sin(pose.yaw) + sensor.pose.y * Math.cos(pose.yaw) };
}

export function stepVehicle(pose, v, w, dt) {
  const yaw = Math.atan2(Math.sin(pose.yaw + w * dt), Math.cos(pose.yaw + w * dt));
  const x = pose.x + v * Math.cos(yaw) * dt;
  const y = pose.y + v * Math.sin(yaw) * dt;
  // Keep the small portfolio playground inside the arena and outside pillars.
  const blocked = Math.abs(x) > 3.9 - vehicle.radius || Math.abs(y) > 3.9 - vehicle.radius ||
    pillars.some(p => Math.hypot(x - p.position.x, y - p.position.y) < p.radius + vehicle.radius);
  return { x: blocked ? pose.x : x, y: blocked ? pose.y : y, yaw };
}

export function scanDistance(angle, pose = vehicle.pose) {
  const { x, y } = sensorOrigin(pose);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let distance = sensor.rangeMax;
  walls.forEach(({ rectangle: { start, end, thickness } }) => {
    const vertical = start.x === end.x;
    const direction = vertical ? dx : dy;
    if (Math.abs(direction) < 1e-8) return;
    const coordinate = vertical ? start.x : start.y;
    const origin = vertical ? x : y;
    // Intersect the wall's inward-facing surface, including its thickness.
    const face = coordinate - Math.sign(coordinate) * thickness / 2;
    const t = (face - origin) / direction;
    const hit = vertical ? y + t * dy : x + t * dx;
    const min = vertical ? Math.min(start.y, end.y) : Math.min(start.x, end.x);
    const max = vertical ? Math.max(start.y, end.y) : Math.max(start.x, end.x);
    if (t > 0 && hit >= min && hit <= max) distance = Math.min(distance, t);
  });
  pillars.forEach(({ position, radius }) => {
    const ox = x - position.x;
    const oy = y - position.y;
    const b = ox * dx + oy * dy;
    const discriminant = b * b - (ox * ox + oy * oy - radius * radius);
    if (discriminant < 0) return;
    const t = -b - Math.sqrt(discriminant);
    if (t > 0) distance = Math.min(distance, t);
  });
  return distance;
}

export default function AngySimPreview() {
  const [showScan, setShowScan] = useState(true);
  const [running, setRunning] = useState(false);
  const [pose, setPose] = useState({ ...vehicle.pose });
  const poseRef = useRef({ ...vehicle.pose });
  const keys = useRef(new Set());
  const axes = useRef({ x: 0, y: 0 });
  const region = useRef(null);
  const control = arena.interaction.controls[0];
  const stopInput = () => { keys.current.clear(); axes.current = { x: 0, y: 0 }; };
  useEffect(() => {
    const stop = () => { stopInput(); setRunning(false); };
    const visibility = () => { if (document.hidden) stop(); };
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('blur', stop); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (!running) return;
    let frame;
    let last;
    let lastPaint = 0;
    const tick = now => {
      const dt = last === undefined ? 0 : Math.min((now - last) / 1000, 0.04);
      last = now;
      const held = keys.current;
      const forward = Number(held.has('ArrowUp') || held.has('i') || held.has('w')) - Number(held.has('ArrowDown') || held.has('k') || held.has('s'));
      const turn = Number(held.has('ArrowLeft') || held.has('j') || held.has('a')) - Number(held.has('ArrowRight') || held.has('l') || held.has('d'));
      const stick = axes.current;
      const usingStick = Math.hypot(stick.x, stick.y) > 0.05;
      const throttle = usingStick ? stick.y : forward;
      const steering = usingStick ? -stick.x : turn;
      poseRef.current = stepVehicle(poseRef.current, throttle * (throttle >= 0 ? control.forwardSpeed : control.reverseSpeed), steering * control.angularSpeed, dt);
      if (now - lastPaint >= 1000 / 30) { setPose({ ...poseRef.current }); lastPaint = now; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, control]);
  const keyInput = (event, down) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'i', 'j', 'k', 'l', 'w', 'a', 's', 'd'].includes(key)) return;
    if (down && event.target.tagName === 'BUTTON') return;
    if (down && !running) setRunning(true);
    event.preventDefault();
    if (down) keys.current.add(key); else keys.current.delete(key);
  };
  const { x: sensorX, y: sensorY } = sensorOrigin(pose);
  return (
    <figure ref={region} className="robot-scene angysim-preview" tabIndex={0} aria-label="AngySim driving playground" aria-describedby="drive-help"
      onKeyDown={e => keyInput(e, true)} onKeyUp={e => keyInput(e, false)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { stopInput(); setRunning(false); } }}>
      <div className="scene-header"><span className="angysim-brand"><img src={`${process.env.PUBLIC_URL}/angysim/mark.svg`} alt="" /> AngySim</span><span>DRIVE / 2D</span></div>
      <div className="preview-toolbar"><span>{running ? '● RUNNING' : 'Ⅱ PAUSED'}</span>
        <button onClick={() => { stopInput(); setRunning(!running); region.current.focus(); }}>{running ? 'Pause' : 'Drive'}</button>
        <button onClick={() => { stopInput(); poseRef.current = { ...vehicle.pose }; setPose({ ...vehicle.pose }); }}>Reset</button>
        <button aria-pressed={showScan} onClick={() => setShowScan(!showScan)}>LiDAR {showScan ? '−' : '+'}</button>
      </div>
      <svg viewBox="0 0 500 500" role="img" aria-labelledby="arena-title arena-desc">
        <title id="arena-title">AngySim LiDAR arena</title>
        <desc id="arena-desc">Drive a vehicle through the lidar-keyboard arena with four obstacles. LiDAR rays update as the vehicle moves.</desc>
        <defs><pattern id="arena-grid" width="45" height="45" x="25" y="25" patternUnits="userSpaceOnUse"><path d="M45 0H0V45" fill="none" stroke="#24303b" strokeWidth=".6" /></pattern></defs>
        <rect width="500" height="500" fill="url(#arena-grid)" />
        <path d="M250 30V470M30 250H470" stroke="#3b4a5b" strokeWidth=".8" />
        {walls.map(({ id, rectangle: r }) => <line key={id} x1={toX(r.start.x)} y1={toY(r.start.y)} x2={toX(r.end.x)} y2={toY(r.end.y)} stroke="#68788b" strokeWidth={r.thickness * 45} />)}
        {pillars.map(({ id, position, radius }) => <circle key={id} cx={toX(position.x)} cy={toY(position.y)} r={radius * 45} fill="#515e6e" stroke="#a3afbd" />)}
        {showScan && <g>{Array.from({ length: 120 }, (_, i) => {
          const angle = pose.yaw + sensor.pose.yaw + sensor.angleMin + i * (sensor.angleMax - sensor.angleMin) / 119;
          const distance = scanDistance(angle, pose);
          const x = toX(sensorX + Math.cos(angle) * distance);
          const y = toY(sensorY + Math.sin(angle) * distance);
          return <g key={i}><line x1={toX(sensorX)} y1={toY(sensorY)} x2={x} y2={y} stroke="#4d9fff" strokeOpacity=".18" strokeWidth=".8" /><circle cx={x} cy={y} r="1.7" fill="#8dc2f5" /></g>;
        })}</g>}
        <g transform={`translate(${toX(pose.x)} ${toY(pose.y)}) rotate(${-pose.yaw * 180 / Math.PI})`}><circle r="23" fill="none" stroke="#2ec4b6" strokeDasharray="3 4"/><rect x="-16" y="-12" width="32" height="24" rx="5" fill="#2ec4b6" stroke="#97e7df"/><path d="M4 -5L11 0 4 5" fill="none" stroke="#102827" strokeWidth="2"/></g>
        <g fill="#8c9dad" fontSize="9" fontFamily="monospace"><text x="80" y="430">−4 m</text><text x="414" y="430">+4 m</text><text x="265" y="245">map / origin</text><text x="87" y="410">ego</text></g>
      </svg>
      <div className="drive-controls">
        <div><p id="drive-help">Drag the joystick to drive.<br />Or click the arena and use ↑ ↓ ← → / WASD.</p><output aria-label="Vehicle position">x {pose.x.toFixed(2)} · y {pose.y.toFixed(2)} m</output></div>
        <Joystick resetSignal={!running} onEngage={() => { region.current.focus({ preventScroll: true }); setRunning(true); }} onChange={next => { axes.current = next; }} />
      </div>
      <figcaption><span>{arena.name}</span><a href="https://github.com/AngySimXYZ/AngySim" target="_blank" rel="noopener noreferrer">Source ↗</a></figcaption>
      <p className="preview-note">Created by Alejandro Gómez Flórez · AngySim mini playground</p>
    </figure>
  );
}
