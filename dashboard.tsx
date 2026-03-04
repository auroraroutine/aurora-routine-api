import BottomNav from "@/components/layout/bottom-nav";
import { Link } from "wouter";
import { useBabyStore } from "@/store/baby-store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun, Scale, Ruler, HeartPulse, Activity, Lock, Calendar, Heart, Apple, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { name, isPremium, journeyStage, pregnancyWeek } = useBabyStore();
  const displayName = name || "Baby";

  const renderPregnancyDashboard = () => (
    <div className="flex-1 pb-24 bg-background min-h-screen">
      <div className="bg-rose-50 p-6 pt-12 pb-10 rounded-b-[3rem] mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Heart size={150} />
        </div>
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-rose-950">
              Week {pregnancyWeek}
            </h1>
            <p className="text-rose-800 font-medium mt-1">Trimester 2 • 112 days to go</p>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-rose-100">
            <span className="text-2xl text-rose-500">🌽</span>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-none shadow-sm rounded-2xl relative z-10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-rose-100 p-3 rounded-xl text-rose-500">
              <Apple size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Size of an Ear of Corn</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Baby is about 11.8 inches long and weighs around 1.3 pounds!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-heading">Your Wellness</h2>
            <Link href="/log" className="text-sm font-bold text-rose-500">Log Daily</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-none shadow-sm bg-blue-50/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <Droplets className="text-blue-500" size={24} />
                <span className="text-sm font-bold text-slate-700">Water Intake</span>
                <span className="text-xs text-slate-500">3/8 Glasses</span>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-purple-50/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <Moon className="text-purple-500" size={24} />
                <span className="text-sm font-bold text-slate-700">Sleep</span>
                <span className="text-xs text-slate-500">7h 30m</span>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading mb-4">Your Journey</h2>
          <Card className="border-rose-100 shadow-sm overflow-hidden">
            <div className="bg-rose-500 text-white p-3 font-bold text-sm flex justify-between">
              <span>Next Checkup</span>
              <span>In 5 Days</span>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-slate-800 mb-1">Anatomy Scan & Glucose Test</h3>
              <p className="text-sm text-slate-600 mb-3">Don't forget to fast for 8 hours before your appointment if instructed.</p>
              <Button variant="outline" className="w-full text-rose-600 border-rose-200 hover:bg-rose-50">Prepare Questions</Button>
            </CardContent>
          </Card>
        </section>
      </div>
      <BottomNav />
    </div>
  );

  const renderBabyDashboard = () => (
    <div className="flex-1 pb-24 bg-background min-h-screen">
      <div className="bg-primary/10 p-6 pt-12 pb-8 rounded-b-[2.5rem] mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Hi, {displayName}!
            </h1>
            <p className="text-muted-foreground font-medium">3 months, 2 days old</p>
          </div>
          <Avatar className="w-16 h-16 border-4 border-background shadow-md">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" />
            <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">B</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card/60 backdrop-blur-sm border-none shadow-md rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3 opacity-20">
              <Moon size={32} />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground font-semibold mb-1">Last Sleep</p>
              <h3 className="text-2xl font-bold font-heading text-secondary-foreground">2h 15m</h3>
              <p className="text-xs text-secondary mt-1 font-medium">Woke up 1h ago</p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-sm border-none shadow-md rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3 opacity-20">
              <Activity size={32} />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground font-semibold mb-1">Next Feed</p>
              <h3 className="text-2xl font-bold font-heading text-primary">In 45m</h3>
              <p className="text-xs text-primary/70 mt-1 font-medium">120ml usual</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-heading">Growth Tracker</h2>
            <Link href="/log" className="text-sm font-bold text-primary">Update</Link>
          </div>
          <div className="bg-card rounded-3xl p-5 shadow-sm border flex justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-secondary/20 p-3 rounded-full text-secondary">
                <Scale size={24} />
              </div>
              <span className="font-bold text-lg">6.2 kg</span>
              <span className="text-xs text-muted-foreground">Weight</span>
            </div>
            <div className="w-px bg-border my-2"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-accent/30 p-3 rounded-full text-accent-foreground">
                <Ruler size={24} />
              </div>
              <span className="font-bold text-lg">61 cm</span>
              <span className="text-xs text-muted-foreground">Length</span>
            </div>
            <div className="w-px bg-border my-2"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-primary/20 p-3 rounded-full text-primary">
                <HeartPulse size={24} />
              </div>
              <span className="font-bold text-lg">Happy</span>
              <span className="text-xs text-muted-foreground">Mood</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading mb-4">Daily Insights</h2>
          
          {!isPremium ? (
            <Card className="bg-gradient-to-r from-card to-card border-primary/20 shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <Lock className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-bold font-heading text-lg">Unlock Personalized Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Get adaptive activity suggestions, optimal visit times, and sleep predictions.
                </p>
                <Link href="/pricing" className="w-full mt-2">
                  <Button className="w-full rounded-xl font-bold shadow-md">
                    View Premium Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
             <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-background p-3 rounded-2xl shadow-sm text-primary">
                    <Sun size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Morning Walk Recommended</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {displayName} slept well last night. A 20-minute walk outside before 10 AM will help set their circadian rhythm.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
      
      <BottomNav />
    </div>
  );

  const renderTryingDashboard = () => (
    <div className="flex-1 pb-24 bg-background min-h-screen">
      <div className="bg-primary/10 p-6 pt-12 pb-10 rounded-b-[3rem] mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Heart size={150} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Hi there!
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Cycle Day 14 • Ovulation Window</p>
        </div>
      </div>
      
      <div className="px-6 space-y-6">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-heading">Your Wellness</h2>
            <Link href="/trying" className="text-sm font-bold text-primary">View Insights</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <Card className="border-none shadow-sm bg-rose-50/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <HeartPulse className="text-rose-500" size={24} />
                <span className="text-sm font-bold text-slate-700">Basal Temp</span>
                <span className="text-xs text-slate-500">97.8°F</span>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-purple-50/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <Moon className="text-purple-500" size={24} />
                <span className="text-sm font-bold text-slate-700">Sleep</span>
                <span className="text-xs text-slate-500">8h 15m</span>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <BottomNav />
    </div>
  );

  if (journeyStage === "trying") return renderTryingDashboard();
  if (journeyStage === "pregnancy") return renderPregnancyDashboard();
  return renderBabyDashboard();
}
