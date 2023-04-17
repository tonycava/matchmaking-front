import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "9mzfyx",
  responseTimeout: 120e3,
  e2e: {
    baseUrl: 'http://localhost:11001',
  },
});
