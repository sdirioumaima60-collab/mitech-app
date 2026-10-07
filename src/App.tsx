import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { TopNav } from './components/TopNav.tsx';
import { ScreensDrawer } from './components/ScreensDrawer.tsx';
import { PortalDashboard } from './components/portal/PortalDashboard.tsx';
import { StandKioskView } from './components/kiosk/StandKioskView.tsx';
import { HseMobileView } from './components/hse/HseMobileView.tsx';
import { HseWebView } from './components/hse/HseWebView.tsx';
import { IdeaMobileView } from './components/idea/IdeaMobileView.tsx';
import { IdeaWebView } from './components/idea/IdeaWebView.tsx';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentMode, toastMessage, appTheme } = useApp();
  const isDark = appTheme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col selection:bg-emerald-600 selection:text-white transition-colors ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Banner & Switcher (Exact replica of Mitech_Maquette_HSE-Tag_IdeaBox_2.html bar) */}
      <TopNav />

      {/* Main Working Application Interface */}
      <div className="flex-1">
        {(currentMode === 'portal' || currentMode === 'overview') && <PortalDashboard />}
        {currentMode === 'kiosk' && <StandKioskView />}
        {currentMode === 'hse-mobile' && <HseMobileView />}
        {(currentMode === 'hse-web' || currentMode === 'hse') && <HseWebView />}
        {currentMode === 'idea-mobile' && <IdeaMobileView />}
        {(currentMode === 'idea-web' || currentMode === 'idea') && <IdeaWebView />}
      </div>

      {/* Slide 5/7/15 Quick Jump Drawer */}
      <ScreensDrawer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-semibold ${
            toastMessage.type === 'alert'
              ? 'bg-rose-600 text-white border-rose-700'
              : toastMessage.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-700'
              : 'bg-slate-900 text-white border-slate-800'
          }`}>
            {toastMessage.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-200 shrink-0" />}
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-300 shrink-0" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Standard Quiet Footer */}
      <footer className={`border-t py-4 px-6 sm:px-12 text-xs transition-colors ${
        isDark ? 'border-slate-800 bg-[#0f172a] text-slate-400' : 'border-slate-200 bg-white text-slate-500'
      }`}>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Mitech Tunisie</span>
            <span className="text-slate-400">·</span>
            <span>HSE Tag & Idea Box</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Amélioration continue & Sécurité atelier</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
