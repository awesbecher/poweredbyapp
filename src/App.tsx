import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import VoiceAgent from "./pages/VoiceAgent";
import ReviewAgent from "./pages/ReviewAgent";
import EmailAgent from "./pages/EmailAgent";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProjectText from "./pages/ProjectText";
import { useState, createContext, useContext } from "react";

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

// All routes are now public, no need to check authentication
const AuthCheck = ({ children }: { children: JSX.Element }) => {
  return children; // Just return the children without any checks
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
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route 
                path="*" 
                element={
                  <AuthCheck>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/project-text" element={<ProjectText />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Index />} />
                      <Route path="/voice-agent" element={<VoiceAgent />} />
                      <Route path="/review-agent" element={<ReviewAgent />} />
                      <Route path="/email-agent" element={<EmailAgent />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AuthCheck>
                } 
              />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
