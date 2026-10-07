import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  ShieldAlert, 
  Lightbulb, 
  Smartphone, 
  Monitor, 
  Store, 
  ArrowRight, 
  Clock, 
  AlertOctagon, 
  CheckCircle2, 
  ThumbsUp, 
  Users, 
  Link as LinkIcon, 
  Sparkles, 
  ChevronRight,
  Send,
  Building2,
  Plus,
  Palette,
  RotateCcw,
  Check,
  ShieldCheck,
  Flame,
  Globe
} from 'lucide-react';
import { AppTheme } from '../../types/index.ts';

export const PortalDashboard: React.FC = () => {
  const { 
    hseReports, 
    ideas, 
    jumpToScreen, 
    openRelatedHseReport, 
    openRelatedIdea,
    createIdeaFromHseIncident,
    resetToZero,
    loadDemoData,
    currentUser,
    appTheme,
    setAppTheme
  } = useApp();

  const isDark = appTheme === 'dark';
  const escalatedReport = hseReports.find(r => r.status === 'Escaladé DG');
  const totalVotes = ideas.reduce((acc, curr) => acc + curr.votesCount, 0);

  const themeBadges: { id: AppTheme; label: string; bg: string; dot: string }[] = [
    { id: 'emerald', label: 'Vert Émeraude (Mitech Pro)', bg: 'hover:border-emerald-500', dot: 'bg-emerald-500' },
    { id: 'navy', label: 'Bleu Tech (Industriel)', bg: 'hover:border-blue-500', dot: 'bg-blue-600' },
    { id: 'ruby', label: 'Rouge Rubis (Mitech Cuir)', bg: 'hover:border-[#9E1B32]', dot: 'bg-[#9E1B32]' },
    { id: 'dark', label: 'Sombre Pro (Dark OLED)', bg: 'hover:border-slate-500', dot: 'bg-slate-900 border border-slate-700' },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Real Operational Portal Welcome */}
      <div className={`w-full rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800'
          : appTheme === 'emerald'
          ? 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-emerald-900/60'
          : appTheme === 'navy'
          ? 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-blue-900/60'
          : 'bg-gradient-to-r from-slate-900 via-[#360811] to-slate-900 border-rose-950/60'
      }`}>
        <div className="space-y-2 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>MITECH TUNISIE · EXCELLENCE INDUSTRIELLE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Portail Opérationnel Unifié
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-3xl">
            Plateforme interactive intégrant le pilotage du signalement terrain 
            <strong className="text-rose-400 font-semibold"> HSE Tag</strong> (règle d'escalade 12h automatique vers la Direction Générale) 
            et la démarche d'amélioration continue 
            <strong className="text-purple-400 font-semibold"> Mitech Idea Box</strong> (accès direct sans mot de passe par matricule).
          </p>
        </div>

        {/* Quick Kiosk Launcher */}
        <div className="shrink-0 flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={() => jumpToScreen('kiosk')}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs shadow-lg transition"
          >
            <Store className="w-4 h-4 text-white" />
            <span>Borne Kiosk Atelier</span>
          </button>
        </div>
      </div>

      {/* THEME & DESIGN CUSTOMIZER + RESET BAR */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
            <Palette className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Personnalisation du Thème & Couleurs
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {themeBadges.map(t => (
                <button
                  key={t.id}
                  onClick={() => setAppTheme(t.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                    appTheme === t.id
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  } ${t.bg}`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.dot}`} />
                  <span>{t.label}</span>
                  {appTheme === t.id && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data State Toggle (Reset to 0 vs Load Sample Data) */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={resetToZero}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              hseReports.length === 0 && ideas.length === 0
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border-slate-200'
            }`}
            title="Remettre tous les compteurs et données à 0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Compteurs à 0 {hseReports.length === 0 && ideas.length === 0 ? '(Actif)' : ''}</span>
          </button>

          <button
            onClick={loadDemoData}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              hseReports.length > 0 || ideas.length > 0
                ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border-slate-200'
            }`}
            title="Charger des données pour simuler des escalades et votes"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Exemples de Démo</span>
          </button>
        </div>
      </div>

      {/* SLA 12H ESCALATION ACTIVE ALERT BANNER (If any incident > 12h) */}
      {escalatedReport ? (
        <div className="p-4 sm:p-5 bg-rose-50 border-2 border-rose-300 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-200/60 px-2 py-0.5 rounded uppercase">
                  Escalade Automatique DG Active
                </span>
                <span className="text-xs font-mono font-bold text-slate-900">{escalatedReport.id}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {escalatedReport.title} — {escalatedReport.location}
              </h3>
              <p className="text-xs text-rose-900 mt-0.5">
                Délai de résolution de 12h dépassé sans clôture conforme. Dossier transmis avec priorité haute au <strong>Directeur Général (Raouf Mejri)</strong> et Manager Qualité (Afef Sdiri).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => jumpToScreen('hse-web', 'detail', escalatedReport.id)}
              className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Traiter dans HSE Web</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ZERO RETARD / 100% CONFORME BANNER WHEN AT 0 */
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800' 
            : 'bg-emerald-50/70 border-emerald-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                  Indicateurs Conformes · Zéro Risque Critique
                </span>
              </div>
              <h3 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {hseReports.length === 0 
                  ? 'Compteurs à 0 : Aucun incident en cours à Mitech Tunisie' 
                  : `${hseReports.length} incident(s) sous surveillance continue (0 dépassement)`}
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-emerald-900'}`}>
                Règle SLA 12h opérationnelle. Tout signalement d'urgence est notifié instantanément à la hiérarchie.
              </p>
            </div>
          </div>

          <button
            onClick={() => jumpToScreen('hse-mobile', 'new-report')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Signalement HSE</span>
          </button>
        </div>
      )}

      {/* CORE 4 APPS MATRIX: Real Working Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Les 4 Interfaces Opérationnelles Connectées
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Basculez librement entre les versions mobiles de terrain et les back-offices web de gestion Mitech Tunisie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: HSE Mobile */}
          <div className={`rounded-2xl border-2 transition-all shadow-xs p-5 flex flex-col justify-between space-y-4 group ${
            isDark 
              ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/50' 
              : 'bg-white border-slate-200 hover:border-emerald-400'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Terrain Atelier
                </span>
              </div>
              <div>
                <h3 className={`font-bold text-base transition-colors ${
                  isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                }`}>
                  HSE Tag · Mobile
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Application terrain pour les opérateurs : signalement express avec photo, îlot de découpe et niveau de gravité.
                </p>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}>
                <span>Signalements actifs</span>
                <span className="font-mono font-bold text-emerald-600">{hseReports.length}</span>
              </div>
            </div>

            <button
              onClick={() => jumpToScreen('hse-mobile')}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <span>Ouvrir l'application Mobile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: HSE Web Admin */}
          <div className={`rounded-2xl border-2 transition-all shadow-xs p-5 flex flex-col justify-between space-y-4 group ${
            isDark 
              ? 'bg-slate-900 border-slate-800 hover:border-slate-600' 
              : 'bg-white border-slate-200 hover:border-slate-400'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Monitor className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Pilotage Web
                </span>
              </div>
              <div>
                <h3 className={`font-bold text-base transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  HSE Tag · Web Admin
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Back-office superviseur : tableau de bord, assignation maintenance, audit SLA 12h et clôture avec preuve.
                </p>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}>
                <span>Règle SLA active</span>
                <span className="font-mono font-bold text-rose-600">12 Heures max</span>
              </div>
            </div>

            <button
              onClick={() => jumpToScreen('hse-web')}
              className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <span>Accéder au Back-Office HSE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Idea Box Mobile */}
          <div className={`rounded-2xl border-2 transition-all shadow-xs p-5 flex flex-col justify-between space-y-4 group ${
            isDark 
              ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/50' 
              : 'bg-white border-slate-200 hover:border-indigo-300'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Sans mot de passe
                </span>
              </div>
              <div>
                <h3 className={`font-bold text-base transition-colors ${
                  isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-700'
                }`}>
                  Idea Box · Mobile
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Fil d'idées, votes et <strong>nouveauté dépôt par matricule</strong> pour les ouvriers sans boîte e-mail pro.
                </p>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}>
                <span>Participation</span>
                <span className="font-mono font-bold text-indigo-600">{totalVotes} votes</span>
              </div>
            </div>

            <button
              onClick={() => jumpToScreen('idea-mobile')}
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <span>Ouvrir Idea Box Mobile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Idea Box Web Admin */}
          <div className={`rounded-2xl border-2 transition-all shadow-xs p-5 flex flex-col justify-between space-y-4 group ${
            isDark 
              ? 'bg-slate-900 border-slate-800 hover:border-purple-500/50' 
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Monitor className="w-5 h-5 text-purple-700" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Comité Innovation
                </span>
              </div>
              <div>
                <h3 className={`font-bold text-base transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Idea Box · Web Admin
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Comité Lean & Qualité : évaluation des propositions, note d'impact, analyse de faisabilité et plans de déploiement.
                </p>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}>
                <span>Idées enregistrées</span>
                <span className="font-mono font-bold text-purple-700">{ideas.length}</span>
              </div>
            </div>

            <button
              onClick={() => jumpToScreen('idea-web')}
              className="w-full py-2.5 px-3 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <span>Accéder au Back-Office Innovation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* INTERCONNECTION HUB: Real Cross-Links Between HSE Tag & Idea Box */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-xs space-y-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <LinkIcon className="w-4 h-4" />
              <span>Liaison Dynamique & Synergie Usine Mitech Tunisie</span>
            </div>
            <h2 className={`text-lg sm:text-xl font-black mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Passerelles Directes entre Sécurité (HSE) & Amélioration (Idea Box)
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Tout incident HSE peut devenir une opportunité d'amélioration continue, et chaque idée ergonomique sécurise l'atelier.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => jumpToScreen('idea-mobile', 'new-idea')}
              className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-purple-600" />
              <span>Déposer une nouvelle idée</span>
            </button>
          </div>
        </div>

        {/* When counts are at 0: Clean Zero-State Presentation */}
        {hseReports.length === 0 && ideas.length === 0 ? (
          <div className="py-10 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Compteurs à 0 · Espace Prêt pour l'Atelier
              </h3>
              <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Toutes les données ont été remises à 0 comme demandé. Vous pouvez commencer à saisir les premiers signalements réels ou charger des exemples pour une démonstration.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => jumpToScreen('hse-mobile', 'new-report')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Déclarer un incident HSE</span>
              </button>

              <button
                onClick={() => jumpToScreen('idea-mobile', 'new-idea')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Déposer une idée</span>
              </button>

              <button
                onClick={loadDemoData}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition"
              >
                Charger données d'exemple
              </button>
            </div>
          </div>
        ) : (
          /* 2-Columns Connected Grid with active items */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column A: HSE Hazards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-rose-700">
                  <ShieldAlert className="w-4 h-4" /> Signalements HSE avec propositions associées
                </span>
                <button 
                  onClick={() => jumpToScreen('hse-web', 'reports')}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                >
                  Tous les signalements ({hseReports.length})
                </button>
              </div>

              <div className="space-y-2.5">
                {hseReports.slice(0, 3).map(rep => (
                  <div 
                    key={rep.id}
                    className={`p-3.5 rounded-2xl border transition space-y-2 ${
                      isDark 
                        ? 'bg-slate-800/80 border-slate-700' 
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{rep.id}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{rep.title}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rep.status === 'Escaladé DG' ? 'bg-rose-600 text-white' :
                        rep.status === 'Résolu' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{rep.description}</p>

                    <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                      isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200/60 text-slate-500'
                    }`}>
                      <span>{rep.location}</span>

                      <div className="flex items-center gap-2">
                        {rep.relatedIdeaId ? (
                          <button
                            onClick={() => openRelatedIdea(rep.relatedIdeaId!)}
                            className="px-2 py-0.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded font-semibold flex items-center gap-1 transition"
                          >
                            <LinkIcon className="w-3 h-3 text-purple-600" />
                            <span>Idée liée : {rep.relatedIdeaId}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => createIdeaFromHseIncident(rep.id)}
                            className="px-2 py-0.5 bg-white dark:bg-slate-700 hover:bg-purple-50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-600 rounded font-medium flex items-center gap-1 transition"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Proposer idée</span>
                          </button>
                        )}

                        <button
                          onClick={() => jumpToScreen('hse-web', 'detail', rep.id)}
                          className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded font-medium transition"
                        >
                          Inspecter
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column B: Recent Ideas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-purple-700">
                  <Lightbulb className="w-4 h-4" /> Idées d'amélioration & Impact Sécurité
                </span>
                <button 
                  onClick={() => jumpToScreen('idea-web', 'ideas')}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                >
                  Toutes les idées ({ideas.length})
                </button>
              </div>

              <div className="space-y-2.5">
                {ideas.slice(0, 3).map(idItem => (
                  <div 
                    key={idItem.id}
                    className={`p-3.5 rounded-2xl border transition space-y-2 ${
                      isDark 
                        ? 'bg-slate-800/80 border-slate-700' 
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{idItem.id}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{idItem.title}</span>
                      </div>
                      <span className="flex items-center gap-1 font-mono font-bold text-purple-700">
                        <ThumbsUp className="w-3 h-3" />
                        {idItem.votesCount}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{idItem.description}</p>

                    <div className={`pt-2 border-t flex items-center justify-between text-[11px] ${
                      isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200/60 text-slate-500'
                    }`}>
                      <span>Par {idItem.authorName} ({idItem.authorMatricule})</span>

                      <div className="flex items-center gap-2">
                        {idItem.relatedHseReportId ? (
                          <button
                            onClick={() => openRelatedHseReport(idItem.relatedHseReportId!)}
                            className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded font-semibold flex items-center gap-1 transition"
                          >
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            <span>Lié au danger {idItem.relatedHseReportId}</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 font-mono text-[10px]">
                            {idItem.category}
                          </span>
                        )}

                        <button
                          onClick={() => jumpToScreen('idea-web', 'detail', idItem.id)}
                          className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded font-medium transition"
                        >
                          Évaluer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
