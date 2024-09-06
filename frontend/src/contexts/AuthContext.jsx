import { createContext, useState, useEffect, useContext } from 'react';
import { PlayerContext } from './PlayerContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { setTrack } = useContext(PlayerContext)

    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    });

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null });
        setTrack(null)
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedToken && storedUser) {
            setAuthState({ token: storedToken, user: storedUser });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
