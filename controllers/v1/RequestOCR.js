import crypto from 'crypto';
import axios from 'axios';

import { poolRow } from '../../database/dbrow.js';
import { URL_ENDPOINT } from '../../ServerConfig.js';

import fs from "fs";
import path from 'path';


export const requestOcr = async (req, res) => {
    const { token, ktp_image } = req.body;
    try {

        let data = JSON.stringify({
            "trx_id": token,
            "ktp_image": ktp_image
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: URL_ENDPOINT.OCR,
            headers: {
                'Content-Type': 'application/json',
                'Token': 'YzI1MmJmN2QtNmI4ZC00NWE2LWI4NDQtODEyNzc1OGM3OGJj'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const dtOcr = response.data.data;
                var postalCode = '';
                getPostalCode(dtOcr['kota'], dtOcr['kecamatan'], dtOcr['kelurahan/desa']).then((data) => {
                    postalCode = data;
                }
                ).catch(error => {
                    postalCode = '';
                });
                dtOcr['kode_pos'] = postalCode;
                return res.send(JSON.stringify({ status: true, data: dtOcr }));

            })
            .catch((error) => {
                console.log('ASLI RI OCR error : ', error);
                return res.send(JSON.stringify({ status: false, data: { msg: 'Request OCR Failed' } }));
            });



    } catch (err) {
        console.log(err);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Request OCR Failed' } }));
    }

}

function getPostalCode(kabupaten, kecamatan, kelurahan) {
    return new Promise(async function (resolve, reject) {
        let connection = await poolRow.getConnection();
        let sSql = "SELECT * FROM tbl_kodepos WHERE kabupaten = ? AND kecamatan =? AND kelurahan =? ";
        let param = [kabupaten, kecamatan, kelurahan];
        try {
            // For pool initialization, see above
            const [rst] = await connection.query(sSql, param);
            connection.release();
            if (rst.length > 0) {

                resolve(rst[0]['kodepos']);

            }
            else {
                reject();
            }
        } catch (err) {
            connection.release();
            console.log(err);
            reject(err);
        }

    });
}


