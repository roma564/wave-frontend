'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

export default function CreateCallButton() {
  const router = useRouter();
  const streamClient = useStreamClient();

  const handleCreateCall = async () => {
    if (!streamClient) return;

    try {
      const callId = `call-${Math.random().toString(36).substring(2, 10)}`;
      router.push(`/call?callId=${encodeURIComponent(callId)}`);
    } catch (error) {
      console.error('Failed to redirect to call:', error);
    }
  };

  return (
    <VideoCameraFrontIcon
      style={{ color: '#1976d2', cursor: 'pointer' }}
      onClick={handleCreateCall}
    />
  );
}
