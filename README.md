# Learnfinity
# 🎓 Learnfinity – Online Learning Management System

A modern, full-featured Learning Management System (LMS) built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Stripe** for payments, **RTK Query** for API management, and beautiful UI using **TailwindCSS + Shadcn UI**. The system supports students and instructors with functionalities like course creation, video lectures, purchasing, progress tracking, and more.

---

## 🚀 Features

### 🔐 Authentication
- Signup/Login with role: Student or Instructor
- Session management using cookies
- Role-based access protection (Instructor Dashboard, Course Purchase)

### 📚 Courses
- Course creation with:
  - Title, Subtitle, Description
  - Category, Level, Price
  - Video lectures and thumbnails
- Students can:
  - Browse and filter courses
  - Purchase courses using **Stripe**
  - Watch video lectures (React Player)
  - Track lecture completion
  - Mark entire course as completed

### 🎓 Instructor Dashboard
- Upload courses and lectures
- Manage published/unpublished courses
- View enrolled students

### 💳 Payments
- Secure checkout with Stripe
- Payment status stored in DB
- Webhook integration to update:
  - Enrolled students
  - Course purchase history

### 📈 Progress Tracking
- Lecture-level progress
- Course completion status
- Continue course button




