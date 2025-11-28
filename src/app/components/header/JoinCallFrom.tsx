'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinCallForm() {
  const [callId, setCallId] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!callId.trim()) return;

    
    router.push(`/call/${callId.trim()}`);
  };

  return (
    <div className="p-4 flex items-center gap-2">
      <input
        type="text"
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        placeholder="Enter Call ID"
        className="border p-2 flex-1 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Join Call
      </button>
    </div>
  );
}
