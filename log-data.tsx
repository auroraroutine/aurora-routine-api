import BottomNav from "@/components/layout/bottom-nav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Utensils, Baby, Ruler, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LogData() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("sleep");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "sleep", label: "Sleep", icon: Moon, color: "bg-indigo-100 text-indigo-600" },
    { id: "feed", label: "Feed", icon: Utensils, color: "bg-primary/20 text-primary" },
    { id: "diaper", label: "Diaper", icon: Baby, color: "bg-accent/30 text-accent-foreground" },
    { id: "growth", label: "Growth", icon: Ruler, color: "bg-secondary/30 text-secondary-foreground" }
  ];

  const handleLog = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Log saved successfully!",
        description: "Your baby's routine has been updated.",
        action: <CheckCircle2 className="text-primary" />,
      });
    }, 800);
  };

  return (
    <div className="flex-1 pb-24 bg-background min-h-screen">
      <div className="p-6 pt-12 pb-6">
        <h1 className="text-3xl font-heading font-bold mb-6">Log Activity</h1>
        
        <div className="grid grid-cols-4 gap-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex flex-col items-center gap-2 outline-none"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? `${cat.color} ring-2 ring-offset-2 ring-foreground scale-110 shadow-md` : "bg-muted text-muted-foreground"
                }`}>
                  <Icon size={28} />
                </div>
                <span className={`text-xs font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <Card className="border-none shadow-lg bg-card/80 backdrop-blur-md rounded-3xl">
          <CardContent className="p-6">
            {activeCategory === "sleep" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold font-heading text-xl">Sleep Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground block mb-2">Sleep Quality</label>
                    <div className="flex gap-2">
                      {["Poor", "Fair", "Good", "Great"].map(q => (
                        <Button key={q} variant="outline" className="flex-1 rounded-xl bg-background hover:bg-primary/10 hover:text-primary">
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground block mb-2">Start Time</label>
                      <input type="time" className="w-full p-3 rounded-xl border bg-background" defaultValue="14:00" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground block mb-2">End Time</label>
                      <input type="time" className="w-full p-3 rounded-xl border bg-background" defaultValue="15:30" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground block mb-2">Notes & Observations</label>
                    <textarea 
                      className="w-full p-3 rounded-xl border bg-background resize-none h-24" 
                      placeholder="Woke up crying, needed pacifier..."
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleLog} 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-md shadow-primary/20 mt-4"
                >
                  {isSubmitting ? "Saving..." : "Save Sleep Log"}
                </Button>
              </div>
            )}

            {activeCategory !== "sleep" && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                <div className="bg-muted p-4 rounded-full">
                  <Sparkles className="text-muted-foreground" size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Ready to Log</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-[200px] mx-auto">
                    Form fields for {activeCategory} would appear here.
                  </p>
                </div>
                <Button onClick={handleLog} variant="outline" className="rounded-xl mt-4">
                  Quick Save Dummy Data
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
