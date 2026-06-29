# README.md

````markdown
# File Uploader

A full-stack cloud file management application built with Node.js, Express, Prisma, PostgreSQL, Passport.js, Multer, and Cloudinary.

Live Demo: (Add deployment link)

GitHub Repository:
https://github.com/adenya-arn/file_uploader

---

## Features

- User authentication
- Session-based login
- Secure password hashing using bcrypt
- Folder management
- Create folders
- Rename folders
- Delete folders
- Upload files into folders
- File validation
- File details page
- Download files
- Delete files
- Cloudinary cloud storage
- Protected routes
- Prisma ORM
- PostgreSQL database

---

## Built With

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Passport.js
- Express Session
- Multer
- Cloudinary
- EJS
- CSS
- JavaScript

---

## Installation

Clone the repository

```bash
git clone https://github.com/adenya-arn/file_uploader.git
```
````

Install dependencies

```bash
npm install
```

Create a `.env`

```env
DATABASE_URL=

SESSION_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Run Prisma migrations

```bash
npx prisma migrate dev
```

Start the server

```bash
npm run dev
```

---

## Database Schema

```
User
 ├── Folder
 │      └── File
```

Each user owns multiple folders.

Each folder contains multiple files.

Each file belongs to one folder.

---

## Project Structure

```
controllers/
config/
middleware/
db/
prisma/
routes/
views/
public/
uploads/
```

---

## Learning Outcomes

This project demonstrates experience with

- Authentication using Passport.js
- Session management
- Prisma ORM
- PostgreSQL
- CRUD operations
- File uploads
- Cloud storage
- Route protection
- MVC architecture
- Express middleware
- Database relationships

---

## Future Improvements

- Folder sharing with expiring links
- Search functionality
- Drag and drop uploads
- Multiple file uploads
- User profile page
- Cloudinary file deletion
- Responsive dashboard improvements

---

## Author

**Arnold Adenya**

GitHub:
[https://github.com/adenya-arn](https://github.com/adenya-arn)
