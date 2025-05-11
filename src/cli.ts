#! /usr/bin/env node

import { getArgs } from "./args.js";
import { assenvle, assenvleOnChange } from "./assenvle.js";
import { getConfig } from "./config.js";

async function main() {
  const args = getArgs();
  const config = getConfig();

  await assenvle(args.mode, config);

  if (args.watch) {
    assenvleOnChange(args.mode, config);
  }
}

main();
