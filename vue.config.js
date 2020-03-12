module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLICPATH : '/',
	runtimeCompiler: true,
	css: {
		extract: {
			filename: 'css/[name].css',
			chunkFilename: 'css/[name].css',
		},
		loaderOptions: {
			scss: {
				prependData: `@import "@/assets/scss/utility/index.scss";`
			},
		}
	},
	configureWebpack: {
		output: {
		  filename: 'js/[name].js',
		  chunkFilename: 'js/[name].js',
		}
	},
	devServer: { 
		https: true,
		proxy: {
			'/newsTotal': {
				target: 'https://opendata.cwb.gov.tw/webapi/announcement/newspage',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/newsTotal': ''
				}
			},
			'/newsList': {
				target: 'https://opendata.cwb.gov.tw/webapi/announcement/newslist',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/newsList': ''
				}
			},
		}
	},
}