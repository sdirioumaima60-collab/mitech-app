import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  LayoutDashboard, 
  ListFilter, 
  FileText, 
  Users, 
  ShieldAlert, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Search, 
  Building2, 
  ArrowRight, 
  AlertTriangle,
  Smartphone,
  Check,
  Send,
  Eye,
  Camera,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { HseWebScreen, HseStatus, HseSeverity, HseCategory } from '../../types/index.ts';
import { ASSET_IMAGES } from '../../data/mockData.ts';

export const HseWebView: React.FC = () => {
  const { 
    hseReports, 
    activeHseWebScreen, 
    setActiveHseWebScreen, 
    selectedHseReportId, 
    setSelectedHseReportId,
    updateHseReport,
    resolveHseReport,
    simulate12hEscalation,
    createIdeaFromHseIncident,
    openRelatedIdea,
    currentUser,
    availableUsers,
    jumpToScreen
  } = useApp();

  // Search & Filters in table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Detail screen action form state
  const selectedReport = hseReports.find(r => r.id === selectedHseReportId) || (hseReports.length > 0 ? hseReports[0] : null);
  const [formStatus, setFormStatus] = useState<HseStatus>(selectedReport ? selectedReport.status : 'Nouveau');
  const [formAssignedTo, setFormAssignedTo] = useState(selectedReport ? selectedReport.assignedTo : '');
  const [formDueDate, setFormDueDate] = useState(selectedReport ? selectedReport.dueDate : '');
  const [formInternalNote, setFormInternalNote] = useState(selectedReport?.internalNote || '');
  const [formAction, setFormAction] = useState(selectedReport?.correctiveAction || '');

  // Keep form in sync when changing selected report
  React.useEffect(() => {
    if (selectedReport) {
      setFormStatus(selectedReport.status);
      setFormAssignedTo(selectedReport.assignedTo);
      setFormDueDate(selectedReport.dueDate);
      setFormInternalNote(selectedReport.internalNote || '');
      setFormAction(selectedReport.correctiveAction || '');
    }
  }, [selectedReport]);

  const handleSaveAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;
    updateHseReport(selectedReport.id, {
      status: formStatus,
      assignedTo: formAssignedTo,
      dueDate: formDueDate,
      internalNote: formInternalNote,
      correctiveAction: formAction,
    });
  };

  const handleQuickResolve = () => {
    if (!selectedReport) return;
    resolveHseReport(
      selectedReport.id, 
      formAction || 'Action corrective de mise en conformité exécutée et validée par le Responsable HSE.'
    );
    setFormStatus('Résolu');
  };

  // Filtered reports list
  const filteredReports = hseReports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  // KPI Calculations
  const totalReports = hseReports.length;
  const inProgressReports = hseReports.filter(r => r.status !== 'Résolu').length;
  const escalatedReports = hseReports.filter(r => r.status === 'Escaladé DG').length;
  const resolvedReports = hseReports.filter(r => r.status === 'Résolu').length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 100;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex flex-col md:flex-row">
      {/* SIDEBAR FIXED (Slides 6 & 7: "Menu latéral fixe donne accès à tout moment à chacun des écrans du back-office") */}
      <aside className="w-full md:w-64 bg-[#111827] text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">HSE Tag Admin</h2>
            <p className="text-[11px] text-slate-400">Back-office · Pilotage HSE</p>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-3 space-y-1 flex-1 text-xs font-medium">
          <button
            onClick={() => setActiveHseWebScreen('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeHseWebScreen === 'dashboard'
                ? 'bg-rose-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tableau de bord</span>
          </button>

          <button
            onClick={() => setActiveHseWebScreen('reports')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
              activeHseWebScreen === 'reports'
                ? 'bg-rose-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ListFilter className="w-4 h-4" />
              <span>Signalements</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
              {hseReports.length}
            </span>
          </button>

          <button
            onClick={() => setActiveHseWebScreen('detail')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
              activeHseWebScreen === 'detail'
                ? 'bg-rose-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Détail & Escalade</span>
            </span>
            {escalatedReports > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
                DG
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveHseWebScreen('users')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeHseWebScreen === 'users'
                ? 'bg-rose-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Utilisateurs & sites</span>
          </button>
        </nav>

        {/* 12h Escalation SLA Reminder Pill in Sidebar */}
        <div className="m-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1 text-slate-400">
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Règle SLA 12 Heures</span>
          </div>
          <p className="leading-tight text-slate-400 text-[10px]">
            Toute alerte non résolue sous 12h est transmise automatiquement à la Direction Générale.
          </p>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.role}</p>
          </div>
          <button
            onClick={() => jumpToScreen('hse-mobile')}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition"
            title="Tester l'application Mobile"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Back-office</span>
              <span>/</span>
              <span className="font-medium text-slate-800">Pilotage HSE</span>
              <span>/</span>
              <span className="text-rose-600 font-semibold uppercase">
                {activeHseWebScreen === 'dashboard' && 'Tableau de bord'}
                {activeHseWebScreen === 'reports' && 'Liste des signalements'}
                {activeHseWebScreen === 'detail' && `Fiche d'intervention ${selectedReport?.id || ''}`}
                {activeHseWebScreen === 'users' && 'Utilisateurs & Équipes'}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {activeHseWebScreen === 'dashboard' && 'Tableau de bord HSE'}
              {activeHseWebScreen === 'reports' && 'Registre des Signalements Terrain'}
              {activeHseWebScreen === 'detail' && (selectedReport ? `${selectedReport.id} — ${selectedReport.title}` : 'Aucun signalement')}
              {activeHseWebScreen === 'users' && 'Annuaire des Équipes & Rôles Usine'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveHseWebScreen('reports')}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs transition"
            >
              Tous les signalements ({hseReports.length})
            </button>
            <button
              onClick={() => jumpToScreen('kiosk')}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-2xs transition"
            >
              Borne Kiosk Atelier
            </button>
          </div>
        </div>

        {/* SCREEN 1: DASHBOARD (Slide 7: 4 KPI boxes + bar charts + pie chart + table) */}
        {activeHseWebScreen === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Total signalements</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900 font-mono">{totalReports}</span>
                  <span className="text-xs text-emerald-600 font-semibold">+12% ce mois</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">En cours de traitement</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-amber-600 font-mono">{inProgressReports}</span>
                  <span className="text-xs text-amber-700 font-medium">{escalatedReports} escaladé DG</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Taux de résolution</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900 font-mono">{resolutionRate}%</span>
                  <span className="text-xs text-emerald-600 font-semibold">Cible &gt; 80%</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Délai moyen résolution</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-rose-600 font-mono">2,3 j</span>
                  <span className="text-xs text-slate-500 font-mono">SLA 12h urgent</span>
                </div>
              </div>
            </div>

            {/* Charts & Breakdown Row (Slide 7) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart 1: Bar breakdown by category */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Signalements par catégorie de risque
                  </h3>
                  <span className="text-xs text-slate-400">Ateliers Mitech Tunisie</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="font-medium">Sécurité (Machines, coupes, câblages)</span>
                      <span className="font-mono font-semibold">48%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-rose-600 h-3 rounded-full" style={{ width: '48%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="font-medium">Environnement (Huiles, cuves, résidus)</span>
                      <span className="font-mono font-semibold">27%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-emerald-600 h-3 rounded-full" style={{ width: '27%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="font-medium">Hygiène (Poussières d'aspiration, masques)</span>
                      <span className="font-mono font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span className="font-medium">Non-conformité procédure</span>
                      <span className="font-mono font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-amber-500 h-3 rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 2: Répartition par gravité */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Répartition par gravité
                  </h3>
                  <span className="text-xs text-slate-400">Totalité</span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50 border border-rose-100">
                    <span className="text-xs font-bold text-rose-900">Critique (SLA 12h)</span>
                    <span className="font-mono font-bold text-rose-700">1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-100">
                    <span className="text-xs font-semibold text-amber-900">Élevée</span>
                    <span className="font-mono font-bold text-amber-700">2</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100">
                    <span className="text-xs font-medium text-blue-900">Moyenne</span>
                    <span className="font-mono font-bold text-blue-700">1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-xs font-medium text-slate-700">Faible</span>
                    <span className="font-mono font-bold text-slate-700">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent table preview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Activité récente sur les lignes</h3>
                <button
                  onClick={() => setActiveHseWebScreen('reports')}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Voir tous les signalements →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {hseReports.map(r => (
                  <div 
                    key={r.id} 
                    onClick={() => {
                      setSelectedHseReportId(r.id);
                      setActiveHseWebScreen('detail');
                    }}
                    className="p-3.5 hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900">{r.id}</span>
                      <span className="font-medium text-slate-800">{r.title}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{r.location}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        r.status === 'Escaladé DG'
                          ? 'bg-rose-100 text-rose-700 border border-rose-300 font-bold'
                          : r.status === 'Résolu'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{r.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: ALL REPORTS TABLE (Slide 7: "Signalements - Liste filtrable de tous les signalements") */}
        {activeHseWebScreen === 'reports' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Search and Filters bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher par mot-clé, ligne, déclarant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="Nouveau">Nouveau</option>
                  <option value="Assigné">Assigné</option>
                  <option value="Intervention en cours">Intervention en cours</option>
                  <option value="Escaladé DG">Escaladé DG</option>
                  <option value="Résolu">Résolu</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Toutes catégories</option>
                  <option value="Sécurité">Sécurité</option>
                  <option value="Environnement">Environnement</option>
                  <option value="Hygiène">Hygiène</option>
                  <option value="Non-conformité">Non-conformité</option>
                </select>
              </div>
            </div>

            {/* Full Data Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Titre & Lieu</th>
                      <th className="py-3 px-4">Catégorie</th>
                      <th className="py-3 px-4">Gravité</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4">Déclarant</th>
                      <th className="py-3 px-4">Échéance</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReports.map(r => (
                      <tr 
                        key={r.id} 
                        className={`hover:bg-rose-50/40 transition cursor-pointer ${
                          selectedHseReportId === r.id ? 'bg-rose-50/60 font-medium' : ''
                        }`}
                        onClick={() => {
                          setSelectedHseReportId(r.id);
                          setActiveHseWebScreen('detail');
                        }}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{r.title}</div>
                          <div className="text-[11px] text-slate-500">{r.location}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{r.category}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.severity === 'Critique' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                            r.severity === 'Élevée' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {r.severity}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            r.status === 'Escaladé DG'
                              ? 'bg-rose-600 text-white font-bold'
                              : r.status === 'Résolu'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{r.reporterName}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{r.dueDate}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHseReportId(r.id);
                              setActiveHseWebScreen('detail');
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-600 hover:text-white rounded text-[11px] font-semibold text-slate-700 transition"
                          >
                            Ouvrir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: DETAIL & ESCALATION (Slides 7 & 9: "Détail signalement - Règle délai 12h") */}
        {activeHseWebScreen === 'detail' && selectedReport && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* ESCALATION BANNER IF APPLICABLE (Slide 9 reproduction) */}
            {selectedReport.status === 'Escaladé DG' && (
              <div className="p-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-2xl shadow-md space-y-1.5 border-2 border-rose-400">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm tracking-wide">
                    <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
                    <span>⚠️ ESCALADÉ AU DIRECTEUR GÉNÉRAL</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                    Dépassement &gt; 12h
                  </span>
                </div>
                <p className="text-xs text-rose-100 leading-relaxed">
                  <strong>Règle d'escalade :</strong> au-delà de 12h sans résolution, l'alerte HSE est transmise automatiquement au Directeur Général (Raouf Mejri). Notification haute priorité transmise également à Afef Sdiri (Manager Qualité).
                </p>
              </div>
            )}

            {/* Interactive Simulation Helper */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Test de la règle d'escalade 12h :</strong> Simulez le dépassement du délai de 12h pour déclencher l'escalade DG, ou clôturez le ticket.
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedReport.status !== 'Escaladé DG' && (
                  <button
                    onClick={() => simulate12hEscalation(selectedReport.id)}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs shadow-xs transition"
                  >
                    Déclencher l'escalade 12h (DG)
                  </button>
                )}
                {selectedReport.status !== 'Résolu' && (
                  <button
                    onClick={handleQuickResolve}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Clôturer conforme
                  </button>
                )}
              </div>
            </div>

            {/* Grid 2 Columns: Report Card & Action Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Description & Logs */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="font-mono text-sm font-bold text-slate-900">{selectedReport.id}</span>
                      <h2 className="text-lg font-bold text-slate-900">{selectedReport.title}</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Signalé le {selectedReport.reportedAt} par {selectedReport.reporterName} ({selectedReport.reporterRole})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 bg-slate-100 rounded-md font-semibold text-slate-700">
                        {selectedReport.category}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                        selectedReport.severity === 'Critique'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedReport.severity}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Description du danger constaté
                    </h3>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      {selectedReport.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block">Localisation :</span>
                      <span className="font-semibold text-slate-800">{selectedReport.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Déclarant :</span>
                      <span className="font-semibold text-slate-800">{selectedReport.reporterName} (Matricule: {selectedReport.reporterMatricule})</span>
                    </div>
                  </div>

                  {/* Image Attachment */}
                  {selectedReport.imageUrl && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Preuve photo de l'incident :
                      </span>
                      <div className="rounded-xl overflow-hidden border border-slate-300 max-w-md">
                        <img
                          src={selectedReport.imageUrl}
                          alt="Incident terrain HSE"
                          className="w-full h-48 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Audit & Escalation Logs (Slide 9: "Historique") */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600" />
                    <span>Historique & Traçabilité SLA</span>
                  </h3>

                  <div className="space-y-3 pt-2">
                    {selectedReport.escalationLogs.map(log => (
                      <div 
                        key={log.id} 
                        className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                          log.level === 'escalation'
                            ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                            : log.level === 'success'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {log.level === 'escalation' && <AlertOctagon className="w-4 h-4 text-rose-600" />}
                          {log.level === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          {log.level === 'info' && <Clock className="w-4 h-4 text-slate-500" />}
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[11px] text-slate-500 font-semibold">{log.timestamp}</span>
                          <p>{log.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Action Corrective & Escalation Rule Box (Slide 9) */}
              <div className="space-y-6">
                {/* Formulaire Action Corrective */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Action corrective</h3>

                  <form onSubmit={handleSaveAction} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Statut</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as HseStatus)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-rose-500 font-medium"
                      >
                        <option value="Nouveau">Nouveau</option>
                        <option value="Assigné">Assigné</option>
                        <option value="Intervention en cours">Intervention en cours</option>
                        <option value="Escaladé DG">Escaladé DG</option>
                        <option value="Résolu">Résolu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Assigné à</label>
                      <input
                        type="text"
                        value={formAssignedTo}
                        onChange={(e) => setFormAssignedTo(e.target.value)}
                        placeholder="Ex: Équipe maintenance électrique"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Échéance</label>
                      <input
                        type="text"
                        value={formDueDate}
                        onChange={(e) => setFormDueDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-rose-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Note interne de suivi</label>
                      <textarea
                        rows={2}
                        value={formInternalNote}
                        onChange={(e) => setFormInternalNote(e.target.value)}
                        placeholder="Ajouter une note de suivi technique..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Détail de l'action corrective</label>
                      <textarea
                        rows={2}
                        value={formAction}
                        onChange={(e) => setFormAction(e.target.value)}
                        placeholder="Mesures prises pour corriger le risque..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#9E1B32] hover:bg-[#831427] text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Enregistrer les modifications
                    </button>
                  </form>
                </div>

                {/* LIAISON DIRECTE IDEA BOX */}
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-indigo-600" />
                      Liaison Idea Box (Amélioration)
                    </span>
                    {selectedReport.relatedIdeaId && (
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded text-[11px]">
                        {selectedReport.relatedIdeaId}
                      </span>
                    )}
                  </div>
                  <p className="text-indigo-900 text-[11px] leading-relaxed">
                    {selectedReport.relatedIdeaId 
                      ? 'Une idée d\'amélioration continue a été générée pour pérenniser la sécurité sur ce poste.'
                      : 'Transformez ce problème en opportunité : soumettez une idée préventive liée directement à cet incident.'}
                  </p>
                  {selectedReport.relatedIdeaId ? (
                    <button
                      type="button"
                      onClick={() => openRelatedIdea(selectedReport.relatedIdeaId!)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-xs text-xs"
                    >
                      <span>Consulter l'idée {selectedReport.relatedIdeaId}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => createIdeaFromHseIncident(selectedReport.id)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-xs text-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Créer une idée préventive liée</span>
                    </button>
                  )}
                </div>

                {/* Règle d'escalade Card (Slide 9) */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Règle d'escalade Mitech
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Délai de résolution :</strong> 12h max dès déclaration.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Send className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Notification initiale :</strong> Responsable HSE et Manager Qualité en copie.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span><strong>Escalade après délai :</strong> Direction Générale (Raouf Mejri).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: USERS & SITES (Slide 7: "Utilisateurs & sites - Gestion des comptes et des rôles") */}
        {activeHseWebScreen === 'users' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Utilisateurs & Rôles enregistrés</h3>
                  <p className="text-xs text-slate-500">Comptes habilités pour le pilotage HSE et le terrain</p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-600">
                  {availableUsers.length} collaborateurs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Utilisateur</th>
                      <th className="py-3 px-4">Rôle</th>
                      <th className="py-3 px-4">Matricule</th>
                      <th className="py-3 px-4">Site / Affectation</th>
                      <th className="py-3 px-4">Département</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {availableUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.role === 'Responsable HSE' ? 'bg-rose-100 text-rose-800' :
                            u.role === 'Directeur Général' ? 'bg-purple-100 text-purple-800 font-bold' :
                            u.role === 'Manager Qualité' ? 'bg-blue-100 text-blue-800 font-bold' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-700">{u.matricule}</td>
                        <td className="py-3 px-4 text-slate-600">{u.site}</td>
                        <td className="py-3 px-4 text-slate-600">{u.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
