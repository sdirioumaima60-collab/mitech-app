import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  NavigationMode, 
  AppTheme,
  HseMobileScreen, 
  HseWebScreen, 
  IdeaMobileScreen, 
  IdeaWebScreen, 
  HseReport, 
  Idea, 
  UserProfile, 
  HseStatus, 
  IdeaStatus,
  IdeaFeasibility
} from '../types/index.ts';
import { INITIAL_USERS, INITIAL_HSE_REPORTS, INITIAL_IDEAS } from '../data/mockData.ts';

interface AppContextType {
  // Navigation
  currentMode: NavigationMode;
  setMode: (mode: NavigationMode) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  // App Theme & Colors
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;

  // Active User Profile
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  availableUsers: UserProfile[];

  // HSE Module
  hseReports: HseReport[];
  activeHseMobileScreen: HseMobileScreen;
  setActiveHseMobileScreen: (screen: HseMobileScreen) => void;
  activeHseWebScreen: HseWebScreen;
  setActiveHseWebScreen: (screen: HseWebScreen) => void;
  selectedHseReportId: string;
  setSelectedHseReportId: (id: string) => void;
  createHseReport: (report: Partial<HseReport>) => HseReport;
  updateHseReport: (id: string, updates: Partial<HseReport>) => void;
  resolveHseReport: (id: string, correctiveAction: string) => void;
  simulate12hEscalation: (id: string) => void;

  // Idea Box Module
  ideas: Idea[];
  activeIdeaMobileScreen: IdeaMobileScreen;
  setActiveIdeaMobileScreen: (screen: IdeaMobileScreen) => void;
  activeIdeaWebScreen: IdeaWebScreen;
  setActiveIdeaWebScreen: (screen: IdeaWebScreen) => void;
  selectedIdeaId: string;
  setSelectedIdeaId: (id: string) => void;
  createIdea: (data: Partial<Idea>) => Idea;
  submitIdeaByMatricule: (matricule: string, title: string, category: string, description: string, imageUrl?: string) => Idea;
  toggleVoteIdea: (id: string) => void;
  addIdeaComment: (ideaId: string, content: string) => void;
  evaluateIdea: (ideaId: string, status: IdeaStatus, score: number, feasibility: IdeaFeasibility, note: string, actionPlan?: string) => void;

  // Quick jump helper for demo
  jumpToScreen: (mode: NavigationMode, screen?: string, itemId?: string) => void;

  // Interconnected link action
  createIdeaFromHseIncident: (hseReportId: string) => void;
  openRelatedHseReport: (reportId: string) => void;
  openRelatedIdea: (ideaId: string) => void;

  // Data management (Reset to 0 requested by user)
  resetToZero: () => void;
  loadDemoData: () => void;

  // Header theme
  topNavTheme: 'light' | 'dark';
  setTopNavTheme: (theme: 'light' | 'dark') => void;

