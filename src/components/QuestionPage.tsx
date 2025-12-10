import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";

interface QuestionPageProps {
  onYes: () => void;
}

const noButtonTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change your mind?",
  "Please? 🥺",
  "Pretty please?",
  "I'll be sad...",
  "You're breaking my heart!",
  "Okay fine... just kidding!",
  "Catch me if you can!",
  "Nope, try again!",
];

type ButtonBehavior = 
  | "run" 
  | "shrink" 
  | "spin" 
  | "multiply" 
  | "shake" 
  | "rainbow" 
  | "jelly"
  | "float"
  | "teleport";

const QuestionPage = ({ onYes }: QuestionPageProps) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [currentBehavior, setCurrentBehavior] = useState<ButtonBehavior>("run");
  const [isAnimating, setIsAnimating] = useState(false);
  const [extraButtons, setExtraButtons] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hiddenButtons, setHiddenButtons] = useState<number[]>([]);
  const [showSparkles, setShowSparkles] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonScale = 1 + noClickCount * 0.12;

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const getRandomBehavior = useCallback((): ButtonBehavior => {
    const behaviors: ButtonBehavior[] = [
      "run", "run", "run", // More likely to run
      "shrink", 
      "spin", 
      "multiply", 
      "shake", 
      "rainbow",
      "jelly",
      "float",
      "teleport"
    ];
    return behaviors[Math.floor(Math.random() * behaviors.length)];
  }, []);

  const getRandomPosition = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const maxX = container.width - 150;
      const maxY = container.height - 80;
      return {
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY,
      };
    }
    return { x: 0, y: 0 };
  }, []);

  const handleNoInteraction = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const behavior = getRandomBehavior();
    setCurrentBehavior(behavior);

    switch (behavior) {
      case "run":
      case "teleport":
        setNoButtonPosition(getRandomPosition());
        break;
      case "multiply":
        if (extraButtons.length < 5) {
          const newButtons = Array.from({ length: 2 }, (_, i) => ({
            id: Date.now() + i,
            ...getRandomPosition(),
          }));
          setExtraButtons((prev) => [...prev, ...newButtons]);
        }
        setNoButtonPosition(getRandomPosition());
        break;
      case "float":
        // Button will float away and reappear
        setTimeout(() => {
          setNoButtonPosition(getRandomPosition());
        }, 800);
        break;
      default:
        setNoButtonPosition(getRandomPosition());
    }

    setNoClickCount((prev) => Math.min(prev + 1, noButtonTexts.length - 1));
    setShowSparkles(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      setShowSparkles(false);
    }, 500);
  }, [isAnimating, getRandomBehavior, getRandomPosition, extraButtons.length]);

  const handleExtraButtonClick = (id: number) => {
    setHiddenButtons((prev) => [...prev, id]);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 500);
  };

  const getButtonAnimation = () => {
    if (!isAnimating) return "";
    switch (currentBehavior) {
      case "shake": return "animate-shake";
      case "spin": return "animate-spin-away";
      case "shrink": return "animate-shrink";
      case "rainbow": return "animate-rainbow";
      case "jelly": return "animate-jelly";
      case "float": return "animate-float-away";
      default: return "";
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingHearts />
        <div className="text-center z-10">
          <p 
            className="text-2xl md:text-4xl font-quicksand text-foreground/80 mb-4 animate-fade-in-up"
          >
            Hey you...
          </p>
          <h1 
            className="text-4xl md:text-6xl font-dancing text-primary animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            I have something to ask you
          </h1>
          <span 
            className="inline-block text-5xl mt-4 animate-heartbeat"
            style={{ animationDelay: "1s" }}
          >
            ♥
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      <FloatingHearts />
      {showSparkles && <Sparkles />}

      <div className="text-center z-10 mb-12">
        <h1 className="text-5xl md:text-7xl font-dancing text-primary mb-6 animate-heartbeat">
          Will you be mine?
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 font-quicksand animate-fade-in-up">
          ♥ Please say yes ♥
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center z-10 relative">
        <Button
          onClick={onYes}
          className="px-12 py-6 text-2xl font-bold shadow-romantic hover:shadow-glow transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full animate-zoom-in"
          style={{
            transform: `scale(${yesButtonScale})`,
            transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        >
          Yes! ♥
        </Button>

        <Button
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          variant="outline"
          className={`px-8 py-4 text-lg font-medium border-2 border-primary/30 text-foreground/60 hover:border-primary/50 rounded-full transition-all duration-200 ${getButtonAnimation()}`}
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            transition: currentBehavior === "teleport" ? "none" : "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        >
          {noButtonTexts[noClickCount]}
        </Button>
      </div>

      {/* Extra multiplied buttons */}
      {extraButtons.map((btn) => (
        !hiddenButtons.includes(btn.id) && (
          <Button
            key={btn.id}
            onClick={() => handleExtraButtonClick(btn.id)}
            onMouseEnter={() => handleExtraButtonClick(btn.id)}
            variant="outline"
            className="absolute px-6 py-3 text-sm font-medium border-2 border-primary/20 text-foreground/40 rounded-full animate-zoom-in hover:animate-spin-away z-10"
            style={{
              transform: `translate(${btn.x}px, ${btn.y}px)`,
              top: "50%",
              left: "50%",
            }}
          >
            No way!
          </Button>
        )
      ))}

      {noClickCount > 2 && (
        <p 
          className="mt-8 text-foreground/50 text-sm animate-slide-in-bottom z-10"
        >
          {noClickCount > 8 
            ? "Just say YES already! 💕" 
            : noClickCount > 5 
              ? "The No button really doesn't want to be clicked! 😄"
              : "Hint: The 'No' button is a bit shy... 😊"}
        </p>
      )}

      {noClickCount > 10 && (
        <div className="mt-4 animate-fade-in-up z-10">
          <p className="text-primary font-dancing text-2xl animate-pulse-love">
            You know you want to say yes! ♥
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
