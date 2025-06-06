import { existsSync } from "node:fs";
import Module from "node:module";
import { resolve } from "node:path";

const CONFIG_FILE_NAME = "assenvle.config";
const CONFIG_FILE_EXTENSIONS = [".ts", ".mjs"];

export type AssenvleConfig = {
  envDir: string;
  outputFile: string;
  validateEnv?: (env: Record<string, string>) => void;
};

const defaultConfig: AssenvleConfig = {
  envDir: "env",
  outputFile: ".env.local",
};

export function defineConfig(config: Partial<AssenvleConfig>): AssenvleConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

export function getConfig(): AssenvleConfig {
  for (const extension of CONFIG_FILE_EXTENSIONS) {
    const configPath = resolve(process.cwd(), CONFIG_FILE_NAME + extension);
    if (!existsSync(configPath)) continue;

    const config: AssenvleConfig = new Module("").require(configPath).default;
    return config;
  }

  return defaultConfig;
}
