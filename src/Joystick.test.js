import { act, fireEvent, render, screen } from '@testing-library/react';
import Joystick from './Joystick';
import AngySimPreview from './AngySimPreview';

// jsdom does not provide PointerEvent; retain the real event's coordinates/id.
beforeAll(() => {
  window.PointerEvent = class extends MouseEvent {
    constructor(type, props = {}) { super(type, props); this.pointerId = props.pointerId ?? 1; }
  };
});

test('pointer drag engages driving without moving focus and releases to zero', () => {
  const change = jest.fn();
  const engage = jest.fn();
  render(<Joystick onChange={change} onEngage={engage} />);
  const stick = screen.getByRole('group', { name: 'Vehicle joystick' });
  stick.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 });
  const allowedDefault = fireEvent.pointerDown(stick, { button: 0, pointerId: 1, clientX: 50, clientY: 18 });
  expect(allowedDefault).toBe(false);
  expect(engage).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenLastCalledWith({ x: 0, y: 1 });
  fireEvent.pointerUp(stick, { pointerId: 1 });
  expect(change).toHaveBeenLastCalledWith({ x: 0, y: 0 });
});

test('cancelling a touch stops movement', () => {
  const change = jest.fn();
  render(<Joystick onChange={change} />);
  const stick = screen.getByRole('group', { name: 'Vehicle joystick' });
  stick.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 });
  fireEvent.pointerDown(stick, { button: 0, pointerId: 7, clientX: 82, clientY: 50 });
  fireEvent.pointerCancel(stick, { pointerId: 7 });
  expect(change).toHaveBeenLastCalledWith({ x: 0, y: 0 });
});

test('dragging the joystick starts the scene and actually moves the vehicle', () => {
  jest.useFakeTimers();
  const view = render(<AngySimPreview />);
  const stick = screen.getByRole('group', { name: 'Vehicle joystick' });
  stick.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 });
  fireEvent.pointerDown(stick, { button: 0, pointerId: 1, clientX: 50, clientY: 18 });
  expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(500); });
  expect(screen.getByLabelText('Vehicle position')).not.toHaveTextContent('x 0.00');
  fireEvent.pointerUp(stick, { pointerId: 1 });
  act(() => { jest.advanceTimersByTime(100); });
  const position = screen.getByLabelText('Vehicle position').textContent;
  act(() => { jest.advanceTimersByTime(500); });
  expect(screen.getByLabelText('Vehicle position').textContent).toBe(position);
  view.unmount();
  jest.useRealTimers();
});
