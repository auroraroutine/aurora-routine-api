import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Moon, Baby, Calendar as CalendarIcon, Ruler, Weight, Heart } from "lucide-react";
import heroBaby from "@/assets/images/hero-baby.png";
import { useBabyStore } from "@/store/baby-store";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { setJourneyStage, setBabyInfo } = useBabyStore();
  
  const [step, setStep] = useState(0);
  const [journeySelection, setJourneySelection] = useState<"trying" | "pregnancy" | "newborn" | "older" | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    weight: "",
    height: "",
    dueDate: "",
  });

  const handleNext = () => {
    if (step === 0) {
      if (!journeySelection) return;
      setJourneyStage(journeySelection);
      if (journeySelection === "pregnancy") {
        setStep(3); // Go to pregnancy setup
      } else if (journeySelection === "trying") {
        setLocation("/dashboard"); // Or a specific 'trying' setup step
      } else {
        setStep(1); // Go to baby setup
      }
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setBabyInfo({ 
        name: formData.name, 
        birthDate: formData.birthDate, 
        weight: formData.weight, 
        height: formData.height 
      });
      setLocation("/dashboard");
    } else if (step === 3) {
      // Pregnancy Setup Complete
      setBabyInfo({ birthDate: formData.dueDate }); // store due date as birthDate for now
      setLocation("/dashboard");
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-primary/10 to-background flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-12">
        <div className="w-48 h-48 mb-8 relative animate-in fade-in zoom-in duration-700">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
          <img src={heroBaby} alt="Sleeping baby" className="relative z-10 w-full h-full object-contain" />
        </div>
        
        <h1 className="text-4xl font-bold text-center text-foreground mb-2 font-heading">
          Welcome to Lullaby
        </h1>
        <p className="text-center text-muted-foreground mb-8 text-lg">
          Your all-in-one parenting companion
        </p>

        <Card className="w-full max-w-sm border-none shadow-xl bg-card/80 backdrop-blur-md">
          <CardContent className="p-6">
            {step === 0 && (
              <div className="space-y-4 animate-in slide-in-from-right-4">
                <h3 className="text-lg font-bold font-heading text-center mb-4">Where are you in your journey?</h3>
                <div className="grid gap-3">
                  <Button 
                    variant={journeySelection === "trying" ? "default" : "outline"} 
                    className={`h-16 justify-start px-4 text-lg rounded-xl ${journeySelection === "trying" ? 'bg-primary border-primary text-primary-foreground' : 'border-border'}`}
                    onClick={() => setJourneySelection("trying")}
                  >
                    <Heart className={`mr-4 ${journeySelection === "trying" ? 'text-primary-foreground' : 'text-primary'}`} />
                    Trying to Conceive
                  </Button>
                  <Button 
                    variant={journeySelection === "pregnancy" ? "default" : "outline"} 
                    className={`h-16 justify-start px-4 text-lg rounded-xl ${journeySelection === "pregnancy" ? 'bg-primary border-primary text-primary-foreground' : 'border-border'}`}
                    onClick={() => setJourneySelection("pregnancy")}
                  >
                    <Baby className={`mr-4 ${journeySelection === "pregnancy" ? 'text-primary-foreground' : 'text-primary'}`} />
                    I'm Pregnant
                  </Button>
                  <Button 
                    variant={journeySelection === "newborn" ? "default" : "outline"} 
                    className={`h-16 justify-start px-4 text-lg rounded-xl ${journeySelection === "newborn" ? 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90' : 'border-border'}`}
                    onClick={() => setJourneySelection("newborn")}
                  >
                    <Baby className={`mr-4 ${journeySelection === "newborn" ? 'text-secondary-foreground' : 'text-secondary'}`} />
                    I have a Newborn (0-3m)
                  </Button>
                  <Button 
                    variant={journeySelection === "older" ? "default" : "outline"} 
                    className={`h-16 justify-start px-4 text-lg rounded-xl ${journeySelection === "older" ? 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90' : 'border-border'}`}
                    onClick={() => setJourneySelection("older")}
                  >
                    <Moon className={`mr-4 ${journeySelection === "older" ? 'text-secondary-foreground' : 'text-secondary'}`} />
                    I have an older baby (3m+)
                  </Button>
                </div>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base flex items-center gap-2">
                    <Baby className="w-4 h-4 text-primary" /> Baby's Name
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Oliver" 
                    className="h-12 rounded-xl text-lg bg-background/50"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-base flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" /> Birth Date
                  </Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    className="h-12 rounded-xl text-lg bg-background/50"
                    value={formData.birthDate}
                    onChange={e => setFormData({...formData, birthDate: e.target.value})}
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base flex items-center gap-2">
                    <Weight className="w-4 h-4 text-secondary" /> Weight at Birth (kg)
                  </Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="e.g. 3.2" 
                    className="h-12 rounded-xl text-lg bg-background/50"
                    value={formData.weight}
                    onChange={e => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-base flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-secondary" /> Length at Birth (cm)
                  </Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="e.g. 50" 
                    className="h-12 rounded-xl text-lg bg-background/50"
                    value={formData.height}
                    onChange={e => setFormData({...formData, height: e.target.value})}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-base flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" /> Estimated Due Date
                  </Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    className="h-12 rounded-xl text-lg bg-background/50"
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center pt-4">
                  We will tailor the experience to support you through your pregnancy week by week!
                </p>
              </div>
            )}

            <div className="mt-8 flex gap-2">
              <Button 
                className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                onClick={handleNext}
                disabled={step === 0 && !journeySelection}
              >
                {step === 2 || step === 3 || (step === 0 && journeySelection === "trying") ? "Start Journey" : "Next"}
              </Button>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {journeySelection === 'pregnancy' ? (
                <>
                  <div className={`h-2 w-2 rounded-full ${step === 0 ? 'bg-primary' : 'bg-primary/20'}`} />
                  <div className={`h-2 w-2 rounded-full ${step === 3 ? 'bg-primary' : 'bg-primary/20'}`} />
                </>
              ) : journeySelection === 'trying' ? (
                 <div className={`h-2 w-2 rounded-full bg-primary`} />
              ) : (
                <>
                  <div className={`h-2 w-2 rounded-full ${step === 0 ? 'bg-primary' : 'bg-primary/20'}`} />
                  <div className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-primary/20'}`} />
                  <div className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-primary/20'}`} />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
