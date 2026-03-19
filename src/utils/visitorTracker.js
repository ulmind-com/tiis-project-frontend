// Advanced Visitor tracking utility — collects maximum data silently
import { API_BASE } from '../api';

const VISITOR_ID_KEY = 'tiis_visitor_id';
let pageStartTime = Date.now();
let maxScrollDepth = 0;
let clickCount = 0;

// ─── Visitor ID ───
const generateVisitorId = () => {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 10);
  return `v_${ts}_${rand}`;
};

export const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
};

// ─── Canvas Fingerprint (creates unique device signature) ───
const getCanvasFingerprint = () => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(25, 0, 150, 30);
    ctx.fillStyle = '#069';
    ctx.fillText('TIIS:fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('TIIS:fingerprint', 4, 17);
    const dataUrl = canvas.toDataURL();
    // Simple hash
    let hash = 0;
    for (let i = 0; i < dataUrl.length; i++) {
      hash = ((hash << 5) - hash) + dataUrl.charCodeAt(i);
      hash |= 0;
    }
    return 'cf_' + Math.abs(hash).toString(36);
  } catch {
    return '';
  }
};

// ─── Browser Detection ───
const detectBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return { name: 'Firefox', version: ua.match(/Firefox\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Edg/')) return { name: 'Edge', version: ua.match(/Edg\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Chrome')) return { name: 'Chrome', version: ua.match(/Chrome\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Safari')) return { name: 'Safari', version: ua.match(/Version\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Opera') || ua.includes('OPR')) return { name: 'Opera', version: ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1] || '' };
  return { name: 'Unknown', version: '' };
};

// ─── OS Detection ───
const detectOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows NT 10')) return { name: 'Windows', version: '10/11' };
  if (ua.includes('Windows')) return { name: 'Windows', version: ua.match(/Windows NT ([\d.]+)/)?.[1] || '' };
  if (ua.includes('Mac OS X')) return { name: 'macOS', version: ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '' };
  if (ua.includes('Linux')) return { name: 'Linux', version: '' };
  if (ua.includes('Android')) return { name: 'Android', version: ua.match(/Android ([\d.]+)/)?.[1] || '' };
  if (ua.includes('iPhone') || ua.includes('iPad')) return { name: 'iOS', version: ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '' };
  return { name: 'Unknown', version: '' };
};

// ─── Device Detection ───
const detectDevice = () => {
  const ua = navigator.userAgent;
  // Try to identify vendor/model
  let vendor = '', model = '';
  if (/iPhone/.test(ua)) { vendor = 'Apple'; model = 'iPhone'; }
  else if (/iPad/.test(ua)) { vendor = 'Apple'; model = 'iPad'; }
  else if (/Samsung/i.test(ua)) { vendor = 'Samsung'; model = ua.match(/SM-[\w]+/)?.[0] || 'Galaxy'; }
  else if (/Pixel/i.test(ua)) { vendor = 'Google'; model = ua.match(/Pixel[\w ]*/)?.[0] || 'Pixel'; }
  else if (/OnePlus/i.test(ua)) { vendor = 'OnePlus'; model = ua.match(/OnePlus[\w ]*/)?.[0] || ''; }
  else if (/Xiaomi|Redmi|POCO/i.test(ua)) { vendor = 'Xiaomi'; model = ua.match(/(Redmi|POCO|Xiaomi)[\w ]*/i)?.[0] || ''; }

  let type = 'Desktop';
  if (/Tablet|iPad/i.test(ua)) type = 'Tablet';
  else if (/Mobile|Android|iPhone/i.test(ua)) type = 'Mobile';

  return { type, vendor, model };
};

// ─── GPU / WebGL Detection ───
const getGPUInfo = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return { gpu: '', gpuVendor: '' };
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return { gpu: '', gpuVendor: '' };
    return {
      gpu: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '',
      gpuVendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '',
    };
  } catch {
    return { gpu: '', gpuVendor: '' };
  }
};

// ─── Battery Info ───
const getBatteryInfo = async () => {
  try {
    if (!navigator.getBattery) return {};
    const battery = await navigator.getBattery();
    return {
      batteryLevel: Math.round(battery.level * 100),
      batteryCharging: battery.charging,
    };
  } catch {
    return {};
  }
};

// ─── Connection Info ───
const getConnectionInfo = () => {
  try {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return {};
    return {
      connectionType: conn.type || '',
      connectionSpeed: conn.effectiveType || '',
    };
  } catch {
    return {};
  }
};

// ─── Browser Plugins ───
const getPlugins = () => {
  try {
    if (!navigator.plugins) return [];
    return Array.from(navigator.plugins).slice(0, 10).map(p => p.name);
  } catch {
    return [];
  }
};

// ─── Ad Blocker Detection ───
const detectAdBlocker = async () => {
  try {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox ad-banner ad-placeholder';
    testAd.style.cssText = 'position:absolute;top:-999px;width:1px;height:1px;';
    document.body.appendChild(testAd);
    await new Promise(r => setTimeout(r, 100));
    const blocked = testAd.offsetHeight === 0 || testAd.clientHeight === 0;
    document.body.removeChild(testAd);
    return blocked;
  } catch {
    return false;
  }
};

