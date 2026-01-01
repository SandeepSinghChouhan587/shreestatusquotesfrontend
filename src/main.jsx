import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import AppProvider from "./context/AppContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
 
  <HelmetProvider>
    <AppProvider>
    <App />
    </AppProvider>
  </HelmetProvider>
 
);
