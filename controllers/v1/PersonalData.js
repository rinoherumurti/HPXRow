
import { poolRow } from '../../database/dbrow.js';

import { getDynamicLogger } from '../../middlewares/Logger.js';

export const personalData = async (req, res) => {

    const { Ind_NomorId, Ind_NPWP, isNPWP, NamaNasabah, Ind_TempatLahir, Ind_TglLahir, Ind_JenisKelamin,
        Ind_Agama, Ind_Perkawinan, NamaIbuKandung, Ind_Id_alamat1, Ind_Id_Propinsi, Ind_Id_Kota, Ind_Id_Kecamatan, Ind_Id_Kelurahan,
        IDCardRT, IDCardRW, Ind_Id_kodePos,Ind_Pendidikan,Ind_NamaLengkapPOT, isCondNpwp, last_page, token } = req.body;
    let connection = await poolRow.getConnection();

    const controllerLogger = getDynamicLogger(token);
    controllerLogger.info('PersonalData', req.body);

    try {
        if (Ind_NomorId) {
            const [result] = await connection.execute(
                'SELECT * FROM web_dashboard.tblprafpre WHERE Ind_NomorId = ? AND FormStatus > 1', [Ind_NomorId]
            );

            if (result.length > 0) {
                connection.release();
                return res.send(JSON.stringify({ status: false, data: { code: '2', msg: 'NIK already exist' } }));
            }

        }


        let $update = {
            "Ind_NomorId": Ind_NomorId,
            "Ind_NPWP": Ind_NPWP,
            "isNPWP": isNPWP,
            "NamaNasabah": NamaNasabah,
            "Ind_TempatLahir": Ind_TempatLahir,
            "Ind_TglLahir": Ind_TglLahir,
            "Ind_JenisKelamin": Ind_JenisKelamin,
            "Ind_Agama": Ind_Agama,
            "Ind_Perkawinan": Ind_Perkawinan,
            "NamaIbuKandung": NamaIbuKandung,
            "Ind_Id_alamat1": Ind_Id_alamat1,
            "Ind_Id_Propinsi": Ind_Id_Propinsi,
            "Ind_Id_Kota": Ind_Id_Kota,
            "Ind_Id_Kecamatan": Ind_Id_Kecamatan,
            "Ind_Id_Kelurahan": Ind_Id_Kelurahan,
            "IDCardRT": IDCardRT,
            "IDCardRW": IDCardRW,
            "Ind_Id_kodePos": Ind_Id_kodePos,
            "Ind_Pendidikan": Ind_Pendidikan,
            "Ind_NamaLengkapPOT": Ind_NamaLengkapPOT,
            "isCondNpwp": isCondNpwp,
            "last_page": last_page
        };

        /*
        let sSql = "UPDATE web_dashboard.tblprafpre SET ";
        let elements = [];
        for (var key in $update) {
            elements.push(`${key} = '${$update[key]}' `);
        }
        const stringToRemove = "undefined";
        const filteredArray = elements.filter(item => !item.includes(stringToRemove));
   
        let joinQuery = filteredArray.join(",");
        sSql += ` ${joinQuery} WHERE token = '${token}'`;

        const [rst] = await connection.query(sSql);
        connection.release();
        */
        const setClauses = Object.keys($update).map(key => `${key} = ?`).join(', ');
        const updateSqlDynamic = `UPDATE web_dashboard.tblprafpre SET ${setClauses} WHERE token = ?`;
        const paramsDynamic = [...Object.values($update), token];
        
        const [rst] = await connection.query(updateSqlDynamic, paramsDynamic);
        connection.release();

        if (rst.affectedRows > 0) {
            return res.send(JSON.stringify({ status: true }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Personel Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Personal Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Personal Data.' } }));
    }


};
