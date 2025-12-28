/**
 * API Client
 *
 * Purpose: Centralized API communication with the Kameleon backend
 *
 * Features:
 * - Base API configuration
 * - Authentication token injection via Cognito
 * - Error handling
 * - Type-safe API methods
 */

import { getIdToken } from './auth'
import type {
  Axiom,
  Template,
  Persona,
  Document,
  Review,
  UserProfile,
  CreateAxiomRequest,
  UpdateAxiomRequest,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  CreatePersonaRequest,
  UpdatePersonaRequest,
  AddPersonaExampleRequest,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  CreateReviewRequest,
  UpdateReviewRequest,
  ListResponse,
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
}

/**
 * Custom API error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Make an authenticated API request
 * Returns the response data directly (backend returns data without wrapper)
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  // Get ID token from Cognito (required by API Gateway Cognito authorizer)
  const authToken = await getIdToken()

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (authToken) {
    requestHeaders['Authorization'] = `Bearer ${authToken}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: requestHeaders,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(
      error.message || `API Error: ${response.status}`,
      response.status,
      error.code
    )
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

// =============================================================================
// Axioms API
// =============================================================================

/**
 * API methods for axioms
 */
export const axiomsApi = {
  /**
   * List all axioms for the current user
   */
  list: (params?: { limit?: number; nextToken?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.nextToken) searchParams.set('nextToken', params.nextToken)
    const query = searchParams.toString()
    return apiRequest<ListResponse<Axiom>>(`/axioms${query ? `?${query}` : ''}`)
  },

  /**
   * Get a single axiom by ID
   */
  get: (axiomId: string) => apiRequest<{ axiom: Axiom }>(`/axioms/${axiomId}`),

  /**
   * Create a new axiom
   */
  create: (data: CreateAxiomRequest) =>
    apiRequest<{ axiom: Axiom }>('/axioms', {
      method: 'POST',
      body: data,
    }),

  /**
   * Update an existing axiom
   */
  update: (axiomId: string, data: UpdateAxiomRequest) =>
    apiRequest<{ axiom: Axiom }>(`/axioms/${axiomId}`, {
      method: 'PUT',
      body: data,
    }),

  /**
   * Delete an axiom
   */
  delete: (axiomId: string) =>
    apiRequest<void>(`/axioms/${axiomId}`, { method: 'DELETE' }),
}

// =============================================================================
// Templates API
// =============================================================================

/**
 * API methods for templates
 */
export const templatesApi = {
  /**
   * List all templates for the current user
   */
  list: (params?: { audience?: string; limit?: number; nextToken?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.audience) searchParams.set('audience', params.audience)
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.nextToken) searchParams.set('nextToken', params.nextToken)
    const query = searchParams.toString()
    return apiRequest<ListResponse<Template>>(`/templates${query ? `?${query}` : ''}`)
  },

  /**
   * Get a single template by ID
   */
  get: (templateId: string) =>
    apiRequest<{ template: Template }>(`/templates/${templateId}`),

  /**
   * Create a new template
   */
  create: (data: CreateTemplateRequest) =>
    apiRequest<{ template: Template }>('/templates', {
      method: 'POST',
      body: data,
    }),

  /**
   * Update an existing template
   */
  update: (templateId: string, data: UpdateTemplateRequest) =>
    apiRequest<{ template: Template }>(`/templates/${templateId}`, {
      method: 'PUT',
      body: data,
    }),

  /**
   * Delete a template
   */
  delete: (templateId: string) =>
    apiRequest<void>(`/templates/${templateId}`, { method: 'DELETE' }),
}

// =============================================================================
// Personas API
// =============================================================================

/**
 * API methods for personas
 */
