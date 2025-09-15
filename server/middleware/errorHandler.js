function errorHandler(err, req, res, next) {
    console.error('Error stack:', err && err.stack ? err.stack : err);

    const statusCode = err && err.status ? err.status : (req.method === 'GET' ? 500 : 400);
    res.status(statusCode);

    // If API or JSON requested, return JSON
    const wantsJson = req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1) || req.path.startsWith('/api/');
    if (wantsJson) {
        return res.json({
            success: false,
            message: err && err.message ? err.message : 'An error occurred.',
            method: req.method,
            statusCode
        });
    }

    // Otherwise render an error page
    try {
        return res.render('error', {
            title: 'Error',
            message: err && err.message ? err.message : 'An unexpected error occurred.',
            status: statusCode
        });
    } catch(e) {
        return res.send('An error occurred.');
    }
}

module.exports = errorHandler;