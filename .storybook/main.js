module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    builder: "webpack5"
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/stories.@(js|jsx|ts|tsx)"
  ]
}
