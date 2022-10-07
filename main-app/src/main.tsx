import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import "./components/WcBox";
import "./views/HomePage";
import "./views/NotFound";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
