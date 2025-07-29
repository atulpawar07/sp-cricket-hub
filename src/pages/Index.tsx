import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Users, Calendar, Target } from 'lucide-react';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">SP Cricket Group</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.user_metadata?.full_name || user.email}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => signOut()}
            className="border-primary/30 hover:bg-primary/10"
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Tournaments</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Feb - Nov</div>
              <p className="text-xs text-muted-foreground">10 tournaments per year</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">200-400</div>
              <p className="text-xs text-muted-foreground">Registered players</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Fee</CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹151</div>
              <p className="text-xs text-muted-foreground">One-time yearly fee</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Championship</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Ashish Bhai</div>
              <p className="text-xs text-muted-foreground">Tiwari Chashak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
              <CardDescription>Manage your cricket journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                <Calendar className="mr-2 h-4 w-4" />
                View Tournaments
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
                <Users className="mr-2 h-4 w-4" />
                Player Stats
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
                <Trophy className="mr-2 h-4 w-4" />
                Tournament History
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Recent Updates</CardTitle>
              <CardDescription>Stay updated with the latest news</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Welcome to SP Cricket Group!</p>
                <p className="text-xs text-muted-foreground">
                  You've successfully registered. Payment processing and tournament features coming soon.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Upcoming: Ashish Bhai Tiwari Chashak</p>
                <p className="text-xs text-muted-foreground">
                  Our annual championship tournament - the ultimate cricket competition.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
