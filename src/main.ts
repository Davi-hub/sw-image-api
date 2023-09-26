import * as express from 'express';
import * as cors from 'cors';
import { getFirstImage } from './image-search';

const app = express();
const port = 3000;

const allowedOrigins = ['FE_URL'];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get('/get-image', async (req: any, res: any) => {
    const query = req.query.q;
    try {
        const response = await getFirstImage(query);
        res.json({src: response});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port);