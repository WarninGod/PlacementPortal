import { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiRegisterStudent } from '../lib/storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for session
        const session = localStorage.getItem('placement_session');
        if (session) {
            setUser(JSON.parse(session));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const userData = await apiLogin(email, password);
        setUser(userData);
        localStorage.setItem('placement_session', JSON.stringify(userData));
        return userData;
    };

    const registerStudent = async (name, email, password) => {
        const userData = await apiRegisterStudent(name, email, password);
        setUser(userData);
        localStorage.setItem('placement_session', JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('placement_session');
    };

    const updateUserInContext = (updates) => {
        const newUser = { ...user, ...updates };
        setUser(newUser);
        localStorage.setItem('placement_session', JSON.stringify(newUser));
    }

    const value = {
        user,
        login,
        registerStudent,
        logout,
        updateUserInContext,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
