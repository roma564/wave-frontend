"use client"
import { createContext } from 'react';
import { io, Socket } from 'socket.io-client';


const URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const socket = io(URL);


export const SocketContext = createContext(socket);
export const SocketProvider = SocketContext.Provider