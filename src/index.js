import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import users from './routes/users';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', users);

app.use((err, req, res, next) => {
    if (err?.error?.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        return next(err);
    }
});


app.listen(port, () => console.log(`Served started on port ${port}`));
