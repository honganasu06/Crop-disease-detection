import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Database, Award, TrendingUp, Mail, Linkedin, Github, User, ArrowRight, Zap, X, Code } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCounter } from '../hooks/useCounter';
import { useTilt } from '../hooks/useTilt'; // Import the new hook
import teamMembers from './teamMembers.json';
import contactInfo from './contactInfo.json';

// Wrapper component for Tilt effect
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { elementRef, style, handleMouseMove, handleMouseLeave } = useTilt(10, 1.02);

  return (
    <div
      ref={elementRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}

const PROJECT_STRUCTURE = `agrivision/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   ├── remedies.json         # Disease remedies database
│   ├── utils/
│   │   └── preprocess.py     # Image preprocessing utilities
│   └── model/
│       └── model.h5          # Trained TensorFlow model
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   ├── UploadPage.tsx    # Disease detection upload page
│   │   │   ├── ResultsPage.tsx   # Results display page
│   │   │   ├── WeatherPage.tsx   # Weather information page
│   │   │   ├── Navbar.tsx        # Navigation bar
│   │   │   └── ui/               # Radix UI components
│   │   ├── services/
│   │   │   └── api.ts            # API service layer
│   │   ├── styles/
│   │   │   ├── globals.css       # Global styles
│   │   │   └── liquid-glass.css  # Liquid glass animations
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Tailwind CSS
│   ├── package.json
│   └── vite.config.ts
│
└── README.md`;

export function HomePage() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const teamReveal = useScrollReveal();
  const accuracyCount = useCounter(99, 2000, heroReveal.isRevealed);
  const datasetCount = useCounter(54000, 2000, featuresReveal.isRevealed);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Architecture Modal */}
      {isArchitectureOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-card/90 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(57,255,20,0.2)] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">System Architecture</h3>
              </div>
              <button
                onClick={() => setIsArchitectureOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="p-6 overflow-auto max-h-[70vh] bg-black/40 font-mono text-sm text-primary/80">
              <pre className="whitespace-pre">{PROJECT_STRUCTURE}</pre>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setIsArchitectureOpen(false)}
                className="px-6 py-2 rounded-xl bg-primary text-black font-bold hover:bg-primary/90 transition-colors"
              >
                Close Diagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="liquid-glass-blob liquid-glass-blob-1 opacity-30"></div>
          <div className="liquid-glass-blob liquid-glass-blob-2 opacity-30"></div>
          <div className="liquid-glass-blob liquid-glass-blob-3 opacity-30"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={heroReveal.elementRef}>
          <div className={`text-center max-w-5xl mx-auto space-y-8 ${heroReveal.isRevealed ? 'animate-fade-in-up' : 'opacity-0'}`}>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-bounce-in backdrop-blur-md shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-mono text-sm tracking-wider uppercase">System Online • v2.0</span>
            </div>

            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-float">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 glitch-effect" data-text="FUTURE OF">
                  FUTURE OF
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-300 to-emerald-500 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)] glitch-effect" data-text="AGRICULTURE">
                  AGRICULTURE
                </span>
              </h1>

              <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                Next-generation plant disease detection powered by <span className="text-primary font-semibold">Neural Networks</span>.
                Instant analysis with <span className="text-primary font-bold">{accuracyCount}% accuracy</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                to="/upload"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <Zap className="w-5 h-5 fill-current" />
                <span>Initialize Scan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setIsArchitectureOpen(true)}
                className="liquid-glass-button group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg cursor-pointer"
              >
                <Code className="w-5 h-5" />
                <span>System Architecture</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={featuresReveal.elementRef}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-primary">Core</span> Capabilities</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TiltCard className="h-full">
              <div className="glass-crystalline rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 h-full group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(74,222,128,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-primary/20 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Neural Engine</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Powered by advanced CNN architectures optimized for pattern recognition in biological structures.
                </p>
              </div>
            </TiltCard>

            <TiltCard className="h-full">
              <div className="glass-crystalline rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-500 h-full group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(96,165,250,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20 shadow-[0_0_20px_rgba(96,165,250,0.2)]">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Transfer Learning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adaptive model weights fine-tuned on specific crop pathologies for maximum precision.
                </p>
              </div>
            </TiltCard>

            <TiltCard className="h-full">
              <div className="glass-crystalline rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-500 h-full group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(192,132,252,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 shadow-[0_0_20px_rgba(192,132,252,0.2)]">
                  <Database className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Big Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trained on <span className="text-primary font-mono font-bold">{datasetCount.toLocaleString()}</span> validated samples across 38 distinct disease classes.
                </p>
              </div>
            </TiltCard>

            <TiltCard className="h-full">
              <div className="glass-crystalline rounded-3xl p-8 hover:border-yellow-400/50 transition-all duration-500 h-full group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(250,204,21,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-yellow-500/20 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">High Precision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Industry-leading <span className="text-primary font-mono font-bold">{accuracyCount}%</span> validation accuracy in controlled environments.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={teamReveal.elementRef}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The <span className="text-secondary">Architects</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Engineering the future of sustainable agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TiltCard key={member.name}>
                <div className="glass-crystalline rounded-3xl p-6 hover:border-secondary/50 transition-all h-full group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-secondary/50 transition-colors shadow-lg">
                      <User className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" />
                    </div>

                    <div className="text-center space-y-2 mb-6">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-secondary font-mono text-sm uppercase tracking-wider">{member.role}</p>
                    </div>

                    <p className="text-muted-foreground text-center text-sm mb-6 line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex justify-center gap-4">
                      {[
                        { icon: Mail, href: `mailto:${member.email}`, label: 'Email' },
                        { icon: Linkedin, href: member.linkedin, label: 'LinkedIn' },
                        { icon: Github, href: member.github, label: 'GitHub' }
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.href}
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-secondary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 skew-y-3 transform origin-bottom-right"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="glass-crystalline rounded-[2.5rem] p-12 lg:p-16 border border-primary/20 text-center space-y-10 shadow-[0_0_50px_rgba(57,255,20,0.1)]">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Ready to <span className="text-primary">Collaborate?</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join us in revolutionizing crop disease detection. Open source and ready for contribution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a href={`mailto:${contactInfo.email}`} className="group bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-bold mb-2">Email Us</h4>
                <p className="text-muted-foreground text-sm font-mono">{contactInfo.email}</p>
              </a>
              <a href={contactInfo.github} target="_blank" rel="noreferrer" className="group bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-accent/50 transition-all hover:bg-white/10">
                <Github className="w-8 h-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-bold mb-2">GitHub</h4>
                <p className="text-muted-foreground text-sm font-mono">View Source</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
