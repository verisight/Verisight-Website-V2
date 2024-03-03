import { ThemeProvider } from "./components/ui/ThemeProvider";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid grid-cols-1 justify-content-center m-20">
        <div className="flex items-center justify-center">
          <Login />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
