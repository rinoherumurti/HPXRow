import crypto from 'crypto';
import axios from 'axios';

import { poolRow } from '../../database/dbrow.js';
import { URL_ENDPOINT } from '../../ServerConfig.js';

import fs from "fs";
import path from 'path';

import { getDynamicLogger } from '../../middlewares/Logger.js';

export const requestLiveness = async (req, res) => {
    const { token, selfie } = req.body;
    const controllerLogger = getDynamicLogger(token + '-requestLiveness');
  
    try {

        let data = JSON.stringify({
            "trx_id": token,
            "selfie": selfie
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: URL_ENDPOINT.LIVENESS,
            headers: {
                'Content-Type': 'application/json',
                'Token': 'YzI1MmJmN2QtNmI4ZC00NWE2LWI4NDQtODEyNzc1OGM3OGJj'
            },
            data: data
        };
 
        axios.request(config)
            .then((response) => {
                const dtLiveness = response.data;
                return res.send(JSON.stringify({ status: true, data: dtLiveness }));

            })
            .catch((error) => {
                // console.log('ASLI RI LIVENESS error : ', error);
                controllerLogger.info('requestLiveness', error,' - Request OCR Failed' );
                return res.send(JSON.stringify({ status: false, data: { msg: 'Request OCR Failed' } }));
            });



    } catch (err) {
        console.log(err);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Request OLIVENESSCR Failed' } }));
    }

}



