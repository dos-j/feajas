import babel from 'rollup-plugin-babel';

const config = Object.assign({}, {
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  externalHelpers: true
});
export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    babel(config)
  ],
  intro: 'require("source-map-support").install();',
  dest: 'server.js',
  sourceMap: true
};
