import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { authRouter } from './routes/auth';

import { errorHandler, NotFoundError } from '@yusuferen/common';

const app = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use('/api/users', authRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
