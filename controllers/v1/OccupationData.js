
import { poolRow } from '../../database/dbrow.js';

export const occupationData = async (req, res) => {

    const { Ind_TujuanInvestasi1, Ind_TujuanInvestasi1_Lainnya,Ind_Pekerjaan,Ind_Pekerjaan_Lainnya,Ind_SumberUtamaDana,
        Ind_SumberUtamaDanaLainnya, Ind_PenghasilanTahun, Ind_BidangUsaha, Ind_Jabatan,
        Ind_Bekerjapadaperusahaan,Ind_Kantor_alamat1,Ind_Kantor_telepon,is_bo,
        last_page,token } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let $update = {
            "Ind_TujuanInvestasi1": Ind_TujuanInvestasi1,
            "Ind_TujuanInvestasi1_Lainnya": Ind_TujuanInvestasi1_Lainnya,
            "Ind_Pekerjaan": Ind_Pekerjaan,
            "Ind_Pekerjaan_Lainnya": Ind_Pekerjaan_Lainnya,
            "Ind_SumberUtamaDana": Ind_SumberUtamaDana,
            "Ind_SumberUtamaDanaLainnya": Ind_SumberUtamaDanaLainnya,
            "Ind_PenghasilanTahun": Ind_PenghasilanTahun,
            "Ind_BidangUsaha": Ind_BidangUsaha,
            "Ind_Jabatan": Ind_Jabatan,
            "Ind_Bekerjapadaperusahaan": Ind_Bekerjapadaperusahaan,
            "Ind_Kantor_alamat1": Ind_Kantor_alamat1,
            "Ind_Kantor_telepon": Ind_Kantor_telepon,
            "is_bo": is_bo,
            "last_page":last_page
        };
        
        let sSql = "UPDATE web_dashboard.tblprafpre SET ";
        let elements = [];
        for (var key in $update) {
            elements.push(`${key} = '${$update[key]}' `);
        }
        let joinQuery = elements.join(",");
        sSql += ` ${joinQuery} WHERE token = '${token}'`;


        const [rst] = await connection.query(sSql);
        connection.release();

        if (rst.affectedRows > 0) {
            return res.send(JSON.stringify({ status: true }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Occupation Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Occupation Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Occupation Data.' } }));
    }


};
