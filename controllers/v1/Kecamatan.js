import { poolRow } from '../../database/dbrow.js';

export const getKecamatan = async (req, res) => {
    const { province,kabupaten } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT kecamatan FROM web_dashboard.tbl_kodepos WHERE provinsi = ? AND kabupaten = ? GROUP BY kecamatan ORDER BY kecamatan;";
        let param = [province,kabupaten];
        const [rst] = await connection.query(sSql,param);
        const arrKecamatan = rst.map(rst => rst['kecamatan']);
        connection.release();

        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  arrKecamatan  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getKecamatan.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getKecamatan : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getKecamatan.' } }));
    }


};