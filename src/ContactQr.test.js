import { fireEvent, render, screen } from '@testing-library/react';
import ContactQr from './ContactQr';

test('shows each QR in its own modal view and restores focus on close', () => {
  render(<ContactQr website="https://aldajo92.github.io/" linkedin="https://linkedin.com/in/aldajo92" />);
  const trigger = screen.getByRole('button', { name: 'Open contact QR codes' });
  fireEvent.click(trigger);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(screen.getByText('Link coming soon')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Website' }));
  expect(screen.getByRole('dialog', { name: 'Website QR' })).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(1);
  expect(screen.getByRole('link', { name: /Website/ })).toHaveAttribute('href', 'https://aldajo92.github.io/');
  fireEvent.click(screen.getByRole('button', { name: /Other QR codes/ }));
  fireEvent.click(screen.getByRole('button', { name: 'LinkedIn' }));
  expect(screen.getByRole('dialog', { name: 'LinkedIn QR' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://linkedin.com/in/aldajo92');
  const close = screen.getByRole('button', { name: 'Close QR codes' });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
  expect(screen.getByRole('button', { name: /Other QR codes/ })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('opens the supplied WhatsApp contact QR in its own modal', () => {
  const whatsapp = 'https://wa.me/qr/OD5KITZ2R2ABP1';
  render(<ContactQr website="https://aldajo92.github.io/" linkedin="https://linkedin.com/in/aldajo92" whatsapp={whatsapp} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open contact QR codes' }));
  expect(screen.queryByText('Link coming soon')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'WhatsApp' }));
  expect(screen.getByRole('dialog', { name: 'WhatsApp QR' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', whatsapp);
  expect(screen.getByRole('img', { name: 'QR code for WhatsApp' })).toHaveAttribute('src', '/qr/whatsapp.svg');
});
