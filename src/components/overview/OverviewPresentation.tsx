import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { 
  ShieldAlert, 
  Lightbulb, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  Smartphone, 
  Monitor, 
  Store, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ChevronRight,
  FileCheck2,
  Award
} from 'lucide-react';
import { ASSET_IMAGES } from '../../data/mockData.ts';

export const OverviewPresentation: React.FC = () => {
  const { jumpToScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'intro' | 'escalation' | 'matricule' | 'kiosk' | 'navigation'>('intro');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header matching Slide 1 & 2 */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 text-white">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url(${ASSET_IMAGES.automotiveLeather})` }}
        />
        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-400">
              <span className="px-2.5 py-1 bg-rose-950/80 border border-rose-800 rounded-md">
                FM-MDQ-145
              </span>
              <span>·</span>
              <span className="text-white font-bold">Mitech Tunisie</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Mitech IDEA BOX <br className="hidden sm:inline" />
              <span className="text-rose-500">& HSE TAG</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Présentation des maquettes fonctionnelles et guide de navigation entre les écrans.
              Une plateforme industrielle unifiée intégrant le signalement sécurité avec 
              <strong className="text-white font-semibold"> escalade automatique 12h</strong> et 
              la boîte à idées collaborative avec <strong className="text-white font-semibold">dépôt rapide sans mot de passe par matricule</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 text-slate-300">
                <FileCheck2 className="w-4 h-4 text-rose-400" />
                Date : <strong>18/08/2026</strong>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-purple-400" />
                Réalisé par : <strong>Afef Sdiri</strong> (Manager Qualité & Méthodes)
              </span>
            </div>
          </div>

          {/* Quick Start Card */}
          <div className="w-full md:w-auto shrink-0 bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Accès Immédiat aux Applications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5">
              <button
                onClick={() => jumpToScreen('hse-mobile', 'dashboard')}
                className="flex items-center justify-between gap-3 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> HSE Tag Mobile
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => jumpToScreen('hse-web', 'dashboard')}
                className="flex items-center justify-between gap-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition border border-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-rose-400" /> HSE Web Pilotage
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => jumpToScreen('idea-mobile', 'matricule-quick')}
                className="flex items-center justify-between gap-3 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Idea Box (Matricule)
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => jumpToScreen('kiosk')}
                className="flex items-center justify-between gap-3 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Store className="w-4 h-4" /> Stand Tablette Kiosk
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu for Presentation Modules */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pb-1 text-sm">
        <button
          onClick={() => setActiveTab('intro')}
          className={`pb-3 px-3 font-semibold transition border-b-2 whitespace-nowrap ${
            activeTab === 'intro'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Une Plateforme, Deux Applications
        </button>
        <button
          onClick={() => setActiveTab('escalation')}
          className={`pb-3 px-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'escalation'
              ? 'border-rose-600 text-rose-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-rose-600" />
          2. Règle d'Escalade 12h (HSE TAG)
        </button>
        <button
          onClick={() => setActiveTab('matricule')}
          className={`pb-3 px-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'matricule'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          3. Accès Matricule Sans Mot de Passe (IDEA BOX)
        </button>
        <button
          onClick={() => setActiveTab('kiosk')}
          className={`pb-3 px-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'kiosk'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-4 h-4 text-blue-600" />
          4. Stand Tablette de Comptoir
        </button>
        <button
          onClick={() => setActiveTab('navigation')}
          className={`pb-3 px-3 font-semibold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'navigation'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-600" />
          5. Guide de Navigation & Démo
        </button>
      </div>

      {/* Tab 1: General Overview (Slide 4) */}
      {activeTab === 'intro' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: HSE TAG */}
            <div className="bg-white rounded-2xl border-2 border-rose-100 p-8 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                    H
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">HSE Tag</h2>
                    <p className="text-xs text-rose-600 font-semibold uppercase">
                      Hygiène · Sécurité · Environnement
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Signalement direct des situations à risque, des incidents et des non-conformités sur le terrain de l'atelier de découpe et de tannage.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span><strong>Application mobile terrain</strong> : saisie ultra-rapide avec photo, géolocalisation d'îlot et niveau de gravité.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span><strong>Back-office de suivi des signalements</strong> : assignation aux équipes de maintenance et suivi des actions correctives.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span><strong>Tableaux de bord & statistiques</strong> : KPI de résolution, gravité, risques fréquents et délai moyen.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100 flex items-center gap-3">
                <button
                  onClick={() => jumpToScreen('hse-mobile')}
                  className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Lancer HSE Mobile →
                </button>
                <button
                  onClick={() => jumpToScreen('hse-web')}
                  className="flex-1 py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold text-center transition border border-rose-200"
                >
                  Lancer Web Pilotage →
                </button>
              </div>
            </div>

            {/* Box 2: MITECH IDEA BOX */}
            <div className="bg-white rounded-2xl border-2 border-purple-100 p-8 shadow-sm hover:shadow-md transition space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                    I
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Mitech Idea Box</h2>
                    <p className="text-xs text-purple-600 font-semibold uppercase">
                      Boîte à idées collaborative & Lean
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Recueillir, évaluer et suivre les propositions d'amélioration continue formulées par tous les collaborateurs de l'usine.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                    <span><strong>Accès rapide matricule (Sans mot de passe)</strong> : suppression de toute friction pour les ouvriers sans e-mail professionnel.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                    <span><strong>Back-office d'évaluation des idées</strong> : grille d'analyse (impact, faisabilité, notation) et retours directs aux auteurs.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                    <span><strong>Votes, commentaires & catégories</strong> : émulation d'équipe par vote positif, retours et suivi de mise en œuvre.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center gap-3">
                <button
                  onClick={() => jumpToScreen('idea-mobile')}
                  className="flex-1 py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold text-center transition"
                >
                  Lancer Idea Box Mobile →
                </button>
                <button
                  onClick={() => jumpToScreen('idea-web')}
                  className="flex-1 py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-bold text-center transition border border-purple-200"
                >
                  Lancer Web Innovation →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 12h Escalation Engine (Slide 8 & 9) */}
      {activeTab === 'escalation' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Escalade en cas de dépassement du délai de résolution
                  </h2>
                </div>
                <p className="text-slate-600 text-sm mt-1">
                  <strong>Règle stricte Mitech Tunisie :</strong> délai de résolution accordé de <strong>12h</strong> à partir de la création. Au-delà, l'escalade vers la Direction Générale est automatique.
                </p>
              </div>

              <button
                onClick={() => jumpToScreen('hse-web', 'detail', '#2451')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
              >
                Inspecter le cas réel #2451 (Escaladé) →
              </button>
            </div>

            {/* Visual Workflow Steps (Slide 8 diagram) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Alerte créée</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  E-mail d'information immédiat envoyé au <strong>Responsable HSE</strong> et au <strong>Manager Qualité</strong> en copie. Horodatage automatique.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Prise en charge (12h)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Délai de résolution accordé : <strong>12h</strong> à partir de la création. Le superviseur assigne l'équipe technique pour intervention corrective.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-sm">
                  ?
                </div>
                <h3 className="font-bold text-slate-900 text-base">Vérification automatique</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calcul en continu du temps écoulé depuis la déclaration. Déclenchement automatique de l'aiguillage SLA.
                </p>
              </div>
            </div>

            {/* Branching Result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Branch A: Success < 12h */}
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Résolue dans les temps (&lt; 12h)</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Le signalement est clôturé normalement par le responsable. L'historique et les preuves d'action corrective restent archivés dans le dossier avec horodatage de conformité.
                </p>
              </div>

              {/* Branch B: Escalation > 12h */}
              <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                  <span>Non résolue après 12h → Escalade automatique DG</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">
                  L'alerte est transmise automatiquement au <strong>Directeur Général</strong> (Raouf Mejri), avec le Manager Qualité déjà en copie depuis la création. Le badge d'escalade rouge s'affiche sur tous les écrans.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Matricule Access (Slide 11) */}
      {activeTab === 'matricule' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Nouveauté Mitech
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Déposer une idée juste avec son Matricule (Sans mot de passe)
                </h2>
                <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                  Pour lever toute friction, un accès rapide permet aux collaborateurs terrain de publier une idée sans créer de compte ni renseigner de mot de passe, tout en garantissant la traçabilité par matricule.
                </p>
              </div>

              <button
                onClick={() => jumpToScreen('idea-mobile', 'matricule-quick')}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
              >
                Tester le parcours matricule →
              </button>
            </div>

            {/* 4 Steps (Slide 11) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Connexion simplifiée</h3>
                <p className="text-xs text-slate-600">
                  Lien direct « Déposer une idée avec mon matricule ».
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Matricule</h3>
                <p className="text-xs text-slate-600">
                  Un seul champ : le matricule employé (ex: MT-2048).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Formulaire fluide</h3>
                <p className="text-xs text-slate-600">
                  Titre, catégorie d'innovation, description de l'idée.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Confirmation & Suivi</h3>
                <p className="text-xs text-slate-600">
                  Idée transmise immédiatement à l'équipe innovation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong>Pourquoi ce parcours ?</strong> Il réduit drastiquement la barrière à l'entrée pour les collaborateurs de l'atelier sans boîte mail d'entreprise, tout en permettant aux managers de valoriser l'auteur lors des bilans de fin d'année.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Stand Tablette Kiosk (Slide 3) */}
      {activeTab === 'kiosk' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Stand Tablette de Comptoir en Zone de Production
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Concept d'implantation physique à l'entrée des lignes de découpe et zones de communication.
                </p>
              </div>

              <button
                onClick={() => jumpToScreen('kiosk')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
              >
                Ouvrir la Borne Tactile Interactive →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 uppercase">Support Incliné & Écran Ergonomique</span>
                  <p className="text-xs text-slate-600">Lecture et saisie confortables en position debout par les opérateurs d'atelier.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 uppercase">Boîtier Robuste Industriel</span>
                  <p className="text-xs text-slate-600">Habillage fermé étanche résistant à la poussière de refente et aux projections d'atelier.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-900 uppercase">Fixation Antivol</span>
                  <p className="text-xs text-slate-600">Tablette verrouillée sur le bras articulé, câble de sécurité intégré au comptoir d'îlot.</p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-xs font-bold text-blue-900 uppercase">Accès Direct aux 2 Modules</span>
                  <p className="text-xs text-blue-800">Un seul tap suffit pour signaler un danger (HSE Tag) ou déposer une idée (Idea Box).</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md">
                <img
                  src={ASSET_IMAGES.standKiosk}
                  alt="Stand Tablette de Comptoir Mitech"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Navigation & Demo Guide (Slide 15) */}
      {activeTab === 'navigation' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Guide de Démonstration : Comment surfer entre les différents écrans
            </h2>
            <p className="text-slate-600 text-sm">
              Quatre repères pour circuler librement dans l'application pendant la démonstration :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-bold text-slate-900 text-sm">Bandeau supérieur</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Bascule instantanée entre HSE Tag et Idea Box, et entre leur version mobile et web back-office.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-bold text-slate-900 text-sm">Sur mobile — barre basse & bouton +</h3>
                </div>
                <p className="text-xs text-slate-600">
                  La barre de navigation change d'écran ; le bouton central ouvre directement la création d'un signalement ou d'une idée.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="font-bold text-slate-900 text-sm">Sur web — menu latéral</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Chaque entrée du menu à gauche correspond à un écran du back-office, accessible en un clic direct sans retour arrière nécessaire.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="font-bold text-slate-900 text-sm">Panneau « Écrans »</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Accessible depuis le bouton rouge en haut à droite pour sauter directement à n'importe quel écran pour la démonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
