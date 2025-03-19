
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import VoiceAgent from "./pages/VoiceAgent";
import ReviewAgent from "./pages/ReviewAgent";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Waitlist from "./pages/Waitlist";
import { useState, createContext, useContext, useEffect } from "react";

// Create Authentication Context
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/signup', '/waitlist'];

// Authentication Check Component
const AuthCheck = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if the current path is in the public routes
  const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
  
  // If user is trying to access a protected route without authentication, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // If the user is authenticated and trying to access login/signup, redirect to home
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="*" 
                element={
                  <AuthCheck>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/waitlist" element={<Waitlist />} />
                      <Route path="/" element={<Index />} />
                      <Route path="/voice-agent" element={<VoiceAgent />} />
                      <Route path="/review-agent" element={<ReviewAgent />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AuthCheck>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
