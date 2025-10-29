'use client';

import React, { useState } from 'react';
import { useStreamClient } from '@/app/lib/features/api/stream/streamClient';
import {
  StreamVideo,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

export default function JoinCallForm() {
  const [callId, setCallId] = useState('');
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const streamClient = useStreamClient();

  const handleJoin = async () => {
    if (!callId.trim() || !streamClient) return;

    try {
      const call = streamClient.call('default', callId.trim());
      await call.getOrCreate();
      await call.join();
      setActiveCallId(callId.trim()); // 👈 зберігаємо активний дзвінок
      console.log(`Joined call with ID: ${callId}`);
    } catch (error) {
      console.error('Failed to join call:', error);
    }
  };

  if (activeCallId && streamClient) {
    const call = streamClient.call('default', activeCallId);
    return (
      <StreamVideo client={streamClient}>
        <StreamTheme>
          <StreamCall call={call}>
            <div className="h-screen flex flex-col">
              <div className="flex-1">
                <SpeakerLayout /> {/* показує учасників */}
              </div>
              <CallControls /> {/* кнопки: мікрофон, камера, leave */}
            </div>
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    );
  }

  return (
    <div className="flex gap-2 items-center p-4">
      <input
        type="text"
        placeholder="Enter Call ID"
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        className="border px-2 py-1 rounded w-64"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Join Call
      </button>
    </div>
  );
}
