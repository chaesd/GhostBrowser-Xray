import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ProfileList } from './components/ProfileList';
import { Dashboard } from './components/Dashboard';
import { ProxyManager } from './components/ProxyManager';
import { ProfileModal } from './components/ProfileModal';
import { SystemSettings } from './components/Settings';
import { BrowserProfile, ProxyConfig, NavItem } from './types';
import { INITIAL_PROFILES, MOCK_PROXIES } from './constants';
import { LayoutDashboard, Layers, Network, Settings, Plus } from 'lucide-react';

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: '概览仪表盘', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'profiles', label: '环境管理', icon: <Layers className="w-5 h-5" /> },
  { id: 'proxies', label: '代理配置', icon: <Network className="w-5 h-5" /> },
  { id: 'settings', label: '系统设置', icon: <Settings className="w-5 h-5" /> },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profiles, setProfiles] = useState<BrowserProfile[]>(INITIAL_PROFILES);
  const [proxies, setProxies] = useState<ProxyConfig[]>(MOCK_PROXIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<BrowserProfile | null>(null);

  // Mock checking latencies periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setProxies(prev => prev.map(p => ({
        ...p,
        latency: p.active ? Math.floor(Math.random() * 200) + 20 : undefined
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartProfile = (id: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'starting' } : p
    ));

    // Simulate startup delay (launching Puppeteer + Xray)
    setTimeout(() => {
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'running', lastLaunch: '刚刚' } : p
      ));
    }, 1500);
  };

  const handleStopProfile = (id: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'stopping' } : p
    ));
    setTimeout(() => {
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...p, status: 'idle' } : p
      ));
    }, 1000);
  };

  const handleSaveProfile = (profile: BrowserProfile) => {
      if (editingProfile) {
          setProfiles(prev => prev.map(p => p.id === profile.id ? profile : p));
      } else {
          setProfiles(prev => [...prev, profile]);
      }
      setEditingProfile(null);
  };

  const handleDeleteProfile = (id: string) => {
      if (window.confirm('确定要删除此环境配置吗？数据将无法恢复。')) {
        setProfiles(prev => prev.filter(p => p.id !== id));
      }
  };

  const openCreateModal = () => {
      setEditingProfile(null);
      setIsModalOpen(true);
  };

  const openEditModal = (profile: BrowserProfile) => {
      setEditingProfile(profile);
      setIsModalOpen(true);
  };

  // Proxy actions
  const handleAddProxy = (proxy: ProxyConfig) => {
      setProxies(prev => [...prev, proxy]);
  };
  
  const handleBulkAddProxies = (newProxies: ProxyConfig[]) => {
      setProxies(prev => [...prev, ...newProxies]);
  };

  const handleUpdateProxy = (updatedProxy: ProxyConfig) => {
      setProxies(prev => prev.map(p => p.id === updatedProxy.id ? updatedProxy : p));
  };

  const handleBulkUpdateProxies = (updates: ProxyConfig[]) => {
      setProxies(prev => {
          const updateMap = new Map(updates.map(u => [u.id, u]));
          return prev.map(p => updateMap.get(p.id) || p);
      });
  };

  const handleDeleteProxy = (id: string) => {
      setProxies(prev => prev.filter(p => p.id !== id));
  };

  const handleCheckLatency = (id: string) => {
      // Simulate check
      setProxies(prev => prev.map(p => p.id === id ? {...p, latency: undefined} : p));
      setTimeout(() => {
           setProxies(prev => prev.map(p => p.id === id ? {...p, latency: Math.floor(Math.random() * 150) + 30} : p));
      }, 800);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      <Sidebar 
        navItems={NAV_ITEMS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-bold text-white">
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </h2>
          {activeTab === 'profiles' && (
            <button 
                onClick={openCreateModal}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
                <Plus className="w-5 h-5" /> 新建环境
            </button>
          )}
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <Dashboard profiles={profiles} proxies={proxies} />}
            
            {activeTab === 'profiles' && (
                <ProfileList 
                    profiles={profiles} 
                    proxies={proxies}
                    onStart={handleStartProfile}
                    onStop={handleStopProfile}
                    onEdit={openEditModal}
                    onDelete={handleDeleteProfile}
                />
            )}

            {activeTab === 'proxies' && (
                <ProxyManager 
                    proxies={proxies} 
                    onAdd={handleAddProxy}
                    onBulkAdd={handleBulkAddProxies}
                    onUpdate={handleUpdateProxy}
                    onBulkUpdate={handleBulkUpdateProxies}
                    onDelete={handleDeleteProxy}
                    onCheckLatency={handleCheckLatency}
                />
            )}
            
            {activeTab === 'settings' && <SystemSettings />}
          </div>
        </div>
      </main>

      <ProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfile}
        proxies={proxies}
        initialData={editingProfile}
      />
    </div>
  );
};

export default App;