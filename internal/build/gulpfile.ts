import path from 'path';
import { series, src, dest } from 'gulp';
import { mkdir, copyFile } from 'fs/promises';
import { epOutput, epPackage, projRoot, compRoot } from '@element-plus-encapsulation/build-utils';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { run, withTaskName } from './utils';

const copyFiles = async () => {
  await Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'global.d.ts'), path.resolve(epOutput, 'global.d.ts'))
  ])
}

const sass = gulpSass(dartSass);
const buildStyle = () => src(`${compRoot}/**/style/**.scss`)
  .pipe(sass())
  .pipe(dest(`${epOutput}/lib/components`))
  .pipe(dest(`${epOutput}/es/components`))

const defaultTask: any = series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),
  withTaskName('build:components', () => run('pnpm -C packages/element-plus-encapsulation run build')),
  buildStyle,
  copyFiles
)

export default defaultTask;

export {
  copyFiles
}