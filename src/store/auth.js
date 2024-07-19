import {create} from 'zustand';

const useAuthStore = create((set) => {
    // Check for token in localStorage to set initial authentication state
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
  
    return {
      authenticated: isAuthenticated,
      setAuthenticated: (status) => set({ authenticated: status }),
    };
  });

export default useAuthStore;
