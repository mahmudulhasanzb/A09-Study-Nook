'use client';

import React, { createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending: loading, error } = authClient.useSession();

  // Normalize user shape: BetterAuth returns session.user
  const user = session?.user ?? null;

  // Email + Password login
  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'Invalid email or password');
      throw new Error(error.message);
    }

    toast.success('Login successful!');
    router.push('/');
    router.refresh();
    return data?.user;
  };

  // Email + Password register
  const register = async ({ name, email, image, password }) => {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || '',
      callbackURL: '/login',
    });

    if (error) {
      toast.error(error.message || 'Registration failed');
      throw new Error(error.message);
    }

    toast.success('Registration successful! Please login.');
    return data;
  };

  // Google OAuth
  const googleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'Google authentication failed');
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
          toast.success('Logged out successfully');
        },
      },
    });

    if (error) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
