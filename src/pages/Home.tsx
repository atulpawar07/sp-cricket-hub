import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy, Users, Target } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">SP Cricket Group</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Join Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Welcome to SP Cricket Group
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building the future of cricket through passion, dedication, and community spirit.
            Join our elite cricket organization today.
          </p>
          <Button size="lg" onClick={() => navigate("/auth")} className="text-lg px-8 py-3">
            Get Started
          </Button>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Meet Our Founders</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind SP Cricket Group who transformed their passion for cricket 
              into a thriving community of players and enthusiasts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Why Choose SP Cricket Group?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-primary/20">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Professional Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organized, fair, and competitive tournaments with proper rules and regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Strong Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow cricket enthusiasts and build lasting friendships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Improve your game through regular practice sessions and expert guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 SP Cricket Group. Building cricket communities with passion and excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;