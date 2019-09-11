const path = require('path');

const { definePlugin } = require('../config/webpack.plugins');
const webpackConfig = require('../config/webpack.common');

module.exports = async ({ config, mode }) => {
	const { resolve } = webpackConfig;
	config.resolve.alias = { ...config.resolve.alias, ...resolve.alias };

	config.module.rules.push({
		test: /\.scss$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
		include: path.resolve(__dirname, '../')
	});

	config.plugins.push(definePlugin);

	return config;
};
