import express from 'express';
import { body } from 'express-validator';
import { validateRequest, currentUser } from '@yusuferen/common';
import {
  signInController,
  signOutController,
  signUpController,
} from '../controllers/auth';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  signUpController
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  signInController
);

router.get('/', (req, res) => {
  console.log('yarrak');
});

router.post('/signout', signOutController);

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as authRouter };
