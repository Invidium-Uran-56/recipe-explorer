# Recipe Explorer & Meal Planner

A responsive recipe discovery and meal planning application built with React. The application allows users to explore recipes, search for meals, discover new cooking ideas, and organize their weekly meal plans.

## Live Demo

[View Recipe Explorer & Meal Planner](https://YOUR-USERNAME.github.io/recipe-explorer-meal-planner/)

## About the Project

Recipe Explorer & Meal Planner is a web application designed to make discovering recipes and organizing meals easier.

Users can browse recipes, search for specific meals, view recipe information, save their favourite recipes, and plan meals for the week.

The application was developed as a project to demonstrate skills in React, JavaScript, HTML, CSS, Bootstrap, API integration, and responsive web design.

## Features 

### 1. Home Page
- Welcome screen and application introduction.
- Featured recipes and navigation.
- Easy access to the main application features.

### 2. Recipe Explorer
- Browse recipes from an external API.
- Search for recipes.
- Filter recipes by category or ingredient.
- View recipe details, ingredients, and instructions.
- Save favourite recipes.

### 3. Meal Planner
- Organize meals throughout the week.
- Add recipes to specific days.
- Manage planned meals.
- Keep track of weekly meal plans.

## Technologies Used

- **React** – Component-based user interface.
- **Vite** – Development environment and build tool.
- **JavaScript (ES6+)** – Application functionality.
- **HTML5** – Application structure.
- **CSS3** – Custom styling.
- **Bootstrap** – Responsive layout and styling.
- **React Router** – Navigation between application pages.
- **TheMealDB API** – External recipe data.
- **Fetch API and async/await** – Asynchronous API requests.
- **localStorage** – Persistent storage of saved data.
- **Git and GitHub** – Version control and project hosting.
- **GitHub Pages** – Application deployment.

## API Integration

The application uses TheMealDB, a public REST API that provides recipe information in JSON format.

API: https://www.themealdb.com/api.php

The API is integrated using JavaScript's Fetch API and async/await.

The application retrieves recipe information and displays it dynamically.

## Installation and Setup

To run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/recipe-explorer-meal-planner.git
```

### 2. Navigate to the project folder

```bash
cd recipe-explorer-meal-planner
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL provided by Vite in your browser.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The application is deployed using GitHub Pages.

GitHub Actions is configured to automatically build and deploy the application whenever changes are pushed to the main branch.

The Vite base path is configured to match the GitHub repository name.

## Project Structure

```text
src/
├── components/     # Reusable React components
├── pages/          # Application pages
├── services/       # API and data management
├── App.jsx         # Main application and routing
├── main.jsx        # Application entry point
└── index.css       # Global styling

.github/
└── workflows/
    └── deploy.yml  # GitHub Pages deployment workflow
```

## Learning Objectives

This project demonstrates:

- Building a React application using reusable components.
- Creating multiple pages using React Router.
- Implementing responsive layouts with Bootstrap.
- Integrating an external REST API.
- Using asynchronous JavaScript with fetch and async/await.
- Managing application state and localStorage.
- Using Git for version control.
- Deploying a React application using GitHub Pages.

## Author

Created as a web development project.