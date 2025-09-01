# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.0 board application using React 19 and MongoDB for data persistence. The project uses the App Router architecture and includes functionality for creating, reading, editing, and managing blog posts.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build production application with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

### Database Connection
- MongoDB connection is managed in `app/util/database.js`
- Uses connection caching in development environment to prevent multiple connections
- Database name: "board", collection: "post"
- Connection string includes MongoDB Atlas cluster details

### App Router Structure
- `app/page.js` - Home page
- `app/list/page.js` - Display all blog posts from MongoDB
- `app/list/listItem.js` - Client component for individual post items
- `app/write/page.js` - Form for creating new posts
- `app/edit/[id]/page.js` - Edit existing posts
- `app/detail/[id]/page.js` - Display individual post details
- `app/layout.js` - Root layout with Geist fonts

### API Routes
- `app/api/post/new/route.js` - Handle new post creation
- `app/api/post/edit/route.js` - Handle post editing
- `app/api/test/route.js` - Test API endpoint

### Key Patterns
- Server components for data fetching (list, detail pages)
- Client components for interactivity (listItem.js)
- MongoDB ObjectId conversion to string for client-side serialization
- Form submissions use traditional form actions to API routes

## Configuration

- **ESLint**: Configured with Next.js core web vitals
- **TypeScript**: Basic configuration with path aliases (`@/*` maps to root)
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Turbopack**: Enabled for faster development and builds

## Database Schema

Posts collection structure:
- `_id`: MongoDB ObjectId (converted to string for client)
- `title`: Post title
- `content`: Post content
- Additional fields may exist based on form submissions

## Development Notes

- Uses path alias `@/` for imports from project root
- Server-side rendering for most pages
- MongoDB connection is cached in development to avoid reconnection issues
- All database operations are async/await based