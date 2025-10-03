module.exports = {
  extends: ["@innerbloom/config/eslint"],
  parserOptions: {
    project: ["./tsconfig.json"]
  },
  env: {
    node: true
  }
};
