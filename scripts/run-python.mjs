import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const candidates =
  process.platform === "win32"
    ? [
        join("apps", "api", ".venv", "Scripts", "python.exe"),
        join("apps", "api", ".venv", "Scripts", "python"),
        "python",
        "py"
      ]
    : [join("apps", "api", ".venv", "bin", "python"), "python3", "python"];

const pythonCommand = candidates.find((candidate) => {
  if (candidate.includes(".venv")) {
    return existsSync(candidate);
  }

  const result = spawnSync(candidate, ["--version"], { stdio: "ignore" });
  return result.status === 0;
});

if (!pythonCommand) {
  console.error("No Python executable found. Create apps/api/.venv or install Python 3.11+.");
  process.exit(1);
}

const result = spawnSync(pythonCommand, process.argv.slice(2), {
  stdio: "inherit",
  shell: false
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
