module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // Ensure Babel targets the current Node version for Jest environment
        targets: { node: "current" }
      }
    ],
    [
      "@babel/preset-react",
      {
        // Use the automatic JSX runtime (no explicit React import required in files)
        runtime: "automatic"
      }
    ]
  ],
  plugins: []
};