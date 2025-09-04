
import { poolRow } from '../../database/dbrow.js';

export const domicileData = async (req, res) => {

    const { Ind_tinggal_alamat1, Ind_tinggal_propinsi, Ind_tinggal_kota, Ind_tinggal_kecamatan, Ind_tinggal_kelurahan,
        DomicileRT, DomicileRW, Ind_tinggal_kodepos,last_page,token } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let $update = {
            "Ind_tinggal_alamat1": Ind_tinggal_alamat1,
            "Ind_tinggal_propinsi": Ind_tinggal_propinsi,
            "Ind_tinggal_kota": Ind_tinggal_kota,
            "Ind_tinggal_kecamatan": Ind_tinggal_kecamatan,
            "Ind_tinggal_kelurahan": Ind_tinggal_kelurahan,
            "DomicileRT": DomicileRT,
            "DomicileRW": DomicileRW,
            "Ind_tinggal_kodepos": Ind_tinggal_kodepos,
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
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Domicile Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Domicile Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Domicile Data.' } }));
    }


};
