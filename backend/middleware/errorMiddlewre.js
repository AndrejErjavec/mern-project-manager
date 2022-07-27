const errorHandler = ({err, req, res, status=500}) => {

	res.status(status);

	res.json({
		message: err
		// stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});

	throw new Error(err);
};

module.exports = {
	errorHandler
};