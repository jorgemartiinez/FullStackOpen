const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}


const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        res.status(400).send({ ok: false, err: { message: 'malformatted id' } });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ err: err.message });
    }
    next(err);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}