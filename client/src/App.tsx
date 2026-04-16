import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScheduleProvider } from "./contexts/ScheduleContext";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import ArtistPage from "./pages/ArtistPage";
import LiveStream from "./pages/LiveStream";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import DMCA from "./pages/DMCA";
import About from "./pages/About";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/schedule"} component={Schedule} />
      <Route path={"/artist/:id"} component={ArtistPage} />
      <Route path={"/live"} component={LiveStream} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/cookie-policy"} component={CookiePolicy} />
      <Route path={"/dmca"} component={DMCA} />
      <Route path={"/about"} component={About} />
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
            <CookieBanner />
          </TooltipProvider>
        </ScheduleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
