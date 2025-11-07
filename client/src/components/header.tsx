import { useState, useEffect } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <a
            href="https://www.nathanielschool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity duration-1000 hover-elevate ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            data-testid="link-school-logo"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Nathaniel School of Music
            </h1>
          </a>
        </div>
      </div>
    </header>
  );
}
