import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ContactQr({ website, linkedin, whatsapp }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const choices = [{ title: 'Website', url: website, file: 'website.svg' }, { title: 'LinkedIn', url: linkedin, file: 'linkedin.svg' }, ...(whatsapp ? [{ title: 'WhatsApp', url: whatsapp, file: 'whatsapp.svg' }] : [])];
  const trigger = useRef(null);
  const panel = useRef(null);
  useEffect(() => {
    if (!open) return;
    const triggerElement = trigger.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current.querySelector('button').focus();
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key !== 'Tab') return;
      const elements = [...panel.current.querySelectorAll('button, a[href]')];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      triggerElement?.focus();
    };
  }, [open, selected]);
  return <>
    <button ref={trigger} className="qr-trigger" aria-label="Open contact QR codes" aria-haspopup="dialog" aria-expanded={open} onClick={() => { setSelected(null); setOpen(true); }}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h3v3h-6zM12 3v9H3M12 15v6M21 12h-6v-1" /></svg><span>QR</span>
    </button>
    {open && createPortal(<div className="qr-backdrop" onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section ref={panel} className="qr-dialog qr-dialog-single" role="dialog" aria-modal="true" aria-labelledby="qr-title" aria-describedby="qr-description">
        <div className="qr-heading"><h2 id="qr-title">{selected ? `${selected.title} QR` : "Let's connect"}</h2><button className="qr-close" aria-label="Close QR codes" onClick={() => setOpen(false)}>×</button></div>
        <p id="qr-description">{selected ? 'Scan with your phone, or open the link.' : 'Choose a QR code to display.'}</p>
        {selected ? <>
          <a className="qr-card qr-card-single" href={selected.url} target="_blank" rel="noopener noreferrer"><img src={`${process.env.PUBLIC_URL}/qr/${selected.file}`} alt={`QR code for ${selected.title}`} width="280" height="280" /><strong>{selected.title} ↗</strong><span>{selected.url.replace(/^https?:\/\//, '')}</span></a>
          <button className="qr-back" onClick={() => setSelected(null)}>← Other QR codes</button>
        </> : <div className="qr-options">
          {choices.map(item => <button key={item.title} onClick={() => setSelected(item)}><span>{item.title}</span><span aria-hidden="true">↗</span></button>)}
          {!whatsapp && <div className="qr-pending"><strong>WhatsApp</strong><span>Link coming soon</span></div>}
        </div>}

      </section>
    </div>, document.body)}
  </>;
}
