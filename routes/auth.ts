import express from 'express';
import { signUpController } from '../controllers/auth';
const app = express();

app.route('/').get(signUpController);

export { app as authRoutes };
