import React, { useMemo, useState, useEffect } from 'react';

export type LandscapeScene = 'desert' | 'snow' | 'forest' | 'sunset';

interface AnimatedLandscapeProps {
  scene?: LandscapeScene;
  autoRotate?: boolean;
  onSceneChange?: (newScene: LandscapeScene) => void;
}

export const AnimatedLandscape: React.FC<AnimatedLandscapeProps> = ({
  scene = 'desert',
  autoRotate = true,
  onSceneChange,
}) => {
  const [activeScene, setActiveScene] = useState<LandscapeScene>(scene);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState<boolean>(autoRotate);

  // Sync prop changes
  useEffect(() => {
    setActiveScene(scene);
  }, [scene]);

  // Auto-rotation timer: cycles through Desert -> Snow -> Forest -> Sunset every 16s
  useEffect(() => {
    if (!autoRotateEnabled) return;
    const scenes: LandscapeScene[] = ['desert', 'snow', 'forest', 'sunset'];
    const timer = setInterval(() => {
      setActiveScene((prev) => {
        const nextIndex = (scenes.indexOf(prev) + 1) % scenes.length;
        const nextScene = scenes[nextIndex];
        if (onSceneChange) onSceneChange(nextScene);
        return nextScene;
      });
    }, 16000);

    return () => clearInterval(timer);
  }, [autoRotateEnabled, onSceneChange]);

  // Floating Fireflies (for Forest & Sunset)
  const fireflies = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3) % 100}%`,
      bottom: `${(i * 3.7) % 40 + 5}%`,
      delay: `${(i * 0.6) % 8}s`,
      duration: `${6 + (i % 6)}s`,
      size: `${2 + (i % 4)}px`,
    }));
  }, []);

  // Falling Snowflakes (for Snowy Mountains)
  const snowflakes = useMemo(() => {
    return Array.from({ length: 38 }).map((_, i) => ({
      id: i,
      left: `${(i * 2.7) % 100}%`,
      delay: `${(i * 0.4) % 10}s`,
      duration: `${6 + (i % 7)}s`,
      size: `${3 + (i % 5)}px`,
      opacity: 0.4 + (i % 5) * 0.15,
    }));
  }, []);

  // Golden Sand Motes (for Desert)
  const sandMotes = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      top: `${(i * 3.5) % 80 + 10}%`,
      delay: `${(i * 0.5) % 7}s`,
      duration: `${5 + (i % 5)}s`,
      size: `${2 + (i % 3)}px`,
    }));
  }, []);

  // Stars for upper sky
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.7 + 2) % 96}%`,
      top: `${(i * 3.3 + 2) % 35}%`,
      opacity: 0.25 + ((i % 5) * 0.15),
      size: `${1 + (i % 3)}px`,
      twinkleDelay: `${(i * 0.4) % 4}s`,
    }));
  }, []);

  const handleManualSwitch = (newScene: LandscapeScene) => {
    setActiveScene(newScene);
    if (onSceneChange) onSceneChange(newScene);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. SKY GRADIENT BACKGROUND (Smooth transitions) */}
      {/* DESERT SKY */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-b from-[#7c2d12] via-[#ea580c] via-[#f59e0b] to-[#1e1b4b] ${
          activeScene === 'desert' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* SNOWY MOUNTAINS SKY */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-b from-[#020617] via-[#0f172a] via-[#1e293b] to-[#0e3b5e] ${
          activeScene === 'snow' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* FOREST SKY */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-b from-[#022c22] via-[#064e3b] via-[#047857] to-[#0f172a] ${
          activeScene === 'forest' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* SUNSET SKY */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-b from-[#fdba74] via-[#f43f5e] via-[#4c1d95] to-[#0f172a] ${
          activeScene === 'sunset' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* AURORA BOREALIS (Only in Snow Mode) */}
      {activeScene === 'snow' && (
        <div className="absolute top-0 left-0 right-0 h-[45vh] overflow-hidden opacity-60 pointer-events-none">
          <div
            className="w-[120vw] -left-[10vw] h-64 bg-gradient-to-b from-cyan-400/20 via-emerald-400/30 to-transparent blur-3xl"
            style={{ animation: 'aurora-wave 12s ease-in-out infinite' }}
          />
        </div>
      )}

      {/* 2. STARS IN UPPER SKY */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-100"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: activeScene === 'snow' ? star.opacity * 1.3 : star.opacity,
            animation: `pulse-ring 3s infinite ease-in-out ${star.twinkleDelay}`,
          }}
        />
      ))}

      {/* 3. CELESTIAL BODIES (Desert Hot Sun / Sunset Sun / Cold Moon / Forest Moon) */}
      {/* Desert Radiant Sun */}
      {activeScene === 'desert' && (
        <div className="absolute top-[28%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-1 animate-in fade-in duration-700">
          <div className="w-80 h-80 rounded-full bg-amber-400/30 blur-3xl animate-sun-glow" />
          <div className="absolute inset-0 m-auto w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-b from-yellow-200 via-amber-300 to-orange-500 shadow-[0_0_90px_#f59e0b,0_0_150px_#ea580c] animate-sun-glow" />
        </div>
      )}

      {/* Sunset Sinking Sun */}
      {activeScene === 'sunset' && (
        <div className="absolute top-[38%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-1 animate-in fade-in duration-700">
          <div className="w-80 h-80 rounded-full bg-rose-500/30 blur-3xl animate-sun-glow" />
          <div className="absolute inset-0 m-auto w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-rose-600 shadow-[0_0_80px_#f97316,0_0_140px_#ef4444] animate-sun-glow" />
        </div>
      )}

      {/* Snow Cold Full Moon */}
      {activeScene === 'snow' && (
        <div className="absolute top-[22%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-1 animate-in fade-in duration-700">
          <div className="w-64 h-64 rounded-full bg-cyan-200/20 blur-2xl" />
          <div className="absolute inset-0 m-auto w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-white via-cyan-100 to-slate-300 shadow-[0_0_60px_#38bdf8,0_0_120px_#e0f2fe]" />
        </div>
      )}

      {/* Forest Glowing Greenish Moon */}
      {activeScene === 'forest' && (
        <div className="absolute top-[26%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-1 animate-in fade-in duration-700">
          <div className="w-64 h-64 rounded-full bg-emerald-300/20 blur-2xl" />
          <div className="absolute inset-0 m-auto w-26 h-26 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-emerald-100 via-teal-200 to-emerald-600 shadow-[0_0_70px_#34d399,0_0_130px_#059669]" />
        </div>
      )}

      {/* 4. DRIFTING CLOUDS (Parallax Layers) */}
      <div
        className="absolute top-[12%] w-[380px] h-[90px] opacity-40 blur-[1px]"
        style={{ animation: 'cloud-drift-1 55s linear infinite' }}
      >
        <svg viewBox="0 0 200 60" fill="url(#mainCloudGrad)" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="mainCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M20,45 Q30,20 55,25 Q70,5 95,18 Q125,2 150,22 Q175,15 185,45 Z" />
        </svg>
      </div>

      <div
        className="absolute top-[26%] w-[480px] h-[120px] opacity-55"
        style={{
          animation: 'cloud-drift-2 70s linear infinite',
          animationDelay: '-25s',
        }}
      >
        <svg viewBox="0 0 240 70" fill="url(#midCloudGrad)" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="midCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M15,50 Q30,15 65,22 Q85,5 120,16 Q160,0 190,20 Q220,12 230,50 Z" />
        </svg>
      </div>

      {/* 5. SOARING BIRDS / EAGLES FLOCK */}
      <div
        className="absolute top-[20%] -left-20 z-2 pointer-events-none"
        style={{
          animation: 'cloud-drift-1 26s linear infinite',
          animationDelay: '-4s',
        }}
      >
        <div className="relative flex items-center space-x-6">
          <div className="w-8 h-5 text-amber-200/90 animate-bird-wing">
            <svg viewBox="0 0 32 20" fill="currentColor">
              <path d="M0,10 Q8,0 16,10 Q24,0 32,10 Q24,6 16,12 Q8,6 0,10 Z" />
            </svg>
          </div>
          <div className="w-6 h-4 text-orange-200/80 animate-bird-wing" style={{ animationDelay: '0.15s', transform: 'translateY(8px)' }}>
            <svg viewBox="0 0 32 20" fill="currentColor">
              <path d="M0,10 Q8,0 16,10 Q24,0 32,10 Q24,6 16,12 Q8,6 0,10 Z" />
            </svg>
          </div>
          <div className="w-5 h-3 text-amber-300/80 animate-bird-wing" style={{ animationDelay: '0.3s', transform: 'translateY(-6px)' }}>
            <svg viewBox="0 0 32 20" fill="currentColor">
              <path d="M0,10 Q8,0 16,10 Q24,0 32,10 Q24,6 16,12 Q8,6 0,10 Z" />
            </svg>
          </div>
          <div className="w-4 h-3 text-rose-200/70 animate-bird-wing" style={{ animationDelay: '0.45s', transform: 'translateY(14px)' }}>
            <svg viewBox="0 0 32 20" fill="currentColor">
              <path d="M0,10 Q8,0 16,10 Q24,0 32,10 Q24,6 16,12 Q8,6 0,10 Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 6. LANDSCAPE TERRAIN LAYERS (Switching Scenes) */}

      {/* === SCENE 1: DESERT / SAHRO (Rolling Sand Dunes & Palms) === */}
      {activeScene === 'desert' && (
        <div className="absolute inset-x-0 bottom-0 h-[65vh] z-4 animate-in fade-in duration-1000">
          {/* Distant Dunes */}
          <div className="absolute bottom-[24%] left-0 right-0 h-[38vh]">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full" fill="url(#distantDuneGrad)">
              <defs>
                <linearGradient id="distantDuneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#7c2d12" />
                </linearGradient>
              </defs>
              <path d="M0,320 L0,120 Q360,240 720,110 Q1080,220 1440,90 L1440,320 Z" />
            </svg>
          </div>

          {/* Mid Sand Dunes */}
          <div className="absolute bottom-[12%] left-0 right-0 h-[35vh]">
            <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full" fill="url(#midDuneGrad)">
              <defs>
                <linearGradient id="midDuneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="60%" stopColor="#9a3412" />
                  <stop offset="100%" stopColor="#431407" />
                </linearGradient>
              </defs>
              <path d="M0,300 L0,160 Q400,60 800,180 Q1150,80 1440,150 L1440,300 Z" />
            </svg>
          </div>

          {/* Foreground Dunes with Desert Palm Silhouettes & Cacti */}
          <div className="absolute bottom-0 left-0 right-0 h-[24vh]">
            <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-full" fill="#290e05">
              <path d="M0,220 L0,90 Q300,160 650,80 Q1000,150 1440,70 L1440,220 Z" />
            </svg>

            {/* Left Desert Palms */}
            <div className="absolute bottom-[40px] left-8 flex items-end space-x-3">
              <PalmTreeSVG height={130} width={70} color="#180702" />
              <PalmTreeSVG height={100} width={55} color="#290e05" />
            </div>

            {/* Right Desert Palms */}
            <div className="absolute bottom-[35px] right-10 flex items-end space-x-3">
              <PalmTreeSVG height={140} width={75} color="#180702" />
              <PalmTreeSVG height={110} width={60} color="#290e05" />
            </div>
          </div>

          {/* Golden Sand Drift Particles */}
          {sandMotes.map((mote) => (
            <div
              key={mote.id}
              className="absolute rounded-full bg-yellow-300 shadow-[0_0_8px_#f59e0b] pointer-events-none"
              style={{
                top: mote.top,
                left: '-50px',
                width: mote.size,
                height: mote.size,
                animation: `sand-drift ${mote.duration} linear infinite ${mote.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* === SCENE 2: QORLI TOG'LAR (Snowy Sharp Peaks & Blizzard) === */}
      {activeScene === 'snow' && (
        <div className="absolute inset-x-0 bottom-0 h-[68vh] z-4 animate-in fade-in duration-1000">
          {/* Distant Majestic Sharp Snowy Mountains */}
          <div className="absolute bottom-[22%] left-0 right-0 h-[48vh]">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full" fill="url(#distantSnowGrad)">
              <defs>
                <linearGradient id="distantSnowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <path d="M0,400 L0,190 L140,100 L280,240 L450,70 L580,200 L720,60 L880,220 L1040,50 L1180,190 L1320,90 L1440,170 L1440,400 Z" />
              {/* White Snowy Mountain Peak Caps */}
              <polygon points="140,100 110,130 170,130" fill="#ffffff" />
              <polygon points="450,70 410,120 490,120" fill="#f0f9ff" />
              <polygon points="720,60 670,115 770,115" fill="#ffffff" />
              <polygon points="1040,50 990,110 1090,110" fill="#f0f9ff" />
              <polygon points="1320,90 1280,130 1360,130" fill="#ffffff" />
            </svg>
          </div>

          {/* Mid Ridge Snowy Slopes */}
          <div className="absolute bottom-[10%] left-0 right-0 h-[42vh]">
            <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(56,189,248,0.25)]" fill="url(#midSnowGrad)">
              <defs>
                <linearGradient id="midSnowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="25%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
              </defs>
              <path d="M0,380 L0,170 L170,95 L320,210 L500,85 L650,220 L780,120 L940,240 L1100,95 L1260,230 L1440,140 L1440,380 Z" />
            </svg>
          </div>

          {/* Foreground Snowy Terrain with Frosted Pine Trees */}
          <div className="absolute bottom-0 left-0 right-0 h-[28vh]">
            <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full" fill="#0f172a">
              <path d="M0,260 L0,100 Q250,60 500,110 Q750,150 1000,80 Q1250,30 1440,90 L1440,260 Z" />
            </svg>

            {/* Snow Covered Evergreen Cluster (Left) */}
            <div className="absolute bottom-[35px] left-6 flex items-end space-x-3">
              <PineTreeSVG height={120} width={48} color="#0c4a6e" snowCap />
              <PineTreeSVG height={145} width={58} color="#0284c7" snowCap />
              <PineTreeSVG height={100} width={42} color="#0c4a6e" snowCap />
            </div>

            {/* Snow Covered Evergreen Cluster (Right) */}
            <div className="absolute bottom-[30px] right-8 flex items-end space-x-3">
              <PineTreeSVG height={110} width={45} color="#0c4a6e" snowCap />
              <PineTreeSVG height={150} width={60} color="#0284c7" snowCap />
              <PineTreeSVG height={95} width={40} color="#0c4a6e" snowCap />
            </div>
          </div>

          {/* Falling Snow Particles */}
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute rounded-full bg-white shadow-[0_0_6px_#38bdf8] pointer-events-none"
              style={{
                left: flake.left,
                top: '-20px',
                width: flake.size,
                height: flake.size,
                opacity: flake.opacity,
                animation: `snowfall ${flake.duration} linear infinite ${flake.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* === SCENE 3: YASHIL O'RMON (Lush Forest Canopy & Fireflies) === */}
      {activeScene === 'forest' && (
        <div className="absolute inset-x-0 bottom-0 h-[68vh] z-4 animate-in fade-in duration-1000">
          {/* Distant Mountain Forest Ridges */}
          <div className="absolute bottom-[22%] left-0 right-0 h-[46vh]">
            <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full" fill="url(#forestDistGrad)">
              <defs>
                <linearGradient id="forestDistGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="60%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#022c22" />
                </linearGradient>
              </defs>
              <path d="M0,380 L0,180 L180,120 L350,230 L520,100 L700,210 L880,90 L1060,200 L1250,110 L1440,170 L1440,380 Z" />
            </svg>
          </div>

          {/* Mid Woodland Canopy Silhouettes */}
          <div className="absolute bottom-[10%] left-0 right-0 h-[40vh]">
            <svg viewBox="0 0 1440 360" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(52,211,153,0.2)]" fill="url(#forestMidGrad)">
              <defs>
                <linearGradient id="forestMidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#047857" />
                  <stop offset="50%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#011f18" />
                </linearGradient>
              </defs>
              <path d="M0,360 L0,150 Q360,70 720,160 Q1080,60 1440,130 L1440,360 Z" />
            </svg>
          </div>

          {/* Foreground Forest with Trees, Evergreens & Bush Layers */}
          <div className="absolute bottom-0 left-0 right-0 h-[28vh]">
            <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full" fill="#022c22">
              <path d="M0,260 L0,100 Q300,60 600,120 Q900,150 1200,80 L1440,110 L1440,260 Z" />
            </svg>

            {/* Lush Tree Clusters */}
            <div className="absolute bottom-[35px] left-4 flex items-end space-x-2 animate-sway-slow">
              <PineTreeSVG height={130} width={52} color="#065f46" />
              <PineTreeSVG height={160} width={64} color="#047857" />
              <PineTreeSVG height={110} width={45} color="#064e3b" />
              <PineTreeSVG height={140} width={56} color="#059669" />
            </div>

            <div className="absolute bottom-[40px] left-[35%] hidden sm:flex items-end space-x-3 animate-sway-alt">
              <PineTreeSVG height={120} width={48} color="#047857" />
              <PineTreeSVG height={145} width={58} color="#065f46" />
            </div>

            <div className="absolute bottom-[30px] right-6 flex items-end space-x-2 animate-sway-alt">
              <PineTreeSVG height={120} width={48} color="#065f46" />
              <PineTreeSVG height={165} width={66} color="#047857" />
              <PineTreeSVG height={135} width={54} color="#059669" />
              <PineTreeSVG height={95} width={40} color="#064e3b" />
            </div>
          </div>

          {/* Floating Bioluminescent Forest Fireflies */}
          {fireflies.map((ff) => (
            <div
              key={ff.id}
              className="absolute rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399,0_0_20px_#10b981] z-6 pointer-events-none"
              style={{
                left: ff.left,
                bottom: ff.bottom,
                width: ff.size,
                height: ff.size,
                animation: `firefly-rise ${ff.duration} infinite ease-in-out ${ff.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* === SCENE 4: QUYOSH BOTISHI (Classic Sunset Mountain Horizon) === */}
      {activeScene === 'sunset' && (
        <div className="absolute inset-x-0 bottom-0 h-[68vh] z-4 animate-in fade-in duration-1000">
          {/* Layer 1: Distant Misty High Mountain Peaks */}
          <div className="absolute bottom-[22%] left-0 right-0 h-[48vh] opacity-75">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full" fill="url(#distantMountainGrad)">
              <defs>
                <linearGradient id="distantMountainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#311042" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M0,400 L0,220 L120,150 L260,260 L410,110 L540,210 L680,90 L820,230 L980,80 L1120,210 L1260,130 L1380,240 L1440,190 L1440,400 Z" />
            </svg>
          </div>

          {/* Layer 2: Mid-Range Rugged Mountains with Sunset Edge Rim Light */}
          <div className="absolute bottom-[10%] left-0 right-0 h-[44vh]">
            <svg viewBox="0 0 1440 380" preserveAspectRatio="none" className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(250,204,21,0.2)]" fill="url(#midMountainGrad)">
              <defs>
                <linearGradient id="midMountainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e1065" />
                  <stop offset="40%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <path d="M0,380 L0,180 L160,110 L300,210 L460,95 L610,230 L740,140 L890,250 L1040,105 L1200,240 L1360,120 L1440,170 L1440,380 Z" />
            </svg>
          </div>

          {/* Layer 3: Foreground Ridges & Swaying Pine Trees Silhouettes */}
          <div className="absolute bottom-0 left-0 right-0 h-[28vh]">
            <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full" fill="#1e293b">
              <path d="M0,260 L0,110 Q220,70 460,120 Q700,160 960,90 Q1200,40 1440,100 L1440,260 Z" />
            </svg>

            {/* Left Forest cluster */}
            <div className="absolute bottom-[35px] left-3 md:left-12 flex items-end space-x-2 md:space-x-4 animate-sway-slow">
              <PineTreeSVG height={110} width={45} color="#0f172a" />
              <PineTreeSVG height={140} width={55} color="#064e3b" />
              <PineTreeSVG height={95} width={40} color="#0f172a" />
              <PineTreeSVG height={125} width={50} color="#065f46" />
            </div>

            {/* Right Forest cluster */}
            <div className="absolute bottom-[30px] right-2 md:right-10 flex items-end space-x-2 md:space-x-3 animate-sway-alt">
              <PineTreeSVG height={100} width={42} color="#0f172a" />
              <PineTreeSVG height={150} width={60} color="#064e3b" />
              <PineTreeSVG height={115} width={46} color="#065f46" />
              <PineTreeSVG height={80} width={35} color="#0f172a" />
            </div>
          </div>

          {/* Sunset Glowing Fireflies */}
          {fireflies.map((ff) => (
            <div
              key={ff.id}
              className="absolute rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b,0_0_20px_#ea580c] z-6 pointer-events-none"
              style={{
                left: ff.left,
                bottom: ff.bottom,
                width: ff.size,
                height: ff.size,
                animation: `firefly-rise ${ff.duration} infinite ease-in-out ${ff.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* 7. BOTTOM CONTENT READABILITY GRADIENT OVERLAY */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-7 pointer-events-none" />

      {/* 8. FLOATING INTERACTIVE LANDSCAPE SWITCHER DOCK (Bottom-Center Right) */}
      <div className="fixed top-20 right-4 z-40 pointer-events-auto">
        <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center space-x-1">
          <button
            onClick={() => handleManualSwitch('desert')}
            title="Cho'l va Sahro manzarasi"
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all ${
              activeScene === 'desert'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🏜️</span>
            <span className="hidden md:inline">Cho'l</span>
          </button>

          <button
            onClick={() => handleManualSwitch('snow')}
            title="Qorli Tog'lar manzarasi"
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all ${
              activeScene === 'snow'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-400/30 scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🏔️</span>
            <span className="hidden md:inline">Qorli Tog'</span>
          </button>

          <button
            onClick={() => handleManualSwitch('forest')}
            title="Sirlı O'rmon manzarasi"
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all ${
              activeScene === 'forest'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/30 scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🌲</span>
            <span className="hidden md:inline">O'rmon</span>
          </button>

          <button
            onClick={() => handleManualSwitch('sunset')}
            title="Quyosh Botishi manzarasi"
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all ${
              activeScene === 'sunset'
                ? 'bg-yellow-400 text-slate-950 font-bold shadow-lg shadow-yellow-400/30 scale-105'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🌅</span>
            <span className="hidden md:inline">Quyosh</span>
          </button>

          <button
            onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
            title={autoRotateEnabled ? "Avto almashish yoqilgan (har 16s)" : "Avto almashish to'xtatilgan"}
            className={`p-1.5 rounded-full text-xs transition-all ${
              autoRotateEnabled
                ? 'text-yellow-300 bg-yellow-400/20'
                : 'text-white/40 hover:text-white'
            }`}
          >
            <span className={autoRotateEnabled ? "inline-block animate-spin" : ""}>🔄</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Pine Tree SVG with geometric sharp evergreen silhouette + snowCap option
const PineTreeSVG: React.FC<{ width: number; height: number; color: string; snowCap?: boolean }> = ({
  width,
  height,
  color,
  snowCap = false,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 140"
      fill={color}
      className="filter drop-shadow-md"
    >
      <rect x="22" y="115" width="6" height="25" fill="#020204" />
      <polygon points="25,0 12,35 20,35 7,65 17,65 2,98 15,98 0,125 50,125 35,98 48,98 33,65 43,65 30,35 38,35" />
      {snowCap && (
        <>
          <polygon points="25,0 16,25 34,25" fill="#ffffff" />
          <polygon points="20,35 11,55 29,55" fill="#f0f9ff" />
          <polygon points="17,65 7,85 27,85" fill="#ffffff" />
        </>
      )}
    </svg>
  );
};

// Reusable Desert Palm Tree SVG
const PalmTreeSVG: React.FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 140"
      fill={color}
      className="filter drop-shadow-md"
    >
      {/* Curved Trunk */}
      <path d="M40,140 Q35,70 42,40 Q44,70 47,140 Z" fill="#180702" />
      {/* Palm Fronds (Leaves) */}
      <path d="M42,40 Q15,30 0,45 Q20,20 42,40 Z" />
      <path d="M42,40 Q10,15 5,0 Q30,10 42,40 Z" />
      <path d="M42,40 Q42,5 40,-10 Q50,10 42,40 Z" />
      <path d="M42,40 Q70,15 75,0 Q55,10 42,40 Z" />
      <path d="M42,40 Q65,30 80,45 Q60,20 42,40 Z" />
    </svg>
  );
};
