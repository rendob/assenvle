![assenvle-logo-light](assets/logo-light.svg#gh-light-mode-only)
![assenvle-logo-dark](assets/logo-dark.svg#gh-dark-mode-only)

assenvle merges environment variables for a given mode into a single file.

## Quick Start

1. Install assenvle.

```sh
npm install --save-dev assenvle
```

2. Put your `.env*` files in a `(root directory)/env` directory.

```
(root directory)
├── env
│   ├── .env
│   ├── .env.local
│   ├── .env.development
│   ├── .env.development.local
│   ├── .env.staging
│   ├── .env.staging.local
│   ├── .env.production
│   ├── .env.production.local
:   :
```

3. Run the following command in the root directory. assenvle merges your `.env*` files for a given mode into `(root directory)/.env.local`.

```sh
npx assenvle --mode development
```

## Configuration

### Command Line Arguments

- `-m, --mode <mode>`: Specifies the `.env*` files to read. (`development`, `staging`, `production`, etc.)

> [!Note]
> assenvle reads your `.env*` files with the following priority, which is the same order as [Next.js](https://nextjs.org/docs/app/guides/environment-variables#environment-variable-load-order).
> 1. `.env.{mode}.local`
> 2. `.env.local`
> 3. `.env.{mode}`
> 4. `.env`

- `-w, --watch`: If this option is set to `true`, assenvle regenerates the output file on changes to the input `.env*` files. (default: false)
- `-h, --help`: Displays help for command.

### Configuration File

- Although you can use assenvle without any configuration files, you can also customize the behavior with `assenvle.config.{ts,mjs}`.
- Create `assenvle.config.ts` or `assenvle.config.mjs` in the root directory and default export your configuration.
- options
  - `envDir: string`: Path of the directory where your `.env*` files are placed. (default: `env`)
  - `outputFile: string`: Path of the output file. (default: `.env.local`)
  - `validateEnv: (env: Record<string, string>) => void`: (optional) If provided, assenvle uses this function to validate the merged `.env` files. assenvle cancels generating the output when this validation function throws an error.
- configuration example
```ts
import { defineConfig } from "assenvle";

export default defineConfig({
  envDir: "configs/env",
  outputFile: ".env",
  validateEnv: (env) => {
    if (!("SAMPLE_URL" in env)) {
      throw new Error("SAMPLE_URL is not defined.");
    }

    if (!env.SAMPLE_URL.startsWith("http")) {
      throw new Error("Invalid URL.");
    }
  }
});
```

> [!Caution]
> assenvle uses ["Type Stripping" of Node.js](https://nodejs.org/en/learn/typescript/run-natively) to read `assenvle.config.ts`.
> If you want to use `assenvle.config.ts`, your Node.js version should be 23.6.0 or higher. (You can also use Node.js 22.6.0 or higher with `--experimental-strip-types` option.)

## Integration with Next.js

Although you can integrate assenvle with any framework of your choice, it is designed to be used primarily in combination with Next.js.
We recommend to modify your npm scripts as follows (we are using [concurrently](https://www.npmjs.com/package/concurrently) in `dev` command):

```diff
{
  "scripts": {
-   "dev": "next dev",
+   "dev": "concurrently -k 'assenvle -w -m $npm_config_mode' 'next dev'",
+   "dev:development": "npm run dev -mode=development",
+   "dev:staging": "npm run dev -mode=staging",
+   "dev:production": "npm run dev -mode=production",
-   "build": "next build",
+   "build": "assenvle -m $npm_config_mode && next build",
+   "build:development": "npm run build -mode=development",
+   "build:staging": "npm run build -mode=staging",
+   "build:production": "npm run build -mode=production",
  },
}
```

In this way, when you edit the input `.env*` file, assenvle automatically regenerates the output `.env.local`, and then Next.js detects this and automatically restarts the development server.
If you define `validateEnv` function, the `dev` process will terminate on validation failure.
