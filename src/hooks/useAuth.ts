import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useRefreshTokenMutation } from '../store/api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    // Check if token is expired (basic check - in production you'd decode JWT)
    if (token && !user) {
      // Token exists but no user data, try to refresh
      refreshToken()
        .unwrap()
        .catch(() => {
          // Refresh failed, logout user
          dispatch(logout());
        });
    }
  }, [token, user, refreshToken, dispatch]);

  const isTokenExpired = (token: string): boolean => {
    try {
      // Basic JWT expiration check (in production, use a proper JWT library)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true; // If we can't parse, assume expired
    }
  };

  const checkTokenValidity = () => {
    if (token && isTokenExpired(token)) {
      refreshToken()
        .unwrap()
        .catch(() => {
          dispatch(logout());
        });
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    checkTokenValidity,
  };
};