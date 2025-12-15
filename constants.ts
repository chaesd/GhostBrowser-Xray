import { BrowserProfile, ProxyConfig } from './types';

export const MOCK_PROXIES: ProxyConfig[] = [
  { id: 'p1', name: 'US-West-Standard', group: 'US Regions', protocol: 'socks5', host: '192.168.1.101', port: 1080, active: true, latency: 120 },
  { id: 'p2', name: 'HK-Premium-Route', group: 'Asia VIP', protocol: 'vmess', host: 'hk.server.com', port: 443, uuid: 'a1b2c3d4-e5f6-7890', network: 'ws', active: true, latency: 45 },
  { id: 'p3', name: 'JP-LowLatency', group: 'Asia VIP', protocol: 'vless', host: 'jp.server.com', port: 8443, uuid: 'f1e2d3c4-b5a6-0987', active: false },
];

export const INITIAL_PROFILES: BrowserProfile[] = [
  {
    id: '1',
    name: 'Amazon Seller - US',
    group: 'E-commerce',
    proxyId: 'p1',
    status: 'idle',
    lastLaunch: '2023-10-25 14:30',
    cookieCount: 45,
    cacheSize: '124MB',
    fingerprint: {
      os: 'Windows',
      browser: 'Chrome',
      browserVersion: '118.0.0.0',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
      resolution: '1920x1080',
      language: 'en-US',
      timezone: 'America/Los_Angeles',
      webrtc: 'replace',
      canvas: 'noise',
      audio: 'noise',
      webgl: 'noise'
    }
  },
  {
    id: '2',
    name: 'Facebook Ads - HK',
    group: 'Social Media',
    proxyId: 'p2',
    status: 'running',
    lastLaunch: 'Just now',
    cookieCount: 120,
    cacheSize: '350MB',
    fingerprint: {
      os: 'MacOS',
      browser: 'Chrome',
      browserVersion: '117.0.0.0',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      resolution: '1440x900',
      language: 'zh-HK',
      timezone: 'Asia/Hong_Kong',
      webrtc: 'replace',
      canvas: 'noise',
      audio: 'off',
      webgl: 'noise'
    }
  }
];

export const OS_OPTIONS = ['Windows', 'MacOS', 'Linux', 'Android'];
export const RESOLUTIONS = ['1920x1080', '1366x768', '1440x900', '2560x1440', '3840x2160'];