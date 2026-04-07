import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api';

const renderTextWithLinks = (text) => {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline', wordBreak: 'break-all' }}>
          {part}
        </a>
      );
    }
    return part;
  });
};
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Loading Insights...</p>
      </div>
    );
  }

  return (
    <div className="news-page-wrapper animate-fade-in" style={{ backgroundColor: '#f4f6f0', minHeight: '100vh', padding: '6rem 2rem' }}>
      
      {/* ─── ULTRA PREMIUM MOBILE RESPONSIVE CSS ─── */}
      <style>{`
        @media (max-width: 768px) {
          .news-page-wrapper { padding: 5rem 1rem !important; }
          .news-header { flex-direction: column !important; align-items: center !important; gap: 1.5rem !important; margin-bottom: 3rem !important; text-align: center !important; }
          .news-header > div > div:first-child { justify-content: center !important; margin-bottom: 1.2rem !important; }
          .news-title { font-size: 2.6rem !important; line-height: 1.1 !important; letter-spacing: -1px !important; text-align: center !important; }
          .news-subtitle { font-size: 1.05rem !important; line-height: 1.6 !important; text-align: center !important; padding: 0 0.5rem; margin-top: 1rem !important; }
          .news-back-link { align-self: center !important; padding-top: 0 !important; margin-top: 0.5rem !important; background-color: rgba(1, 50, 78, 0.08) !important; padding: 0.6rem 1.2rem !important; }
          
          .news-card { flex-direction: column !important; min-height: auto !important; border-radius: 20px !important; }
          .news-card-image-wrap { flex: none !important; height: 220px !important; }
          .news-card-content { flex: none !important; padding: 1.75rem 1.5rem !important; }
          .news-card-title { font-size: 1.6rem !important; line-height: 1.2 !important; margin-bottom: 1rem !important; }
          .news-card-desc { font-size: 1rem !important; line-height: 1.6 !important; margin-bottom: 2rem !important; }
          
          /* Modal Adjustments */
          .news-modal-content { padding: 1.75rem 1.25rem !important; }
          .news-modal-image { height: 220px !important; }
          .news-modal-title { font-size: 1.6rem !important; line-height: 1.2 !important; }
          .news-modal-image > div.absolute.bottom-6 { bottom: 1rem !important; left: 1.25rem !important; right: 1.25rem !important; }
          .news-modal-text { font-size: 1.05rem !important; line-height: 1.8 !important; }
          .modal-close-btn { top: 1rem !important; right: 1rem !important; background: rgba(255,255,255,0.8) !important; color: #000 !important; border: none !important; }
          .modal-author-block { padding-bottom: 1.5rem !important; margin-bottom: 1.5rem !important; }
        }
      `}</style>
      {/* ────────────────────────────────────────── */}

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="news-header" style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              <span style={{ width: '30px', height: '2px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></span>
              Knowledge Hub
            </div>
            <h1 className="news-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--color-primary-dark)', lineHeight: '1.1', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
              All Insights <span style={{ background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>&amp; Blog</span>
            </h1>
            <p className="news-subtitle" style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', marginTop: '1rem', maxWidth: '600px', lineHeight: '1.7' }}>
              Stay updated with our latest thought leadership, strategies, and industry news carefully curated for ambitious leaders.
            </p>
          </motion.div>
          <Link to="/" className="news-back-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: 'rgba(1, 50, 78, 0.05)', transition: 'background-color 0.2s' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {news.length > 0 ? (
            news.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedNews(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  minHeight: '350px'
                }}
                className="news-card group hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
              >
                {/* Left side: Image */}
                <div className="news-card-image-wrap" style={{ flex: '0 0 45%', position: 'relative', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      position: 'absolute', inset: 0, 
                      backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'})`,
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      transition: 'transform 0.6s ease'
                    }}
                    className="group-hover:scale-105"
                  />
                </div>

                {/* Right side: Content */}
                <div className="news-card-content" style={{ flex: '1 1 55%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ padding: '0.3rem 0.8rem', backgroundColor: 'rgba(177,32,35,0.1)', color: 'var(--color-secondary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Article
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
                      {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h2 className="news-card-title" style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary-dark)', lineHeight: '1.2', marginBottom: '1rem' }}>
                    {item.title}
                  </h2>
                  
                  <p className="news-card-desc" style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                    {item.content.length > 200 ? item.content.substring(0, 200) + '...' : item.content}
                  </p>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.9rem', marginTop: 'auto' }}>
                    Read Full Article <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '24px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>No insights available right now.</p>
            </div>
          )}
        </div>

      </div>

      {/* News Detail Modal */}
      {selectedNews && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelectedNews(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            <button onClick={() => setSelectedNews(null)} className="modal-close-btn absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors cursor-pointer border border-black/10">&times;</button>
            
            <div className="news-modal-image h-64 relative shrink-0">
               {selectedNews.imageUrl ? (
                 <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <FileText size={64} />
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-6 left-8 right-8">
                 <div className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">
                   {new Date(selectedNews.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                 </div>
                 <h2 className="news-modal-title text-3xl text-white font-black leading-tight uppercase relative z-10">{selectedNews.title}</h2>
               </div>
            </div>
            
            <div className="news-modal-content" style={{ padding: '3rem 4rem', overflowY: 'auto' }}>
              
              <div className="modal-author-block" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem' }}>
                  T
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--color-primary-dark)', fontSize: '1rem' }}>TIIS Editorial Team</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{Math.ceil(selectedNews.content.length / 800)} min read • Research & Strategy</div>
                </div>
              </div>

              <div className="news-modal-text" style={{ 
                color: '#334155', 
                fontSize: '1.15rem', 
                lineHeight: '1.9', 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '400',
                letterSpacing: '0.2px'
              }}>
                <span className="drop-cap" style={{ float: 'left', fontSize: '4.5rem', lineHeight: '0.8', paddingTop: '0.3rem', paddingRight: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: '900', fontFamily: 'Georgia, serif' }}>
                  {selectedNews.content.charAt(0)}
                </span>
                {renderTextWithLinks(selectedNews.content.substring(1))}
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default News;
