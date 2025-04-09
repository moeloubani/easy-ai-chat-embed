/**
 * External dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Find and remove the file-handling plugin that might be causing duplication
const filteredPlugins = defaultConfig.plugins.filter(plugin => {
  return plugin.constructor.name !== 'CopyPlugin' && 
         plugin.constructor.name !== 'CopyWebpackPlugin';
});

// Extend the default WordPress webpack config
module.exports = {
  ...defaultConfig,
  
  // Explicitly set the single entry point
  entry: {
    index: path.resolve( process.cwd(), 'src', 'index.js' ),
  },
  
  // We're not forcing ES modules output as it's causing issues with WordPress dependencies
  
  // Ensure our modules are properly loaded with babel for maximum compatibility
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules
    ]
  },
  
  // Replace plugins with our filtered list plus our custom copy plugin
  plugins: [
    ...filteredPlugins, // Use filtered plugins instead of all default plugins
    // Copy block.json file from src directory to build output
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src/block/block.json', 
          to: 'block.json'
        },
        {
          from: 'src/block/render.php',
          to: 'render.php'
        }
      ]
    })
  ]
}; 