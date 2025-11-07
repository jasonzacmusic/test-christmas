import { Youtube, Instagram } from "lucide-react";
import jasonChristmas from "@assets/3_1762528038976.jpg";

export function ProfileSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
              About Your Teacher
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from Jason Zachariah, a Bangalore-based musician with over two decades of experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
                <img
                  src={jasonChristmas}
                  alt="Jason Zachariah in festive Christmas attire"
                  className="relative rounded-2xl shadow-2xl w-full max-w-lg object-cover"
                  data-testid="img-jason-profile"
                />
              </div>
            </div>

            <div className="space-y-6 text-foreground">
              <p className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                Jason is the co-director of the <strong className="text-primary">Nathaniel School of Music</strong> and runs a YouTube Education channel with over <strong className="text-primary">115,000 subscribers</strong>, teaching piano, bass, music theory, composition, ear training, production, and rhythm concepts. His <strong className="text-primary">15,000+ Instagram supporters</strong> benefit from daily music tips and lessons.
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                His teaching style is best described as <strong className="text-primary">custom-made to suit every level</strong>. Jason has a knack for identifying the best methods that are engaging, interactive, and flexible to suit the needs of almost any student. His workshops and tutorials are lauded in the music circle for being <strong className="text-primary">result-oriented</strong> while allowing space for students to learn and improvise above and beyond.
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                As a <strong className="text-primary">multi-instrumentalist</strong>, Jason plays piano, bass, horns, assorted percussion, and sings. He has released <strong className="text-primary">three albums</strong> to date, each showing his growth in musical expression, with the latest incorporating influences from Indian Classical Music and Celtic Folk. He has also performed with bands including <strong className="text-primary">Allegro Fudge</strong>, blending folk with Indian influences.
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                Jason comes from a family of music pioneers. His grandfathers, <strong className="text-primary">Walter Nathaniel</strong> and <strong className="text-primary">A.D. Zachariah</strong>, were key figures in Western and Indian Classical Music in India, respectively, a legacy that informs his unique approach to music education.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">115k+</div>
                  <div className="text-sm text-muted-foreground">YouTube Subscribers</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">15k+</div>
                  <div className="text-sm text-muted-foreground">Instagram Supporters</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Released Albums</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="flex justify-center gap-6 pt-6">
                <a
                  href="https://www.youtube.com/nathanielschool?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover-elevate"
                  data-testid="link-jason-youtube"
                >
                  <Youtube className="w-5 h-5" />
                  <span className="font-semibold">YouTube</span>
                </a>
                <a
                  href="https://www.instagram.com/jasonzac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover-elevate"
                  data-testid="link-jason-instagram"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-semibold">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
