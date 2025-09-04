
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

function attempRequest(phone) {
    return new Promise(async function (resolve, reject) {
        let connection = await poolRow.getConnection();
        let sSql = `SELECT count(phone_number) as count from tbl_otp where phone_number ='${phone}'  and date(created_date) = date(now())`;

        try {
            // For pool initialization, see above
            const [rows, fields] = await connection.query(sSql);
            connection.release();
            resolve(rows);
        } catch (err) {
            connection.release();
            console.log(err);
            reject(0);
        }

    });
}

async function updateOTPExp(phone) {
    let connection = await poolRow.getConnection();
    let sSql = "UPDATE web_dashboard.tbl_otp set exp=1 WHERE phone_number = ?;";
    let param = [phone];
    try {
        const [rst] = await connection.query(sSql, param);
        connection.release();
    } catch (err) {
        connection.release();
        console.log(err);
    }

}

export const requestOtp = async (req, res) => {
    const { Ind_NomorHP, type } = req.body;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const otp = generateOTP();
    await attempRequest(Ind_NomorHP).then(async function (rst) {
        var otpCount = rst[0]['count'];
        if (otpCount >= 5) {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Your OTP request limit exceeded', count: otpCount } }));
        }
        else {
            await updateOTPExp(Ind_NomorHP);
            await insertOTP(Ind_NomorHP, otp).then(function (rst) {
                // console.log('iki affected rows' + rst);

                if (rst > 0) {
                    const data = JSON.stringify({
                        no_hp: Ind_NomorHP,
                        otp: otp,
                        method: type
                    });

                    axios.post('http://192.168.19.241:6666/SendOTP', data, config)
                        .then((result) => {
                            return res.send(JSON.stringify({ status: true, data: { msg: 'Send OTP Success' } }));
                        })
                        .catch((err) => {
                            console.error('Request OTP Error (CALL API)');
                            return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
                        });


                }
                else {
                    return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
                }




            }, function (err) {
                console.log("It broke"); // Error: "It broke"
                return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
            });

        }

    }, function (err) {
        console.log(err); // Error: "It broke"
        return res.send(JSON.stringify({ status: false, data: { msg: 'Send OTP Failed' } }));
    });


};