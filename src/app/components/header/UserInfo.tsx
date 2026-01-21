import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function UserInfo() {
  const [username, setUsername] = useState('Guest');
  const [email, setEmail] = useState('unknown@email.com');
  const [avatar, setAvatar] = useState('/static/images/avatar/2.jpg');
  const [showDetails, setShowDetails] = useState(false);

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
        className="flex flex-row items-center pr-5 cursor-pointer"
        onClick={() => setShowDetails(prev => !prev)}
      >
        <img
          alt={username}
          src={avatar}
          className="rounded-full object-cover object-center hidden sm:inline ml-2 mr-2 w-12 h-12  min-h-[3rem]"
        />

        <div className="flex flex-col">
          <p className="hidden md:inline">{username}</p>
          <p className="hidden md:inline">{email}</p>
        </div>
      </div>

      {showDetails && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full mb-2 object-cover object-center"
            />

            <h2 className="text-lg font-semibold">{username}</h2>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm text-gray-500 mt-2">Status: Active</p>
            <p className="text-sm text-gray-500">Role: User</p>

            {/* Upload avatar */}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="mt-2 text-sm"
            />

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
