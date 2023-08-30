import path from 'path';
import { series } from 'gulp';
import { mkdir, copyFile } from 'fs/promises';
import { epOutput, epPackage, projRoot } from '@element-plus-encapsulation/build-utils';
import { run, withTaskName } from './utils';

const copyFiles = async () => {
  await Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(epOutput, 'global.d.ts'))
  ])
}

const defaultTask: any = series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),
  withTaskName('build:components', () => run('pnpm -C packages/element-plus-encapsulation run build')),
  copyFiles
)

export default defaultTask;

export {
  copyFiles
}