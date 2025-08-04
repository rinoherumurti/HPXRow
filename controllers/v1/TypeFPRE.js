
import { poolRow } from '../../database/dbrow.js';

export const typeFPRE = async (req, res) => {

    const { token,typeFPRE,last_page } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let sSql = "UPDATE web_dashboard.tblprafpre SET typeFPRE = ?, last_page = ? WHERE token = ?;";
       
        let param = [typeFPRE,last_page,token];
        const [rst] = await connection.query(sSql, param);
        connection.release();

        if (rst.affectedRows > 0) {
            return res.send(JSON.stringify({ status: true}));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Type FPRE.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Type FPRE : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Type FPRE.' } }));
    }


};