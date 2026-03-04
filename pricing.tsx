import BottomNav from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Crown, Zap } from "lucide-react";
import { useBabyStore } from "@/store/baby-store";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Pricing() {
  const { isPremium, isPro, upgradePlan } = useBabyStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleUpgrade = (plan: "free" | "premium" | "pro") => {
    upgradePlan(plan);
    toast({
      title: "Plan Updated!",
      description: `You are now on the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
    });
    setTimeout(() => setLocation("/dashboard"), 1500);
  };

  return (
    <div className="flex-1 pb-24 bg-gradient-to-b from-primary/5 to-background min-h-screen">
      <div className="p-6 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Upgrade Your Experience</h1>
          <p className="text-muted-foreground text-sm px-4">
            Get personalized routines, activity suggestions, and smarter insights for your baby.
          </p>
        </div>

        <div className="space-y-6">
          {/* Free Plan */}
          <Card className={`border-2 ${!isPremium && !isPro ? 'border-foreground shadow-md' : 'border-border shadow-sm'} rounded-3xl overflow-hidden`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading">Basic</h3>
                  <p className="text-sm text-muted-foreground">Essential tracking</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">Free</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Basic growth tracking</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Standard static routine</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Manual data logging</li>
              </ul>
              
              <Button 
                variant={!isPremium && !isPro ? "default" : "outline"} 
                className="w-full rounded-xl font-bold"
                onClick={() => handleUpgrade("free")}
                disabled={!isPremium && !isPro}
              >
                {!isPremium && !isPro ? "Current Plan" : "Downgrade"}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className={`border-2 ${isPremium && !isPro ? 'border-primary shadow-lg shadow-primary/20' : 'border-border shadow-sm'} rounded-3xl overflow-hidden relative`}>
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-xl">
              POPULAR
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                    <Star size={20} className="text-primary fill-primary" /> Premium
                  </h3>
                  <p className="text-sm text-muted-foreground">Personalized guidance</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">$4.99</span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2 font-medium"><Check size={16} className="text-primary" /> Everything in Basic</li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" /> 
                  <span><strong className="text-foreground">Activity Suggestions</strong> for wake windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" /> 
                  <span><strong className="text-foreground">Adaptive Routine</strong> based on logs</span>
                </li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Sleep predictions</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> Visit timing recommendations</li>
              </ul>
              
              <Button 
                variant={isPremium && !isPro ? "default" : "default"}
                className={`w-full rounded-xl font-bold ${!isPremium && !isPro ? 'bg-primary hover:bg-primary/90' : ''}`}
                onClick={() => handleUpgrade("premium")}
                disabled={isPremium && !isPro}
              >
                {isPremium && !isPro ? "Current Plan" : "Upgrade to Premium"}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className={`border-2 ${isPro ? 'border-secondary shadow-lg shadow-secondary/20' : 'border-border shadow-sm'} rounded-3xl overflow-hidden bg-gradient-to-br from-card to-secondary/5`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                    <Crown size={20} className="text-secondary" /> Pro
                  </h3>
                  <p className="text-sm text-muted-foreground">Advanced intelligence</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">$9.99</span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2 font-medium"><Check size={16} className="text-secondary" /> Everything in Premium</li>
                <li className="flex items-start gap-2">
                  <Zap size={16} className="text-secondary shrink-0 mt-0.5" /> 
                  <span><strong className="text-foreground">Advanced AI Insights</strong> adapting in real-time</span>
                </li>
                <li className="flex items-center gap-2"><Check size={16} className="text-secondary" /> Milestone progression tracking</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-secondary" /> Custom data exports for pediatricians</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-secondary" /> Multiple caregivers access</li>
              </ul>
              
              <Button 
                variant={isPro ? "default" : "outline"} 
                className={`w-full rounded-xl font-bold ${!isPro ? 'border-secondary text-secondary hover:bg-secondary/10' : ''}`}
                onClick={() => handleUpgrade("pro")}
                disabled={isPro}
              >
                {isPro ? "Current Plan" : "Upgrade to Pro"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
