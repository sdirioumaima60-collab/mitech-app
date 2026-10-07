export type NavigationMode = 
  | 'portal'
  | 'overview'
  | 'hse' 
  | 'idea' 
  | 'kiosk' 
  | 'hse-mobile' 
  | 'hse-web' 
  | 'idea-mobile' 
  | 'idea-web';

export type AppTheme = 'emerald' | 'navy' | 'ruby' | 'dark';

export type HseMobileScreen = 'login' | 'dashboard' | 'new-report' | 'history' | 'detail';
export type HseWebScreen = 'dashboard' | 'reports' | 'detail' | 'users';

export type IdeaMobileScreen = 'login' | 'matricule-quick' | 'feed' | 'new-idea' | 'my-ideas' | 'detail';
export type IdeaWebScreen = 'dashboard' | 'ideas' | 'detail' | 'categories';

export type HseCategory = 'Sécurité' | 'Hygiène' | 'Environnement' | 'Non-conformité';
export type HseSeverity = 'Critique' | 'Élevée' | 'Moyenne' | 'Faible';
export type HseStatus = 'Nouveau' | 'Assigné' | 'Intervention en cours' | 'Résolu' | 'Escaladé DG';

export interface EscalationLog {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'escalation' | 'success';
}

export interface HseReport {
  id: string; // e.g., '#2451'
  title: string;
  category: HseCategory;
  severity: HseSeverity;
  location: string;
  description: string;
  reporterName: string;
  reporterMatricule: string;
  reporterRole: string;
  reportedAt: string; // Formatted date string
  createdAtTimestamp: number; // epoch ms for 12h resolution calculation
  deadlineHours: number; // 12 hours fixed per SLA
  assignedTo: string;
  status: HseStatus;
  dueDate: string;
  internalNote?: string;
  correctiveAction?: string;
  imageUrl?: string;
  resolutionProofUrl?: string;
  resolvedAt?: string;
  escalationLogs: EscalationLog[];
  relatedIdeaId?: string; // Liaison directe vers une idée d'amélioration Idea Box
}

export type IdeaStatus = 'En attente' | 'En étude' | 'Acceptée' | 'Déployée' | 'Refusée';
export type IdeaFeasibility = 'Facile' | 'Moyen' | 'Complexe';

export interface IdeaComment {
  id: string;
  authorName: string;
  matricule?: string;
  date: string;
  content: string;
}

export interface Idea {
  id: string; // e.g., '#IB-101'
  title: string;
  category: string;
  description: string;
  authorName: string;
  authorMatricule: string;
  authorDepartment: string;
  submittedAt: string;
  createdAtTimestamp: number;
  votesCount: number;
  hasVoted?: boolean;
  comments: IdeaComment[];
  status: IdeaStatus;
  score?: number; // 1 to 5
  feasibility?: IdeaFeasibility;
  evaluatedBy?: string;
  evaluationNote?: string;
  actionPlan?: string;
  imageUrl?: string;
  relatedHseReportId?: string; // Liaison directe vers un signalement HSE associé
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  matricule: string;
  role: 'Responsable HSE' | 'Manager Qualité' | 'Directeur Général' | 'Responsable Innovation' | 'Opérateur Atelier';
  site: string;
  department: string;
}

export interface IdeaCategoryMeta {
  id: string;
  name: string;
  description: string;
  count: number;
  lead: string;
  color: string;
}
