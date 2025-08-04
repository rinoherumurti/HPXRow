
import crypto from 'crypto';
import axios from 'axios';

import { poolRow } from '../../database/dbrow.js';

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateOTP() {
    let otp = '';
    for (let i = 0; i < 5; i++) {
        otp += numbers[crypto.randomInt(numbers.length)];
    }
    return otp;
}

function insertOTP(phone, otp) {
    return new Promise(async function (resolve, reject) {
        let connection = await poolRow.getConnection();
        let sSql = "INSERT INTO tbl_otp (phone_number,otp) VALUES (?,?) ";

        try {
            // For pool initialization, see above
            const [rows, fields] = await connection.query(sSql, [phone, otp]);
            connection.release();
            // Connection is automatically released when query resolves
            if (rows.affectedRows > 0) {
                resolve(rows.affectedRows);
            }
        } catch (err) {
            connection.release();
            console.log(err);
            reject(0);
        }

    });
}

export const requestOtp = async (req, res) => {
    const { Ind_NomorHP, type } = req.body;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const otp = generateOTP();

    await insertOTP(Ind_NomorHP, otp).then(function (rst) {
        // console.log('iki affected rows' + rst);
        if (rst > 0) {
            const data = JSON.stringify({
                no_hp: Ind_NomorHP,
                otp: otp,
                method: type
            });

            axios.post('http://192.168.19.241:6668/SendOTP', data, config)
                .then((result) => {
                    return res.send(JSON.stringify({ status: true, data: { msg: 'Send OTP Success' } }));
                })
                .catch((err) => {
                    console.error('Request OTP Error: ', err);
                    return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
                });

        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
        }



    }, function (err) {
        console.log(err); // Error: "It broke"
        return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
    });



};