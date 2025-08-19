import { poolRow } from '../../database/dbrow.js';

export const getCity = async (req, res) => {
    const { province } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT kabupaten FROM tbl_kodepos WHERE provinsi = ? GROUP BY kabupaten ORDER BY kabupaten;";
        let param = [province];
        const [rst] = await connection.query(sSql,param);
        const arrCity = rst.map(rst => rst['kabupaten']);
        connection.release();

        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  arrCity  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getCity.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getCity : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getCity.' } }));
    }


};