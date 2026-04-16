'use client'; 
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleKeyDown);

  return () => {
    document.body.style.overflow = ''; 
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]); 

  if (!mounted) return null;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>,
    document.body
  );
}