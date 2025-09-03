import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Brain } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  onBack: () => void;
}

export default function LoginPage({ onLogin, onSignup, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('demo@houndr.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-primary-light/20 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Welcome back to Houndr
          </h1>
          <p className="text-muted-foreground text-lg">
            Your AI-powered sales intelligence platform is ready to accelerate your pipeline.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="border-border/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in to your account</CardTitle>
              <CardDescription>
                Enter your credentials to access Houndr AI
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input-background border-border/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-input-background border-border/20"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me for 30 days
                  </Label>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-dark"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center space-y-2">
                  <Button variant="link" className="text-sm text-muted-foreground">
                    Forgot your password?
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary"
                      onClick={onSignup}
                    >
                      Sign up here
                    </Button>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    Demo Credentials (pre-filled):
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    Email: demo@houndr.ai<br />
                    Password: password123
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}