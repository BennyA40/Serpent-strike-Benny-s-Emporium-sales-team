import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TravelPlanning from "./pages/TravelPlanning";
import BookingsDashboard from "./pages/BookingsDashboard";
import FreelanceHub from "./pages/FreelanceHub";
import LoanHub from "./pages/LoanHub";
import Paris from "./pages/destinations/Paris";
import Bali from "./pages/destinations/Bali";
import Tokyo from "./pages/destinations/Tokyo";
import Caribbean from "./pages/destinations/Caribbean";
import NewYork from "./pages/destinations/NewYork";
import Dubai from "./pages/destinations/Dubai";
import BattalionCommandCenter from "./pages/BattalionCommandCenter";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/travel-planning"} component={TravelPlanning} />
      <Route path={"/bookings"} component={BookingsDashboard} />
      <Route path={"/freelance"} component={FreelanceHub} />
      <Route path={"/loans"} component={LoanHub} />
      <Route path={"/destinations/paris"} component={Paris} />
      <Route path={"/destinations/bali"} component={Bali} />
      <Route path={"/destinations/tokyo"} component={Tokyo} />
      <Route path={"/destinations/caribbean"} component={Caribbean} />
      <Route path={"/destinations/new-york"} component={NewYork} />
      <Route path={"/destinations/dubai"} component={Dubai} />
      <Route path={"/battalion"} component={BattalionCommandCenter} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
