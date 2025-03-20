// Configuration for the application
// This file contains environment-specific settings

// API URL - will be different in development vs production
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Other configuration settings can be added here
export const APP_NAME = 'Bookstore';
