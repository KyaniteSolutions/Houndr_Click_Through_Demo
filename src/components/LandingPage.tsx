import { Button } from './ui/button';
import { Card } from './ui/card';
import { Zap, Users, Target, Brain } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Houndr
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onLogin}>
              Log In
            </Button>
            <Button onClick={onSignup} className="bg-primary hover:bg-primary-dark">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-light/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Sales Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover prospects, create campaigns, and conduct market research through an intelligent conversational interface. 
            Built for M&A directors and sales professionals who demand results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onSignup}
              className="bg-primary hover:bg-primary-dark text-lg px-8 py-3"
            >
              Start Free Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-primary/20 hover:border-primary/40"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-alt/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intelligent Sales Automation
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI agents work together to deliver comprehensive sales intelligence and campaign automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 border-border/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prospect Discovery</h3>
              <p className="text-muted-foreground">
                Find high-quality leads with Apollo.io integration and AI-powered qualification.
              </p>
            </Card>

            <Card className="p-6 border-border/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Campaigns</h3>
              <p className="text-muted-foreground">
                Generate personalized email sequences and outreach strategies automatically.
              </p>
            </Card>

            <Card className="p-6 border-border/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Research</h3>
              <p className="text-muted-foreground">
                Real-time industry analysis and competitive intelligence at your fingertips.
              </p>
            </Card>

            <Card className="p-6 border-border/20 bg-card/50 backdrop-blur">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Human Oversight</h3>
              <p className="text-muted-foreground">
                Secure approval workflows ensure you stay in control of sensitive operations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Sales Leaders</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 border-border/20">
              <p className="text-muted-foreground mb-4">
                "Houndr AI has transformed our prospect discovery process. We're finding better leads faster than ever."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span>SJ</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">VP Sales, TechCorp</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/20">
              <p className="text-muted-foreground mb-4">
                "The campaign automation saves us hours every week while improving our response rates significantly."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span>MB</span>
                </div>
                <div>
                  <p className="font-semibold">Michael Brown</p>
                  <p className="text-sm text-muted-foreground">Director, GrowthCo</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border/20">
              <p className="text-muted-foreground mb-4">
                "Market research that used to take days now happens in minutes. Game-changing platform."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span>AL</span>
                </div>
                <div>
                  <p className="font-semibold">Amanda Lee</p>
                  <p className="text-sm text-muted-foreground">M&A Director, InvestCorp</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary-light/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of sales professionals who trust Houndr AI to accelerate their pipeline.
          </p>
          <Button 
            size="lg" 
            onClick={onSignup}
            className="bg-primary hover:bg-primary-dark text-lg px-8 py-3"
          >
            Start Your Free Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Houndr AI. All rights reserved. This is a demo application.</p>
        </div>
      </footer>
    </div>
  );
}