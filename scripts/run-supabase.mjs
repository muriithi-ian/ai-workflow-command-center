import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const executable = process.platform === "win32" ? "supabase.cmd" : "supabase";
const binary = path.join(root, "node_modules", ".bin", executable);
const args = process.argv.slice(2);

const result = spawnSync(binary, args, {
  cwd: root,
  env: {
    ...process.env,
    HOME: root,
    USERPROFILE: root,
    SUPABASE_TELEMETRY_DISABLED: "1"
  },
  shell: process.platform === "win32",
  stdio: "inherit"
});

process.exit(result.status ?? 1);
