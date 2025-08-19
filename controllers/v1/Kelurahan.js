import { poolRow } from '../../database/dbrow.js';

export const getKelurahan = async (req, res) => {
    const { province,kabupaten,kecamatan } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT kelurahan FROM tbl_kodepos WHERE provinsi = ? AND kabupaten = ? AND kecamatan = ? GROUP BY kelurahan ORDER BY kelurahan;";


        let param = [province,kabupaten,kecamatan];
        const [rst] = await connection.query(sSql,param);
        const arrKelurahan = rst.map(rst => rst['kelurahan']);
        connection.release();
       
        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  arrKelurahan  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getKelurahan.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getKelurahan : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getKelurahan.' } }));
    }


};