import BottomNav from "@/components/layout/bottom-nav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Moon, Sun, Utensils, Star, Activity, Baby, Eye, Users } from "lucide-react";
import { useBabyStore } from "@/store/baby-store";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Routine() {
  const { isPremium, isPro } = useBabyStore();
  const [activeTab, setActiveTab] = useState("today");

  const routines = [
    { time: "07:00 AM", type: "wake", title: "Wake Up & Cuddles", duration: "30m", icon: Sun, color: "text-accent-foreground", bg: "bg-accent/20", borderColor: "border-accent" },
    { time: "07:30 AM", type: "feed", title: "Morning Feed", duration: "20m", icon: Utensils, color: "text-primary", bg: "bg-primary/20", borderColor: "border-primary" },
    { 
      time: "08:00 AM", 
      type: "activity", 
      title: "Wake Window Activity", 
      duration: "1h 15m", 
      icon: Activity, 
      color: "text-secondary", 
      bg: "bg-secondary/20", 
      borderColor: "border-secondary",
      premium: true,
      suggestions: [
        { title: "Tummy Time", level: "High Stimulation", duration: "10-15m" },
        { title: "High-Contrast Cards", level: "Medium Stimulation", duration: "10m" },
        { title: "Gentle Stretching", level: "Low Stimulation", duration: "15m" }
      ],
      warning: "Watch for eye-rubbing or yawning. End activity immediately if fussy."
    },
    { time: "09:15 AM", type: "sleep", title: "Morning Nap", duration: "1h 30m", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-100", borderColor: "border-indigo-200" },
    { time: "10:45 AM", type: "wake", title: "Wake & Diaper Change", duration: "15m", icon: Baby, color: "text-accent-foreground", bg: "bg-accent/20", borderColor: "border-accent" },
    { time: "11:00 AM", type: "feed", title: "Mid-day Feed", duration: "20m", icon: Utensils, color: "text-primary", bg: "bg-primary/20", borderColor: "border-primary" },
    { 
      time: "11:30 AM", 
      type: "visit", 
      title: "Ideal Visit Window", 
      duration: "1h", 
      icon: Users, 
      color: "text-emerald-500", 
      bg: "bg-emerald-100", 
      borderColor: "border-emerald-200",
      premium: true,
      description: "Baby is usually most alert and happy during this window based on recent logs. Perfect time for grandparents to visit!"
    },
  ];

  return (
    <div className="flex-1 pb-24 bg-background min-h-screen">
      <div className="p-6 pt-12 pb-4 bg-card shadow-sm sticky top-0 z-10">
        <h1 className="text-3xl font-heading font-bold mb-4">Daily Routine</h1>
        <div className="flex gap-2 bg-muted p-1.5 rounded-2xl">
          <button 
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "yesterday" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("yesterday")}
          >
            Yesterday
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "today" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "tomorrow" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setActiveTab("tomorrow")}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="relative border-l-2 border-muted ml-6 space-y-8 pb-8">
          {routines.map((routine, idx) => {
            const Icon = routine.icon;
            const isPremiumLocked = routine.premium && !isPremium;

            return (
              <div key={idx} className="relative pl-8">
                <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full ${routine.bg} flex items-center justify-center border-4 border-background shadow-sm`}>
                  <Icon size={14} className={routine.color} />
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-muted-foreground">{routine.time}</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md text-muted-foreground flex items-center gap-1">
                    <Clock size={10} /> {routine.duration}
                  </span>
                </div>
                
                <Card className={`border-l-4 ${routine.borderColor} shadow-sm overflow-hidden`}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      {routine.title}
                      {routine.premium && <Star size={14} className="text-amber-500 fill-amber-500" />}
                    </h3>
                    
                    {isPremiumLocked ? (
                      <div className="mt-3 p-3 bg-muted rounded-xl border border-dashed text-center">
                        <p className="text-sm text-muted-foreground mb-3 font-medium">Unlock personalized activity & visit suggestions</p>
                        <Link href="/pricing">
                          <Button size="sm" variant="outline" className="w-full font-bold rounded-lg bg-background">
                            Upgrade to Premium
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        {routine.type === "activity" && routine.suggestions && (
                          <div className="mt-4 space-y-3">
                            <p className="text-sm font-medium text-foreground mb-2">Suggested Wake Window Activities:</p>
                            <div className="grid gap-2">
                              {routine.suggestions.map((s, i) => (
                                <div key={i} className="flex justify-between items-center bg-secondary/10 p-2.5 rounded-lg border border-secondary/20">
                                  <div>
                                    <p className="text-sm font-bold">{s.title}</p>
                                    <p className="text-[10px] text-muted-foreground">{s.level}</p>
                                  </div>
                                  <Badge variant="outline" className="bg-background">{s.duration}</Badge>
                                </div>
                              ))}
                            </div>
                            {routine.warning && (
                              <div className="mt-3 bg-destructive/10 p-3 rounded-lg border border-destructive/20 flex items-start gap-2">
                                <Eye size={16} className="text-destructive shrink-0 mt-0.5" />
                                <p className="text-xs text-destructive font-medium leading-relaxed">{routine.warning}</p>
                              </div>
                            )}
                            
                            {isPro && (
                              <div className="mt-3 bg-primary/10 p-3 rounded-lg border border-primary/20 flex items-start gap-2">
                                <Star size={16} className="text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-primary-foreground font-medium leading-relaxed text-slate-700">
                                  <strong>Pro Insight:</strong> Based on yesterday's poor afternoon nap, prioritize low-stimulation activities to prevent overtiredness today.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {routine.type === "visit" && routine.description && (
                          <div className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {routine.description}
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
