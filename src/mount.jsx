import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

/** Every page entry funnels through here so the shell stays identical. */
export default function mount(element) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>{element}</StrictMode>,
  );
}
