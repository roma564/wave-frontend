'use client';

import { useStreamClient } from './streamClient';
import { useState } from 'react';
import type { Call } from '@stream-io/video-react-sdk';

const generateCallId = () =>
  'call-' + Math.random().toString(36).substring(2, 10);

export const useStreamCall = () => {
  const streamClient = useStreamClient();
  const [activeCall, setActiveCall] = useState<Call | null>(null);

  const startPublicCall = async () => {
    if (!streamClient) {
      console.error('Stream client not initialized');
      return;
    }

    try {
      const callId = generateCallId();
      const call = streamClient.call('default', callId);

      await call.getOrCreate();
      await call.join();

      setActiveCall(call); // 👈 зберігаємо call у стейті
      console.log(`Public call started with callId: ${callId}`);
    } catch (error) {
      console.error('Failed to start public call:', error);
    }
  };

  const leaveCall = async () => {
    if (activeCall) {
      await activeCall.leave();
      setActiveCall(null);
    }
  };

  return { startPublicCall, leaveCall, activeCall };
};
