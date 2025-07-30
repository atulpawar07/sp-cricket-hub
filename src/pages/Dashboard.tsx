import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Trophy, Users, Camera, BarChart3, LogOut, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string | null;
  created_by: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

interface Player {
  id: string;
  name: string;
  position: string;
  jersey_number: number;
}

const Dashboard = () => {
  const { user, userRole, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      // Fetch events - simplified without joins for now
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      // Fetch photos - simplified without joins for now  
      const { data: photosData } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      // Fetch players
      const { data: playersData } = await supabase
        .from('players')
        .select('*')
        .order('name');

      // Transform events data to match interface (mock creator name for now)
      const transformedEvents = (eventsData || []).map(event => ({
        ...event,
        profiles: { full_name: 'Admin User' }
      }));

      // Transform photos data to match interface (mock uploader name for now)  
      const transformedPhotos = (photosData || []).map(photo => ({
        ...photo,
        profiles: { full_name: 'Admin User' }
      }));

      setEvents(transformedEvents);
      setPhotos(transformedPhotos);
      setPlayers(playersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading SP Cricket Group...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">SP Cricket Group</h1>
              <p className="text-sm text-muted-foreground">Cricket Community Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Badge variant="default" className="bg-primary">
                Admin
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Players
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Cricket Events</h2>
              {isAdmin && (
                <Button onClick={() => navigate('/admin/events/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              )}
            </div>
            
            <div className="grid gap-6">
              {events.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
                    <p className="text-muted-foreground">
                      {isAdmin ? "Create your first event to get started!" : "Check back soon for upcoming events!"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(event.event_date), 'PPP p')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          By {event.profiles?.full_name}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                      {event.image_url && (
                        <div className="mt-4">
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Photo Gallery</h2>
              {isAdmin && (
                <Button onClick={() => navigate('/admin/photos/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              )}
            </div>
            
            {photos.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Photos Yet</h3>
                  <p className="text-muted-foreground">
                    {isAdmin ? "Upload your first photos to get started!" : "Check back soon for cricket memories!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img 
                        src={photo.image_url} 
                        alt={photo.title || 'Cricket photo'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      {photo.title && (
                        <h3 className="font-semibold text-primary mb-1">{photo.title}</h3>
                      )}
                      {photo.description && (
                        <p className="text-sm text-muted-foreground mb-2">{photo.description}</p>
                      )}
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>By {photo.profiles?.full_name}</span>
                        <span>{format(new Date(photo.created_at), 'MMM d, yyyy')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Our Players</h2>
              {isAdmin && (
                <Button onClick={() => navigate('/admin/players/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              )}
            </div>
            
            {players.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Players Yet</h3>
                  <p className="text-muted-foreground">
                    {isAdmin ? "Add your first player to get started!" : "Player profiles will appear here soon!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                  <Card key={player.id} className="text-center">
                    <CardHeader>
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-primary-foreground">
                          #{player.jersey_number}
                        </span>
                      </div>
                      <CardTitle className="text-primary">{player.name}</CardTitle>
                      <p className="text-muted-foreground">{player.position}</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate(`/players/${player.id}`)}
                      >
                        View Stats
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Admin Tab */}
          {isAdmin && (
            <TabsContent value="admin" className="space-y-6">
              <h2 className="text-3xl font-bold">Admin Panel</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow" 
                      onClick={() => navigate('/admin/events')}>
                  <CardContent className="p-6">
                    <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Manage Events</h3>
                    <p className="text-sm text-muted-foreground">Create and edit cricket events</p>
                  </CardContent>
                </Card>

                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate('/admin/photos')}>
                  <CardContent className="p-6">
                    <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Manage Photos</h3>
                    <p className="text-sm text-muted-foreground">Upload and organize photos</p>
                  </CardContent>
                </Card>

                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate('/admin/players')}>
                  <CardContent className="p-6">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Manage Players</h3>
                    <p className="text-sm text-muted-foreground">Add players and manage profiles</p>
                  </CardContent>
                </Card>

                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate('/admin/stats')}>
                  <CardContent className="p-6">
                    <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Player Stats</h3>
                    <p className="text-sm text-muted-foreground">Upload CSV and manage statistics</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