// ─── Referrer Domain ───
const getReferrerDomain = () => {
  try {
    if (!document.referrer) return '';
    return new URL(document.referrer).hostname;
  } catch {
    return '';
  }
};

// ─── UTM Params ───
const getUTMParams = () => {
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get('utm_source') || '',
    utmMedium: p.get('utm_medium') || '',
    utmCampaign: p.get('utm_campaign') || '',
    utmTerm: p.get('utm_term') || '',
    utmContent: p.get('utm_content') || '',
  };
};

// ─── Cookie Consent ───
export const getCookieConsent = () => localStorage.getItem('tiis_cookie_consent') || 'pending';
export const setCookieConsent = (status) => localStorage.setItem('tiis_cookie_consent', status);

// ─── Engagement: Scroll depth tracker ───
const setupScrollTracker = () => {
  maxScrollDepth = 0;
  const handler = () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const depth = Math.round((scrolled / docHeight) * 100);
      if (depth > maxScrollDepth) maxScrollDepth = depth;
    }
  };
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
};

// ─── Engagement: Click counter ───
const setupClickTracker = () => {
  clickCount = 0;
  const handler = () => { clickCount++; };
  document.addEventListener('click', handler, { passive: true });
  return () => document.removeEventListener('click', handler);
};

// ─── Send previous page engagement data ───
const sendEngagement = async (path) => {
  try {
    const duration = Math.round((Date.now() - pageStartTime) / 1000);
    if (duration < 1) return; // Skip instant bounces
    await fetch(`${API_BASE}/api/visitors/engagement`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        page: path,
        duration,
        scrollDepth: maxScrollDepth,
        clicks: clickCount,
      }),
    });
  } catch (e) {
    console.debug('Engagement send error:', e);
  }
};

let cleanupScroll = null;
let cleanupClick = null;
let previousPath = null;

// ─── Track a page visit ───
export const trackPageVisit = async (path, title) => {
  try {
    // Send engagement for previous page
    if (previousPath) {
      sendEngagement(previousPath);
    }
    previousPath = path;

    // Reset engagement trackers
    pageStartTime = Date.now();
    maxScrollDepth = 0;
    clickCount = 0;
    if (cleanupScroll) cleanupScroll();
    if (cleanupClick) cleanupClick();
    cleanupScroll = setupScrollTracker();
    cleanupClick = setupClickTracker();

    // Collect everything
    const browser = detectBrowser();
    const os = detectOS();
    const device = detectDevice();
    const gpu = getGPUInfo();
    const connection = getConnectionInfo();
    const utm = getUTMParams();
    const battery = await getBatteryInfo();
    const adBlocker = await detectAdBlocker();

    const payload = {
      visitorId: getVisitorId(),
      canvasFingerprint: getCanvasFingerprint(),
      browser: browser.name,
      browserVersion: browser.version,
      os: os.name,
      osVersion: os.version,
      device: device.type,
      deviceVendor: device.vendor,
      deviceModel: device.model,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      screenColorDepth: window.screen.colorDepth,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || 'en',
      languages: Array.from(navigator.languages || []),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      timezoneOffset: new Date().getTimezoneOffset(),
      cpuCores: navigator.hardwareConcurrency || 0,
      deviceMemory: navigator.deviceMemory || 0,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      ...gpu,
      ...connection,
      ...battery,
      referrer: document.referrer || '',
      referrerDomain: getReferrerDomain(),
      ...utm,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack === '1',
      adBlockerDetected: adBlocker,
      onlineStatus: navigator.onLine,
      pdfViewerEnabled: navigator.pdfViewerEnabled || false,
      webdriver: navigator.webdriver || false,
      platform: navigator.platform || '',
      userAgent: navigator.userAgent,
      plugins: getPlugins(),
      cookieConsent: getCookieConsent(),
      page: path,
      pageTitle: title || document.title,
    };

    // Fire-and-forget
    await fetch(`${API_BASE}/api/visitors/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.debug('Tracking error:', e);
  }
};

// ─── Send engagement on page unload ───
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (previousPath) {
      const duration = Math.round((Date.now() - pageStartTime) / 1000);
      const data = JSON.stringify({
        visitorId: getVisitorId(),
        page: previousPath,
        duration,
        scrollDepth: maxScrollDepth,
        clicks: clickCount,
      });
      // Use sendBeacon for reliable delivery on page close
      navigator.sendBeacon(`${API_BASE}/api/visitors/engagement`, new Blob([data], { type: 'application/json' }));
    }
  });
}

// ─── Update consent on backend ───
export const updateConsent = async (consent) => {
  setCookieConsent(consent);
  try {
    await fetch(`${API_BASE}/api/visitors/consent`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId: getVisitorId(), consent }),
    });
  } catch (e) {
    console.debug('Consent update error:', e);
  }
};

// ─── Link contact info (call from enquiry/contact forms) ───
export const linkContactInfo = async ({ name, email, phone, company }) => {
  try {
    await fetch(`${API_BASE}/api/visitors/link-contact`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        name, email, phone, company,
      }),
    });
  } catch (e) {
    console.debug('Contact link error:', e);
  }
};
