const base = require('./base');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...base,
  extends: [
    ...base.extends,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: [...base.plugins, 'react', 'react-hooks'],
  rules: {
    ...base.rules,
    'react/react-in-jsx-scope': 'off',
  },
  settings: { react: { version: 'detect' } },
};
