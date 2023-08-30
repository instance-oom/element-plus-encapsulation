import { resolve } from 'node:path';

export const projRoot = resolve(__dirname, '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const epRoot = resolve(pkgRoot, 'element-plus-encapsulation');
export const utilRoot = resolve(pkgRoot, 'utils');
export const buildRoot = resolve(projRoot, 'internal', 'build');

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist');
/** `/dist/element-plus` */
export const epOutput = resolve(buildOutput, 'element-plus-encapsulation');

export const projPackage = resolve(projRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const epPackage = resolve(epRoot, 'package.json');
export const utilPackage = resolve(utilRoot, 'package.json');
