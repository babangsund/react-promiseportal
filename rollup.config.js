import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const input = 'src/index.js';
const globals = {react: 'React'};
const external = Object.keys(globals).concat('@babel/runtime');
const banner =
  [
    '/**',
    ' * react-promiseportal v' + process.env.npm_package_version,
    ' *',
    ' * Copyright (c) 2019 babangsund',
    ' *',
    ' * This source code is licensed under the MIT license found in the',
    ' * LICENSE file in the root directory of this source tree.',
    ' */',
  ].join('\n') + '\n';

const base = {input, external};
const output = {globals, banner};

function makePlugins(minify, useESModules) {
  return [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: [['@babel/transform-runtime', {useESModules}]],
    }),
    nodeResolve(),
    commonjs(),
    minify && terser(),
  ];
}
const esm = {
  ...base,
  output: {
    ...output,
    format: 'esm',
    file: pkg.module,
  },
  plugins: makePlugins(false, true),
};

const cjs = {
  ...base,
  output: {
    ...output,
    format: 'cjs',
    file: pkg.main,
  },
  plugins: makePlugins(true, false),
};

const umd = {
  ...base,
  output: {
    ...output,
    format: 'umd',
    name: 'ReactPromisePortal',
    file: `dist/index.umd.${process.env.NODE_ENV}.js`,
  },
  plugins: makePlugins(process.env.NODE_ENV === 'production', true),
};

export default [umd, cjs, esm];
