import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";

/** Every page entry funnels through here so the shell stays identical. */
export default function mount(element) {
  const root = document.getElementById("root");
  const page = <StrictMode>{element}</StrictMode>;
  if (root.hasChildNodes()) hydrateRoot(root, page);
  else createRoot(root).render(page);
}
