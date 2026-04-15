import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import ArtistPage from "./pages/ArtistPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/schedule"} component={Schedule} />
      <Route path={"/artist/:id"} component={ArtistPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <ScheduleProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ScheduleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
