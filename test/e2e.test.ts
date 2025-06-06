import { execSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function setUp(testDirName: string): void {
  process.chdir(path.join(__dirname, testDirName));
  execSync("npm ci");
}

function tearDown(outputFile: string): void {
  rmSync(outputFile);
  rmSync("node_modules", { recursive: true, force: true });
}

function readEnvFile(fileName: string): string {
  return readFileSync(fileName, { encoding: "utf8" }).trim();
}

describe("assenvle", () => {
  it.each([
    { dirName: "zero-config", outputFile: ".env.local" },
    { dirName: "config-mjs", outputFile: ".env.generated.local" },
    { dirName: "config-ts", outputFile: ".env.generated.local" },
  ])("success: $dirName", ({ dirName, outputFile }) => {
    setUp(dirName);

    execSync("npx assenvle -m development", { stdio: "inherit" });
    const result = readEnvFile(outputFile);

    const expected = readEnvFile(".env.expected");
    expect(result).toBe(expected);

    tearDown(outputFile);
  });
});
