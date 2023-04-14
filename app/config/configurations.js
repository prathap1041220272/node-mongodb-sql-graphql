/* eslint-disable no-undef */
const Configurations = {
	server: {
		environment: process.env.NODE_ENV || 'Development',
		port: process.env.PORT || 3000
	},
	// Database Connection
	db: {
		mongodbURI: {
			uri: process.env.MONGO_DB_URI
		},
		mySqlURI: {
			uri: process.env.MONGODB_URI
		}
	},
	// JWT Secret
	jwt: {
		secret: process.env.JWT_SECRET,
		tokenExpirePeriod: process.env.TOKEN_EXPIRE_PERIOD
	},
	// NODE ENV VARIABLES
	cloudAmqpapikey: {
		uri: process.env.CLOUD_AMQP_API_KEY
	},
	// Mail broker
	mailBroker: {
		uri: process.env.SEND_GRID_API_KEY
	},
	// Memory Cache
	memoryCache: {
		uri: process.env.REDIS_URL
	},
	// Search Engine
	elasticsearch: {
		uri: process.env.ELASTIC_SEARCH_URL
	},
	IP: '0.0.0.0',
	// Image and video storage
	cloudinary: {
		name: process.env.CLOUDINARY_CLOUD_NAME,
		key: process.env.CLOUDINARY_API_KEY,
		secret: process.env.CLOUDINARY_API_SECRET
	},
	// Redirection Host Addresses
	hostAddress: {
		ui: process.env.HOST_UI,
		server: process.env.HOST_SERVER
	}
};

module.exports = { Configurations };
