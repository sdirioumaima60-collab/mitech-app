import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  ShieldAlert, 
  Lightbulb, 
  LayoutGrid, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  Store,
  Layers,
  ArrowRightLeft,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Palette
} from 'lucide-react';
import { NavigationMode, AppTheme } from '../types/index.ts';

export const TopNav: React.FC = () => {
  const { 
    currentMode, 
    setMode, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    currentUser, 
    setCurrentUser, 
    availableUsers,
    hseReports,
    ideas,
    resetToZero,
    loadDemoData,
    appTheme,
    setAppTheme
  } = useApp();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const escalatedCount = hseReports.filter(r => r.status === 'Escaladé DG').length;
  const isDark = appTheme === 'dark';

  // Dynamic theme styling
  const getThemeClasses = () => {
    switch (appTheme) {
      case 'emerald':
        return {
          brandText: 'text-emerald-700',
          activeBg: 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs',
          headerBg: 'bg-white border-slate-200 text-slate-900',
          subBarBg: 'border-slate-100 bg-slate-50/70',
          accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          btnPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          itemInactive: 'bg-slate-100/90 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900',
        };
      case 'navy':
        return {
          brandText: 'text-blue-600',
          activeBg: 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs',
          headerBg: 'bg-white border-slate-200 text-slate-900',
          subBarBg: 'border-slate-100 bg-slate-50/70',
          accentBadge: 'bg-blue-50 text-blue-700 border-blue-200',
          btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white',
          itemInactive: 'bg-slate-100/90 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900',
        };
      case 'ruby':
        return {
          brandText: 'text-[#9E1B32]',
          activeBg: 'bg-[#9E1B32] text-white border-[#9E1B32] font-bold shadow-xs',
          headerBg: 'bg-white border-slate-200 text-slate-900',
          subBarBg: 'border-slate-100 bg-slate-50/70',
          accentBadge: 'bg-rose-50 text-[#9E1B32] border-rose-200',
          btnPrimary: 'bg-[#9E1B32] hover:bg-[#831427] text-white',
          itemInactive: 'bg-slate-100/90 text-slate-700 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900',
        };
      case 'dark':
      default:
        return {
          brandText: 'text-emerald-400',
          activeBg: 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-xs',
          headerBg: 'bg-[#0f172a] border-slate-800 text-white',
          subBarBg: 'border-slate-800/80 bg-slate-900/60',
          accentBadge: 'bg-slate-800 text-emerald-400 border-slate-700',
          btnPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          itemInactive: 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white',
        };
    }
  };

  const themeClasses = getThemeClasses();

  const themeOptions: { id: AppTheme; label: string; dot: string }[] = [
    { id: 'emerald', label: 'Vert Émeraude', dot: 'bg-emerald-500' },
    { id: 'navy', label: 'Bleu Tech', dot: 'bg-blue-600' },
    { id: 'ruby', label: 'Rouge Rubis', dot: 'bg-[#9E1B32]' },
    { id: 'dark', label: 'Sombre Pro', dot: 'bg-slate-900 border border-slate-700' },
  ];

  const navItems: { mode: NavigationMode; label: string; icon: React.ReactNode }[] = [
    {
      mode: 'portal',
      label: 'Portail Unifié',
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
    },
    {
      mode: 'hse-web',
      label: 'HSE Tag · Web',
      icon: <Monitor className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      mode: 'hse-mobile',
      label: 'HSE Tag · Mobile',
      icon: <Smartphone className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      mode: 'idea-web',
      label: 'Idea Box · Web',
      icon: <Monitor className="w-3.5 h-3.5 text-indigo-500" />,
    },
    {
      mode: 'idea-mobile',
      label: 'Idea Box · Mobile',
      icon: <Smartphone className="w-3.5 h-3.5 text-indigo-500" />,
    },
    {
      mode: 'kiosk',
      label: 'Borne Atelier',
      icon: <Store className="w-3.5 h-3.5 text-amber-500" />,
    },
  ];

  return (
    <header className={`sticky top-0 z-40 border-b shadow-xs transition-colors select-none ${themeClasses.headerBg}`}>
      {/* Brand & Context Bar */}
      <div className={`flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-14 py-2 border-b text-xs ${themeClasses.subBarBg}`}>
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setMode('portal')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`font-black tracking-tight text-sm sm:text-base ${
              isDark ? 'text-white' : 'text-slate-900 group-hover:text-emerald-700'
            }`}>
              Mitech Tunisie
            </span>
          </div>

          <span className={`hidden sm:inline-block ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>|</span>

          {/* Quick 0 / Clean Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className={`px-2 py-0.5 rounded-full font-mono font-semibold ${
              hseReports.length === 0 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
            }`}>
              {hseReports.length} {hseReports.length <= 1 ? 'incident' : 'incidents'}
            </span>
            <span className={`px-2 py-0.5 rounded-full font-mono font-semibold ${
              ideas.length === 0 
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                : isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
            }`}>
              {ideas.length} {ideas.length <= 1 ? 'idée' : 'idées'}
            </span>
          </div>
        </div>

        {/* Right Tools (SLA Badge, Theme, Reset, Share, Profile, Drawer) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* SLA Status Pill */}
          {escalatedCount > 0 ? (
            <div 
              onClick={() => setMode('hse-web')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-rose-50 border border-rose-300 text-[11px] text-rose-700 font-bold cursor-pointer hover:bg-rose-100 transition shadow-xs"
              title="Alerte avec dépassement SLA 12h"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
              <span>SLA 12h : {escalatedCount} Escalade DG</span>
            </div>
          ) : (
            <div 
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-semibold"
              title="Toutes les interventions sont sous contrôle (0 retard)"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>SLA 12h : 0 retard (Conforme)</span>
            </div>
          )}

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
              }`}
              title="Changer le thème et la couleur du design"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden lg:inline capitalize">{appTheme}</span>
            </button>

            {isThemeMenuOpen && (
              <div 
                className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 text-slate-900"
                onClick={() => setIsThemeMenuOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Changer le thème
                </div>
                {themeOptions.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setAppTheme(t.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-slate-50 transition ${
                      appTheme === t.id ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
                      <span>{t.label}</span>
                    </div>
                    {appTheme === t.id && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset to 0 Button */}
          <button
            onClick={resetToZero}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-700 border-slate-200'
            }`}
            title="Remettre tous les compteurs et données à 0"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span className="hidden md:inline">Remettre à 0</span>
          </button>

          {/* Load Sample Data Button if empty */}
          {(hseReports.length === 0 && ideas.length === 0) && (
            <button
              onClick={loadDemoData}
              className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                isDark 
                  ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-800' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
              title="Charger des données d'exemple pour démonstration"
            >
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>Exemples</span>
            </button>
          )}

          {/* User Profile Selector */}
          <div className={`hidden sm:flex items-center gap-1 rounded-lg px-2 py-0.5 border text-xs ${
            isDark 
              ? 'bg-slate-800 border-slate-700 text-slate-200' 
              : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
          }`}>
            <UserCheck className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <select
              value={currentUser.id}
              onChange={(e) => {
                const u = availableUsers.find(x => x.id === e.target.value);
                if (u) setCurrentUser(u);
              }}
              className={`bg-transparent text-[11px] font-medium focus:outline-none cursor-pointer ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {availableUsers.map(u => (
                <option key={u.id} value={u.id} className="bg-white text-slate-900">
                  {u.name} — {u.role}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Drawer Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition shadow-xs ${themeClasses.btnPrimary}`}
            title="Naviguer rapidement entre tous les écrans"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Écrans</span>
          </button>
        </div>
      </div>

      {/* Main Switcher Bandeau */}
      <div className={`flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-14 py-1.5 overflow-x-auto no-scrollbar ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode || 
              (item.mode === 'portal' && currentMode === 'overview') ||
              (item.mode === 'hse-web' && currentMode === 'hse') ||
              (item.mode === 'idea-web' && currentMode === 'idea');

            return (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
                  isActive 
                    ? themeClasses.activeBg
                    : themeClasses.itemInactive
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Interconnection badge */}
        <div className={`hidden xl:flex items-center gap-3 text-[11px] pl-4 border-l shrink-0 ${
          isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <ArrowRightLeft className="w-3 h-3 text-emerald-600" />
            <span>Liaison HSE ↔ Idea Box active</span>
          </span>
        </div>
      </div>
    </header>
  );
};
