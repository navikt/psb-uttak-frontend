import express from 'express';
import cors from 'cors';
import uttaksperioderResponse from './mocked-data/uttaksperiodeMock';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:8081',
    })
);

app.use('/mock/uttaksperioder', (req, res) => {
    res.send(uttaksperioderResponse);
});

const port = 8082;
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    console.log('API-mock listening on port', port);
});
