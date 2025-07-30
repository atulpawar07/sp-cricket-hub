import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, {
      full_name: fullName,
      phone: phone
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">SP Cricket Group</h1>
          </div>
        </div>
      </header>

      {/* Founders Introduction Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Founders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind SP Cricket Group who transformed their passion for cricket 
              into a thriving community of players and enthusiasts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Founder 1 */}
            <Card className="text-center border-primary/20 bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-primary-foreground">SM</span>
                </div>
                <CardTitle className="text-2xl text-primary">Sameer Manjrekar</CardTitle>
                <p className="text-primary/70 font-medium">Founder & CEO</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A passionate cricket enthusiast with over 15 years of experience in organizing 
                  tournaments and building cricket communities. Sameer's vision is to create a 
                  platform where every cricket lover can showcase their talent and grow together.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Leadership</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Strategy</span>
                </div>
              </CardContent>
            </Card>

            {/* Founder 2 */}
            <Card className="text-center border-primary/20 bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-accent-foreground">SP</span>
                </div>
                <CardTitle className="text-2xl text-primary">Sandesh Patil</CardTitle>
                <p className="text-primary/70 font-medium">Co-Founder & COO</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  An operational excellence expert who brings systematic approach to cricket 
                  management. Sandesh ensures smooth tournament operations and maintains the 
                  highest standards of sportsmanship across all SP Cricket Group activities.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">Operations</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">Excellence</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-2">Join Our Community</h3>
              <p className="text-muted-foreground">Ready to be part of SP Cricket Group?</p>
            </div>

            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Welcome</CardTitle>
                <CardDescription>
                  Sign in to your account or register to join SP Cricket Group
                </CardDescription>
              </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-accent-foreground">
                    <strong>Annual Registration Fee: ₹151</strong><br/>
                    Join SP Cricket Group for a full year of tournaments and cricket excitement!
                  </p>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register (₹151/year)'}
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Registration creates your account. Payment will be processed separately.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Ashish Bhai Tiwari Chashak • Monthly Tournaments • Cricket Stats
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;