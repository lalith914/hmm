import { useEffect, useState } from "react";
import Confetti from "./Confetti";

const SuccessPage = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1200),
      setTimeout(() => setStage(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <Confetti />

      {/* Soft gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center z-10 max-w-xl">
        {stage >= 1 && (
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl font-quicksand text-foreground/50 tracking-widest uppercase mb-4">
              you said yes
            </p>
            
            <h1 className="text-6xl md:text-8xl font-dancing text-primary mb-8">
              Finally.
            </h1>
          </div>
        )}

        {stage >= 2 && (
          <div 
            className="animate-fade-in-up mb-12"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-xl md:text-2xl font-quicksand text-foreground/70 leading-relaxed">
              I've been waiting to hear that
            </p>
            <p className="text-2xl md:text-3xl font-dancing text-primary/80 mt-2">
              for so long
            </p>
          </div>
        )}

        {stage >= 3 && (
          <>
            <div 
              className="animate-zoom-in mb-16"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="inline-block">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto mb-6" />
                <p className="text-3xl md:text-4xl font-dancing text-foreground/80">
                  You & Me
                </p>
                <p className="text-sm font-quicksand text-foreground/40 tracking-[0.3em] uppercase mt-3">
                  starting now
                </p>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent mx-auto mt-6" />
              </div>
            </div>

            <div 
              className="animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <span className="text-4xl animate-pulse-love inline-block">♥</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
