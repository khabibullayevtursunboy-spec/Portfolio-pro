import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bug, Play, Pause, Zap } from 'lucide-react';

interface SpiderState {
  x: number;
  y: number;
  rotation: number;
  isMoving: boolean;
  isHanging: boolean;
  hangLength: number;
}

export const CrawlingSpider: React.FC = () => {
  const [spider, setSpider] = useState<SpiderState>({
    x: 120,
    y: 120,
    rotation: 45,
    isMoving: true,
    isHanging: false,
    hangLength: 0,
  });

  const [legPhase, setLegPhase] = useState(0);
  const [spiderSpeech, setSpiderSpeech] = useState<string | null>(null);
  const [spiderSpeed, setSpiderSpeed] = useState<'normal' | 'fast' | 'turbo'>('normal');
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [speechTimer, setSpeechTimer] = useState<NodeJS.Timeout | null>(null);

  const targetRef = useRef<{ x: number; y: number }>({ x: 300, y: 300 });
  const animFrameRef = useRef<number | null>(null);

  // Pick random target in viewport
  const pickNewTarget = () => {
    if (typeof window === 'undefined') return;
    const maxX = Math.max(window.innerWidth - 120, 200);
    const maxY = Math.max(window.innerHeight - 140, 200);

    // Random chance (20%) to drop on a web string from top
    const rollWeb = Math.random() < 0.22;
    if (rollWeb) {
      const dropX = 80 + Math.random() * (maxX - 160);
      const dropY = 150 + Math.random() * 260;
      targetRef.current = { x: dropX, y: dropY };
      setSpider((prev) => ({
        ...prev,
        isHanging: true,
        hangLength: dropY,
      }));
    } else {
      const nextX = 50 + Math.random() * (maxX - 80);
      const nextY = 60 + Math.random() * (maxY - 100);
      targetRef.current = { x: nextX, y: nextY };
      setSpider((prev) => ({
        ...prev,
        isHanging: false,
      }));
    }
  };

  // Main animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateSpider = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused) {
        setSpider((prev) => {
          const target = targetRef.current;
          const dx = target.x - prev.x;
          const dy = target.y - prev.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 15) {
            // Reached destination, pick new target after small pause
            setTimeout(pickNewTarget, 600 + Math.random() * 1200);
            return { ...prev, isMoving: false };
          }

          // Compute angle towards target
          const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
          
          // Smooth rotation
          let diffAngle = (targetAngle - prev.rotation) % 360;
          if (diffAngle < -180) diffAngle += 360;
          if (diffAngle > 180) diffAngle -= 360;
          const newRot = prev.rotation + diffAngle * 0.15;

          // Speed multiplier
          const speedPixels =
            spiderSpeed === 'turbo' ? 240 : spiderSpeed === 'fast' ? 150 : 90;
          const step = Math.min(speedPixels * dt, dist);

          const moveX = prev.x + (dx / dist) * step;
          const moveY = prev.y + (dy / dist) * step;

          return {
            ...prev,
            x: moveX,
            y: moveY,
            rotation: newRot,
            isMoving: true,
          };
        });

        // Leg walking cycle
        setLegPhase((p) => (p + (spiderSpeed === 'turbo' ? 0.35 : 0.2)) % (Math.PI * 2));
      }

      animFrameRef.current = requestAnimationFrame(updateSpider);
    };

    animFrameRef.current = requestAnimationFrame(updateSpider);
    pickNewTarget();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [spiderSpeed, isPaused]);

  // Click handler on spider
  const handleSpiderClick = () => {
    // Quick burst of speed and backflip
    const quotes = [
      "🕷️ Qidiryapsizmi? Men kod ichidagi buglarni (xatoliklarni) yeyman!",
      "🕸️ 14 yoshli dasturchining kiber-o'rgimchagiman!",
      "⚡ Tezligim Python GIL dan ham tez!",
      "🎯 Backend xavfsizligini qo'riqlayapman!",
      "🔥 Django + React kodlarini tekshiryapman!",
    ];
    const pickedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    if (speechTimer) clearTimeout(speechTimer);
    setSpiderSpeech(pickedQuote);
    const timer = setTimeout(() => setSpiderSpeech(null), 4000);
    setSpeechTimer(timer);

    // Jump / scurry to a new position
    pickNewTarget();
  };

  // Compute leg angles based on phase
  const l1 = Math.sin(legPhase) * 16;
  const l2 = Math.sin(legPhase + 1.2) * 16;
  const l3 = Math.sin(legPhase + 2.4) * 16;
  const l4 = Math.sin(legPhase + 3.6) * 16;

  const r1 = Math.sin(legPhase + Math.PI) * 16;
  const r2 = Math.sin(legPhase + Math.PI + 1.2) * 16;
  const r3 = Math.sin(legPhase + Math.PI + 2.4) * 16;
  const r4 = Math.sin(legPhase + Math.PI + 3.6) * 16;

  return (
    <>
      {/* Dangling Silk Web Thread if hanging */}
      {spider.isHanging && (
        <div
          className="fixed z-40 pointer-events-none"
          style={{
            left: `${spider.x}px`,
            top: 0,
            width: '1.5px',
            height: `${spider.y}px`,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(250,204,21,0.9), rgba(239,68,68,0.7))',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
          }}
        />
      )}

      {/* Crawling Spider Main Body (Interactive & Large) */}
      <div
        className="fixed z-45 cursor-pointer select-none transition-transform duration-75"
        style={{
          left: `${spider.x}px`,
          top: `${spider.y}px`,
          transform: `translate(-50%, -50%) rotate(${spider.rotation}deg)`,
        }}
        onClick={handleSpiderClick}
        title="14 yoshli devning kiber-o'rgimchagi! (Bosing)"
      >
        {/* Speech Bubble */}
        {spiderSpeech && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-56 p-2.5 rounded-xl bg-slate-950/95 border border-yellow-400 text-white font-mono text-[11px] shadow-2xl z-50 animate-in fade-in zoom-in duration-200"
            style={{
              transform: `translate(-50%, -100%) rotate(${-spider.rotation}deg)`,
            }}
          >
            <div className="font-bold text-yellow-300 flex items-center space-x-1 mb-0.5">
              <span>🕷️ Kiber O'rgimchak:</span>
            </div>
            <p className="leading-snug text-white/90">{spiderSpeech}</p>
          </div>
        )}

        {/* Spider SVG Body with 8 articulated crawling legs */}
        <div className="relative w-20 h-20 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] hover:scale-115 transition-transform">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="spiderBodyGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="60%" stopColor="#111827" />
                <stop offset="100%" stopColor="#030712" />
              </radialGradient>
              <linearGradient id="spiderLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4b5563" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>

            {/* LEFT LEGS (4 articulated jointed legs) */}
            {/* Left Leg 1 (Front) */}
            <path
              d={`M42,42 Q20,${25 + l1} 5,${15 + l1}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Leg 2 */}
            <path
              d={`M40,48 Q15,${42 + l2} 2,${38 + l2}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Leg 3 */}
            <path
              d={`M40,55 Q16,${65 + l3} 4,${72 + l3}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Leg 4 (Back) */}
            <path
              d={`M42,62 Q22,${85 + l4} 12,${96 + l4}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* RIGHT LEGS (4 articulated jointed legs) */}
            {/* Right Leg 1 (Front) */}
            <path
              d={`M58,42 Q80,${25 + r1} 95,${15 + r1}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Leg 2 */}
            <path
              d={`M60,48 Q85,${42 + r2} 98,${38 + r2}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Leg 3 */}
            <path
              d={`M60,55 Q84,${65 + r3} 96,${72 + r3}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Leg 4 (Back) */}
            <path
              d={`M58,62 Q78,${85 + r4} 88,${96 + r4}`}
              stroke="url(#spiderLegGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Pedipalps (Front pincers) */}
            <path d="M46,34 Q42,24 38,28" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M54,34 Q58,24 62,28" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Abdomen (Rear Body - Large Oval) */}
            <ellipse cx="50" cy="65" rx="14" ry="18" fill="url(#spiderBodyGrad)" stroke="#ef4444" strokeWidth="1.2" />
            {/* Abdomen Glowing Red Hourglass / Cyber Emblem */}
            <path
              d="M47,56 L53,56 L47,72 L53,72 Z"
              fill="#dc2626"
              className="animate-pulse"
              filter="drop-shadow(0 0 3px #ef4444)"
            />

            {/* Cephalothorax (Middle Head & Chest) */}
            <circle cx="50" cy="44" r="10" fill="url(#spiderBodyGrad)" stroke="#374151" strokeWidth="1" />

            {/* Glowing Venomous Eyes (4 glowing eyes) */}
            <circle cx="47" cy="38" r="1.8" fill="#ef4444" className="animate-ping opacity-75" />
            <circle cx="47" cy="38" r="1.5" fill="#facc15" />
            <circle cx="53" cy="38" r="1.8" fill="#ef4444" className="animate-ping opacity-75" />
            <circle cx="53" cy="38" r="1.5" fill="#facc15" />
            
            <circle cx="44" cy="40" r="1" fill="#ef4444" />
            <circle cx="56" cy="40" r="1" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* Mini Floating Spider Controller Widget (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        {!showControls ? (
          <button
            onClick={() => setShowControls(true)}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-yellow-400 border border-yellow-400/40 shadow-xl backdrop-blur-md flex items-center space-x-1.5 text-xs font-mono transition-all hover:scale-105"
            title="O'rgimchak sozlamalari"
          >
            <span className="text-sm">🕷️</span>
            <span className="hidden sm:inline font-bold">O'rgimchak</span>
          </button>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-yellow-400/50 shadow-2xl backdrop-blur-xl space-y-2 text-xs font-mono w-48 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-yellow-300 font-bold flex items-center space-x-1">
                <span>🕷️ O'rgimchak</span>
              </span>
              <button
                onClick={() => setShowControls(false)}
                className="text-white/60 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-white/60">Harakat tezligi:</span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setSpiderSpeed('normal')}
                  className={`py-1 rounded text-[10px] ${
                    spiderSpeed === 'normal'
                      ? 'bg-yellow-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Oddiy
                </button>
                <button
                  onClick={() => setSpiderSpeed('fast')}
                  className={`py-1 rounded text-[10px] ${
                    spiderSpeed === 'fast'
                      ? 'bg-yellow-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Tez
                </button>
                <button
                  onClick={() => setSpiderSpeed('turbo')}
                  className={`py-1 rounded text-[10px] ${
                    spiderSpeed === 'turbo'
                      ? 'bg-red-500 text-white font-bold'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Turbo
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center space-x-1"
              >
                {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-yellow-400" />}
                <span>{isPaused ? 'Harakat' : 'To\'xtatish'}</span>
              </button>

              <button
                onClick={handleSpiderClick}
                className="px-2 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white text-[10px]"
              >
                Sakrash
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
