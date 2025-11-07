import { Youtube, Instagram } from "lucide-react";
import nsmLogoWhite from "@assets/NSM White_1762526198507.png";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="mb-4">
            <a
              href="https://www.nathanielschool.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
              data-testid="link-website-logo"
              aria-label="Visit Nathaniel School of Music Website"
            >
              <div className="bg-foreground/90 dark:bg-transparent rounded-full p-3 transition-colors">
                <img 
                  src={nsmLogoWhite} 
                  alt="NSM Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-christmas)' }}>
                Nathaniel School of Music
              </h2>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.youtube.com/nathanielschool?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover-elevate p-3 rounded-full"
              data-testid="link-youtube"
              aria-label="YouTube"
            >
              <Youtube className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/jasonzac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover-elevate p-3 rounded-full"
              data-testid="link-instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-7 h-7" />
            </a>
          </div>

          <p className="text-muted-foreground text-center text-sm" data-testid="text-copyright">
            © 2025 | All Rights Reserved
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-gentle-scale" />
    </footer>
  );
}
