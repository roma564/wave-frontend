import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAppSelector } from '@/app/lib/hooks';
import { themeConfig } from '@/app/config/theme.config';
import { Mode } from '@/app/types/Mode';
import { Avatar, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function UserInfo() {
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('unknown@email.com');
  const [avatar, setAvatar] = useState('/static/images/avatar/2.jpg');
  const [showDetails, setShowDetails] = useState(false);


  const currentMode: Mode | null = useAppSelector(state => state.mode.currentMode);
  const theme = currentMode?.theme ? themeConfig[currentMode.theme] : themeConfig.BLUE;

  useEffect(() => {
    setUsername(Cookies.get('username') || 'Guest');
    setEmail(Cookies.get('email') || 'unknown@email.com');
    setAvatar(Cookies.get('avatar') || '/static/images/avatar/2.jpg');
  }, []);

  const handleLogout = () => {
    Cookies.remove('__next_hmr_refresh_hash__');
    Cookies.remove('access_token');
    Cookies.remove('stream_token');
    Cookies.remove('id');
    Cookies.remove('lastname');
    Cookies.remove('username');
    Cookies.remove('email');
    Cookies.remove('avatar');
    setUsername('Guest');
    setEmail('unknown@email.com');
    setAvatar('/static/images/avatar/2.jpg');
    setShowDetails(false);

    window.location.href = '/';
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', Cookies.get('id') || '');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/files/avatar`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });

      const { avatarUrl } = await res.json();

      if (!res.ok || !avatarUrl) {
        throw new Error(`Upload failed: ${avatarUrl || 'No URL returned'}`);
      }

      const fullAvatarUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${avatarUrl}`;
      setAvatar(fullAvatarUrl);
      Cookies.set('avatar', fullAvatarUrl);
    } catch (err) {
      console.error('Avatar upload error:', err);
      alert(`Помилка завантаження: ${(err as Error).message}`);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center pr-5 cursor-pointer p-3 rounded-2xl"

        onClick={() => setShowDetails(prev => !prev)}
      >
    
       <Avatar
          alt={username}
          src={avatar || undefined}
          sx={{ width: 48, height: 48, marginX: 1 }}
        >
          {!avatar && username.charAt(0).toUpperCase()}
        </Avatar>

        


        <div className="flex flex-col">
          <p className="hidden md:inline">{username}</p>
          <p className="hidden md:inline">{email}</p>
        </div>
      </div>

      {showDetails && (
        <div
          className="absolute top-16 right-0 shadow-lg rounded-lg p-4 w-64 z-10"
          style={{
            backgroundColor: theme.bgColor,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <div className="flex flex-col items-center">

            <div className="relative group">
              {/* Аватар */}
              <Avatar
                alt={username}
                src={avatar || undefined}
                sx={{ width: 80, height: 80 }}
              >
                {!avatar && username.charAt(0).toUpperCase()}
              </Avatar>

              {/* Overlay on hover */}
              <div
                className="absolute rounded-full inset-0 flex items-center justify-center bg-gray-600 bg-opacity-40 opacity-0 group-hover:opacity-50 transition"
              >
                <IconButton
                  component="label"
                  sx={{ color: 'white' }}
                >
                  <PhotoCameraIcon />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleAvatarUpload}
                  />
                </IconButton>
              </div>
            </div>


            <h2 className="text-lg font-semibold" style={{ color: theme.primaryColor }}>
              {username}
            </h2>
            <p className="text-sm" style={{ color: theme.secondaryTextColor }}>
              {email}
            </p>
            <p className="text-sm mt-2" style={{ color: theme.iconsColor }}>
              Status: Active
            </p>

            

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 rounded transition"
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.textColor,
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
