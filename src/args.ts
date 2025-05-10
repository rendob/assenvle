import { Command } from "commander";

type Args = {
  mode: string;
  watch: boolean;
};

export function getArgs(): Args {
  const program = new Command();

  program
    .requiredOption("-m, --mode <mode>", "the mode the app is running in")
    .option("-w, --watch", "Watch input env files.", false);

  program.parse();

  return program.opts();
}
