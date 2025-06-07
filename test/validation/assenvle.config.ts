import { defineConfig } from "assenvle";

export default defineConfig({
  validateEnv: (env) => {
    if (!("SAMPLE_URL" in env)) {
      throw new Error("SAMPLE_URL is not defined.");
    }

    if (!env.SAMPLE_URL.startsWith("http")) {
      throw new Error("Invalid URL.");
    }
  },
});
