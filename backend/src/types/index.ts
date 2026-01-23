import { Request } from 'express';

// User roles
export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

// Message types
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file'
}

// Reservation status
export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

// Extended Express Request with user
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

// Socket authentication data
export interface SocketAuthData {
  userId: string;
  email: string;
  role: UserRole;
}
