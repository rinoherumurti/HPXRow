import { poolRow } from '../../database/dbrow.js';

import fs from "fs";
import path from 'path';


export const uploadSignature = async (req, res) => {
    const { token, signature_image } = req.body;
    try {

        // saveImage(ktp_image,token);
        // return res.send(JSON.stringify({ status: true, data: 'save sukses' }));
        saveImage(signature_image, token).then(function (result) {

            if (result) {
                // return res.send(JSON.stringify({ status: true, data: { msg: 'SUCCESS [SAVE IMAGE]' } }));

                updateSignaturePath(token)
                    .then(result => {
                        if (result) {
                            return res.send(JSON.stringify({ status: true}));
                        }
                        else{
                            return res.send(JSON.stringify({ status: false}));
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error.message);
                    });
                
            }

        }).catch((error) => {
            console.log('saveImage Signature: ' + error);
            return res.send(JSON.stringify({ status: false, data: { msg: 'Upload Signature[SAVE IMAGE]' } }));

        });


    } catch (err) {
        console.log(err);
         return res.send(JSON.stringify({ status: false, data: { msg: 'Upload Signature[SAVE IMAGE]' } }));
    }

}
function saveImage(img, token) {
    return new Promise(function (resolve, reject) {
        //console.log(StringToSign);

        const dirname = path.resolve();
        const folderPath = "/home/www/public_html/ci_registrasi/upload/signature/"; //SERVER
        let filename = token + '.jpg';

        var image = img;
        var bitmap = Buffer.from(image, 'base64');
        try {
            fs.writeFileSync(folderPath + filename, bitmap);
            resolve(true);
        } catch (e) {
            reject(e);
        }


    });
}

function updateSignaturePath(token) {
    return new Promise(async function (resolve, reject) {
        let ktpPath = token + ".jpg";
        let connection = await poolRow.getConnection();
        let sSql = "UPDATE tblprafpre SET signature_path=? WHERE token = ? ";
        let param = [ktpPath, token];
        try {
            // For pool initialization, see above
            const [rows, fields] = await connection.query(sSql, param);
            connection.release();
            // Connection is automatically released when query resolves
            if (rows.affectedRows > 0) {
                resolve(rows.affectedRows);
            }
            else {
                resolve(0);
            }
        } catch (err) {
            connection.release();
            console.log(err);
            reject(err);
        }

    });
}