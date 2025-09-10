"use client"
import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';


const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL);


export const SocketContext = createContext(socket);
export const SocketProvider = SocketContext.Provider