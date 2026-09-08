#!/usr/bin/env node
import { spawn } from "node:child_process";

const args = ["-y", "mcp-remote", "https://mcp.xverum.com/mcp", ...process.argv.slice(2)];

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (err) => {
  console.error("Failed to start xverum-mcp proxy:", err);
  process.exit(1);
});
