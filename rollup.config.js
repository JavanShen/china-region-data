import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
export default {
  input: "src/main.ts",
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: "umd",
    },
  ],
  plugins: [json(), typescript({ lib: ["es5", "es6", "dom"], target: "es5" })],
};
