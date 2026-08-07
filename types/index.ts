// ============================================================================
// TYPES — Ministério Efraim
// Cada interface aqui corresponde a uma entidade descrita nos Requisitos
// Funcionais (RF01–RF12) da especificação do projeto.
// ============================================================================

// ---- Navegação (RF01) ------------------------------------------------------

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

// ---- Eventos / Agenda (RF02) -----------------------------------------------

export type EventType = "culto" | "reuniao" | "especial";

export interface ChurchEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  date: Date;
  endDate?: Date;
  location?: string;
  imageUrl?: string;
}

// ---- Mensagens (RF03) -------------------------------------------------------

export type MessageCategory =
  | "cultos"
  | "lideranca"
  | "especiais"
  | "kids-teens";

export interface SermonMessage {
  id: string;
  title: string;
  description?: string;
  category: MessageCategory;
  series?: string;
  preacher: string;
  date: Date;
  thumbnailUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  viewCount?: number;
}

// ---- Localização (RF04) -----------------------------------------------------

export interface ServiceSchedule {
  id: string;
  label: string; // ex: "Culto de Celebração"
  weekday: string; // ex: "Domingo"
  time: string; // ex: "9h"
}

export interface ChurchLocation {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

// ---- Doações (RF05) ---------------------------------------------------------

export type DonationMethod = "pix" | "cartao" | "transferencia";
export type DonationStatus = "pendente" | "confirmada" | "falhou";

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  method: DonationMethod;
  status: DonationStatus;
  createdAt: Date;
}

// ---- Life Groups (RF06) ------------------------------------------------------

export interface LifeGroup {
  id: string;
  name: string;
  leaderName: string;
  neighborhood: string;
  weekday: string;
  time: string;
  capacity?: number;
  currentMembers?: number;
  description?: string;
}

export interface LifeGroupInterest {
  name: string;
  email: string;
  phone: string;
  lifeGroupId?: string;
  message?: string;
}

// ---- Voluntariado (RF07) -----------------------------------------------------

export type VolunteerStatus = "pendente" | "aprovado" | "recusado";

export interface VolunteerArea {
  id: string;
  name: string;
  description?: string;
}

export interface VolunteerApplication {
  name: string;
  email: string;
  phone: string;
  areaId: string;
  availability: string;
  status?: VolunteerStatus;
}

// ---- Oração (RF08) ------------------------------------------------------------

export type PrayerRequestStatus = "novo" | "em_oracao" | "atendido";

export interface PrayerRequest {
  id: string;
  name?: string;
  contact?: string;
  request: string;
  isPublicTestimony: boolean;
  status: PrayerRequestStatus;
  createdAt: Date;
}

// ---- Contato (RF09) -----------------------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// ---- Newsletter (RF10) ---------------------------------------------------------

export interface NewsletterSubscription {
  email: string;
  confirmed: boolean;
}

// ---- Páginas institucionais (RF11) ----------------------------------------------

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
}

// ---- Área administrativa (RF12) -------------------------------------------------

export type UserRole = "admin" | "editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ---- UI compartilhada -------------------------------------------------------------

export type BadgeVariant = "primary" | "gold" | "emerald" | "neutral";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
