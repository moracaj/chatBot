import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/authStore';
import { Button } from './Button';

export function UserMenu() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className="hidden md:flex items-center mr-2">
        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center mr-2">
          <span className="text-blue-600 font-semibold">
            {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {profile?.displayName || user.email?.split('@')[0]}
          </span>
          {profile?.company && (
            <span className="text-xs text-muted-foreground">{profile.company}</span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
      >
        Home
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/profile')}
      >
        Profile
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={logout}
      >
        Log out
      </Button>
    </div>
  );
}
