@echo off
echo Starting Bookstore Application locally...

echo Starting backend server...
start cmd /k "cd server && gradlew bootRun"

echo Waiting for backend to start...
timeout /t 10

echo Starting frontend server...
start cmd /k "cd client && npm start"

echo Both servers are starting. The frontend will be available at:
echo http://localhost:3000
echo The backend API will be available at:
echo http://localhost:8080/api
