import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  Lightbulb, 
  Plus, 
  Home, 
  ThumbsUp, 
  MessageSquare, 
  User, 
  Lock, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Search,
  Filter,
  Camera,
  Star,
  ShieldAlert
} from 'lucide-react';
import { IdeaMobileScreen } from '../../types/index.ts';
import { IDEA_CATEGORIES, ASSET_IMAGES } from '../../data/mockData.ts';

export const IdeaMobileView: React.FC = () => {
  const { 
    ideas, 
    activeIdeaMobileScreen, 
    setActiveIdeaMobileScreen, 
    selectedIdeaId, 
    setSelectedIdeaId, 
    createIdea,
    submitIdeaByMatricule,
    toggleVoteIdea,
    addIdeaComment,
    openRelatedHseReport,
    currentUser,
    setCurrentUser,
    availableUsers,
    jumpToScreen
  } = useApp();

  // Tab in feed: 'trending' | 'recent' | 'mine'
  const [feedTab, setFeedTab] = useState<'trending' | 'recent' | 'mine'>('trending');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Classic new idea state
  const [classicTitle, setClassicTitle] = useState('');
  const [classicCategory, setClassicCategory] = useState('Qualité Cuir');
  const [classicDesc, setClassicDesc] = useState('');

  // Matricule Quick form state (Slide 11)
  const [matriculeInput, setMatriculeInput] = useState('');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('Productivité');
  const [quickDesc, setQuickDesc] = useState('');
  const [quickSubmittedId, setQuickSubmittedId] = useState<string | null>(null);

  // Comment state for detail
  const [commentInput, setCommentInput] = useState('');

  const selectedIdea = ideas.find(i => i.id === selectedIdeaId) || ideas[0];

  const handleClassicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classicTitle.trim() || !classicDesc.trim()) return;
    const created = createIdea({
      title: classicTitle,
      category: classicCategory,
      description: classicDesc,
      imageUrl: ASSET_IMAGES.automotiveLeather,
    });
    setSelectedIdeaId(created.id);
    setActiveIdeaMobileScreen('detail');
    setClassicTitle('');
    setClassicDesc('');
  };

  const handleMatriculeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriculeInput.trim() || !quickTitle.trim() || !quickDesc.trim()) return;
    const created = submitIdeaByMatricule(
      matriculeInput,
      quickTitle,
      quickCategory,
      quickDesc,
      ASSET_IMAGES.automotiveLeather
    );
    setQuickSubmittedId(created.id);
    setQuickTitle('');
    setQuickDesc('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addIdeaComment(selectedIdea.id, commentInput);
    setCommentInput('');
  };

  // Filter ideas for feed
  const displayIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          idea.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || idea.category === categoryFilter;
    const matchesTab = feedTab === 'mine' 
      ? idea.authorMatricule === currentUser.matricule 
      : true;
    return matchesSearch && matchesCat && matchesTab;
  }).sort((a, b) => {
    if (feedTab === 'trending') return b.votesCount - a.votesCount;
    return b.createdAtTimestamp - a.createdAtTimestamp;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] py-6 px-4 bg-slate-900/10 flex flex-col items-center justify-center">
      {/* Smartphone mockup frame */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col h-[740px] relative">
        {/* Top Status Bar */}
        <div className="bg-slate-950 text-white px-6 py-2.5 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
          <div className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>MITECH IDEA BOX</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>5G</span>
            <span>10:24</span>
          </div>
        </div>

        {/* Mobile Header in Mitech Indigo */}
        <div className="bg-indigo-700 text-white px-4 py-3 shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            {activeIdeaMobileScreen !== 'feed' && activeIdeaMobileScreen !== 'login' ? (
              <button
                onClick={() => setActiveIdeaMobileScreen('feed')}
                className="p-1 -ml-1 text-indigo-200 hover:text-white"
                title="Retour au fil"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Lightbulb className="w-5 h-5 text-indigo-200" />
            )}
            <div>
              <h1 className="font-bold text-sm leading-tight">
                {activeIdeaMobileScreen === 'login' && 'Connexion Idea Box'}
                {activeIdeaMobileScreen === 'feed' && 'Fil des Idées'}
                {activeIdeaMobileScreen === 'matricule-quick' && 'Accès Rapide Matricule'}
                {activeIdeaMobileScreen === 'new-idea' && 'Proposer une idée'}
                {activeIdeaMobileScreen === 'my-ideas' && 'Mes Propositions'}
                {activeIdeaMobileScreen === 'detail' && `Idée ${selectedIdea?.id}`}
              </h1>
              <p className="text-[10px] text-indigo-200">
                Mitech Tunisie
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveIdeaMobileScreen('matricule-quick')}
              className="text-[10px] bg-indigo-900/80 hover:bg-indigo-950 px-2 py-1 rounded-full text-indigo-100 font-semibold border border-indigo-400/40"
              title="Dépôt rapide sans mot de passe"
            >
              ⭐ Matricule
            </button>
          </div>
        </div>

        {/* SCREEN 1: LOGIN (Slide 10) */}
        {activeIdeaMobileScreen === 'login' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-sm">
                <Lightbulb className="w-9 h-9" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Mitech Idea Box</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Partagez vos idées d'amélioration pour la qualité, la sécurité et la productivité.
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
                onClick={() => setActiveIdeaMobileScreen('feed')}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Se connecter
              </button>
            </div>

            {/* Slide 11 Callout: "Déposer une idée juste avec son matricule" */}
            <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl text-center space-y-2">
              <span className="text-[11px] font-bold text-purple-900 uppercase">
                Vous n'avez pas d'e-mail pro ?
              </span>
              <p className="text-xs text-purple-800">
                Utilisez le nouvel accès rapide sans mot de passe avec votre numéro de matricule usine.
              </p>
              <button
                onClick={() => setActiveIdeaMobileScreen('matricule-quick')}
                className="w-full py-2 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-xl text-xs font-bold transition shadow-2xs"
              >
                Déposer une idée avec mon matricule →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN: MATRICULE QUICK SUBMISSION (Slide 11: NOUVEAUTÉ SANS MOT DE PASSE) */}
        {activeIdeaMobileScreen === 'matricule-quick' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="p-3 bg-purple-100 border border-purple-300 rounded-2xl flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
              <div className="text-xs text-purple-950">
                <span className="font-bold">Accès sans mot de passe :</span> Saisissez uniquement votre matricule pour enregistrer votre proposition avec traçabilité.
              </div>
            </div>

            {quickSubmittedId ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Idée {quickSubmittedId} transmise !
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Votre idée est désormais entre les mains de l'équipe innovation Mitech. Merci pour votre engagement !
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedIdeaId(quickSubmittedId);
                      setActiveIdeaMobileScreen('detail');
                      setQuickSubmittedId(null);
                    }}
                    className="py-2.5 px-4 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Voir mon idée dans le fil
                  </button>
                  <button
                    onClick={() => {
                      setQuickSubmittedId(null);
                      setQuickTitle('');
                      setQuickDesc('');
                    }}
                    className="py-2 px-4 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium"
                  >
                    Déposer une autre idée
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleMatriculeSubmit} className="space-y-3">
                {/* 1. Matricule input */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                    1. Votre Matricule Employé *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={matriculeInput}
                      onChange={(e) => setMatriculeInput(e.target.value)}
                      placeholder="Ex: MT-2048"
                      className="flex-1 bg-white border border-purple-400 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setMatriculeInput('MT-2048')}
                      className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-xl text-[10px] font-bold border border-purple-200"
                    >
                      MT-2048
                    </button>
                  </div>
                </div>

                {/* 2. Catégorie */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    2. Catégorie d'amélioration *
                  </label>
                  <select
                    value={quickCategory}
                    onChange={(e) => setQuickCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                  >
                    {IDEA_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Titre */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    3. Titre de l'idée *
                  </label>
                  <input
                    type="text"
                    value={quickTitle}
                    onChange={(e) => setQuickTitle(e.target.value)}
                    placeholder="Ex: Gabarit de centrage pour découpe"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    4. Description de votre solution *
                  </label>
                  <textarea
                    rows={3}
                    value={quickDesc}
                    onChange={(e) => setQuickDesc(e.target.value)}
                    placeholder="Expliquez votre proposition : quel problème résout-elle sur votre poste ?"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmettre mon idée à l'innovation
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* SCREEN 2: FEED (Slide 10: Tendances, Récentes, Mes idées) */}
        {activeIdeaMobileScreen === 'feed' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Feed Tabs Segmented */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setFeedTab('trending')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  feedTab === 'trending' ? 'bg-white text-purple-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔥 Tendances
              </button>
              <button
                onClick={() => setFeedTab('recent')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  feedTab === 'recent' ? 'bg-white text-purple-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🕒 Récentes
              </button>
              <button
                onClick={() => setFeedTab('mine')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                  feedTab === 'mine' ? 'bg-white text-purple-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👤 Mes idées
              </button>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition ${
                  categoryFilter === 'all'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Toutes
              </button>
              {IDEA_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.name)}
                  className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition ${
                    categoryFilter === cat.name
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* List of Ideas */}
            <div className="space-y-3 pt-1">
              {displayIdeas.map(idea => (
                <div
                  key={idea.id}
                  onClick={() => {
                    setSelectedIdeaId(idea.id);
                    setActiveIdeaMobileScreen('detail');
                  }}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 transition cursor-pointer space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-slate-900">{idea.id}</span>
                    <span className="text-slate-500">{idea.category}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{idea.title}</h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{idea.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-[10px] text-slate-500">
                      Par <span className="font-semibold text-slate-800">{idea.authorName}</span> ({idea.authorMatricule})
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVoteIdea(idea.id);
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold transition ${
                          idea.hasVoted 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{idea.votesCount}</span>
                      </button>

                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MessageSquare className="w-3 h-3" />
                        <span>{idea.comments.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 3: PROPOSER UNE IDÉE (Slide 10: Bouton + classique) */}
        {activeIdeaMobileScreen === 'new-idea' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              Formulaire classique de proposition
            </h2>

            <form onSubmit={handleClassicSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catégorie d'amélioration
                </label>
                <select
                  value={classicCategory}
                  onChange={(e) => setClassicCategory(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                >
                  {IDEA_CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Titre de l'idée *
                </label>
                <input
                  type="text"
                  value={classicTitle}
                  onChange={(e) => setClassicTitle(e.target.value)}
                  placeholder="Ex: Optimisation du tri des peaux velours"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description détaillée de l'idée *
                </label>
                <textarea
                  rows={4}
                  value={classicDesc}
                  onChange={(e) => setClassicDesc(e.target.value)}
                  placeholder="Expliquez les bénéfices attendus (gain de temps, réduction des rebuts, sécurité)..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publier l'idée
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SCREEN 4: DETAIL IDÉE (Slide 10: Votes, commentaires, décision) */}
        {activeIdeaMobileScreen === 'detail' && selectedIdea && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Idea Card */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">{selectedIdea.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedIdea.status === 'Acceptée' ? 'bg-emerald-100 text-emerald-800' :
                  selectedIdea.status === 'Déployée' ? 'bg-blue-100 text-blue-800' :
                  selectedIdea.status === 'En étude' ? 'bg-purple-100 text-purple-800' :
                  selectedIdea.status === 'Refusée' ? 'bg-rose-100 text-rose-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {selectedIdea.status}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900">{selectedIdea.title}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedIdea.description}</p>

              {/* Author & Meta */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Par <strong>{selectedIdea.authorName}</strong> ({selectedIdea.authorMatricule})</span>
                <span className="font-mono">{selectedIdea.submittedAt}</span>
              </div>

              {/* Vote CTA */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => toggleVoteIdea(selectedIdea.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                    selectedIdea.hasVoted
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Soutenir cette idée ({selectedIdea.votesCount} votes)</span>
                </button>
              </div>
            </div>

            {/* Official Innovation Feedback if evaluated */}
            {selectedIdea.evaluationNote && (
              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl space-y-1.5 text-xs text-purple-950">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-purple-800">
                    Avis de l'équipe Innovation
                  </span>
                  {selectedIdea.score && (
                    <span className="flex items-center gap-1 font-bold text-purple-900">
                      <Star className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
                      {selectedIdea.score}/5
                    </span>
                  )}
                </div>
                <p className="text-xs text-purple-900 leading-relaxed font-medium">
                  {selectedIdea.evaluationNote}
                </p>
                {selectedIdea.evaluatedBy && (
                  <span className="text-[10px] text-purple-700 block">
                    Évalué par {selectedIdea.evaluatedBy}
                  </span>
                )}
              </div>
            )}

            {/* CROSS-LINK HSE INCIDENT IF CONNECTED */}
            {selectedIdea.relatedHseReportId && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold text-rose-950">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Liaison Danger HSE ({selectedIdea.relatedHseReportId})
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    Atelier Cuir
                  </span>
                </div>
                <p className="text-[11px] text-rose-900 leading-tight">
                  Cette idée a été formulée pour corriger la situation à risque constatée sur ce poste.
                </p>
                <button
                  onClick={() => openRelatedHseReport(selectedIdea.relatedHseReportId!)}
                  className="w-full py-2 bg-[#9E1B32] hover:bg-[#831427] text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Consulter l'incident {selectedIdea.relatedHseReportId} (HSE Tag)</span>
                </button>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-800 block">
                Commentaires des collègues ({selectedIdea.comments.length})
              </span>

              <div className="space-y-2">
                {selectedIdea.comments.map(c => (
                  <div key={c.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-semibold text-slate-800">{c.authorName}</span>
                      <span className="font-mono">{c.date}</span>
                    </div>
                    <p className="text-slate-700">{c.content}</p>
                  </div>
                ))}
              </div>

              {/* Add comment input */}
              <form onSubmit={handleAddComment} className="pt-2 flex gap-1.5">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Ajouter un commentaire constructif..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold shrink-0 hover:bg-purple-500 transition"
                >
                  Poster
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BOTTOM NAV BAR (Slide 10: barre basse & bouton central +) */}
        <div className="bg-white border-t border-slate-200 px-4 py-2 shrink-0 flex items-center justify-between select-none shadow-md">
          <button
            onClick={() => setActiveIdeaMobileScreen('feed')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              activeIdeaMobileScreen === 'feed' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Fil</span>
          </button>

          <button
            onClick={() => setActiveIdeaMobileScreen('matricule-quick')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              activeIdeaMobileScreen === 'matricule-quick' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Matricule</span>
          </button>

          {/* Central "+" button */}
          <button
            onClick={() => setActiveIdeaMobileScreen('new-idea')}
            className="w-12 h-12 -mt-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg hover:shadow-purple-600/30 transition transform active:scale-95 border-2 border-white"
            title="Proposer une idée"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              setFeedTab('mine');
              setActiveIdeaMobileScreen('feed');
            }}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${
              feedTab === 'mine' ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Mes idées</span>
          </button>

          <button
            onClick={() => jumpToScreen('idea-web')}
            className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-700"
            title="Basculer vers Back-Office Web Innovation"
          >
            <Layers className="w-4 h-4" />
            <span>Web</span>
          </button>
        </div>
      </div>
    </div>
  );
};
