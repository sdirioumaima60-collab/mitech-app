import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  ShieldAlert, 
  Plus, 
  Home, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  MapPin, 
  ArrowLeft, 
  Send, 
  User, 
  Lock, 
  ChevronRight,
  AlertOctagon,
  Layers,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { HseCategory, HseSeverity } from '../../types/index.ts';
import { ASSET_IMAGES } from '../../data/mockData.ts';

export const HseMobileView: React.FC = () => {
  const { 
    hseReports, 
    activeHseMobileScreen, 
    setActiveHseMobileScreen, 
    selectedHseReportId, 
    setSelectedHseReportId, 
    createHseReport,
    createIdeaFromHseIncident,
    openRelatedIdea,
    currentUser,
    setCurrentUser,
    availableUsers,
    jumpToScreen
  } = useApp();

  // New report form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<HseCategory>('Sécurité');
  const [newSeverity, setNewSeverity] = useState<HseSeverity>('Élevée');
  const [newLocation, setNewLocation] = useState('Atelier Découpe — Ligne 2');
  const [newDesc, setNewDesc] = useState('');
  const [withPhoto, setWithPhoto] = useState(true);

  // Selected report for detail screen
  const selectedReport = hseReports.find(r => r.id === selectedHseReportId) || hseReports[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;

    const report = createHseReport({
      title: newTitle || `${newCategory} : Incident ${newLocation}`,
      category: newCategory,
      severity: newSeverity,
      location: newLocation,
      description: newDesc,
      imageUrl: withPhoto ? ASSET_IMAGES.hseElectricalHazard : undefined,
    });

    setSelectedHseReportId(report.id);
    setActiveHseMobileScreen('detail');
    setNewTitle('');
    setNewDesc('');
  };

  // Severity color helpers
  const getSeverityBadge = (sev: HseSeverity) => {
    switch (sev) {
      case 'Critique': return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      case 'Élevée': return 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
      case 'Moyenne': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-6 px-4 bg-slate-900/10 flex flex-col items-center justify-center">
      {/* Device frame container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col h-[740px] relative">
        {/* Smartphone top status bar */}
        <div className="bg-slate-950 text-white px-6 py-2.5 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
          <div className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>MITECH HSE MOBILE</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>4G</span>
            <span>09:41</span>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="bg-[#9E1B32] text-white px-4 py-3 shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            {activeHseMobileScreen !== 'dashboard' && activeHseMobileScreen !== 'login' ? (
              <button
                onClick={() => setActiveHseMobileScreen('dashboard')}
                className="p-1 -ml-1 text-rose-200 hover:text-white"
                title="Retour au dashboard"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-200" />
            )}
            <div>
              <h1 className="font-bold text-sm leading-tight">
                {activeHseMobileScreen === 'login' && 'Connexion HSE Tag'}
                {activeHseMobileScreen === 'dashboard' && 'HSE Tag · Accueil'}
                {activeHseMobileScreen === 'new-report' && 'Nouveau Signalement'}
                {activeHseMobileScreen === 'history' && 'Mes Signalements'}
                {activeHseMobileScreen === 'detail' && `Alerte ${selectedReport?.id}`}
              </h1>
              <p className="text-[10px] text-rose-200">
                Mitech Tunisie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveHseMobileScreen('login')}
              className="text-[10px] bg-[#7A1224] hover:bg-[#600C1B] px-2 py-1 rounded text-rose-100 transition"
              title="Changer de compte utilisateur"
            >
              {currentUser.name.split(' ')[0]}
            </button>
          </div>
        </div>

        {/* SCREEN 1: LOGIN (Slide 5: Connexion) */}
        {activeHseMobileScreen === 'login' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-sm">
                <ShieldAlert className="w-9 h-9" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Application Terrain</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Signalement Hygiène, Sécurité & Environnement pour le personnel d'atelier.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-mail professionnel
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={currentUser.email}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    readOnly
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <button
                onClick={() => setActiveHseMobileScreen('dashboard')}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Se connecter
              </button>
            </div>

            {/* Quick Demo Switcher */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                Comptes de test prédéfinis :
              </span>
              <div className="grid grid-cols-2 gap-2">
                {availableUsers.slice(0, 4).map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUser(u);
                      setActiveHseMobileScreen('dashboard');
                    }}
                    className={`p-2 rounded-lg text-left border text-[11px] transition ${
                      currentUser.id === u.id
                        ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="truncate font-medium">{u.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{u.role}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: DASHBOARD (Slide 5: Tableau de bord) */}
        {activeHseMobileScreen === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Quick Greeting */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div>
                <p className="text-xs text-slate-500">Bienvenue sur le terrain,</p>
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-rose-700 font-medium">{currentUser.department}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Urgent SLA 12h Escalation Banner if any */}
            {hseReports.some(r => r.status === 'Escaladé DG') && (
              <div 
                onClick={() => {
                  const esc = hseReports.find(r => r.status === 'Escaladé DG');
                  if (esc) {
                    setSelectedHseReportId(esc.id);
                    setActiveHseMobileScreen('detail');
                  }
                }}
                className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl cursor-pointer hover:bg-rose-100/70 transition space-y-1.5 shadow-xs"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                  <AlertOctagon className="w-4 h-4 text-rose-600 animate-bounce" />
                  <span>ALERTE ESCALADÉE AU DIRECTEUR GÉNÉRAL</span>
                </div>
                <p className="text-[11px] text-rose-900">
                  Alerte #2451 : dépassement du délai de résolution de 12h sur Ligne 2 Découpe.
                </p>
                <span className="text-[10px] font-bold text-rose-700 underline block">
                  Consulter la fiche d'escalade →
                </span>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block">En cours</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {hseReports.filter(r => r.status !== 'Résolu').length}
                </span>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
                <span className="text-[10px] text-rose-800 font-medium block">Escaladé DG</span>
                <span className="text-lg font-black text-rose-700 font-mono">
                  {hseReports.filter(r => r.status === 'Escaladé DG').length}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-emerald-800 font-medium block">Résolus</span>
                <span className="text-lg font-black text-emerald-700 font-mono">
                  {hseReports.filter(r => r.status === 'Résolu').length}
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setActiveHseMobileScreen('new-report')}
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              Signaler un nouveau risque (SLA 12h)
            </button>

            {/* Recent reports list preview */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 px-1">
                <span>Signalements récents</span>
                <button
                  onClick={() => setActiveHseMobileScreen('history')}
                  className="text-rose-600 text-[11px] hover:underline"
                >
                  Voir tout ({hseReports.length})
                </button>
              </div>

              <div className="space-y-2">
                {hseReports.slice(0, 3).map(r => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setSelectedHseReportId(r.id);
                      setActiveHseMobileScreen('detail');
                    }}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 transition cursor-pointer flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-slate-900">{r.id}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border ${getSeverityBadge(r.severity)}`}>
                          {r.severity}
                        </span>
                        {r.status === 'Escaladé DG' && (
                          <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 rounded">
                            DG
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-800 truncate">{r.title}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-slate-400" />
                        <span className="truncate">{r.location}</span>
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: NEW REPORT (Slide 5: Nouveau signalement) */}
        {activeHseMobileScreen === 'new-report' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-[11px] text-rose-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Règle d'escalade :</strong> Résolution sous 12h. Notification immédiate Responsable HSE & Manager Qualité.
              </span>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Type de risque *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Sécurité', 'Hygiène', 'Environnement', 'Non-conformité'] as HseCategory[]).map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition ${
                        newCategory === cat
                          ? 'border-rose-600 bg-rose-600 text-white font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gravité estimée *
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['Faible', 'Moyenne', 'Élevée', 'Critique'] as HseSeverity[]).map(sev => (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setNewSeverity(sev)}
                      className={`py-1 rounded-md text-[11px] font-medium border transition ${
                        newSeverity === sev
                          ? sev === 'Critique'
                            ? 'bg-rose-600 text-white border-rose-700 font-bold'
                            : 'bg-amber-600 text-white border-amber-700 font-bold'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Localisation en atelier *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:border-rose-500 focus:outline-none"
                    placeholder="Ligne de production, îlot, machine..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titre synthétique
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-rose-500 focus:outline-none"
                  placeholder="Ex: Câble dénudé, fuite d'huile, garde-corps..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description précise du danger *
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:border-rose-500 focus:outline-none"
                  placeholder="Détaillez le danger pour l'intervention..."
                  required
                />
              </div>

              {/* Photo attachment toggle */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Camera className="w-4 h-4 text-rose-600" />
                  <span>Joindre photo preuve atelier</span>
                </div>
                <input
                  type="checkbox"
                  checked={withPhoto}
                  onChange={(e) => setWithPhoto(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Envoyer le signalement (Lancer 12h)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SCREEN 4: HISTORY (Slide 5: Historique) */}
        {activeHseMobileScreen === 'history' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-xs text-slate-500">
              Historique de tous les signalements enregistrés sur l'atelier :
            </div>

            <div className="space-y-2">
              {hseReports.map(r => (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedHseReportId(r.id);
                    setActiveHseMobileScreen('detail');
                  }}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 transition cursor-pointer space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">{r.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded border ${getSeverityBadge(r.severity)}`}>
                      {r.severity}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">{r.title}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="truncate max-w-[180px]">{r.location}</span>
                    <span className={`font-semibold ${
                      r.status === 'Escaladé DG'
                        ? 'text-rose-600'
                        : r.status === 'Résolu'
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 5: DETAIL (Slide 5: Détail & suivi) */}
        {activeHseMobileScreen === 'detail' && selectedReport && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Escalation alert banner if status is Escaladé DG */}
            {selectedReport.status === 'Escaladé DG' && (
              <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-1 text-xs text-rose-950">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span>Escaladé au Directeur Général</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Règle d'escalade : au-delà de 12h sans résolution, l'alerte a été transmise automatiquement au Directeur Général (Raouf Mejri).
                </p>
              </div>
            )}

            {/* Incident Summary Card */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">{selectedReport.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${getSeverityBadge(selectedReport.severity)}`}>
                  {selectedReport.severity}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900">{selectedReport.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedReport.description}</p>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                <div>
                  <span className="block text-slate-400">Localisation :</span>
                  <span className="font-semibold text-slate-800">{selectedReport.location}</span>
                </div>
                <div>
                  <span className="block text-slate-400">Assigné à :</span>
                  <span className="font-semibold text-slate-800">{selectedReport.assignedTo}</span>
                </div>
              </div>
            </div>

            {/* Photo proof */}
            {selectedReport.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={selectedReport.imageUrl}
                  alt="Preuve terrain HSE"
                  className="w-full h-36 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Corrective Action */}
            {selectedReport.correctiveAction && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                  Action Corrective Enregistrée
                </span>
                <p className="text-xs text-emerald-950 font-medium">
                  {selectedReport.correctiveAction}
                </p>
              </div>
            )}

            {/* Escalation Logs History */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold text-slate-700 block">
                Journal de traitement (SLA 12h) :
              </span>
              <div className="space-y-1.5">
                {selectedReport.escalationLogs.map(log => (
                  <div 
                    key={log.id}
                    className={`p-2 rounded-lg text-[10px] border leading-relaxed ${
                      log.level === 'escalation'
                        ? 'bg-rose-50 border-rose-200 text-rose-950 font-medium'
                        : log.level === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-mono text-slate-400 block">{log.timestamp}</span>
                    <span>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CROSS-LINK IDEA BOX ACTION */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                  Amélioration continue liée
                </span>
                {selectedReport.relatedIdeaId && (
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded text-[10px]">
                    {selectedReport.relatedIdeaId}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-indigo-900 leading-tight">
                {selectedReport.relatedIdeaId 
                  ? 'Une idée collaborative a été proposée pour fiabiliser ce poste.'
                  : 'Proposez une solution préventive dans Idea Box pour éviter la répétition de cet incident.'}
              </p>
              {selectedReport.relatedIdeaId ? (
                <button
                  onClick={() => openRelatedIdea(selectedReport.relatedIdeaId!)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1"
                >
                  <span>Voir l'idée {selectedReport.relatedIdeaId} (Idea Box)</span>
                </button>
              ) : (
                <button
                  onClick={() => createIdeaFromHseIncident(selectedReport.id)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Proposer une idée Idea Box liée</span>
                </button>
              )}
            </div>

            {/* Link to view in Web Back-office */}
            <div className="pt-2 text-center flex items-center justify-center gap-3 text-xs">
              <button
                onClick={() => jumpToScreen('hse-web', 'detail', selectedReport.id)}
                className="text-[#9E1B32] hover:underline font-semibold"
              >
                Ouvrir sur le Web Superviseur →
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR (Slide 5: barre basse et bouton central « + ») */}
        <div className="bg-white border-t border-slate-200 px-4 py-2 shrink-0 flex items-center justify-between select-none shadow-md">
          <button
            onClick={() => setActiveHseMobileScreen('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              activeHseMobileScreen === 'dashboard' ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </button>

          <button
            onClick={() => setActiveHseMobileScreen('history')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              activeHseMobileScreen === 'history' ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Historique</span>
          </button>

          {/* Central "+" Action Button */}
          <button
            onClick={() => setActiveHseMobileScreen('new-report')}
            className="w-12 h-12 -mt-6 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg hover:shadow-rose-600/30 transition transform active:scale-95 border-2 border-white"
            title="Nouveau signalement"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              if (selectedReport) setActiveHseMobileScreen('detail');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              activeHseMobileScreen === 'detail' ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Suivi</span>
          </button>

          <button
            onClick={() => jumpToScreen('hse-web')}
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-700"
            title="Basculer sur la version Web Superviseur"
          >
            <Layers className="w-4 h-4" />
            <span>Web</span>
          </button>
        </div>
      </div>
    </div>
  );
};
