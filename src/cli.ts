#! /usr/bin/env node

import { getArgs } from "./args.js";
import { getConfig } from "./config.js";

function main() {
  const args = getArgs();
  const config = getConfig();

  console.log("Arguments:", args);
  console.log("Config:", config);
}

main();
