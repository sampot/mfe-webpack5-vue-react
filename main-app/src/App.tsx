import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppShell from "./components/AppShell";
import "./App.less";

const App = () => {
  return (
    <AppShell>
      <AppHeader />
      <AppContent />
    </AppShell>
  );
};

export default App;
