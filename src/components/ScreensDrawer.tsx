import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  X, 
  Smartphone, 
  Monitor, 
  ShieldAlert, 
  Lightbulb, 
  ExternalLink, 
  Store, 
  FileText,
  UserCheck
} from 'lucide-react';
import { NavigationMode } from '../types/index.ts';

export const ScreensDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, jumpToScreen, currentMode } = useApp();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h2 className="font-bold text-sm tracking-wide">Panneau Démo « Écrans »</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Accès direct aux maquettes et fonctionnalités (FM-MDQ-145)
            </p>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          {/* Overview Mode */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              Présentation & Concept
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => jumpToScreen('portal')}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  currentMode === 'portal' || currentMode === 'overview'
                    ? 'border-slate-800 bg-slate-100 font-semibold text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                }`}
              >
                <div className="font-medium text-slate-900">Portail Unifié</div>
                <div className="text-[11px] text-slate-500">Vue d'ensemble connectée</div>
              </button>

              <button
                onClick={() => jumpToScreen('kiosk')}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  currentMode === 'kiosk'
                    ? 'border-amber-600 bg-amber-50 font-semibold text-amber-950'
                    : 'border-slate-200 hover:border-amber-200 text-slate-700 bg-white'
                }`}
              >
                <div className="font-medium text-amber-900 flex items-center gap-1">
                  <Store className="w-3 h-3 text-amber-600" /> Borne Atelier
                </div>
                <div className="text-[11px] text-slate-500">Tablette de comptoir</div>
              </button>
            </div>
          </div>

          {/* HSE Tag Screens */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              1. HSE Tag · Parcours Terrain & Pilotage
            </h3>
            
            {/* HSE Mobile */}
            <div className="bg-rose-50/50 rounded-lg p-2.5 border border-rose-100 space-y-1.5">
              <div className="text-xs font-medium text-rose-950 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-rose-600" /> Application Mobile (Opérateur)
              </div>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <button
                  onClick={() => jumpToScreen('hse-mobile', 'dashboard')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-rose-100/70 text-slate-700 text-left transition"
                >
                  <span>1. Connexion & Dashboard terrain</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('hse-mobile', 'new-report')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-rose-100/70 text-slate-700 text-left transition"
                >
                  <span className="font-medium text-rose-900">+ Nouveau signalement (photo, gravité, lieu)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('hse-mobile', 'history')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-rose-100/70 text-slate-700 text-left transition"
                >
                  <span>Historique des signalements</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('hse-mobile', 'detail', '#2451')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-rose-100/70 text-slate-700 text-left transition"
                >
                  <span className="text-amber-800">Détail #2451 (Câble dénudé)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* HSE Web Back-office */}
            <div className="bg-white rounded-lg p-2.5 border border-slate-200 space-y-1.5">
              <div className="text-xs font-medium text-slate-900 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-rose-600" /> Back-Office Web (Superviseur HSE)
              </div>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <button
                  onClick={() => jumpToScreen('hse-web', 'dashboard')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Tableau de bord indicateurs & tendances</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('hse-web', 'reports')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Liste filtrable des signalements</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('hse-web', 'detail', '#2451')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-rose-50 text-rose-900 text-left transition font-medium"
                >
                  <span>Détail alerte #2451 · Règle d'escalade 12h DG</span>
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono">12h</span>
                </button>
                <button
                  onClick={() => jumpToScreen('hse-web', 'users')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Gestion des utilisateurs & rôles</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Idea Box Screens */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
              2. Mitech Idea Box · Boîte à Idées
            </h3>

            {/* Mobile Parcours */}
            <div className="bg-purple-50/50 rounded-lg p-2.5 border border-purple-100 space-y-1.5">
              <div className="text-xs font-medium text-purple-950 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-600" /> Mobile Collaborateur
              </div>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <button
                  onClick={() => jumpToScreen('idea-mobile', 'matricule-quick')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded bg-purple-100 hover:bg-purple-200/80 text-purple-950 font-medium text-left transition"
                >
                  <span>⭐ NOUVEAUTÉ : Dépôt par Matricule (sans mot de passe)</span>
                  <ExternalLink className="w-3 h-3 text-purple-600" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-mobile', 'feed')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-purple-100/60 text-slate-700 text-left transition"
                >
                  <span>Fil des idées (Tendances, Récentes, Votes)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-mobile', 'new-idea')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-purple-100/60 text-slate-700 text-left transition"
                >
                  <span>Formulaire de proposition classique</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-mobile', 'detail', '#IB-101')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-purple-100/60 text-slate-700 text-left transition"
                >
                  <span>Détail idée #IB-101 (Rapports cuir)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Idea Box Web Back-Office */}
            <div className="bg-white rounded-lg p-2.5 border border-slate-200 space-y-1.5">
              <div className="text-xs font-medium text-slate-900 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-purple-600" /> Back-Office Web (Équipe Innovation)
              </div>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <button
                  onClick={() => jumpToScreen('idea-web', 'dashboard')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Tableau de bord (Statistiques & tendances)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-web', 'ideas')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Liste des idées & filtres par statut</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-web', 'detail', '#IB-101')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-purple-50 text-purple-900 text-left transition font-medium"
                >
                  <span>Évaluation & notation des idées</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={() => jumpToScreen('idea-web', 'categories')}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-slate-100 text-slate-700 text-left transition"
                >
                  <span>Gestion des thématiques & catégories</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Mitech Tunisie</span>
          <span>Projet FM-MDQ-145 · Afef Sdiri</span>
        </div>
      </div>
    </div>
  );
};
