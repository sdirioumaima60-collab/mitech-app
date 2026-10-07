import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  ShieldAlert, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Camera, 
  Send, 
  HeartHandshake, 
  Leaf, 
  Award,
  Sparkles,
  Info
} from 'lucide-react';
import { ASSET_IMAGES } from '../../data/mockData.ts';

export const StandKioskView: React.FC = () => {
  const { createHseReport, submitIdeaByMatricule, jumpToScreen } = useApp();
  const [activeModal, setActiveModal] = useState<'none' | 'hse-quick' | 'idea-matricule'>('none');

  // Quick HSE Hazard Form State
  const [hseLocation, setHseLocation] = useState('Ligne 2 Découpe Cuir');
  const [hseCategory, setHseCategory] = useState<'Sécurité' | 'Hygiène' | 'Environnement'>('Sécurité');
  const [hseSeverity, setHseSeverity] = useState<'Critique' | 'Élevée' | 'Moyenne'>('Élevée');
  const [hseDesc, setHseDesc] = useState('');
  const [hseSubmitted, setHseSubmitted] = useState<string | null>(null);

  // Quick Idea Matricule Form State
  const [matricule, setMatricule] = useState('');
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('Qualité Cuir');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaSubmitted, setIdeaSubmitted] = useState<string | null>(null);

  const handleHseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hseDesc.trim()) return;
    const report = createHseReport({
      title: `${hseCategory}: Risque signalé au Stand Atelier`,
      category: hseCategory,
      severity: hseSeverity,
      location: hseLocation,
      description: hseDesc,
      reporterName: 'Opérateur Atelier (Borne Kiosk)',
      reporterMatricule: 'KIOSK-L2',
      reporterRole: 'Borne Terrain Atelier',
      imageUrl: ASSET_IMAGES.hseElectricalHazard,
    });
    setHseSubmitted(report.id);
    setHseDesc('');
  };

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricule.trim() || !ideaTitle.trim() || !ideaDesc.trim()) return;
    const created = submitIdeaByMatricule(
      matricule,
      ideaTitle,
      ideaCategory,
      ideaDesc
    );
    setIdeaSubmitted(created.id);
    setIdeaTitle('');
    setIdeaDesc('');
    setMatricule('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background industrial atmosphere */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none filter blur-sm"
        style={{ backgroundImage: `url(${ASSET_IMAGES.standKiosk})` }}
      />
      
      {/* Kiosk Mode Container - replicates Slide 3 Terminal */}
      <div className="relative z-10 w-full max-w-4xl bg-slate-950/95 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Kiosk Status Bar */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-emerald-400 font-semibold">BORNE CONNECTÉE · ATELIER LIGNE 2</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-semibold tracking-wider">MITECH TUNISIE</span>
          </div>
        </div>

        {/* Kiosk Main Screen Content */}
        {activeModal === 'none' && (
          <div className="p-6 md:p-12 text-center space-y-8">
            {/* Header branding on Kiosk Stand */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700 text-xs font-semibold text-rose-400 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                MITECH TUNISIE · ATELIER PRODUCTION
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
                MITECH TUNISIE
              </h1>
              <p className="text-base md:text-xl font-medium text-slate-300 max-w-2xl mx-auto">
                « VOTRE CONTRIBUTION FAIT NOTRE AMÉLIORATION ! »
              </p>
            </div>

            {/* 2 Big Direct Access Action Buttons (Slide 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
              {/* Button 1: HSE TAG */}
              <button
                onClick={() => {
                  setHseSubmitted(null);
                  setActiveModal('hse-quick');
                }}
                className="group relative flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#9E1B32] to-[#7A1224] hover:from-[#B91C1C] hover:to-[#9E1B32] text-white shadow-xl hover:shadow-[#9E1B32]/30 transition-all transform hover:-translate-y-1 active:translate-y-0 border-2 border-rose-400/40"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-12 h-12 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase">
                  SIGNALER UN RISQUE HSE
                </span>
                <span className="text-xs md:text-sm text-rose-100 mt-2 font-medium">
                  Danger · Incident · Situation à risque · SLA 12h
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  Accès direct en 1 tap →
                </span>
              </button>

              {/* Button 2: IDEA BOX */}
              <button
                onClick={() => {
                  setIdeaSubmitted(null);
                  setActiveModal('idea-matricule');
                }}
                className="group relative flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white shadow-xl hover:shadow-indigo-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 border-2 border-indigo-400/40"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-12 h-12 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase">
                  DÉPOSER UNE IDÉE
                </span>
                <span className="text-xs md:text-sm text-indigo-100 mt-2 font-medium">
                  Mitech Idea Box · Accès rapide avec Matricule
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  Sans mot de passe →
                </span>
              </button>
            </div>

            {/* Bottom 4 Commitments (Slide 3 icons: Participez, Améliorez, Protégez, Ensemble) */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60">
                  <HeartHandshake className="w-6 h-6 text-rose-400" />
                  <span className="text-xs font-semibold text-slate-300">PARTICIPEZ</span>
                  <span className="text-[10px] text-slate-400">Chaque voix compte</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60">
                  <Award className="w-6 h-6 text-blue-400" />
                  <span className="text-xs font-semibold text-slate-300">AMÉLIOREZ</span>
                  <span className="text-[10px] text-slate-400">Qualité cuir & process</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-300">PROTÉGEZ</span>
                  <span className="text-[10px] text-slate-400">Sécurité zéro accident</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-slate-900/60">
                  <Leaf className="w-6 h-6 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300">ENSEMBLE</span>
                  <span className="text-[10px] text-slate-400">Éco-responsabilité</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">MERCI POUR VOTRE IMPLICATION !</span>
                <span>·</span>
                <button
                  onClick={() => jumpToScreen('overview')}
                  className="text-rose-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Info className="w-3.5 h-3.5" /> Voir la présentation FM-MDQ-145
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: HSE QUICK REPORT FORM (Borne Atelier) */}
        {activeModal === 'hse-quick' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <button
                onClick={() => setActiveModal('none')}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" /> Retour au Stand
              </button>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <h2 className="text-lg font-bold text-white uppercase">
                  Signalement Rapide HSE Atelier
                </h2>
              </div>
              <span className="text-xs font-mono text-rose-400">Délai SLA : 12h</span>
            </div>

            {hseSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Signalement {hseSubmitted} enregistré !</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Le Responsable HSE et le Manager Qualité ont été alertés immédiatement par e-mail. Le compte à rebours de résolution de 12 heures est enclenché.
                </p>
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold text-sm transition"
                  >
                    Terminé / Revenir à l'accueil
                  </button>
                  <button
                    onClick={() => jumpToScreen('hse-web', 'detail', hseSubmitted)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition"
                  >
                    Voir dans le Back-office HSE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleHseSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Type de Risque
                    </label>
                    <select
                      value={hseCategory}
                      onChange={(e) => setHseCategory(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                    >
                      <option value="Sécurité">Sécurité</option>
                      <option value="Hygiène">Hygiène</option>
                      <option value="Environnement">Environnement</option>
                      <option value="Non-conformité">Non-conformité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Gravité estimée
                    </label>
                    <select
                      value={hseSeverity}
                      onChange={(e) => setHseSeverity(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                    >
                      <option value="Critique">Critique (Urgent)</option>
                      <option value="Élevée">Élevée</option>
                      <option value="Moyenne">Moyenne</option>
                      <option value="Faible">Faible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Zone / Ligne de production
                    </label>
                    <input
                      type="text"
                      value={hseLocation}
                      onChange={(e) => setHseLocation(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                      placeholder="Ex: Découpe Ligne 2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Description du danger constaté *
                  </label>
                  <textarea
                    rows={3}
                    value={hseDesc}
                    onChange={(e) => setHseDesc(e.target.value)}
                    placeholder="Décrivez précisément le risque (ex: câble dénudé, fuite de liquide, garde-corps défaillant)..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-rose-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-start gap-3 text-xs text-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Règle de traitement immédiat :</span> Dès validation, une alerte est transmise au Responsable HSE. Si aucune intervention n'est enregistrée dans les 12h, l'incident est automatiquement escaladé au Directeur Général.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-sm transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm shadow-lg transition"
                  >
                    <Send className="w-4 h-4" />
                    Transmettre l'alerte d'urgence
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Modal: IDEA MATRICULE QUICK SUBMISSION (Slide 11: Nouveauté sans mot de passe) */}
        {activeModal === 'idea-matricule' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <button
                onClick={() => setActiveModal('none')}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" /> Retour au Stand
              </button>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <h2 className="text-lg font-bold text-white uppercase">
                  Déposer une idée juste avec son Matricule
                </h2>
              </div>
              <span className="text-xs px-2.5 py-0.5 bg-purple-900/60 text-purple-300 border border-purple-700/60 rounded-full font-medium">
                Sans mot de passe
              </span>
            </div>

            {ideaSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Idée {ideaSubmitted} transmise !</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Merci pour votre contribution ! Votre proposition a été envoyée directement à l'équipe innovation Mitech Tunisie pour étude de faisabilité.
                </p>
                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveModal('none')}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm transition"
                  >
                    Terminé / Revenir à l'accueil
                  </button>
                  <button
                    onClick={() => jumpToScreen('idea-mobile', 'feed', ideaSubmitted)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-sm transition"
                  >
                    Voir dans le Fil d'Idées
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleIdeaSubmit} className="space-y-4 max-w-2xl mx-auto">
                {/* Single Matricule Field */}
                <div className="bg-purple-950/40 p-3.5 rounded-xl border border-purple-800/50">
                  <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">
                    Votre Matricule Employé *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                      placeholder="Ex: MT-2048, MT-1105, MT-0842..."
                      className="flex-1 bg-slate-900 border border-purple-500/60 rounded-lg px-3 py-2 text-sm text-white font-mono uppercase focus:border-purple-400 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setMatricule('MT-2048')}
                      className="px-3 py-1.5 bg-purple-800/70 hover:bg-purple-700 text-xs text-purple-200 rounded-lg transition"
                      title="Utiliser matricule démo Ahmed Ben Salem"
                    >
                      Démo: MT-2048
                    </button>
                  </div>
                  <p className="text-[11px] text-purple-300/80 mt-1">
                    Pas besoin d'e-mail pro ni de mot de passe : la traçabilité se fait directement via votre matricule.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Titre de l'idée *
                    </label>
                    <input
                      type="text"
                      value={ideaTitle}
                      onChange={(e) => setIdeaTitle(e.target.value)}
                      placeholder="Ex: Système anti-glisse sur table de refente"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Catégorie
                    </label>
                    <select
                      value={ideaCategory}
                      onChange={(e) => setIdeaCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="Qualité Cuir">Qualité Cuir</option>
                      <option value="Sécurité & Ergonomie">Sécurité & Ergonomie</option>
                      <option value="Productivité">Productivité</option>
                      <option value="Éco-Responsabilité">Éco-Responsabilité</option>
                      <option value="Digitalisation Atelier">Digitalisation Atelier</option>
                      <option value="Ambiance & Vie au travail">Ambiance & Vie au travail</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Description de votre proposition d'amélioration *
                  </label>
                  <textarea
                    rows={3}
                    value={ideaDesc}
                    onChange={(e) => setIdeaDesc(e.target.value)}
                    placeholder="Expliquez votre idée simplement : Quel est le problème constaté ? Quelle est votre solution proposée ?"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal('none')}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-sm transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm shadow-lg transition"
                  >
                    <Send className="w-4 h-4" />
                    Publier mon idée
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Stand Mechanical Features Note (Slide 3) */}
      <div className="mt-6 max-w-3xl text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">
          Concept d'implantation en zone de production · Mitech Tunisie
        </p>
        <p>
          Support incliné · Boîtier fermé résistant à la poussière · Fixation antivol intégrée au comptoir d'îlot.
        </p>
      </div>
    </div>
  );
};
