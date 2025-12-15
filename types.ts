import React from 'react';

export type ProfileStatus = 'idle' | 'starting' | 'running' | 'stopping' | 'error';

export interface FingerprintSettings {
  os: 'Windows' | 'MacOS' | 'Linux' | 'Android';
  browser: 'Chrome' | 'Firefox';
  browserVersion: string;
  userAgent: string;
  resolution: string;
  language: string;
  timezone: string;
  webrtc: 'replace' | 'disable' | 'real';
  canvas: 'noise' | 'off';
  audio: 'noise' | 'off';
  webgl: 'noise' | 'off';
}

export interface ProxyConfig {
  id: string;
  name: string;
  group?: string;
  protocol: 'socks5' | 'http' | 'vmess' | 'vless' | 'shadowsocks' | 'trojan';
  host: string;
  port: number;
  username?: string;
  password?: string;
  // Xray Specific Fields
  uuid?: string; // For VMess/VLESS
  network?: 'tcp' | 'ws' | 'kcp' | 'grpc';
  tls?: boolean;
  sni?: string; // Server Name Indication
  path?: string; // For WS/gRPC path
  encryption?: string; // For Shadowsocks
  flow?: string; // For VLESS XTLS (xtls-rprx-vision)
  alpn?: string; // h2, http/1.1
  
  active: boolean;
  latency?: number; // ms
}

export interface BrowserProfile {
  id: string;
  name: string;
  group: string;
  proxyId?: string; // Links to a ProxyConfig
  fingerprint: FingerprintSettings;
  status: ProfileStatus;
  lastLaunch?: string;
  cookieCount: number;
  cacheSize: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}