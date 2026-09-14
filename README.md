# EKA — Enterprise Knowledge Assistant

> **Ask. Understand. Work Smarter.**

EKA (Enterprise Knowledge Assistant) is an enterprise-focused AI knowledge platform designed to help employees access reliable information from their organization's internal documents and knowledge base.

The system is being developed around a **Retrieval-Augmented Generation (RAG)** architecture, where AI responses will be grounded in company-provided documents rather than relying solely on general model knowledge.

---

## 🚧 Project Status

**Current Phase:** Frontend Development

The React frontend is currently being developed with the complete application structure, role-based interfaces, authentication flows, knowledge management screens, document management, search, chat, analytics, and organization management.

The **FastAPI backend and AI/RAG pipeline are currently under development** and will be integrated with the frontend in subsequent phases.

---

## 🎯 What is EKA?

In an enterprise environment, important information is often distributed across:

* Company policies
* Technical documentation
* Compliance documents
* Internal guidelines
* Department-specific knowledge
* Reports and other PDFs

Finding the correct information can be time-consuming.

EKA aims to provide a single interface where employees can **ask questions, search organizational knowledge, and access relevant documents**.

### Core Principle

> **EKA should answer from the organization's knowledge — not guess.**

---

## ✨ Key Features

### 🔐 Authentication & Onboarding

* Login and signup flows
* Forgot password flow
* Employee onboarding
* Enterprise-based joining
* Admin enterprise initialization
* Member invitation flow
* Pending approval flow
* Role-based access

### 👥 Role-Based Experience

EKA currently supports three primary roles:

| Role         | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| **Admin**    | Manage the organization, users, departments and knowledge             |
| **Manager**  | Manage and access knowledge relevant to their department              |
| **Employee** | Ask questions, search knowledge and access organizational information |

---

### 💬 Ask EKA

The Ask EKA interface is designed as the primary AI interaction layer.

Planned capabilities include:

* Natural-language questions
* Conversational interaction
* Chat history
* Document citations
* Context-aware responses
* Voice interaction
* Source references

---

### 📚 Knowledge Base

The Knowledge Base provides a structured interface for accessing organizational knowledge.

* Knowledge articles
* Knowledge cards
* Article details
* Related organizational information
* Department-specific knowledge

---

### 📄 Document Management

EKA provides an interface for managing organizational documents.

* Document listing
* Document details
* Document reader
* Upload documents
* Edit document information
* Archive documents
* Delete documents
* Document references

The document pipeline will later be connected to the backend ingestion and RAG system.

---

### 🔎 Semantic Search

EKA includes a dedicated search experience designed for intelligent knowledge discovery.

* Search results
* Search modes
* Search intelligence
* Document references
* Reference previews

The current frontend provides the interface; semantic retrieval will be implemented through the backend and vector search layer.

---

### 📊 Analytics

The analytics interface is designed to monitor organizational knowledge quality and usage.

* Knowledge gaps
* Document relationships
* Contradictions
* Knowledge/document matrices
* Visual analytics
* Retrieval and answer quality metrics

---

### 🏢 Organization Management

Administrators can manage organizational structure through the organization portal.

* User management
* Invite members
* Edit users
* View users
* Terminate users
* Department creation
* Department editing
* Assign department leads

---

## 🧠 Planned AI / RAG Architecture

The backend will eventually connect the frontend to an RAG pipeline.

```text
                    COMPANY DOCUMENTS
                           │
                           ▼
                  ┌─────────────────┐
                  │ Document Upload │
                  └────────┬────────┘
                           ▼
                  ┌─────────────────┐
                  │ Text Extraction │
                  └────────┬────────┘
                           ▼
                  ┌─────────────────┐
                  │ Chunking        │
                  └────────┬────────┘
                           ▼
                  ┌─────────────────┐
                  │   Embeddings    │
                  └────────┬────────┘
                           ▼
                  ┌─────────────────┐
                  │  Vector Store   │
                  └────────┬────────┘
                           │
                           │ Relevant Context
                           ▼
┌─────────────┐     ┌───────────────┐
│   Employee  │────▶│  EKA Backend  │
│   Question  │     │    FastAPI    │
└─────────────┘     └───────┬───────┘
                            ▼
                    ┌───────────────┐
                    │ Retrieval +   │
                    │ LLM Generation│
                    └───────┬───────┘
                            ▼
                    ┌───────────────┐
                    │ Grounded      │
                    │ Answer +      │
                    │ Citations     │
                    └───────────────┘
```

