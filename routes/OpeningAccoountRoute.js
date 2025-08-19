'use strict';


import express from "express";

// const oaController = require('../controllers/v1/OpeningAccount');
import { verifyAccessToken } from '../middlewares/VerifyToken.js';
import { existingEmailPhone } from '../controllers/v1/ExistingEmailPhone.js';
import { requestOtp } from '../controllers/v1/RequestOtp.js';
import { verifyOTP } from '../controllers/v1/VerifyOTP.js';
import { requestOcr } from '../controllers/v1/RequestOCR.js';
import { typeFPRE } from '../controllers/v1/TypeFPRE.js';
import { getProvince } from '../controllers/v1/Provinces.js';
import { getCity } from '../controllers/v1/City.js';
import { getKecamatan } from '../controllers/v1/Kecamatan.js';
import { getKelurahan } from '../controllers/v1/Kelurahan.js';
import { getBank } from '../controllers/v1/Bank.js';
import { uploadSignature } from '../controllers/v1/UploadSignature.js';
import { uploadNpwp } from '../controllers/v1/UploadNPWP.js';

export const oaRouter = express.Router();
//
oaRouter.post('/v1/verifyEmailPhone', verifyAccessToken, existingEmailPhone);
oaRouter.post('/v1/requestOTP', verifyAccessToken, requestOtp);
oaRouter.post('/v1/verifyOTP', verifyAccessToken, verifyOTP);
oaRouter.post('/v1/requestOCR', verifyAccessToken, requestOcr);
oaRouter.post('/v1/typeFPRE', verifyAccessToken, typeFPRE);
oaRouter.get('/v1/getProvince', verifyAccessToken, getProvince);
oaRouter.post('/v1/getCity', verifyAccessToken, getCity);
oaRouter.post('/v1/getKecamatan', verifyAccessToken, getKecamatan);
oaRouter.post('/v1/getKelurahan', verifyAccessToken, getKelurahan);
oaRouter.get('/v1/getBank', verifyAccessToken, getBank);
oaRouter.post('/v1/upload/signature', verifyAccessToken, uploadSignature);
oaRouter.post('/v1/upload/npwp', verifyAccessToken, uploadNpwp);
// router.post('/v1/requestOTP', verifyAccessToken, existingEmailPhone, oaController.accountVerification);

// router.put('/polls/:pollId', pollController.updatePoll);
// router.delete('/polls/:pollId', pollController.deletePoll);
// router.post('/polls/:pollId/vote', pollController.voteInPoll);
// router.get('/polls/:pollId/results', pollController.viewPollResults);

