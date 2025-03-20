# Bookstore Web Application

This is a bookstore web application with a React frontend and Java backend.

## Project Structure

- `client/`: React frontend
- `server/`: Java backend

## Deployment Instructions

### Backend Deployment (Heroku)

1. Create a Heroku account at https://signup.heroku.com/
2. Install the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
3. Login to Heroku:
   ```
   heroku login
   ```
4. Create a new Heroku app:
   ```
   heroku create your-backend-app-name
   ```
5. Add a MySQL database:
   ```
   heroku addons:create jawsdb:kitefin
   ```
6. Get the database connection details:
   ```
   heroku config:get JAWSDB_URL
   ```
7. Set the database connection details as environment variables:
   ```
   heroku config:set JDBC_DATABASE_URL=jdbc:mysql://your-db-host:3306/your-db-name
   heroku config:set JDBC_DATABASE_USERNAME=your-db-username
   heroku config:set JDBC_DATABASE_PASSWORD=your-db-password
   ```
8. Deploy the backend:
   ```
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku master
   ```
9. Initialize the database:
   ```
   heroku run java -jar build/libs/*.war --spring.datasource.initialization-mode=always
   ```

### Frontend Deployment (Netlify)

1. Create a Netlify account at https://app.netlify.com/signup
2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```
   netlify login
   ```
4. Update the API URL in `client/netlify.toml` with your Heroku app URL:
   ```
   REACT_APP_API_URL = "https://your-backend-app-name.herokuapp.com/api"
   ```
5. Deploy the frontend:
   ```
   cd client
   netlify deploy --prod
   ```

## Local Development

### Backend

1. Set up a local MySQL database
2. Update `server/src/main/resources/application.properties` with your local database details
3. Run the backend:
   ```
   cd server
   ./gradlew bootRun
   ```

### Frontend

1. Install dependencies:
   ```
   cd client
   npm install
   ```
2. Start the development server:
   ```
   npm start
