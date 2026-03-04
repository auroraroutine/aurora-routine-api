import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Routine from "@/pages/routine";
import LogData from "@/pages/log-data";
import Pricing from "@/pages/pricing";
import FeedingIntro from "@/pages/feeding/index";
import SleepTracker from "@/pages/sleep/index";
import Oracle from "@/pages/oracle/index";
import Menu from "@/pages/menu/index";
import PregnancyJourney from "@/pages/pregnancy/index";
import Timeline from "@/pages/timeline/index";
import NervousSystem from "@/pages/nervous-system/index";
import TryingToConceive from "@/pages/trying/index";

      function Router() {
        return (
          <Switch>

              <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
      <Route path="/" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/routine" component={Routine} />
      <Route path="/log" component={LogData} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/feeding" component={FeedingIntro} />
      <Route path="/sleep" component={SleepTracker} />
      <Route path="/oracle" component={Oracle} />
      <Route path="/menu" component={Menu} />
      <Route path="/pregnancy" component={PregnancyJourney} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/nervous-system" component={NervousSystem} />
      <Route path="/trying" component={TryingToConceive} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground md:max-w-[420px] md:mx-auto shadow-2xl relative overflow-hidden flex flex-col md:border-x border-border">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
