import { poolRow } from '../../database/dbrow.js';

export const getPostalCode = async (req, res) => {
    const { kabupaten,kecamatan,kelurahan } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT kodepos FROM tbl_kodepos WHERE kabupaten = ? AND kecamatan = ? AND kelurahan = ? ;";


        let param = [kabupaten,kecamatan,kelurahan];
        const [rst] = await connection.query(sSql,param);
        //console.log(rst);
        connection.release();
       
        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  rst[0]['kodepos']  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getPostalCode.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getPostalCode : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getPostalCode.' } }));
    }


};