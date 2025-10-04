import { spawn } from 'node:child_process';

const commands = [
  {
    name: 'api',
    command: 'npm run dev --workspace @innerbloom/api',
  },
  {
    name: 'web',
    command: 'npm run dev --workspace @innerbloom/web',
  },
];

const children = new Set();
let exitCode = 0;
let exiting = false;

const terminateAll = (signal) => {
  if (exiting) return;
  exiting = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
};

for (const { command } of commands) {
  const child = spawn(command, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  });

  children.add(child);

  child.on('exit', (code) => {
    children.delete(child);

    if (code && exitCode === 0) {
      exitCode = code;
      terminateAll('SIGINT');
    }

    if (children.size === 0) {
      process.exit(exitCode);
    }
  });
}

process.on('SIGINT', () => {
  exitCode = exitCode || 130;
  terminateAll('SIGINT');
});

process.on('SIGTERM', () => {
  exitCode = exitCode || 143;
  terminateAll('SIGTERM');
});
