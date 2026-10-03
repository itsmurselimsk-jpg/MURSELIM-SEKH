import React, { useState, useEffect, useMemo } from 'react';
import {
  DeviceBrand,
  DeviceInfo,
  FingerGrip,
  Playstyle,
  ProPlayerPreset,
  RamTier,
  RefreshRate,
  SavedConfiguration,
  ScreenSize,
  SensiScale,
  SensiValues,
  TouchSamplingRate,
} from './types/sensi';
import { ALL_DEVICES_DATABASE } from './data/deviceDatabase';
import { calculateSensitivity } from './utils/sensiCalculator';
import { Navbar, NavTabType } from './components/Navbar';
import { DeviceSelector } from './components/DeviceSelector';
import { SensiResultsCard } from './components/SensiResultsCard';
import { HeadshotLock90Engine } from './components/HeadshotLock90Engine';
import { FreeFireSettingsSimulator } from './components/FreeFireSettingsSimulator';
import { VipHeadshotPanel } from './components/VipHeadshotPanel';
import { FloatingVipWidget } from './components/FloatingVipWidget';
import { ProAimSection } from './components/ProAimSection';
import { CharacterSkillsBuilder } from './components/CharacterSkillsBuilder';
import { CustomRoomGenerator } from './components/CustomRoomGenerator';
import { CrosshairBloomSimulator } from './components/CrosshairBloomSimulator';
import { ProSensiCompare } from './components/ProSensiCompare';
import { HeadshotDiagnosticTool } from './components/HeadshotDiagnosticTool';
import { ControlCodeOptimizer } from './components/ControlCodeOptimizer';
import { WeaponSensiMatrix } from './components/WeaponSensiMatrix';
import { DragTrainer } from './components/DragTrainer';
import { HudAndControlsTab } from './components/HudAndControlsTab';
import { ProPresetsTab } from './components/ProPresetsTab';
import { TouchLatencyTester } from './components/TouchLatencyTester';
import { SavedConfigs } from './components/SavedConfigs';
import { LaunchGameModal } from './components/LaunchGameModal';
import { ApkInstallerModal } from './components/ApkInstallerModal';
import { ApkQuickInstallBanner } from './components/ApkQuickInstallBanner';
import { DpiGuideModal } from './components/DpiGuideModal';
import { GitHubDownloadModal } from './components/GitHubDownloadModal';
import { ShieldCheck, Check, Play, Download } from 'lucide-react';
import { soundFx } from './utils/audioEffects';
import { triggerApkDownload } from './utils/apkDownloader';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App as CapacitorApp } from '@capacitor/app';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('calculator');

  // Scale: Modern Free Fire OB Update (0-200) vs Classic (0-100)
  const [scale, setScale] = useState<SensiScale>('200');

  // Modals
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isDpiGuideOpen, setIsDpiGuideOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isFloatingPanelOpen, setIsFloatingPanelOpen] = useState(false);

  // Native PWA BeforeInstallPrompt Event
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as APK)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Native Android Status Bar Dark Tinting (Only when running on native Android)
    if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      StatusBar.setBackgroundColor({ color: '#09090b' }).catch(() => {});
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Native Android Hardware Back Button listener
  useEffect(() => {
    let handler: { remove: () => Promise<void> } | undefined;
    if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('App')) {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (isLauncherOpen || isApkModalOpen || isDpiGuideOpen || isGitHubModalOpen) {
          setIsLauncherOpen(false);
          setIsApkModalOpen(false);
          setIsDpiGuideOpen(false);
          setIsGitHubModalOpen(false);
        } else if (canGoBack) {
          window.history.back();
        }
      })
        .then((h) => {
          handler = h;
        })
        .catch(() => {});
    }

    return () => {
      handler?.remove?.().catch(() => {});
    };
  }, [isLauncherOpen, isApkModalOpen, isDpiGuideOpen, isGitHubModalOpen]);

  // Device & Settings State
  const [brand, setBrand] = useState<DeviceBrand>('Xiaomi / Redmi');
  const [model, setModel] = useState<string>('Redmi Note 13 Pro 5G');
  const [ram, setRam] = useState<RamTier>('8GB');
  const [refreshRate, setRefreshRate] = useState<RefreshRate>('120Hz');
  const [touchSampling, setTouchSampling] = useState<TouchSamplingRate>('240Hz');
  const [screenSize, setScreenSize] = useState<ScreenSize>('standard');
  const [playstyle, setPlaystyle] = useState<Playstyle>('onetap');
  const [grip, setGrip] = useState<FingerGrip>('2finger');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate Sensi
  const calculated = useMemo(() => {
    return calculateSensitivity({
      brand,
      model,
      ram,
      refreshRate,
      touchSampling,
      screenSize,
      playstyle,
      grip,
      scale,
    });
  }, [brand, model, ram, refreshRate, touchSampling, screenSize, playstyle, grip, scale]);

  // Modifiable sensi values for manual slider adjustments
  const [currentSensi, setCurrentSensi] = useState<SensiValues>(calculated.sensi);

  // Sync currentSensi whenever calculations or scale change
  useEffect(() => {
    setCurrentSensi(calculated.sensi);
  }, [calculated]);

  // Saved configs in LocalStorage
  const [savedConfigs, setSavedConfigs] = useState<SavedConfiguration[]>(() => {
    try {
      const data = localStorage.getItem('ff_sensipro_saved_configs');
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [
      {
        id: 'default-1',
        title: 'M1887 One-Tap Rusher (OB200)',
        createdAt: Date.now() - 86400000,
        deviceBrand: 'Xiaomi / Redmi',
        deviceModel: 'Redmi Note 13 Pro 5G',
        ram: '8GB',
        refreshRate: '120Hz',
        playstyle: 'onetap',
        scale: '200',
        sensi: {
          general: 195,
          redDot: 190,
          scope2x: 172,
          scope4x: 160,
          sniperScope: 92,
          freeLook: 140,
        },
        fireButtonSize: 44,
        safeDpi: 445,
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ff_sensipro_saved_configs', JSON.stringify(savedConfigs));
    } catch {
      // ignore
    }
  }, [savedConfigs]);

  // Auto-Detect Device Capabilities
  const handleDetectDevice = () => {
    soundFx.playClick();
    const ua = navigator.userAgent.toLowerCase();
    let detectedBrand: DeviceBrand = 'Other Android';
    let detectedRam: RamTier = '8GB';
    let detectedModel = 'Detected Mobile Phone';
    let detectedRefresh: RefreshRate = '120Hz';
    let detectedTouch: TouchSamplingRate = '240Hz';

    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) {
      detectedBrand = 'Apple iPhone';
      detectedModel = ua.includes('ipad') ? 'Apple iPad Pro' : 'Apple iPhone 15/16';
      detectedRam = '8GB';
      detectedRefresh = '120Hz';
    } else if (ua.includes('samsung') || ua.includes('sm-')) {
      detectedBrand = 'Samsung';
      detectedModel = 'Samsung Galaxy S / A Series';
      detectedRam = '8GB';
      detectedRefresh = '120Hz';
    } else if (ua.includes('redmi') || ua.includes('xiaomi') || ua.includes('mi ')) {
      detectedBrand = 'Xiaomi / Redmi';
      detectedModel = 'Redmi Note Series';
      detectedRam = '8GB';
      detectedRefresh = '120Hz';
    } else if (ua.includes('poco')) {
      detectedBrand = 'POCO';
      detectedModel = 'POCO X6 Pro 5G';
      detectedRam = '12GB';
      detectedRefresh = '120Hz';
      detectedTouch = '480Hz+';
    } else if (ua.includes('realme')) {
      detectedBrand = 'Realme';
      detectedModel = 'Realme 12 / GT Series';
      detectedRam = '8GB';
      detectedRefresh = '120Hz';
    } else if (ua.includes('vivo') || ua.includes('iqoo')) {
      detectedBrand = 'Vivo / iQOO';
      detectedModel = 'iQOO Neo / Vivo T Series';
      detectedRam = '8GB';
      detectedRefresh = '144Hz';
      detectedTouch = '360Hz';
    } else if (ua.includes('oneplus')) {
      detectedBrand = 'OnePlus';
      detectedModel = 'OnePlus 12R / Nord Series';
      detectedRam = '12GB';
      detectedRefresh = '120Hz';
      detectedTouch = '360Hz';
    } else if (ua.includes('infinix')) {
      detectedBrand = 'Infinix';
      detectedModel = 'Infinix GT 20 Pro Gaming';
      detectedRam = '12GB';
      detectedRefresh = '144Hz';
      detectedTouch = '360Hz';
    } else if (ua.includes('tecno')) {
      detectedBrand = 'Tecno';
      detectedModel = 'Tecno Pova 6 Pro 5G';
      detectedRam = '12GB';
      detectedRefresh = '120Hz';
    } else if (ua.includes('pixel')) {
      detectedBrand = 'Nothing / Pixel';
      detectedModel = 'Google Pixel 8 Pro';
      detectedRam = '12GB';
      detectedRefresh = '120Hz';
    }

    if ('deviceMemory' in navigator) {
      const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
      if (mem) {
        if (mem <= 2) detectedRam = '2GB';
        else if (mem <= 3) detectedRam = '3GB';
        else if (mem <= 4) detectedRam = '4GB';
        else if (mem <= 6) detectedRam = '6GB';
        else if (mem <= 8) detectedRam = '8GB';
        else detectedRam = '12GB';
      }
    }

    const screenWidth = window.screen.width;
    const detectedScreenSize: ScreenSize =
      screenWidth < 380 ? 'compact' : screenWidth > 768 ? 'tablet' : 'standard';

    setBrand(detectedBrand);
    setModel(detectedModel);
    setRam(detectedRam);
    setRefreshRate(detectedRefresh);
    setTouchSampling(detectedTouch);
    setScreenSize(detectedScreenSize);

    showToast(`Device detected: ${detectedBrand} (${detectedRam} RAM, ${detectedRefresh})`);
  };

  // Save preset
  const handleSavePreset = (title: string) => {
    soundFx.playClick();
    const newConfig: SavedConfiguration = {
      id: 'cfg-' + Date.now(),
      title,
      createdAt: Date.now(),
      deviceBrand: brand,
      deviceModel: model,
      ram,
      refreshRate,
      playstyle,
      scale,
      sensi: currentSensi,
      fireButtonSize: calculated.hardware.fireButtonSize,
      safeDpi: calculated.hardware.safeDpi,
    };
    setSavedConfigs((prev) => [newConfig, ...prev]);
    showToast('Sensitivity setup saved to library!');
  };

  // Apply pro preset
  const handleApplyProPreset = (preset: ProPlayerPreset) => {
    soundFx.playClick();
    const boost = scale === '200' ? 2 : 1;
    setCurrentSensi({
      general: Math.min(scale === '200' ? 200 : 100, preset.sensi.general * boost),
      redDot: Math.min(scale === '200' ? 200 : 100, preset.sensi.redDot * boost),
      scope2x: Math.min(scale === '200' ? 200 : 100, preset.sensi.scope2x * boost),
      scope4x: Math.min(scale === '200' ? 200 : 100, preset.sensi.scope4x * boost),
      sniperScope: Math.min(scale === '200' ? 200 : 100, preset.sensi.sniperScope * boost),
      freeLook: Math.min(scale === '200' ? 200 : 100, preset.sensi.freeLook * boost),
    });
    setModel(`${preset.name} Official Setup`);
    setActiveTab('calculator');
    showToast(`Loaded ${preset.name}'s setup into calculator!`);
  };

  // Load saved config
  const handleLoadConfig = (config: SavedConfiguration) => {
    soundFx.playClick();
    setBrand(config.deviceBrand as DeviceBrand);
    setModel(config.deviceModel);
    setRam(config.ram);
    setRefreshRate(config.refreshRate);
    setPlaystyle(config.playstyle);
    setScale(config.scale || '200');
    setCurrentSensi(config.sensi);
    setActiveTab('calculator');
    showToast(`Loaded: "${config.title}"`);
  };

  // Delete saved config
  const handleDeleteConfig = (id: string) => {
    soundFx.playClick();
    setSavedConfigs((prev) => prev.filter((c) => c.id !== id));
    showToast('Setup deleted from library.');
  };

  // Apply 90% Headshot Lock Sensi
  const handleApplyHeadshotLock = (newSensi: SensiValues, fireSize: number) => {
    setCurrentSensi(newSensi);
    showToast(`🎯 90% Headshot Lock Sensi Applied! (Fire Button: ${fireSize}%)`);
  };

  const handleDirectApkInstall = async () => {
    soundFx.playHeadshot();
    soundFx.playBassDrop();

    // Trigger direct APK file download
    triggerApkDownload('release');
    showToast('📥 Downloading FF_SensiPro_v4.9_VIP.apk... Check notification bar!');

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          showToast('✓ App installed to your phone successfully!');
        }
      } catch {
        setIsApkModalOpen(true);
      }
    } else {
      setIsApkModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-amber-500 text-zinc-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scale={scale}
        setScale={setScale}
        onDetectDevice={handleDetectDevice}
        onOpenGameLauncher={() => setIsLauncherOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
        isInstalled={isInstalled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Prominent Quick APK Install & Download Banner */}
        <ApkQuickInstallBanner
          onOpenModal={() => setIsApkModalOpen(true)}
          onDirectInstall={handleDirectApkInstall}
          isInstalled={isInstalled}
        />

        {activeTab === 'vippanel' && (
          <div className="space-y-6">
            <DeviceSelector
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              ram={ram}
              setRam={setRam}
              refreshRate={refreshRate}
              setRefreshRate={setRefreshRate}
              touchSampling={touchSampling}
              setTouchSampling={setTouchSampling}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              playstyle={playstyle}
              setPlaystyle={setPlaystyle}
              grip={grip}
              setGrip={setGrip}
            />

            <VipHeadshotPanel
              sensi={currentSensi}
              setSensi={setCurrentSensi}
              brand={brand}
              model={model}
              ram={ram}
              refreshRate={refreshRate}
              touchSampling={touchSampling}
              safeDpi={calculated.hardware.safeDpi}
              fireButtonSize={calculated.hardware.fireButtonSize}
              scale={scale}
              onOpenFloatingWidget={() => {
                soundFx.playClick();
                setIsFloatingPanelOpen(true);
                showToast('📱 Floating VIP Panel Opened on Screen!');
              }}
              onApplyPreset={(newSensi) => {
                setCurrentSensi(newSensi);
                showToast('⚡ VIP Sensi Profile Injected to App!');
              }}
            />
          </div>
        )}

        {activeTab === 'ffsettings' && (
          <div className="space-y-6">
            <DeviceSelector
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              ram={ram}
              setRam={setRam}
              refreshRate={refreshRate}
              setRefreshRate={setRefreshRate}
              touchSampling={touchSampling}
              setTouchSampling={setTouchSampling}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              playstyle={playstyle}
              setPlaystyle={setPlaystyle}
              grip={grip}
              setGrip={setGrip}
            />

            <FreeFireSettingsSimulator
              currentSensi={currentSensi}
              onChangeSensi={setCurrentSensi}
              scale={scale}
              setScale={setScale}
              fireButtonSize={calculated.hardware.fireButtonSize}
              onChangeFireSize={(size) => {
                // update hardware recommendation if needed
              }}
              model={model}
              brand={brand}
              safeDpi={calculated.hardware.safeDpi}
              onOpenTrainer={() => setActiveTab('trainer')}
            />
          </div>
        )}

        {activeTab === 'headshot90' && (
          <div className="space-y-6">
            <DeviceSelector
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              ram={ram}
              setRam={setRam}
              refreshRate={refreshRate}
              setRefreshRate={setRefreshRate}
              touchSampling={touchSampling}
              setTouchSampling={setTouchSampling}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              playstyle={playstyle}
              setPlaystyle={setPlaystyle}
              grip={grip}
              setGrip={setGrip}
            />

            <HeadshotLock90Engine
              ram={ram}
              refreshRate={refreshRate}
              scale={scale}
              model={model}
              brand={brand}
              onApplySensi={handleApplyHeadshotLock}
            />
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <DeviceSelector
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              ram={ram}
              setRam={setRam}
              refreshRate={refreshRate}
              setRefreshRate={setRefreshRate}
              touchSampling={touchSampling}
              setTouchSampling={setTouchSampling}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              playstyle={playstyle}
              setPlaystyle={setPlaystyle}
              grip={grip}
              setGrip={setGrip}
            />

            {/* 90% Headshot Lock Feature Banner & Engine */}
            <HeadshotLock90Engine
              ram={ram}
              refreshRate={refreshRate}
              scale={scale}
              model={model}
              brand={brand}
              onApplySensi={handleApplyHeadshotLock}
            />

            <SensiResultsCard
              sensi={currentSensi}
              setSensi={setCurrentSensi}
              hardware={calculated.hardware}
              analysis={calculated.analysis}
              brand={brand}
              model={model}
              ram={ram}
              refreshRate={refreshRate}
              playstyle={playstyle}
              scale={scale}
              onSavePreset={handleSavePreset}
              onOpenTrainer={() => setActiveTab('trainer')}
              onOpenDpiGuide={() => setIsDpiGuideOpen(true)}
            />
          </div>
        )}

        {activeTab === 'proaim' && (
          <ProAimSection
            currentSensi={currentSensi}
            scale={scale}
            brand={brand}
            model={model}
            ram={ram}
            refreshRate={refreshRate}
            touchSampling={touchSampling}
            playstyle={playstyle}
            fireButtonSize={calculated.hardware.fireButtonSize}
            onOpenTrainer={() => setActiveTab('trainer')}
          />
        )}

        {activeTab === 'characters' && <CharacterSkillsBuilder />}

        {activeTab === 'customroom' && <CustomRoomGenerator />}

        {activeTab === 'crosshair' && <CrosshairBloomSimulator />}

        {activeTab === 'compare' && (
          <ProSensiCompare
            currentSensi={currentSensi}
            scale={scale}
            onApplyProPreset={handleApplyProPreset}
          />
        )}

        {activeTab === 'fixer' && (
          <HeadshotDiagnosticTool
            currentSensi={currentSensi}
            setSensi={setCurrentSensi}
            hardware={calculated.hardware}
            scale={scale}
            onOpenTrainer={() => setActiveTab('trainer')}
          />
        )}

        {activeTab === 'code' && <ControlCodeOptimizer />}

        {activeTab === 'weapons' && (
          <WeaponSensiMatrix currentSensi={currentSensi} scale={scale} />
        )}

        {activeTab === 'trainer' && (
          <DragTrainer currentSensi={currentSensi} scale={scale} />
        )}

        {activeTab === 'hud' && (
          <HudAndControlsTab hardware={calculated.hardware} grip={grip} />
        )}

        {activeTab === 'pro' && (
          <ProPresetsTab onApplyPreset={handleApplyProPreset} scale={scale} />
        )}

        {activeTab === 'latency' && <TouchLatencyTester />}

        {activeTab === 'saved' && (
          <SavedConfigs
            configs={savedConfigs}
            onLoadConfig={handleLoadConfig}
            onDeleteConfig={handleDeleteConfig}
          />
        )}
      </main>

      {/* Floating Action Controls on Mobile */}
      <div className="fixed bottom-4 right-4 z-40 sm:hidden flex items-center gap-2">
        <button
          onClick={() => setIsApkModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-3 rounded-full bg-zinc-900 border border-emerald-500/40 text-emerald-400 font-bold text-xs shadow-xl active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>APK</span>
        </button>

        <button
          onClick={() => setIsLauncherOpen(true)}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs shadow-xl active:scale-95 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Launch FF</span>
        </button>
      </div>

      {/* Direct Free Fire Game Launcher Modal */}
      <LaunchGameModal
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        sensi={currentSensi}
        model={model}
      />

      {/* APK Installer Modal */}
      <ApkInstallerModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
        deferredPrompt={deferredPrompt}
        isInstalled={isInstalled}
      />

      {/* Floating VIP Panel Overlay Widget */}
      {isFloatingPanelOpen && (
        <FloatingVipWidget
          sensi={currentSensi}
          setSensi={setCurrentSensi}
          fireButtonSize={calculated.hardware.fireButtonSize}
          model={model}
          onClose={() => setIsFloatingPanelOpen(false)}
        />
      )}

      {/* Brand-Wise Safe DPI Guide Modal */}
      <DpiGuideModal
        isOpen={isDpiGuideOpen}
        onClose={() => setIsDpiGuideOpen(false)}
        brand={brand}
        model={model}
        safeDpi={calculated.hardware.safeDpi}
      />

      {/* GitHub & Source Code Download Modal */}
      <GitHubDownloadModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              100% Anti-Ban & Safe · Official PWA Edition v4.8.2 (Package: com.ffsensipro.headshotengine)
            </span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-zinc-600">
            Free Fire is a registered trademark of Garena. This tool does not modify game files or inject APK code.
          </div>
        </div>
      </footer>
    </div>
  );
}
