/**
 * Type Definitions
 *
 * Purpose: Shared TypeScript types and interfaces for Kameleon PRD Assistant
 */

// =============================================================================
// Enums
// =============================================================================

/**
 * Target audience for templates
 */
export enum TemplateAudience {
  ENGINEERING = 'ENGINEERING',
  PRODUCT = 'PRODUCT',
  LEADERSHIP = 'LEADERSHIP',
  CUSTOM = 'CUSTOM',
}

/**
 * Document status in the review workflow
 */
export enum DocumentStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
}

/**
 * Review status
 */
export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
}

// =============================================================================
// Domain Entities
// =============================================================================

/**
 * Axiom - Guiding principles for PRD content
 */
export interface Axiom {
  axiomId: string
  userId: string
  title: string
  content: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Template - Document structures tailored to audience type
 */
export interface Template {
  templateId: string
  userId: string
  name: string
  audience: TemplateAudience
  structure: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Persona preferences for calibration profiles
 */
export interface PersonaPreferences {
  tone: string
  length: string
  technicalDepth: string
  likes: string[]
  dislikes: string[]
}

/**
 * Example for persona calibration
 */
export interface PersonaExample {
  exampleId: string
  type: 'liked' | 'disliked' | 'before_after'
  content: string
  revisedContent?: string
  notes?: string
  createdAt: string
}

/**
 * Persona - Individual reviewer profiles built from real examples
 */
export interface Persona {
  personaId: string
  userId: string
  name: string
  role: string
  preferences: PersonaPreferences
  examples: PersonaExample[]
  createdAt: string
  updatedAt: string
}

/**
 * Document - PRD document being authored
 */
export interface Document {
  documentId: string
  userId: string
  title: string
  content: string
  templateId?: string
  personaId?: string
  status: DocumentStatus
  createdAt: string
  updatedAt: string
}

/**
 * Review - Feedback on a document
 */
export interface Review {
  reviewId: string
  documentId: string
  reviewerId: string
  feedback: string
  status: ReviewStatus
  createdAt: string
}

/**
 * User profile from /me endpoint
 */
export interface UserProfile {
  userId: string
  email: string
  name?: string
  subscriptionTier?: string
  createdAt?: string
  updatedAt?: string
}

// =============================================================================
// API Request Types
// =============================================================================

/**
 * Create axiom request
 */
export interface CreateAxiomRequest {
  title: string
  content: string
  isDefault?: boolean
}

/**
 * Update axiom request
 */
export interface UpdateAxiomRequest {
  title?: string
  content?: string
  isDefault?: boolean
}

/**
 * Create template request
 */
export interface CreateTemplateRequest {
  name: string
  audience: TemplateAudience
  structure: string
  isDefault?: boolean
}

/**
 * Update template request
 */
export interface UpdateTemplateRequest {
  name?: string
  audience?: TemplateAudience
  structure?: string
  isDefault?: boolean
}

/**
 * Create persona request
 */
export interface CreatePersonaRequest {
  name: string
  role: string
  preferences?: Partial<PersonaPreferences>
}

/**
 * Update persona request
 */
export interface UpdatePersonaRequest {
  name?: string
  role?: string
  preferences?: Partial<PersonaPreferences>
}

/**
 * Add example to persona request
 */
export interface AddPersonaExampleRequest {
  type: 'liked' | 'disliked' | 'before_after'
  content: string
  revisedContent?: string
  notes?: string
}

/**
 * Create document request
 */
export interface CreateDocumentRequest {
  title: string
  content?: string
  templateId?: string
  personaId?: string
}

/**
 * Update document request
 */
export interface UpdateDocumentRequest {
  title?: string
  content?: string
  templateId?: string
  personaId?: string
  status?: DocumentStatus
}

/**
 * Create review request
 */
export interface CreateReviewRequest {
  documentId: string
  feedback: string
  status: ReviewStatus
}

/**
 * Update review request
 */
export interface UpdateReviewRequest {
  feedback?: string
  status?: ReviewStatus
}

// =============================================================================
// API Response Types
// =============================================================================

/**
 * List response wrapper
 */
export interface ListResponse<T> {
  items: T[]
  nextToken?: string
  total?: number
}

/**
 * API error response
 */
export interface ApiError {
  message: string
  code?: string
  statusCode?: number
}

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  data: T
  message?: string
}
