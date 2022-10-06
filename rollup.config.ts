import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import {terser} from 'rollup-plugin-terser'
import pkg from "./package.json";
export default {
  input: "src/main.ts",
  output: [
    // commonjs
    {
      file: pkg.main,
      format: "cjs",
    },
    // es mocule
    {
      file: pkg.module,
      format: "es",
    },
    // umd
    {
      name: pkg.name,
      file: pkg.umd,
      format: "umd",
    },
  ],
  plugins: [
    json(),
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
    alias({
      entries: [{ find: "@", replacement: "./src" }],
    }),
    terser()
  ],
};
