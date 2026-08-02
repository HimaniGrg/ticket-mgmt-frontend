# Ticket Management System (TicketMS)- Frontend

A modern Ticket Management System frontend built with **Vue 3**, **Vite**, **Pinia**, **Vue Router**, **Axios**, and **shadcn-vue**. The application provides an intuitive interface for managing support tickets with secure authentication and responsive UI.

---

# Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Environment Variables
- Running the Project
- Build for Production
- Authentication Flow
- Routing
- State Management
- API Integration
- Folder Structure
- Development Guidelines
- Future Improvements

---

# Overview

This project is the frontend of the Ticket Management System. It communicates with the Laravel backend through REST APIs.

The frontend is responsible for:

- User Authentication
- Dashboard
- Ticket Management
- Role-based Navigation
- API Communication
- State Management
- Responsive UI

---

# Features

## Authentication

- Login
- Register
- Logout
- Persistent Login
- Protected Routes

---

## Dashboard

Displays:

- Total Tickets
- Open Tickets
- Pending Tickets
- Closed Tickets

---

## Ticket Management

Users can

- View Tickets
- Search Tickets
- Filter Tickets
- View Ticket Details
- Create Tickets *(Future)*
- Update Tickets *(Future)*

---

## User Experience

- Responsive Design
- Light/Dark Theme
- Loading Indicators
- Error Handling
- Toast Notifications *(Future)*

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | Frontend Framework |
| Vite | Build Tool |
| Vue Router | Routing |
| Pinia | State Management |
| Axios | HTTP Client |
| shadcn-vue | UI Components |
| Tailwind CSS | Styling |

---

# Project Structure

```
src
│
├── api
│   └── axios.js
│
├── assets
│
├── components
│   ├── ui
│   ├── Sidebar.vue
│   ├── Navbar.vue
│   └── ...
│
├── layouts
│   ├── AppLayout.vue
│   └── AuthLayout.vue
│
├── router
│   └── index.js
│
├── services
│   ├── authService.js
│   └── ticketService.js
│
├── stores
│   ├── auth.js
│   └── ticket.js
│
├── views
│   ├── auth
│   │   ├── Login.vue
│   │   └── Register.vue
│   │
│   ├── dashboard
│   │   └── Dashboard.vue
│   │
│   └── ticket
│       ├── TicketList.vue
│       └── TicketDetails.vue
│
├── App.vue
└── main.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go into the project directory

```bash
cd ticket-frontend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

Example

```env
VITE_API_URL=http://localhost:8000/api
```

Example when backend runs on Docker

```env
VITE_API_URL=http://localhost/api
```

---

# Running the Project

Start the development server

```bash
npm run dev
```

Application will be available at

```
http://localhost:5173
```

---

# Production Build

Generate production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Authentication Flow

1. User enters credentials.

2. Login request is sent to Laravel API.

3. Backend returns

- User information
- Access Token

4. Token is stored in Local Storage.

5. Pinia updates authentication state.

6. Axios automatically attaches token to every request.

7. Protected pages become accessible.

---

# Routing

The application uses **Vue Router**.

Example routes

| Route | Description |
|--------|-------------|
| /login | Login Page |
| /register | Register Page |
| /dashboard | Dashboard |
| /tickets | Ticket List |
| /tickets/:id | Ticket Details |

Protected routes require authentication.

---

# State Management

The application uses **Pinia**.

Example stores

## Auth Store

Responsible for

- Login
- Logout
- Current User
- Authentication Status
- Token Storage

---

## Ticket Store *(Optional)*

Responsible for

- Ticket List
- Selected Ticket
- Loading State
- Filters

---

# API Integration

HTTP communication is handled using Axios.

A dedicated Axios instance is configured with

- Base URL
- Authorization Token
- Request Interceptors
- Response Interceptors
- Error Handling

Service classes are responsible for API calls.

Example

```
services/
    authService.js
    ticketService.js
```

This keeps business logic separate from Vue components.

---

# Folder Responsibilities

## api/

Contains Axios configuration.

---

## services/

Contains reusable API functions.

---

## stores/

Contains Pinia stores.

---

## router/

Defines all application routes and navigation guards.

---

## layouts/

Reusable page layouts.

Example

- App Layout
- Authentication Layout

---

## components/

Reusable UI components.

Example

- Sidebar
- Navbar
- Cards
- Buttons
- Tables

---

## views/

Contains pages displayed through Vue Router.

---

# Development Guidelines

## Components

- Keep components reusable.
- Keep components small.
- Avoid duplicate code.

---

## API Calls

Do not make API requests directly inside components whenever possible.

Instead

```
Component
     ↓

Service

     ↓

Axios

     ↓

Backend API
```

---

## State

Global data should be stored inside Pinia.

Avoid unnecessary prop drilling.

---

## Routing

Use navigation guards for protected pages.

---

## Styling

Use:

- shadcn-vue components
- Tailwind utility classes
- Responsive layouts
- Consistent spacing

---

# Error Handling

The application handles

- Unauthorized Requests (401)
- Validation Errors (422)
- Server Errors (500)
- Network Errors

Axios interceptors are used for centralized error handling.

---

# Future Improvements

- Role-based authorization
- Ticket Assignment
- Ticket Comments
- Attachments
- Email Notifications
- Real-time Updates
- Dashboard Charts
- User Profile
- Password Reset
- Pagination
- Sorting
- Advanced Filtering
- Unit Testing
- End-to-End Testing
- Internationalization (i18n)

---

# Contributing

1. Create a new branch.

```bash
git checkout -b feature/new-feature
```

2. Commit your changes.

```bash
git commit -m "Added new feature"
```

3. Push your branch.

```bash
git push origin feature/new-feature
```

4. Create a Pull Request.

---

# License

This project is intended for educational and organizational use. Update this section with your preferred license if the project becomes open source.