import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  LayoutDashboard, 
  Lightbulb, 
  FileText, 
  FolderKanban, 
  ThumbsUp, 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  Clock, 
  Star, 
  TrendingUp, 
  Send, 
  UserCheck, 
  Smartphone, 
  Check, 
  X,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { IdeaWebScreen, IdeaStatus, IdeaFeasibility } from '../../types/index.ts';
import { IDEA_CATEGORIES } from '../../data/mockData.ts';

export const IdeaWebView: React.FC = () => {
  const { 
    ideas, 
    activeIdeaWebScreen, 
    setActiveIdeaWebScreen, 
    selectedIdeaId, 
    setSelectedIdeaId,
    evaluateIdea,
    openRelatedHseReport,
    currentUser,
    jumpToScreen
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const selectedIdea = ideas.find(i => i.id === selectedIdeaId) || (ideas.length > 0 ? ideas[0] : null);

  // Evaluation form state
  const [evalStatus, setEvalStatus] = useState<IdeaStatus>(selectedIdea ? selectedIdea.status : 'En attente');
  const [evalScore, setEvalScore] = useState<number>(selectedIdea?.score || 4.5);
  const [evalFeasibility, setEvalFeasibility] = useState<IdeaFeasibility>(selectedIdea?.feasibility || 'Facile');
  const [evalNote, setEvalNote] = useState<string>(selectedIdea?.evaluationNote || '');
  const [evalActionPlan, setEvalActionPlan] = useState<string>(selectedIdea?.actionPlan || '');

  React.useEffect(() => {
    if (selectedIdea) {
      setEvalStatus(selectedIdea.status);
      setEvalScore(selectedIdea.score || 4.5);
      setEvalFeasibility(selectedIdea.feasibility || 'Facile');
      setEvalNote(selectedIdea.evaluationNote || '');
      setEvalActionPlan(selectedIdea.actionPlan || '');
    }
  }, [selectedIdea]);

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdea) return;
    evaluateIdea(
      selectedIdea.id,
      evalStatus,
      evalScore,
      evalFeasibility,
      evalNote,
      evalActionPlan
    );
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.authorMatricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || idea.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || idea.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  const totalVotes = ideas.reduce((acc, curr) => acc + curr.votesCount, 0);
  const acceptedCount = ideas.filter(i => i.status === 'Acceptée' || i.status === 'Déployée').length;
  const acceptanceRate = Math.round((acceptedCount / ideas.length) * 100);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 flex flex-col md:flex-row">
      {/* SIDEBAR FIXED (Slide 12: Menu latéral fixe donne accès au tableau de bord, liste des idées, détail & évaluation, catégories) */}
      <aside className="w-full md:w-64 bg-[#111827] text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">Idea Box Admin</h2>
            <p className="text-[11px] text-slate-400">Back-office · Gestion des idées</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 flex-1 text-xs font-medium">
          <button
            onClick={() => setActiveIdeaWebScreen('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeIdeaWebScreen === 'dashboard'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Tableau de bord</span>
          </button>

          <button
            onClick={() => setActiveIdeaWebScreen('ideas')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
              activeIdeaWebScreen === 'ideas'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4" />
              <span>Liste des idées</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {ideas.length}
            </span>
          </button>

          <button
            onClick={() => setActiveIdeaWebScreen('detail')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
              activeIdeaWebScreen === 'detail'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Détail & Évaluation</span>
            </span>
            <span className="text-[10px] text-purple-300 font-mono">
              {selectedIdea?.id || ''}
            </span>
          </button>

          <button
            onClick={() => setActiveIdeaWebScreen('categories')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition ${
              activeIdeaWebScreen === 'categories'
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Catégories thématiques</span>
          </button>
        </nav>

        {/* Innovation Notice */}
        <div className="m-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1 text-slate-400">
          <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pôle Lean & Innovation</span>
          </div>
          <p className="leading-tight text-slate-400 text-[10px]">
            Toutes les propositions avec matricule ouvrier sont soumises à double évaluation qualité et faisabilité.
          </p>
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs">
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.role}</p>
          </div>
          <button
            onClick={() => jumpToScreen('idea-mobile')}
            className="p-1.5 text-slate-400 hover:text-purple-400 transition"
            title="Tester l'application Mobile Idea Box"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {/* Top Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Back-office</span>
              <span>/</span>
              <span className="font-medium text-slate-800">Gestion des idées</span>
              <span>/</span>
              <span className="text-purple-600 font-semibold uppercase">
                {activeIdeaWebScreen === 'dashboard' && 'Tableau de bord'}
                {activeIdeaWebScreen === 'ideas' && 'Toutes les propositions'}
                {activeIdeaWebScreen === 'detail' && `Évaluation ${selectedIdea?.id || ''}`}
                {activeIdeaWebScreen === 'categories' && 'Thématiques'}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {activeIdeaWebScreen === 'dashboard' && 'Tableau de bord Innovation Mitech'}
              {activeIdeaWebScreen === 'ideas' && 'Registre des Idées d\'Amélioration Continue'}
              {activeIdeaWebScreen === 'detail' && (selectedIdea ? `${selectedIdea.id} — ${selectedIdea.title}` : 'Aucune idée enregistrée')}
              {activeIdeaWebScreen === 'categories' && 'Organisation Thématique des Idées'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveIdeaWebScreen('ideas')}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs transition"
            >
              Idées ({ideas.length})
            </button>
            <button
              onClick={() => jumpToScreen('idea-mobile', 'matricule-quick')}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
            >
              <span>Accès Matricule</span>
            </button>
          </div>
        </div>

        {/* SCREEN 1: DASHBOARD (Slide 14: 128 idées, 23 en cours, 34%, 76%, bar charts, pie chart) */}
        {activeIdeaWebScreen === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Idées soumises</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900 font-mono">128</span>
                  <span className="text-xs text-emerald-600 font-semibold">+18% ce trimestre</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Votes collaborateurs</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-purple-600 font-mono">{totalVotes}</span>
                  <span className="text-xs text-purple-700 font-medium">Forte participation</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Taux d'acceptation</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-slate-900 font-mono">{acceptanceRate}%</span>
                  <span className="text-xs text-slate-500">Sélection exigeante</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs text-slate-500 font-medium">Taux de déploiement</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-emerald-600 font-mono">76%</span>
                  <span className="text-xs text-emerald-700 font-semibold">Réalisées en atelier</span>
                </div>
              </div>
            </div>

            {/* Charts & Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Breakdown */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Idées par catégorie d'amélioration
                  </h3>
                  <span className="text-xs text-slate-400">Totalité des propositions</span>
                </div>

                <div className="space-y-3 pt-2">
                  {IDEA_CATEGORIES.map(cat => (
                    <div key={cat.id}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span className="font-medium">{cat.name}</span>
                        <span className="font-mono font-semibold">{cat.count} idées</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (cat.count / 45) * 100)}%`, backgroundColor: cat.color }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Contributors / Matricules */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Top contributeurs atelier</h3>
                  <span className="text-xs text-slate-400">Par matricule</span>
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50 border border-purple-100">
                    <div>
                      <div className="font-bold text-slate-900">Ahmed Ben Salem</div>
                      <div className="text-[11px] font-mono text-purple-700">MT-2048 · Découpe Ligne 2</div>
                    </div>
                    <span className="font-bold text-purple-900 font-mono">5 idées</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Sonia Lemmari</div>
                      <div className="text-[11px] font-mono text-slate-500">MT-0842 · HSE</div>
                    </div>
                    <span className="font-bold text-slate-800 font-mono">4 idées</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Sami Trabelsi</div>
                      <div className="text-[11px] font-mono text-slate-500">MT-1105 · Refente</div>
                    </div>
                    <span className="font-bold text-slate-800 font-mono">3 idées</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900">Mounir Khadhraoui</div>
                      <div className="text-[11px] font-mono text-slate-500">MT-3320 · Contrôle</div>
                    </div>
                    <span className="font-bold text-slate-800 font-mono">3 idées</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent table preview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Dernières idées déposées</h3>
                <button
                  onClick={() => setActiveIdeaWebScreen('ideas')}
                  className="text-xs font-semibold text-purple-600 hover:underline"
                >
                  Voir toute la liste ({ideas.length}) →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {ideas.map(i => (
                  <div 
                    key={i.id}
                    onClick={() => {
                      setSelectedIdeaId(i.id);
                      setActiveIdeaWebScreen('detail');
                    }}
                    className="p-3.5 hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-900">{i.id}</span>
                      <span className="font-medium text-slate-800">{i.title}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{i.category}</span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="flex items-center gap-1 text-slate-600 font-semibold">
                        <ThumbsUp className="w-3 h-3 text-purple-600" />
                        <span>{i.votesCount}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        i.status === 'Acceptée' ? 'bg-emerald-100 text-emerald-800' :
                        i.status === 'Déployée' ? 'bg-blue-100 text-blue-800' :
                        i.status === 'En étude' ? 'bg-purple-100 text-purple-800' :
                        i.status === 'Refusée' ? 'bg-rose-100 text-rose-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {i.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: ALL IDEAS TABLE (Slide 14) */}
        {activeIdeaWebScreen === 'ideas' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher par idée, matricule, auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En attente">En attente</option>
                  <option value="En étude">En étude</option>
                  <option value="Acceptée">Acceptée</option>
                  <option value="Déployée">Déployée</option>
                  <option value="Refusée">Refusée</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none"
                >
                  <option value="all">Toutes catégories</option>
                  {IDEA_CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Titre de la proposition</th>
                      <th className="py-3 px-4">Catégorie</th>
                      <th className="py-3 px-4">Auteur / Matricule</th>
                      <th className="py-3 px-4">Votes</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredIdeas.map(i => (
                      <tr
                        key={i.id}
                        className={`hover:bg-purple-50/40 transition cursor-pointer ${
                          selectedIdeaId === i.id ? 'bg-purple-50/60 font-medium' : ''
                        }`}
                        onClick={() => {
                          setSelectedIdeaId(i.id);
                          setActiveIdeaWebScreen('detail');
                        }}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{i.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{i.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{i.description}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{i.category}</td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-medium">{i.authorName}</div>
                          <div className="text-[10px] font-mono text-purple-700 font-semibold">{i.authorMatricule}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-purple-700">{i.votesCount}</td>
                        <td className="py-3.5 px-4">
                          {i.score ? (
                            <span className="font-mono font-bold text-slate-800 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {i.score}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            i.status === 'Acceptée' ? 'bg-emerald-100 text-emerald-800' :
                            i.status === 'Déployée' ? 'bg-blue-100 text-blue-800' :
                            i.status === 'En étude' ? 'bg-purple-100 text-purple-800' :
                            i.status === 'Refusée' ? 'bg-rose-100 text-rose-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {i.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIdeaId(i.id);
                              setActiveIdeaWebScreen('detail');
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-600 hover:text-white rounded text-[11px] font-semibold text-slate-700 transition"
                          >
                            Évaluer
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

        {/* SCREEN 3: DETAIL & ÉVALUATION (Slide 14) */}
        {activeIdeaWebScreen === 'detail' && selectedIdea && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Idea overview & Discussion */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="font-mono text-sm font-bold text-slate-900">{selectedIdea.id}</span>
                      <h2 className="text-lg font-bold text-slate-900">{selectedIdea.title}</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Déposée le {selectedIdea.submittedAt} par <strong>{selectedIdea.authorName}</strong> (Matricule: {selectedIdea.authorMatricule})
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold">
                      {selectedIdea.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Description de la proposition
                    </h3>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                      {selectedIdea.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-purple-700">
                      <ThumbsUp className="w-4 h-4" /> {selectedIdea.votesCount} votes favorables
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MessageSquare className="w-4 h-4" /> {selectedIdea.comments.length} commentaires
                    </span>
                  </div>
                </div>

                {/* Comments & Peer Feedbacks */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Avis et retours des collaborateurs atelier ({selectedIdea.comments.length})
                  </h3>

                  {selectedIdea.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Aucun commentaire pour l'instant.</p>
                  ) : (
                    <div className="space-y-2.5 pt-1">
                      {selectedIdea.comments.map(c => (
                        <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between font-semibold text-slate-800">
                            <span>{c.authorName} {c.matricule && `(${c.matricule})`}</span>
                            <span className="font-mono text-[10px] text-slate-400">{c.date}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{c.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Evaluation Panel (Slide 14: Évaluer l'idée) */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">
                      Évaluation par l'équipe Innovation
                    </h3>
                    <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">
                      Comité Lean
                    </span>
                  </div>

                  <form onSubmit={handleSaveEvaluation} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Décision / Statut *
                      </label>
                      <select
                        value={evalStatus}
                        onChange={(e) => setEvalStatus(e.target.value as IdeaStatus)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-500 font-medium"
                      >
                        <option value="En attente">En attente d'arbitrage</option>
                        <option value="En étude">En cours d'étude technique</option>
                        <option value="Acceptée">Acceptée pour déploiement</option>
                        <option value="Déployée">Déployée en atelier</option>
                        <option value="Refusée">Refusée (Non faisable)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Faisabilité technique
                      </label>
                      <select
                        value={evalFeasibility}
                        onChange={(e) => setEvalFeasibility(e.target.value as IdeaFeasibility)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Facile">Facile (Mise en œuvre immédiate)</option>
                        <option value="Moyen">Moyen (Nécessite outillage / adaptation)</option>
                        <option value="Complexe">Complexe (Investissement / validation groupe)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Note d'impact global (1 à 5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={evalScore}
                        onChange={(e) => setEvalScore(parseFloat(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-500 font-mono font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Note / Retour pour l'auteur (Transmis à l'employé) *
                      </label>
                      <textarea
                        rows={3}
                        value={evalNote}
                        onChange={(e) => setEvalNote(e.target.value)}
                        placeholder="Ex: Excellente idée retenue pour la ligne de découpe..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Plan d'action & mise en œuvre
                      </label>
                      <textarea
                        rows={2}
                        value={evalActionPlan}
                        onChange={(e) => setEvalActionPlan(e.target.value)}
                        placeholder="Étapes de déploiement en atelier..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Enregistrer l'évaluation
                    </button>
                  </form>
                </div>

                {/* LIAISON DIRECTE HSE TAG */}
                {selectedIdea.relatedHseReportId && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        Liaison Incident Sécurité (HSE Tag)
                      </span>
                      <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded text-[11px]">
                        {selectedIdea.relatedHseReportId}
                      </span>
                    </div>
                    <p className="text-rose-900 text-[11px] leading-relaxed">
                      Cette idée d'amélioration découle directement du danger signalé sur l'atelier ({selectedIdea.relatedHseReportId}). Elle permet de prévenir le risque à la source.
                    </p>
                    <button
                      type="button"
                      onClick={() => openRelatedHseReport(selectedIdea.relatedHseReportId!)}
                      className="w-full py-2 bg-[#9E1B32] hover:bg-[#831427] text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-xs text-xs"
                    >
                      <span>Consulter l'incident {selectedIdea.relatedHseReportId} dans HSE Tag</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: CATEGORIES (Slide 14: Catégories d'amélioration) */}
        {activeIdeaWebScreen === 'categories' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Catégories & Thématiques d'Innovation</h3>
                  <p className="text-xs text-slate-500">Organisation des axes d'amélioration continue Mitech</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {IDEA_CATEGORIES.map(cat => (
                  <div key={cat.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3.5 h-3.5 rounded-full shrink-0" 
                        style={{ backgroundColor: cat.color }} 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{cat.name}</h4>
                        <p className="text-xs text-slate-500">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Pilote thématique :</span>
                        <span className="font-semibold text-slate-800">{cat.lead}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Volume :</span>
                        <span className="font-mono font-bold text-purple-700">{cat.count} idées</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
