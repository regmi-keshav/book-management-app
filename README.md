# Book Management Application

## Overview

This project is a full-stack application designed to manage a list of books. It features a backend built with FastAPI and PostgreSQL, and a frontend developed with React and Tailwind CSS. The application supports CRUD operations: Create, Read, Update, and Delete.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Usage](#usage)
5. [Endpoints](#endpoints)

## Getting Started

To get a copy of this project up and running on your local machine, follow these instructions.

### Prerequisites

- Python 3.7+
- Node.js 14+
- PostgreSQL
- `pip` for Python package management
- `npm` or `yarn` for JavaScript package management

## Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/regmi-keshav/book-management-app/
   cd backend
   ```

2. **Create a Virtual Environment and Install Dependencies:**

   ```bash
   python -m venv venv
   source venv/bin/    activate  # On  Windows use  `venv\Scripts\activa te`
   pip install -r  requirements.txt
   ```

3. **Configure PostgreSQL:**

   Update the `DATABASE_URL` in the `.env` file:

   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/bookdb
   ```

4. **Run the Backend Server:**
   Make sure you are under `\backend\app\` directory:
   ```bash
   fastapi dev main.py
   ```
   The backend will be running at `http://127.0.0.1:8000`.

## Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend Server:**

   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:3000`

## Usage

- Home Page: Displays the list of books. If no books are available, it shows a form to add a new book.
- Add Book: Use the form on the home page to add a new book.
- Update Book: Click "Edit" next to a book to update its details. Redirects to a form for editing.
- Delete Book: Click "Delete" next to a book to remove it from the list.

## Endpoints

#### Backend API Endpoints

The backend API provides several endpoints to manage books. Below is a detailed guide on how to use these endpoints, including instructions for testing them with Postman.

### 1. **GET /books**

#### Description:

Fetches a list of all available books.

#### Request:

- **Method**: GET
- **URL**: `http://127.0.0.1:8000/books`

#### Example Response:

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "published_date": "1925-04-10",
    "description": "A novel set in the Jazz Age."
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "published_date": "1949-06-08",
    "description": "A dystopian social science fiction novel."
  }
]
```

### 2. **POST /books**

#### Description:

Adds a new book to the database.

#### Request:

- **Method**: POST
- **URL**: `http://127.0.0.1:8000/books`
- **Headers**: `Content-Type: application/json`

#### Body: (raw JSON):

```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "published_date": "1960-07-11",
  "description": "A novel about racial injustice in the Deep South."
}
```

#### Example Response:

```json
{
  "id": 1,
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "published_date": "1960-07-11",
  "description": "A novel about racial injustice in the Deep South."
}
```

### 3. **GET /books/{id}**

#### Description:

Fetches the details of a specific book by its ID.

#### Request:

- **Method**: GET
- **URL**: `http://127.0.0.1:8000/books/{id}`
  Replace `{id}` with the actual book ID.

#### Example Response:

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "published_date": "1925-04-10",
  "description": "A novel set in the Jazz Age."
}
```

### 4. **PUT /books**

#### Description:

Updates the details of a specific book by its ID.

#### Request:

- **Method**: PUT
- **URL**: `http://127.0.0.1:8000/books/{id}`
- **Headers**: `Content-Type: application/json`

#### Body: (raw JSON):

```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "published_date": "1960-07-11",
  "description": "A novel about racial injustice in the Deep South."
}
```

#### Example Response:

```json
{
  "id": 1,
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "published_date": "1960-07-11",
  "description": "A novel about racial injustice in the Deep South."
}
```

### 5. **DELETE /books**

#### Description:

Deletes a specific book by its ID.

#### Request:

- **Method**: DELETE
- **URL**: `http://127.0.0.1:8000/books/{id}`

#### Example Response:

```json
{
  "detail": "Book deleted successfully."
}
```

#### Frontend Pages

- Home Page (`/`): Lists all books and provides options to add or update books.
- Add Book Page (`/add-book/`): Provides a form to add book's details.
- Update Book Page (`/update-book/:id`): Provides a form to update a specific book's details.
