# Recipe Book App

React app that allows users to browse, add, and favorite recipes.

## Features

- Users can view a list of recipes.
- Users can view details of individual recipes.
- Users can add new recipes to the recipe book.
- Users can mark recipes as favorites.

## Technologies Used

- React
- JavaScript
- CSS
- Jest
- React Router
- Axios (for API requests)

## Getting Started 

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open http://localhost:3000 to view it in the browser.

## How to Use

1. Use the navbar to browse recipes or view favorites
2. Click on a recipe to view its details.
3. Click on the "Add to Favorites" button to add a recipe to the favorites page.
4. To add a new recipe - (functionality has not been implemented yet.)
5. On the favorites page, you can remove recipes from favorites by clicking the "Remove from Favorites" button.

## Folder Structure

- `public/`: Contains static assets and HTML template.
- `src/`: Contains the source code for the frontend application.
  - `api/`: Contains API service files for making backend requests.
  - `components/`: Contains React components organized by feature or functionality.
    - `auth/`: Contains components related to authentication.
    - `favorites/`: Contains components related to displaying favorite items.
    - `homepage/`: Contains components for the homepage.
    - `navbar/`: Contains the navigation bar component.
    - `profiles/`: Contains components related to user profiles.
    - `recipe/`: Contains components related to displaying recipes.
    - `searchbar/`: Contains components related to search functionality.
  - `hooks/`: Contains custom React hooks.
  - `routes/`: Contains route components or files for managing application routing.
- `App.js`: Main component file.
- `index.js`: Entry point for rendering the React application.
- `reportWebVitals.js`: File for reporting web performance metrics.
- `setupTests.js`: Configuration file for setting up testing environment.
- `package.json`: Node.js package configuration file.