export const personasApi = {
  /**
   * List all personas for the current user
   */
  list: (params?: { limit?: number; nextToken?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.nextToken) searchParams.set('nextToken', params.nextToken)
    const query = searchParams.toString()
    return apiRequest<ListResponse<Persona>>(`/personas${query ? `?${query}` : ''}`)
  },

  /**
   * Get a single persona by ID
   */
  get: (personaId: string) =>
    apiRequest<{ persona: Persona }>(`/personas/${personaId}`),

  /**
   * Create a new persona
   */
  create: (data: CreatePersonaRequest) =>
    apiRequest<{ persona: Persona }>('/personas', {
      method: 'POST',
      body: data,
    }),

  /**
   * Update an existing persona
   */
  update: (personaId: string, data: UpdatePersonaRequest) =>
    apiRequest<{ persona: Persona }>(`/personas/${personaId}`, {
      method: 'PUT',
      body: data,
    }),

  /**
   * Delete a persona
   */
  delete: (personaId: string) =>
    apiRequest<void>(`/personas/${personaId}`, { method: 'DELETE' }),

  /**
   * Add an example to a persona
   */
  addExample: (personaId: string, data: AddPersonaExampleRequest) =>
    apiRequest<{ persona: Persona }>(`/personas/${personaId}/examples`, {
      method: 'POST',
      body: data,
    }),

  /**
   * Remove an example from a persona
   */
  removeExample: (personaId: string, exampleId: string) =>
    apiRequest<{ persona: Persona }>(`/personas/${personaId}/examples/${exampleId}`, {
      method: 'DELETE',
    }),
}

// =============================================================================
// Documents API
// =============================================================================

/**
 * API methods for documents
 */
export const documentsApi = {
  /**
   * List all documents for the current user
   */
  list: (params?: { status?: string; limit?: number; nextToken?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.nextToken) searchParams.set('nextToken', params.nextToken)
    const query = searchParams.toString()
    return apiRequest<ListResponse<Document>>(`/documents${query ? `?${query}` : ''}`)
  },

  /**
   * Get a single document by ID
   */
  get: (documentId: string) =>
    apiRequest<{ document: Document }>(`/documents/${documentId}`),

  /**
   * Create a new document
   */
  create: (data: CreateDocumentRequest) =>
    apiRequest<{ document: Document }>('/documents', {
      method: 'POST',
      body: data,
    }),

  /**
   * Update an existing document
   */
  update: (documentId: string, data: UpdateDocumentRequest) =>
    apiRequest<{ document: Document }>(`/documents/${documentId}`, {
      method: 'PUT',
      body: data,
    }),

  /**
   * Delete a document
   */
  delete: (documentId: string) =>
    apiRequest<void>(`/documents/${documentId}`, { method: 'DELETE' }),

  /**
   * Submit a document for review
   */
  submit: (documentId: string) =>
    apiRequest<{ document: Document; message: string }>(`/documents/${documentId}/submit`, {
      method: 'POST',
    }),

  /**
   * Get all reviews for a document
   */
  getReviews: (documentId: string) =>
    apiRequest<{ reviews: Review[] }>(`/documents/${documentId}/reviews`),
}

// =============================================================================
// Reviews API
// =============================================================================

/**
 * API methods for reviews
 */
export const reviewsApi = {
  /**
   * Create a new review for a document
   */
  create: (data: CreateReviewRequest) =>
    apiRequest<{ review: Review }>('/reviews', {
      method: 'POST',
      body: data,
    }),

  /**
   * Update an existing review
   */
  update: (reviewId: string, data: UpdateReviewRequest) =>
    apiRequest<{ review: Review }>(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: data,
    }),
}

// =============================================================================
// Me API
// =============================================================================

/**
 * API methods for current user profile
 */
export const meApi = {
  /**
   * Get the current user's profile
   */
  get: () => apiRequest<{ user: UserProfile }>('/me'),
}

// =============================================================================
// Re-export types for convenience
// =============================================================================

export type {
  Axiom,
  Template,
  Persona,
  PersonaPreferences,
  PersonaExample,
  Document,
  Review,
  UserProfile,
  CreateAxiomRequest,
  UpdateAxiomRequest,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  CreatePersonaRequest,
  UpdatePersonaRequest,
  AddPersonaExampleRequest,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  CreateReviewRequest,
  UpdateReviewRequest,
  ListResponse,
} from '@/types'

export {
  TemplateAudience,
  DocumentStatus,
  ReviewStatus,
} from '@/types'
