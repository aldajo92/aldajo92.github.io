import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('keeps the CV sections reachable and the mobile menu operable', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Engineering');
  const menu = screen.getByRole('button', { name: 'Menu +' });
  fireEvent.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  const about = screen.getByRole('link', { name: 'About' });
  expect(document.querySelector(about.getAttribute('href'))).toBeInTheDocument();
  fireEvent.click(about);
  expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('allows visitors to toggle scenario layers', () => {
  render(<App />);
  const lidar = screen.getByRole('button', { name: /LiDAR/ });
  fireEvent.click(lidar);
  expect(lidar).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(lidar);
  expect(lidar).toHaveAttribute('aria-pressed', 'true');
  const drive = screen.getByRole('button', { name: 'Drive' });
  fireEvent.click(drive);
  expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
  expect(screen.getByRole('button', { name: 'Drive' })).toBeInTheDocument();
});
