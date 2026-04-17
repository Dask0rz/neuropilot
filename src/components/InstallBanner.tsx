'use client';

import { useEffect, useState } from 'react';

type Platform = 'ios' | 'android' | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallBanner() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ne pas afficher si déjà installée (standalone = lancée depuis l'écran d'accueil)
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    // Ne pas afficher si déjà refusée dans cette session
    if (sessionStorage.getItem('install-banner-dismissed')) return;

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);

    if (isIOS) {
      setPlatform('ios');
      setVisible(true);
    }

    // Android : on attend l'événement natif beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setPlatform('android');
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallAndroid = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('install-banner-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-bottom">
      <div className="bg-navy-800 border border-white/10 rounded-2xl p-4 shadow-2xl max-w-sm mx-auto">
        <div className="flex items-start gap-3">
          {/* Icône */}
          <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-navy-900 border border-white/10">
            <img src="/icons/icon-192.png" alt="Yukino" className="w-full h-full object-cover" />
          </div>

          {/* Texte */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Installer Yukino
            </p>
            <p className="text-white/50 text-xs mt-0.5 leading-snug">
              {platform === 'ios'
                ? <>Appuie sur <ShareIcon /> puis <strong className="text-white/70">"Sur l'écran d'accueil"</strong></>
                : 'Ajoute l\'app sur ton écran d\'accueil pour un accès rapide.'
              }
            </p>
          </div>

          {/* Fermer */}
          <button
            onClick={handleDismiss}
            className="shrink-0 text-white/30 hover:text-white/60 transition-colors p-1 -mr-1 -mt-1"
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Bouton Android uniquement */}
        {platform === 'android' && (
          <button
            onClick={handleInstallAndroid}
            className="mt-3 w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Installer
          </button>
        )}
      </div>
    </div>
  );
}

// Icône partage iOS inline
function ShareIcon() {
  return (
    <svg
      className="inline w-3.5 h-3.5 mx-0.5 align-text-bottom text-white/70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  );
}
