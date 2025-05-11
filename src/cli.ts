#! /usr/bin/env node

import { getArgs } from "./args.js";

function main() {
  const args = getArgs();

  console.log("Arguments:", args);
}

main();
