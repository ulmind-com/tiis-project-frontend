import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      <style>{`
        /* Desktop Default (Tomar aager design intact ache) */
        .premium-close-btn {
          position: absolute;
          top: -16px;
          right: -16px;
          background: #ef4444;
          border: 3px solid white;
          color: white;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          outline: none;
        }

        .premium-close-btn:hover {
          transform: scale(1.1);
          background: #dc2626;
        }

        .premium-modal-image {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: block;
        }

        /* Ultra Premium Mobile View */
        @media (max-width: 768px) {
          .premium-close-btn {
            /* Mobile e button ta fixed kore screen er corner e dewa holo */
            position: fixed; 
            top: 20px;
            right: 20px;
            padding: 8px; /* Touch area bariyel dewa holo */
            background: rgba(0, 0, 0, 0.6); /* Glassmorphism black */
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          }
          
          .premium-close-btn:active {
            transform: scale(0.9); /* Tap korle smooth vitor dike jabe */
          }

          .premium-modal-image {
            max-width: 95vw; /* Mobile e ektu beshi space nebe */
            max-height: 90vh;
            border-radius: 16px; /* Ekdom modern rounded corners */
          }
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
          >
            <motion.div
              key="modal-image-container"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'relative', display: 'flex' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="premium-close-btn"
                onClick={onClose}
                aria-label="Close Preview"
              >
                <X size={22} strokeWidth={2.5} />
              </button>

              <img
                src={imageUrl}
                alt="Preview full size"
                className="premium-modal-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageModal;