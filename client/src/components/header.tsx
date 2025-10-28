import { useEffect, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-end">
        <a
          href="https://www.nathanielschool.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          data-testid="link-school-logo"
        >
          <div className="text-xl font-bold text-primary hover-elevate px-3 py-1 rounded-md transition-all duration-300">
            Nathaniel School of Music
          </div>
        </a>
      </div>
    </header>
  );
}
