import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Absolute base so assets resolve from the domain root on nested routes
  // like /timeline or /team (relative "./" would 404 there).
  base: "/",
  plugins: [react()],
});
