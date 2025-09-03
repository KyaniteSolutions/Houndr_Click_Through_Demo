import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, Brain, Building, User, Mail } from 'lucide-react';

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => void;
  onLogin: () => void;
  onBack: () => void;
}

export default function SignupPage({ onSignup, onLogin, onBack }: SignupPageProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    jobTitle: '',
    teamSize: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSignup(
      `${formData.firstName} ${formData.lastName}`,
      formData.email,
      formData.password
    );
    setIsLoading(false);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-primary/10 to-primary-light/20 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Join Houndr AI
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Start finding better prospects and creating winning campaigns in minutes.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">AI-powered prospect discovery</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Automated campaign creation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Building className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">Real-time market intelligence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>
                Step {step} of 3 - {step === 1 ? 'Personal Information' : step === 2 ? 'Company Details' : 'Account Setup'}
              </CardDescription>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                          className="bg-input-background border-border/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                          className="bg-input-background border-border/20"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-input-background border-border/20"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        className="bg-input-background border-border/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        placeholder="VP of Sales"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        required
                        className="bg-input-background border-border/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        placeholder="10-50 employees"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className="bg-input-background border-border/20"
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        className="bg-input-background border-border/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                        className="bg-input-background border-border/20"
                      />
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Account Summary</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Company:</strong> {formData.company}</p>
                        <p><strong>Role:</strong> {formData.jobTitle}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full gap-4">
                  {step > 1 && (
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handleBack}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button 
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-primary hover:bg-primary-dark"
                      disabled={
                        (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                        (step === 2 && (!formData.company || !formData.jobTitle))
                      }
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary-dark"
                      disabled={isLoading || !formData.password || formData.password !== formData.confirmPassword}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  )}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary"
                    onClick={onLogin}
                  >
                    Sign in here
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}