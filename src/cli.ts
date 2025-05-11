#! /usr/bin/env node

import { getArgs } from "./args.js";
import { assenvle } from "./assenvle.js";
import { getConfig } from "./config.js";

async function main() {
  const args = getArgs();
  const config = getConfig();

  await assenvle(args.mode, config);
}

main();
