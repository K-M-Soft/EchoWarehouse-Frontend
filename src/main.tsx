import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <LoadingProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </LoadingProvider>
);
