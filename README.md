# FitLog 🏋️

A modern, responsive workout library and planning application built with **Next.js**. FitLog allows users to explore workouts, view detailed exercise information, build a daily workout plan, save exercises for later, and track completed workouts.

## 📖 About The Project

**FitLog** is a dark-themed workout companion designed for users who want to discover exercises and organize their daily workout routine.

Users can browse a complete workout library, view detailed information about each exercise, add exercises to today's plan, save workouts for later, and manage their workout progress from the **My Plan** page.

The application uses workout data from an external API and provides a responsive experience across mobile, tablet, and desktop devices.

---

## ✨ Key Features

* 🏋️ **Workout Library**
  Browse workouts with images, categories, equipment, duration, calories, and ratings.

* 📋 **Today's Workout Plan**
  Add workouts to today's plan and manage them from the My Plan page with a maximum of five lifts.

* 🔖 **Save Workouts**
  Save exercises for later and access them from the Saved tab.

* 📊 **Workout Details**
  View complete workout information including equipment, difficulty, sets, reps, duration, calories, rating, and step-by-step instructions.

* 🔔 **Toast Notifications**
  Get instant feedback when adding, saving, completing, or removing workouts.

* 📱 **Fully Responsive Design**
  Optimized for mobile, tablet, and desktop screen sizes.

* 🔄 **Dynamic Sorting**
  Sort workouts by duration, calories, or rating.

* ✅ **Workout Progress**
  Mark planned workouts as completed and remove exercises from the plan.

* 💾 **Persistent Data**
  Plan and saved workout data are stored locally so they can remain available after page reloads.

* 🚫 **Custom 404 Page**
  Invalid routes display a dedicated 404 page.

---

## 🛠️ Technologies Used

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**
* **Next.js App Router**
* **REST API**
* **LocalStorage**
* **React Toastify**
* **Git & GitHub**

---

## 🔗 API

FitLog uses the following API to fetch workout information.

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

---

## 📂 Main Pages

### 🏠 Home

The home page contains:

* Navbar
* Hero section
* Workout library
* Workout cards
* Sorting functionality
* Loading state
* Responsive layout

### 📄 Workout Details

Each workout has a dedicated details page containing:

* Workout image
* Title and description
* Category tags
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories
* Rating
* Instructions
* Add to Today's Plan
* Save for Later

### 📋 My Plan

The My Plan page provides:

* Exercise count
* Total workout minutes
* Total calories
* Today's Plan tab
* Saved tab
* View Details
* Mark as Done
* Remove workout
* Empty state

## 📱 Responsive Design

FitLog is designed to work smoothly across different screen sizes:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

## 🚀 Build for Production

Create a production build

## 🎯 Core Functionality

### Add to Today's Plan

Users can add workouts directly from the details page to their daily workout plan.

The navbar counter updates automatically when a workout is added.

### Save for Later

Users can save workouts they want to access later. Saved workouts are displayed in the Saved tab on the My Plan page.

### Mark as Done

Users can mark a planned workout as completed. A toast notification confirms the action.

### Remove Workout

Users can remove workouts from their plan using the remove button.

### Plan Limit

Today's Plan supports a maximum of **5 workouts**.

---

## 🔔 User Feedback

FitLog provides toast notifications for important user actions, including:

* Workout added to plan
* Workout saved
* Workout marked as completed
* Workout removed
* Other relevant actions

---

## 🔀 Sorting

The workout library includes a **Sort By** option with:

* Duration
* Calories
* Rating

The displayed workout list updates according to the selected sorting option.

---

## 📌 Project Goals

The main goals of this project are to:

* Build a modern workout management interface
* Practice Next.js App Router
* Work with external APIs
* Implement dynamic routing
* Build reusable React components
* Manage client-side state
* Create responsive layouts with Tailwind CSS
* Practice real-world application development
