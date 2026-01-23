# CONTEXT.md (Product Context)

## 1) Product overview

DocTalk Reservation is a B2B service designed to manage and operate hospital reservation workflows.
This repository contains the core implementation for that service.

## 2) Business characteristics

- B2B-oriented service
- Primarily used by internal operators and partner organizations
- Stability and data consistency are critical

## 3) Core domain concepts

- Hospital
- Reservation
- Product / Treatment
- Operating Schedule
- Slot

## 4) Authentication model

- JWT-based authentication
- Access Token: request authentication
- Refresh Token: reissuing Access Tokens

## 5) High-level flows

### Authentication

- Login → Access Token issued → Access Token expiration → Refresh Token reissue

### Reservation management

- Create / View / Update / Cancel reservations

## 6) Repository scope

- This repository focuses on a single service: DocTalk Reservation
- Role-specific rules are defined in directory-level `CLAUDE.md` files
