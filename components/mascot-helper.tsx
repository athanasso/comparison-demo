'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, MessageCircle, HelpCircle, Sparkles } from 'lucide-react';

const TIPS = [
  { id: 1, text: "Simples! Adding a higher voluntary excess can lower your premium.", icon: "💡" },
  { id: 2, text: "Did you know? Parking in a garage overnight can reduce your quote.", icon: "🏠" },
  { id: 3, text: "Pro tip: Compare both annual and monthly prices - annual is usually cheaper!", icon: "💰" },
  { id: 4, text: "Good news! Pass Plus certificate holders often get lower premiums.", icon: "🎓" },
  { id: 5, text: "Remember: The cheapest quote isn't always the best - check the cover level!", icon: "⚖️" },
  { id: 6, text: "Meerkat says: Adding a black box could save you money as a new driver!", icon: "📦" },
  { id: 7, text: "Fun fact: Your occupation can affect your premium. Make sure it's accurate!", icon: "💼" },
  { id: 8, text: "Top tip: Building up no-claims discount is the best way to save long-term!", icon: "⭐" },
];

interface MascotHelperProps {
  showOnIdle?: boolean;
  idleTimeMs?: number;
}

export function MascotHelper({ showOnIdle = true, idleTimeMs = 10000 }: MascotHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(TIPS[0]);
  const [showIdlePrompt, setShowIdlePrompt] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Track user activity
  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowIdlePrompt(false);
  }, []);

  // Check for idle state
  useEffect(() => {
    if (!showOnIdle) return;

    const checkIdle = setInterval(() => {
      if (Date.now() - lastActivity > idleTimeMs && !isOpen) {
        setShowIdlePrompt(true);
        // Pick a random tip
        setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
      }
    }, 1000);

    // Add activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => {
      document.addEventListener(event, resetIdleTimer, { passive: true });
    });

    return () => {
      clearInterval(checkIdle);
      events.forEach((event) => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [showOnIdle, idleTimeMs, lastActivity, isOpen, resetIdleTimer]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowIdlePrompt(false);
    // Pick a new random tip when opening
    setCurrentTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  };

  const handleNextTip = () => {
    const currentIndex = TIPS.findIndex((t) => t.id === currentTip.id);
    const nextIndex = (currentIndex + 1) % TIPS.length;
    setCurrentTip(TIPS[nextIndex]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Idle Prompt Bubble */}
      {showIdlePrompt && !isOpen && (
        <div
          className="absolute bottom-20 right-0 w-72 animate-bounce-slow"
          onClick={handleOpen}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-amber-300 cursor-pointer hover:border-amber-400 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentTip.icon}</span>
              <div>
                <p className="text-sm text-slate-700 font-medium">{currentTip.text}</p>
                <p className="text-xs text-teal-600 font-bold mt-2">Click for more tips!</p>
              </div>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-2 border-b-2 border-amber-300 rotate-45" />
          </div>
        </div>
      )}

      {/* Expanded Chat Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🦡</span>
                </div>
                <div>
                  <h4 className="font-bold">Meerkat Helper</h4>
                  <p className="text-xs text-white/80">Here to help you save!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{currentTip.icon}</span>
                <div>
                  <p className="text-slate-700 font-medium">{currentTip.text}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextTip}
              className="w-full mt-4 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium text-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Another tip!
            </button>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-slate-100 p-3 bg-slate-50">
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-teal-300 transition-colors flex items-center justify-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                FAQs
              </button>
              <button className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-teal-300 transition-colors flex items-center justify-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleOpen}
        className={`
          w-16 h-16 rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-300 transform hover:scale-110
          ${isOpen
            ? 'bg-slate-700 rotate-0'
            : 'bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse-slow'
          }
          ${showIdlePrompt && !isOpen ? 'ring-4 ring-amber-300 ring-opacity-50' : ''}
        `}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <span className="text-3xl">🦡</span>
        )}
      </button>
    </div>
  );
}