  // Toast / Status notification
  toastMessage: { text: string; type: 'success' | 'alert' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state defaults to clean operational portal!
  const [currentMode, setMode] = useState<NavigationMode>('portal');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [topNavTheme, setTopNavTheme] = useState<'light' | 'dark'>('light');

  // App Theme & Colors (Persistent)
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('mitech_app_theme');
    if (saved && ['emerald', 'navy', 'ruby', 'dark'].includes(saved)) {
      return saved as AppTheme;
    }
    return 'emerald'; // Default modern clean industrial green & slate
  });

  const setAppTheme = (theme: AppTheme) => {
    setAppThemeState(theme);
    localStorage.setItem('mitech_app_theme', theme);
    if (theme === 'dark') {
      setTopNavTheme('dark');
    } else {
      setTopNavTheme('light');
    }
  };

  // User state
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]); // Sonia Lemmari (HSE Manager)

  // HSE state - Start at 0 as requested by the user!
  const [hseReports, setHseReports] = useState<HseReport[]>(() => {
    const saved = localStorage.getItem('mitech_hse_reports');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default to empty array (0 reports, 0 escalades)
    return [];
  });
  const [activeHseMobileScreen, setActiveHseMobileScreen] = useState<HseMobileScreen>('dashboard');
  const [activeHseWebScreen, setActiveHseWebScreen] = useState<HseWebScreen>('dashboard');
  const [selectedHseReportId, setSelectedHseReportId] = useState<string>('');

  // Idea Box state - Start at 0 as requested by the user!
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem('mitech_ideas');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default to empty array (0 ideas, 0 votes)
    return [];
  });
  const [activeIdeaMobileScreen, setActiveIdeaMobileScreen] = useState<IdeaMobileScreen>('feed');
  const [activeIdeaWebScreen, setActiveIdeaWebScreen] = useState<IdeaWebScreen>('dashboard');
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>('');

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' | 'info' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('mitech_hse_reports', JSON.stringify(hseReports));
  }, [hseReports]);

  useEffect(() => {
    localStorage.setItem('mitech_ideas', JSON.stringify(ideas));
  }, [ideas]);

  const showToast = (text: string, type: 'success' | 'alert' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper to jump anywhere
  const jumpToScreen = (mode: NavigationMode, screen?: string, itemId?: string) => {
    setMode(mode);
    setIsDrawerOpen(false);

    if (mode === 'hse-mobile' && screen) {
      setActiveHseMobileScreen(screen as HseMobileScreen);
      if (itemId) setSelectedHseReportId(itemId);
    } else if (mode === 'hse-web' && screen) {
      setActiveHseWebScreen(screen as HseWebScreen);
      if (itemId) setSelectedHseReportId(itemId);
    } else if (mode === 'idea-mobile' && screen) {
      setActiveIdeaMobileScreen(screen as IdeaMobileScreen);
      if (itemId) setSelectedIdeaId(itemId);
    } else if (mode === 'idea-web' && screen) {
      setActiveIdeaWebScreen(screen as IdeaWebScreen);
      if (itemId) setSelectedIdeaId(itemId);
    }
  };

  // HSE Actions
  const createHseReport = (reportData: Partial<HseReport>): HseReport => {
    const nextNumber = 2452 + (hseReports.length - INITIAL_HSE_REPORTS.length);
    const newId = `#${nextNumber}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} ${now.getFullYear()} à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newReport: HseReport = {
      id: newId,
      title: reportData.title || 'Signalement terrain sans titre',
      category: reportData.category || 'Sécurité',
      severity: reportData.severity || 'Moyenne',
      location: reportData.location || 'Atelier Découpe Cuir',
      description: reportData.description || '',
      reporterName: reportData.reporterName || currentUser.name,
      reporterMatricule: reportData.reporterMatricule || currentUser.matricule,
      reporterRole: reportData.reporterRole || currentUser.role,
      reportedAt: dateFormatted,
      createdAtTimestamp: Date.now(),
      deadlineHours: 12,
      assignedTo: reportData.assignedTo || 'Équipe HSE & Maintenance',
      status: 'Nouveau',
      dueDate: `${now.getDate() + 1}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`,
      imageUrl: reportData.imageUrl,
      escalationLogs: [
        {
          id: `log-${Date.now()}-1`,
          timestamp: dateFormatted,
          message: `Signalement créé. Notification e-mail immédiate transmise au Responsable HSE (S. Lemmari) et Manager Qualité en copie (A. Sdiri). SLA 12h activé.`,
          level: 'info',
        },
      ],
    };

    setHseReports(prev => [newReport, ...prev]);
    setSelectedHseReportId(newId);
    showToast(`Signalement ${newId} créé avec succès (SLA 12h actif)`, 'success');
    return newReport;
  };

  const updateHseReport = (id: string, updates: Partial<HseReport>) => {
    setHseReports(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const now = new Date();
        const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const logs = [...r.escalationLogs];
        if (updates.status && updates.status !== r.status) {
          logs.push({
            id: `log-${Date.now()}`,
            timestamp: dateFormatted,
            message: `Statut mis à jour vers "${updates.status}" par ${currentUser.name}.`,
            level: updates.status === 'Escaladé DG' ? 'escalation' : updates.status === 'Résolu' ? 'success' : 'info',
          });
        }
        if (updates.assignedTo && updates.assignedTo !== r.assignedTo) {
          logs.push({
            id: `log-${Date.now()}-assign`,
            timestamp: dateFormatted,
            message: `Assigné à : ${updates.assignedTo} par ${currentUser.name}.`,
            level: 'info',
          });
        }

        return {
          ...r,
          ...updates,
          escalationLogs: logs,
        };
      })
    );
    showToast(`Signalement ${id} mis à jour`, 'info');
  };

  const resolveHseReport = (id: string, correctiveAction: string) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setHseReports(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        return {
          ...r,
          status: 'Résolu',
          correctiveAction,
          resolvedAt: dateFormatted,
          escalationLogs: [
            ...r.escalationLogs,
            {
              id: `log-${Date.now()}`,
              timestamp: dateFormatted,
              message: `✅ Signalement résolu et clôturé par ${currentUser.name}. Action corrective validée: ${correctiveAction}. Preuves archivées.`,
              level: 'success',
            },
          ],
        };
      })
    );
    showToast(`Signalement ${id} clôturé avec succès`, 'success');
  };

  // Rule 12h Escalation Simulator (Slide 8 & 9)
  const simulate12hEscalation = (id: string) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} à ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setHseReports(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        return {
          ...r,
          status: 'Escaladé DG',
          // shift timestamp backward so it shows > 12h
          createdAtTimestamp: Date.now() - (13.5 * 3600 * 1000),
          escalationLogs: [
            ...r.escalationLogs,
            {
              id: `log-${Date.now()}`,
              timestamp: dateFormatted,
              message: `⚠️ ESCALADE AUTOMATIQUE AU DIRECTEUR GÉNÉRAL : Dépassement critique du délai SLA de 12h sans clôture ! Alerte transmise avec priorité haute à Raouf Mejri (Directeur Général) et Afef Sdiri (Manager Qualité).`,
              level: 'escalation',
            },
          ],
        };
      })
    );
    showToast(`⚠️ Alerte ${id} : Escalade automatique transmise au Directeur Général !`, 'alert');
  };

  // Idea Box Actions
  const createIdea = (data: Partial<Idea>): Idea => {
    const nextNumber = 107 + (ideas.length - INITIAL_IDEAS.length);
    const newId = `#IB-${nextNumber}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} ${now.getFullYear()}`;

    const newIdea: Idea = {
      id: newId,
      title: data.title || 'Nouvelle idée d\'amélioration',
      category: data.category || 'Productivité',
      description: data.description || '',
      authorName: data.authorName || currentUser.name,
      authorMatricule: data.authorMatricule || currentUser.matricule,
      authorDepartment: data.authorDepartment || currentUser.department,
      submittedAt: dateFormatted,
      createdAtTimestamp: Date.now(),
      votesCount: 1,
      hasVoted: true,
      comments: [],
      status: 'En attente',
      imageUrl: data.imageUrl,
    };

    setIdeas(prev => [newIdea, ...prev]);
    setSelectedIdeaId(newId);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
    showToast(`Idée ${newId} soumise avec succès à l'équipe innovation !`, 'success');
    return newIdea;
  };

  // Slide 11: Nouveauté sans mot de passe (Accès direct matricule)
  const submitIdeaByMatricule = (
    matricule: string, 
    title: string, 
    category: string, 
    description: string, 
    imageUrl?: string
  ): Idea => {
    // Lookup user by matricule or generate operator identity
    const knownUser = INITIAL_USERS.find(u => u.matricule.toLowerCase() === matricule.trim().toLowerCase());
    const authorName = knownUser ? knownUser.name : `Collaborateur terrain (${matricule.trim().toUpperCase()})`;
    const authorDepartment = knownUser ? knownUser.department : 'Production Atelier Cuir';

    const nextNumber = 107 + (ideas.length - INITIAL_IDEAS.length);
    const newId = `#IB-${nextNumber}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} ${now.getFullYear()}`;

    const newIdea: Idea = {
      id: newId,
      title,
      category,
      description,
      authorName,
      authorMatricule: matricule.trim().toUpperCase(),
      authorDepartment,
      submittedAt: dateFormatted,
      createdAtTimestamp: Date.now(),
      votesCount: 1,
      hasVoted: true,
      comments: [],
      status: 'En attente',
      imageUrl,
    };

    setIdeas(prev => [newIdea, ...prev]);
    setSelectedIdeaId(newId);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    showToast(`Idée ${newId} transmise pour le matricule ${matricule.toUpperCase()} !`, 'success');
    return newIdea;
  };

  const toggleVoteIdea = (id: string) => {
    setIdeas(prev =>
      prev.map(i => {
        if (i.id !== id) return i;
        const willVote = !i.hasVoted;
        return {
          ...i,
          votesCount: willVote ? i.votesCount + 1 : Math.max(0, i.votesCount - 1),
          hasVoted: willVote,
        };
      })
    );
  };

  const addIdeaComment = (ideaId: string, content: string) => {
    if (!content.trim()) return;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} ${now.getFullYear()}`;

    setIdeas(prev =>
      prev.map(i => {
        if (i.id !== ideaId) return i;
        return {
          ...i,
          comments: [
            ...i.comments,
            {
              id: `comment-${Date.now()}`,
              authorName: currentUser.name,
              matricule: currentUser.matricule,
              date: dateFormatted,
              content: content.trim(),
            },
          ],
        };
      })
    );
    showToast('Commentaire ajouté', 'info');
  };

  const evaluateIdea = (
    ideaId: string, 
    status: IdeaStatus, 
    score: number, 
    feasibility: IdeaFeasibility, 
    note: string, 
    actionPlan?: string
  ) => {
    setIdeas(prev =>
      prev.map(i => {
        if (i.id !== ideaId) return i;
        return {
          ...i,
          status,
          score,
          feasibility,
          evaluatedBy: currentUser.name,
          evaluationNote: note,
          actionPlan,
        };
      })
    );
    showToast(`Évaluation de l'idée ${ideaId} enregistrée (Statut: ${status})`, 'success');
  };

  // Cross-link: Create an improvement idea directly derived from an HSE Incident
  const createIdeaFromHseIncident = (hseReportId: string) => {
    const report = hseReports.find(r => r.id === hseReportId);
    if (!report) return;

    const nextNumber = 107 + (ideas.length - INITIAL_IDEAS.length);
    const newIdeaId = `#IB-${nextNumber}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', { month: 'short' })} ${now.getFullYear()}`;

    const newIdea: Idea = {
      id: newIdeaId,
      title: `Prévention & Sécurisation suite à ${report.id} (${report.title})`,
      category: report.category === 'Sécurité' ? 'Sécurité & Ergonomie' : 'Productivité',
      description: `Action d'amélioration continue préventive pour l'îlot « ${report.location} » suite au signalement ${report.id} (${report.description}). Objectif : fiabiliser durablement l'équipement pour éviter toute récidive.`,
      authorName: currentUser.name,
      authorMatricule: currentUser.matricule,
      authorDepartment: currentUser.department,
      submittedAt: dateFormatted,
      createdAtTimestamp: Date.now(),
      votesCount: 1,
      hasVoted: true,
      comments: [
        {
          id: `c-init-${Date.now()}`,
          authorName: 'Système Traçabilité Mitech',
          date: dateFormatted,
          content: `Liaison automatique établie avec le signalement HSE ${report.id} du ${report.reportedAt}.`,
        },
      ],
      status: 'En étude',
      relatedHseReportId: report.id,
      imageUrl: report.imageUrl,
    };

    // Also update report with relatedIdeaId
    setHseReports(prev =>
      prev.map(r => r.id === hseReportId ? { ...r, relatedIdeaId: newIdeaId } : r)
    );

    setIdeas(prev => [newIdea, ...prev]);
    setSelectedIdeaId(newIdeaId);
    setActiveIdeaWebScreen('detail');
    setMode('idea-web');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    showToast(`Idée ${newIdeaId} générée et liée au signalement ${report.id} !`, 'success');
  };

  const openRelatedHseReport = (reportId: string) => {
    setSelectedHseReportId(reportId);
    setActiveHseWebScreen('detail');
    setMode('hse-web');
    showToast(`Navigation vers le signalement lié ${reportId}`, 'info');
  };

  const openRelatedIdea = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setActiveIdeaWebScreen('detail');
    setMode('idea-web');
    showToast(`Navigation vers l'idée liée ${ideaId}`, 'info');
  };

  const resetToZero = () => {
    setHseReports([]);
    setIdeas([]);
    setSelectedHseReportId('');
    setSelectedIdeaId('');
    localStorage.setItem('mitech_hse_reports', JSON.stringify([]));
    localStorage.setItem('mitech_ideas', JSON.stringify([]));
    showToast('Toutes les informations ont été remises à 0 (0 incident, 0 retard SLA, 0 idée)', 'info');
  };

  const loadDemoData = () => {
    setHseReports(INITIAL_HSE_REPORTS);
    setIdeas(INITIAL_IDEAS);
    setSelectedHseReportId('#2451');
    setSelectedIdeaId('#IB-101');
    localStorage.setItem('mitech_hse_reports', JSON.stringify(INITIAL_HSE_REPORTS));
    localStorage.setItem('mitech_ideas', JSON.stringify(INITIAL_IDEAS));
    showToast('Données d\'exemple chargées pour démonstration', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentMode,
        setMode,
        isDrawerOpen,
        setIsDrawerOpen,
        appTheme,
        setAppTheme,
        topNavTheme,
        setTopNavTheme,
        currentUser,
        setCurrentUser,
        availableUsers: INITIAL_USERS,
        hseReports,
        activeHseMobileScreen,
        setActiveHseMobileScreen,
        activeHseWebScreen,
        setActiveHseWebScreen,
        selectedHseReportId,
        setSelectedHseReportId,
        createHseReport,
        updateHseReport,
        resolveHseReport,
        simulate12hEscalation,
        ideas,
        activeIdeaMobileScreen,
        setActiveIdeaMobileScreen,
        activeIdeaWebScreen,
        setActiveIdeaWebScreen,
        selectedIdeaId,
        setSelectedIdeaId,
        createIdea,
        submitIdeaByMatricule,
        toggleVoteIdea,
        addIdeaComment,
        evaluateIdea,
        jumpToScreen,
        createIdeaFromHseIncident,
        openRelatedHseReport,
        openRelatedIdea,
        resetToZero,
        loadDemoData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
