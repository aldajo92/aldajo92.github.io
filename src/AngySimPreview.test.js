import { render, screen, fireEvent, act } from '@testing-library/react';
import Preview, { scanDistance, sensorOrigin, stepVehicle } from './AngySimPreview';

test('sensor rays hit inner wall surfaces and pillars from the current pose', () => {
  expect(scanDistance(0)).toBeCloseTo(3.6);
  expect(scanDistance(Math.PI)).toBeCloseTo(4.2);
  expect(scanDistance(-Math.PI / 2)).toBeCloseTo(3.9);
  const angle = Math.atan2(2, 2.2);
  expect(scanDistance(angle)).toBeCloseTo(Math.hypot(2.2, 2) - 0.3);
  expect(scanDistance(0, { x: 1, y: 0, yaw: 0 })).toBeCloseTo(2.6);
});

test('front mounted sensor rotates with the vehicle', () => {
  const origin = sensorOrigin({ x: 1, y: 2, yaw: Math.PI / 2 });
  expect(origin.x).toBeCloseTo(1);
  expect(origin.y).toBeCloseTo(2.3);
});

test('kinematic motion integrates heading first and supports reversing', () => {
  const pose = { x: 0, y: 0, yaw: 0 };
  expect(stepVehicle(pose, 2, 0, 0.5)).toEqual({ x: 1, y: 0, yaw: 0 });
  expect(stepVehicle(pose, -1, 0, 0.5).x).toBeCloseTo(-0.5);
  const turned = stepVehicle(pose, 1, Math.PI, 0.5);
  expect(turned.yaw).toBeCloseTo(Math.PI / 2);
  expect(turned.y).toBeCloseTo(0.5);
});

test('vehicle cannot enter the walls or pillars and can still rotate', () => {
  expect(stepVehicle({ x: 3.49, y: 0, yaw: 0 }, 2, 0, 0.02).x).toBeCloseTo(3.49);
  expect(stepVehicle({ x: 1.79, y: 2, yaw: 0 }, 2, 0, 0.02).x).toBeCloseTo(1.79);
  expect(stepVehicle({ x: 3.49, y: 0, yaw: 0 }, 0, 1, 0.02).yaw).toBeCloseTo(0.02);
});

test('keyboard drives only the focused running demo and stops on blur or reset', () => {
  jest.useFakeTimers();
  const view = render(<Preview />);
  fireEvent.click(screen.getByRole('button', { name: 'Drive' }));
  const region = screen.getByRole('figure', { name: /driving playground/i });
  fireEvent.keyDown(region, { key: 'ArrowUp' });
  act(() => { jest.advanceTimersByTime(500); });
  expect(screen.getByLabelText('Vehicle position')).not.toHaveTextContent('x 0.00');
  fireEvent.keyUp(region, { key: 'ArrowUp' });
  act(() => { jest.advanceTimersByTime(100); });
  const stoppedPosition = screen.getByLabelText('Vehicle position').textContent;
  act(() => { jest.advanceTimersByTime(300); });
  expect(screen.getByLabelText('Vehicle position').textContent).toBe(stoppedPosition);
  fireEvent.blur(window);
  expect(screen.getByRole('button', { name: 'Drive' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByLabelText('Vehicle position')).toHaveTextContent('x 0.00 · y 0.00');
  view.unmount();
  jest.useRealTimers();
});
