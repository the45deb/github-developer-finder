# GitHub Developer Finder

A responsive React application that allows users to search GitHub developers and explore their public profile information and recently updated repositories using the GitHub REST API.

## Live Demo

https://the45deb.github.io/github-developer-finder/

## Features

* Search GitHub users by username
* Display developer profile information
* Show public repositories sorted by recent updates
* Display repository language and star count
* Handle loading states and user-not-found errors
* Responsive design using Bootstrap
* Deployed with GitHub Pages and GitHub Actions

## Technologies Used

* React
* JavaScript
* HTML5
* CSS3
* Bootstrap
* GitHub REST API
* GitHub Actions
* GitHub Pages
* Git / GitHub

## What I Practiced

This project helped me practice frontend development concepts such as reusable UI structure, API integration, asynchronous JavaScript, conditional rendering, error handling, responsive design, and deployment using GitHub Pages.

## Project Structure

```text
github-developer-finder/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/the45deb/github-developer-finder.git
```

Enter the project folder:

```bash
cd github-developer-finder
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## API Used

This project uses the public GitHub REST API:

```text
https://api.github.com/users/{username}
https://api.github.com/users/{username}/repos
```

## Author

Axel Abel Flores Peña
Junior Full Stack Developer / Frontend Developer

## Status

Completed as a portfolio project. Future improvements may include search history, dark mode, repository filtering, and a more component-based architecture.
