'use strict';


import express from "express";

// const oaController = require('../controllers/v1/OpeningAccount');
import { verifyAccessToken } from '../controllers/v1/VerifyToken.js';
import { existingEmailPhone } from '../controllers/v1/ExistingEmailPhone.js';
import { requestOtp } from '../controllers/v1/RequestOtp.js';
import { verifyOTP } from '../controllers/v1/VerifyOTP.js';
import { requestOcr } from '../controllers/v1/RequestOCR.js';
import { typeFPRE } from '../controllers/v1/TypeFPRE.js';

export const oaRouter = express.Router();
//
oaRouter.post('/v1/verifyEmailPhone', verifyAccessToken, existingEmailPhone);
oaRouter.post('/v1/requestOTP', verifyAccessToken, requestOtp);
oaRouter.post('/v1/verifyOTP', verifyAccessToken, verifyOTP);
oaRouter.post('/v1/requestOCR', verifyAccessToken, requestOcr);
oaRouter.post('/v1/typeFPRE', verifyAccessToken, typeFPRE);
// router.post('/v1/requestOTP', verifyAccessToken, existingEmailPhone, oaController.accountVerification);

// router.put('/polls/:pollId', pollController.updatePoll);
// router.delete('/polls/:pollId', pollController.deletePoll);
// router.post('/polls/:pollId/vote', pollController.voteInPoll);
// router.get('/polls/:pollId/results', pollController.viewPollResults);

