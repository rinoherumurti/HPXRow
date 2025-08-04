import express from "express";
import cors from 'cors';
import { oaRouter } from './routes/OpeningAccoountRoute.js';

const app = express();

// const allowedOrigins = ['https://kyc.henanputihjrai.com', 'https://your-frontend-domain.com'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// app.use(cors(corsOptions));

// Enable CORS for all origins
app.use(cors());
app.use(express.json({ limit: '50mb' }));


// Routes
app.use('/api', oaRouter);


app.use((err, req, res, next) => {
  console.error(err);
  if (err.status === 400)
    return res.status(err.status).send('Dude, you messed up the JSON');

  return next(err);
});

app.use(express.json());

const listener = app.listen(8585, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
