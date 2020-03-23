module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLICPATH : '/',
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
			'/meetinglist': {
				target: 'https://opendata.cwb.gov.tw/webapi/announcement/meetinglist',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/meetinglist': ''
				}
			},
			'/datasetPage': {
				target: 'https://opendata.cwb.gov.tw/webapi/datasetPage/',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/datasetPage': ''
				}
			},
			'/datasetList': {
				target: 'https://opendata.cwb.gov.tw/webapi/datasetList/',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/datasetList': ''
				}
			},
			'/datasetMetadata': {
				target: 'https://opendata.cwb.gov.tw/webapi/datasetMetadata/',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/datasetMetadata': ''
				}
			},
			'/datasetContent': {
				target: 'https://opendata.cwb.gov.tw/webapi/datasetContent/',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/datasetContent': ''
				}
			},
			'/datasetSearch': {
				target: 'https://opendata.cwb.gov.tw/webapi/datasetSearch/',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/datasetSearch': ''
				}
			},
			'/homeData': {
				target: 'https://opendata.cwb.gov.tw/webapi/homeData',
			  	ws: true,
			  	changeOrigin: true,
			  	pathRewrite: {
			 		'^/homeData': ''
				}
			},
		}
	},
}