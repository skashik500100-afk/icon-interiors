# ICON INTERIORS — SPRING BOOT & POSTGRESQL BACKEND

## Overview
Enterprise full-stack backend built with **Java 21 LTS**, **Spring Boot 3.3.4**, **Spring Security (JWT)**, and **PostgreSQL 18**.

---

## Database Configuration

1. **Database Name**: `icon_interiors_db`
2. **Port**: `5432`
3. **Credentials**: `postgres` / `postgres` (or edit in `src/main/resources/application.properties`)

### Setup Database in PostgreSQL 18:
Open PowerShell or pgAdmin and run:
```sql
CREATE DATABASE icon_interiors_db;
```
When the Spring Boot application boots, it automatically executes:
- `src/main/resources/schema.sql` (Creates all tables: users, categories, designs, enquiries, quotations, store_locations)
- `src/main/resources/data.sql` (Seeds 11 official categories, Guntur flagship studio, sample designs, and admin account)

---

## Default Admin Credentials
- **Email**: `admin@iconinteriors.com`
- **Password**: `IconAdmin@2026`
- **Role**: `ROLE_ADMIN`

---

## How to Run the Backend

### Option A: Using Maven (from `backend/` folder)
```bash
cd backend
mvn spring-boot:run
```

### Option B: Using VS Code or IntelliJ IDEA
1. Open the project folder in VS Code or IntelliJ IDEA.
2. Navigate to `backend/src/main/java/com/iconinteriors/IconInteriorsApplication.java`.
3. Click **Run** or press `F5`.

The backend server runs on `http://localhost:8080`.

---

## REST Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate customer or admin and issue JWT |
| `POST` | `/api/v1/auth/register` | Register new customer account |
| `GET` | `/api/v1/designs` | Browse and filter designs by category, style, budget |
| `GET` | `/api/v1/designs/{id}` | Get design details by ID |
| `POST` | `/api/v1/enquiries` | Submit consultation enquiry |
| `POST` | `/api/v1/estimator/calculate` | Instant interior cost calculation |
| `POST` | `/api/v1/admin/designs/{id}/upload-photo` | Upload real interior photograph to design card |

