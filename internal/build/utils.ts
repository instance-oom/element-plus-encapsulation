import { spawn } from 'child_process';
import chalk from 'chalk';
import consola from 'consola';
import type { TaskFunction } from 'gulp';
import { projRoot, buildRoot } from './paths';

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`);
    const app = spawn(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
    const onProcessExit = () => app.kill('SIGHUP');
    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit);
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
      }
    });
    process.on('exit', onProcessExit);
  })

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name });

export const runTask = (name: string) => withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, buildRoot));