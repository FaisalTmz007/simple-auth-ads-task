const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger-docs.json');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const merchantRoute = require('./routes/merchantRoute');
const { notFound, errorHandler } = require('./middlewares/error');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to Express API',
        status: true
    });
});
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/merchants', merchantRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});