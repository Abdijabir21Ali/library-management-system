# Library Management System

A full-stack Library Management System developed as part of the Power Learn Project (PLP) Software Engineering program.

The application is designed to simplify library operations by providing functionality for managing books, organising genres, handling user accounts, managing reading lists, tracking borrowing requests and booking study spaces.

## Technology Stack

**Backend**

- [NestJS](https://nestjs.com/) – Node.js backend framework.
- [TypeScript](https://www.typescriptlang.org/) – Programming language.
- [Prisma ORM](https://www.prisma.io/) – Database access and management.
- [PostgreSQL](https://www.postgresql.org/) – Relational database.

**Frontend (planned)**

- [React](https://react.dev/) – User interface development.

## Project Structure

```text
library-management-system/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .env.example
├── package.json
└── README.md
```

## Database Schema

The database is designed using Prisma ORM and PostgreSQL.

The initial database schema consists of three core models:

- **User:** Stores user information and their assigned roles.
- **Genre:** Stores book categories and genre information.
- **Book:** Stores book details and references its associated genre.

### Schema Decisions

The Book model references the Genre model through a foreign key called `genreId` rather than embedding genre information directly inside each Book record.

This design follows relational database principles and establishes a one-to-many relationship between Genre and Book. One genre can be associated with multiple books, while each book belongs to one genre.

Separating genres into their own model avoids unnecessary duplication of genre information, improves data consistency and makes it easier to manage and update book categories independently.

The relationship is implemented in Prisma using `@relation`, with `genreId` referencing the primary key of the Genre model.

The User model uses a Role enum with two possible values:

- `PATRON` – Represents a regular library user.
- `LIBRARIAN` – Represents a library administrator responsible for managing library resources.

Using an enum ensures that user roles are restricted to predefined values and provides a foundation for role-based access control.

## Database Seeding

The Prisma seed script populates the database with initial data for development and testing.

It includes:

- At least four book genres.
- Sixteen sample books distributed across the genres.
- Sample user records.

The seed script uses upsert operations to avoid unnecessary duplicate records when it is executed repeatedly.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- PostgreSQL database
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Abdijabir21Ali/library-management-system.git
```

Navigate to the API project directory (if the repository uses an `api/` subdirectory):

```bash
cd library-management-system/api
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file using `.env.example` as a reference.

Configure your PostgreSQL database connection:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Do not commit your actual `.env` file or database credentials to GitHub.

### Database Migration

Apply the Prisma migrations:

```bash
npx prisma migrate dev
```

### Seed the Database

Populate the database:

```bash
npx prisma db seed
```

### Run the Application

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

### Run Tests

```bash
npm run test
```

## Development Roadmap

The project is being developed progressively through the following stages:

- **Week 1:** Database foundations, Prisma modelling, PostgreSQL integration and initial data seeding.
- **Week 2:** Backend CRUD operations, validation, authentication and role-based authorisation.
- **Week 3:** React book catalogue, search and book display.
- **Week 4:** Reading list management and study space booking interface.
- **Week 5:** Borrow request tracking, booking transactions and administrative functionality.
- **Week 6:** Testing, integration and deployment.

## License

This project is developed for educational purposes as part of the Power Learn Project Software Engineering program.
