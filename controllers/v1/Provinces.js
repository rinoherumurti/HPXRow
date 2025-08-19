import { poolRow } from '../../database/dbrow.js';

export const getProvince = async (req, res) => {
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT provinsi FROM tbl_kodepos GROUP BY provinsi ORDER BY provinsi";

        const [rst] = await connection.query(sSql);
        const arrProvince = rst.map(rst => rst['provinsi']);
        connection.release();

        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  arrProvince  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getProvince.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getProvince : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getProvince.' } }));
    }


};