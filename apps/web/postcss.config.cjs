const plugins = {};

try {
  plugins.tailwindcss = require("tailwindcss");
} catch (error) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Tailwind CSS not installed; skipping during local execution.");
  }
}

try {
  plugins.autoprefixer = require("autoprefixer");
} catch (error) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Autoprefixer not installed; skipping during local execution.");
  }
}

module.exports = { plugins };
