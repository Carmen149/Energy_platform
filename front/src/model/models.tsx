export interface UserCreate {
  name: string;
  username: string;
  password: string;
  role: string;
}
export interface UserLogIn {
  username: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  role: string;
}
export interface DeviceGet {
  id: number;
  name: string;
  description: string;
  address: string;
  maxEnergy: number;
  user: User;
}
export interface DeviceUpdate {
  id: number;
  name: string;
  description: string;
  address: string;
  maxEnergy: number;
  userId: number;
}
export interface Measurement {
  id: number;
  time: Date;
  energy: number;
  deviceId: number;
}
export interface MeasurementGet {
  id: number;
  time: string;
  energy: number;
  device: DeviceGet;
}
export interface Message {
  deviceId: number;
  userId: number;
  message: String;
}

export interface ChatUser {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
}

export interface ChatMessage {
  senderName: string;
  status: string;
  message?: string;
  receiverName?:string;
  date?:string;
}
