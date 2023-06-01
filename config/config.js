const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	appurl: process.env.APP_URL,
	database: {
		connection: process.env.DB_CONNECTION,
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		port: process.env.DB_PORT,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		timezone: process.env.DB_TIMEZONE,
	},
	publicPath: {
		pathBanner: process.env.PATH_BANNER,
		pathProduct: process.env.PATH_PRODUCT,
		pathCustomer: process.env.PATH_CUSTOMER,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiredMinutes: process.env.JWT_EXPIRED_MINUTES
	}
};
