import crypto from 'crypto';
import { poolRow } from '../../database/dbrow.js';

function validateOTP(phone, otp) {
    return new Promise(async function (resolve, reject) {
        let connection = await poolRow.getConnection();
        let sSql = "SELECT * FROM web_dashboard.tbl_otp WHERE phone_number = ? AND is_use = 0 ORDER BY created_date DESC LIMIT 1; ";
        let param = [phone];
        try {
            // For pool initialization, see above
            const [rst] = await connection.query(sSql, param);
            connection.release();
            if (rst.length > 0) {
                let rstOtp = rst[0]['otp'];
                if (otp == rstOtp) {
                    //await updateOTPUse(phone, otp);
                    resolve(true);
                }
                else {
                    reject();
                }

                resolve(rst);
            }
            else {
                reject();
            }

            // if (fields.length > 0) {
            //     connection.release();
            //     resolve(rows.affectedRows);
            // }
        } catch (err) {
            connection.release();
            console.log(err);
            reject(err);
        }

    });
}

async function updateOTPUse(phone, otp) {
    let connection = await poolRow.getConnection();
    let sSql = "UPDATE web_dashboard.tbl_otp set is_use=1 WHERE phone_number = ? AND otp = ?;";
    let param = [phone, otp];
    try {
        const [rst] = await connection.query(sSql, param);
        connection.release();
    } catch (err) {
        connection.release();
        console.log(err);
    }

}


function addRowData(email, phone, otp) {
    return new Promise(async function (resolve, reject) {
        let emailMD5 = crypto.createHash('md5').update(email).digest("hex");
        let phoneMD5 = crypto.createHash('md5').update(phone).digest("hex");
        let randomString = createRandomString(16);
        let token = crypto.createHash('md5').update(emailMD5 + phoneMD5 + randomString).digest("hex");

        let connection = await poolRow.getConnection();
        try {
            /* CHECK AVAILABLE DATA */
            let sSqlEx = "SELECT * FROM web_dashboard.tblprafpre WHERE Ind_Email = ? AND Ind_NomorHP=?;";
            let paramEx = [email, phone];
            const [rstEx] = await connection.query(sSqlEx, paramEx);
      
            if (rstEx.length > 0) {
                connection.release();
                resolve(rstEx);
            }
            else {
                let sSql = "INSERT INTO web_dashboard.tblprafpre (Ind_Email,Ind_NomorHP,token) VALUES (?,?,?);";
                sSql += "SELECT * FROM web_dashboard.tblprafpre WHERE token = ?;";

                let param = [email, phone, token,token];
                const [rst] = await connection.query(sSql, param);
                connection.release();
                
                if (rst.length > 0) {
                    resolve(rst[1]);
                }
                else {
                    reject();
                }
            }


        } catch (err) {
            connection.release();
            console.log(err);
            reject(err);
        }

    });

}

export const verifyOTP = async (req, res) => {

    const { Ind_Email, Ind_NomorHP, otp } = req.body;

    try {

        await validateOTP(Ind_NomorHP, otp).then(function (rst) {

            if (rst) {
                addRowData(Ind_Email, Ind_NomorHP, otp).then(function (result) {
                    if (result.length > 0) {
                        return res.send(JSON.stringify({ status: true, data: result }));
                    }

                }, function (err) {
                    return res.send(JSON.stringify({ status: false, data: { msg: 'Verify OTP Failed' } }));
                });

            }

        }, function (err) {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Verify OTP Failed' } }));
        });

    } catch (error) {
        connection.release();
        console.error("Error verify OTP : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error verify OTP.' } }));
    }


};

function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}