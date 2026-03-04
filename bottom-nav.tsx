import { Link, useLocation } from "wouter";
import { Home, Calendar, PlusCircle, Crown, Utensils, Moon, Compass, Map, Grid3X3, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBabyStore } from "@/store/baby-store";

export default function BottomNav() {
  const [location] = useLocation();
  const { journeyStage } = useBabyStore();

  const isPregnancy = journeyStage === "pregnancy";

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { 
      href: isPregnancy ? "/pregnancy" : "/routine", 
      icon: isPregnancy ? Heart : Calendar, 
      label: isPregnancy ? "Journey" : "Routine" 
    },
    { href: "/log", icon: PlusCircle, label: "Log", primary: true },
    { href: "/timeline", icon: Map, label: "Timeline" },
    { href: "/menu", icon: Grid3X3, label: "Apps" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:max-w-[420px] md:mx-auto bg-card/95 backdrop-blur-md border-t border-border/50 pb-safe z-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link key={item.href} href={item.href}>
                <div className="relative -top-6 flex flex-col items-center cursor-pointer">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                    <Icon size={28} />
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center gap-1 cursor-pointer w-[4.5rem]">
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}>
                  <Icon
                    size={22}
                    className={cn("transition-colors", isActive ? "fill-primary/20" : "")}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
