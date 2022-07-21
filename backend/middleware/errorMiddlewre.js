const errorHandler = ({err, req, res, status=500}) => {

	res.status(status);

	res.json({
		message: err
		// stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = {
	errorHandler
};