// src/components/ProtectedRouteWrapper.tsx
"use client";

import React, { useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { apiUtils } from '@/lib';

interface ProtectedRouteWrapperProps {
  children: React.ReactNode;
}

// Define the props interface for children that can receive userUuid
interface WithUserUuidProps {
  userUuid?: string;
}

const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        // Get the user UUID using requireUserId
        const uuid = apiUtils.requireUserId();
        
        // If we get here, user is authenticated
        setIsAuthenticated(true);
        setUserUuid(uuid);
      } catch (error) {
        // No UUID found or token invalid, redirect to login
        console.error('User not authenticated:', error);
        router.push('/');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 text-lg font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !userUuid) {
    return null; // Will redirect in the useEffect
  }
  
  // Pass the userUuid to children if needed via context or props cloning
  const childrenWithProps = React.Children.map(children, child => {
    // Only pass userUuid to React components, not DOM elements
    if (React.isValidElement(child)) {
      // Skip DOM elements (like div, span, etc.)
      if (typeof child.type === 'string') {
        return child;
      }
      
      // It's a React component, we can pass the userUuid
      return React.cloneElement(child as ReactElement<WithUserUuidProps>, { userUuid });
    }
    return child;
  });
  
  return <>{childrenWithProps}</>;
};

export default ProtectedRouteWrapper;