### Planned RAG Flow

**Upload → Extract → Chunk → Embed → Store → Retrieve → Generate → Cite**

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript / JSX
* CSS
* React Context
* Custom Hooks
* Component-based architecture

### Backend

* Python
* FastAPI
* REST APIs

### Database

* PostgreSQL

### AI / RAG

* Large Language Model API
* Text Embeddings
* Vector Database
* Retrieval-Augmented Generation

### Development

* Git
* GitHub
* VS Code

---

## 📁 Project Structure

```text
EKA/
│
├── backend/
│   └── # FastAPI backend — under development
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── analytics/
│       │   ├── auth/
│       │   ├── charts/
│       │   ├── chat/
│       │   ├── common/
│       │   ├── dashboard/
│       │   ├── documents/
│       │   ├── knowledge/
│       │   ├── layout/
│       │   ├── organization/
│       │   ├── search/
│       │   └── voice/
│       │
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       │   └── auth/
│       ├── routes/
│       ├── services/
│       └── styles/
│
├── .gitignore
└── README.md
```

### Frontend Architecture

The frontend follows a component-based structure:

```text
Pages
  │
  ├── use Components
  │
  ├── use Hooks
  │
  ├── use Context
  │
  └── use Services
          │
          ▼
      Backend API
```

* **Pages** handle complete application screens.
* **Components** contain reusable UI elements and feature-specific components.
* **Hooks** contain reusable frontend logic.
* **Context** manages application-wide state.
* **Services** provide the API/service layer.
* **Routes** manage application navigation.
* **Styles** contain the application's visual system.

---

## 🗺️ Development Roadmap

### Phase 1 — Frontend

* [x] React + Vite setup
* [x] Application layout
* [ ] Authentication screens
* [ ] Role-based dashboards
* [ ] Ask EKA interface
* [ ] Chat history interface
* [ ] Knowledge Base interface
* [ ] Document management interface
* [ ] Semantic search interface
* [ ] Analytics interface
* [ ] Organization management interface
* [ ] Settings
* [ ] Frontend ↔ backend integration

### Phase 2 — Backend

* [x] Python fundamentals
* [ ] HTTP fundamentals
* [ ] REST API fundamentals
* [ ] FastAPI
* [ ] API architecture
* [ ] Authentication APIs
* [ ] User / organization APIs
* [ ] Document APIs
* [ ] Search APIs
* [ ] Chat APIs

### Phase 3 — Database

* [ ] PostgreSQL setup
* [ ] Database schema
* [ ] User management
* [ ] Organizations
* [ ] Departments
* [ ] Documents
* [ ] Chat history
* [ ] Knowledge metadata

### Phase 4 — RAG Pipeline

* [ ] PDF processing
* [ ] Text extraction
* [ ] Document chunking
* [ ] Embeddings
* [ ] Vector database
* [ ] Semantic retrieval
* [ ] LLM integration
* [ ] Citation generation
* [ ] Grounding evaluation

### Phase 5 — Integration & Testing

* [ ] Connect React frontend to FastAPI
* [ ] Authentication integration
* [ ] Document ingestion integration
* [ ] Ask EKA integration
* [ ] Search integration
* [ ] Role-based authorization
* [ ] RAG evaluation
* [ ] Security testing
* [ ] Performance testing

### Phase 6 — Deployment

* [ ] Production configuration
* [ ] Frontend deployment
* [ ] Backend deployment
* [ ] Database deployment
* [ ] Environment configuration
* [ ] Monitoring

---

## 👥 Team

EKA is being developed as a **4-member final-year B.Tech Computer Science project**.

The project is divided into:

* Frontend Development
* Backend & API Development
* AI / RAG Development
* Integration, Testing & Documentation

---

## 📌 Project Vision

EKA aims to become an intelligent enterprise knowledge layer connecting employees with the information their organization already possesses.

Instead of searching through multiple PDFs, documents, and internal resources, employees should be able to simply ask EKA and receive a **relevant, traceable, and document-grounded answer**.

---

## 📄 License

EKA is currently being developed as an academic final-year project.
