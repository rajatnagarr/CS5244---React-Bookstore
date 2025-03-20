#!/bin/bash
echo "Starting Bookstore Application locally..."

echo "Starting backend server..."
cd server && ./gradlew bootRun &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 10

echo "Starting frontend server..."
cd ../client && npm start &
FRONTEND_PID=$!

echo "Both servers are starting. The frontend will be available at:"
echo "http://localhost:3000"
echo "The backend API will be available at:"
echo "http://localhost:8080/api"

echo "Press Ctrl+C to stop both servers"
wait $BACKEND_PID $FRONTEND_PID
