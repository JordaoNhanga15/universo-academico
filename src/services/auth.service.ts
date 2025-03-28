
import { toast } from "@/components/ui/use-toast";

// Mock user data
const USERS = [
  {
    id: 1,
    email: "admin@universo.academia",
    password: "admin123", // In a real app, this would be hashed
    name: "Admin User",
    role: "admin"
  },
  {
    id: 2,
    email: "editor@universo.academia",
    password: "editor123",
    name: "Editor User", 
    role: "editor"
  }
];

// Types for authentication
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Storage keys
const USER_STORAGE_KEY = "universo_academia_user";
const TOKEN_STORAGE_KEY = "universo_academia_token";

// Service functions
export const login = async (credentials: LoginCredentials): Promise<User | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching credentials
  const user = USERS.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (user) {
    // Create a user object without the password
    const authenticatedUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    // Store user in localStorage (in a real app, you'd store a JWT token)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, `mock-jwt-token-${user.id}`);
    
    return authenticatedUser;
  }
  
  // No matching user found
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user ? user.role === role : false;
};

export const register = async (userData: { email: string; password: string; name: string }): Promise<User | null> => {
  // This is a mock implementation - in a real app, you would call an API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  const existingUser = USERS.find(u => u.email === userData.email);
  if (existingUser) {
    toast({
      title: "Registration failed",
      description: "This email is already registered",
      variant: "destructive"
    });
    return null;
  }
  
  // In a real app, this would be handled by the backend
  const newUser = {
    id: USERS.length + 1,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: "user"
  };
  
  // Add to mock users array (this would not exist in a real frontend app)
  USERS.push(newUser);
  
  // Return the user without password
  const createdUser: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role
  };
  
  return createdUser;
};
