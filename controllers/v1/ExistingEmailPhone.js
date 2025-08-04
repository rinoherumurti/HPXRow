// const poolRow = require('../../database/dbrow');
import { poolRow } from '../../database/dbrow.js';

export const existingEmailPhone = async (req, res) => {
    let connection = await poolRow.getConnection();
    const { Ind_Email, Ind_NomorHP } = req.body;
    const telepon = Ind_NomorHP.slice(2);
    const likeParam = '%' + telepon + '%';

    try {
        const [result] = await connection.execute(
            'SELECT * FROM dbhpx.user where EmailConfirm=? OR MobileConfirm LIKE ? ', [Ind_Email, likeParam]
        );

        if (result.length > 0) {
            connection.release();
            return res.send(JSON.stringify({ status: false, data: { msg: 'Email or Phone already exist' } }));
        }
        else {
            let sSql = "SELECT * FROM web_dashboard.tblprafpre WHERE (Ind_Email=? OR Ind_NomorHP like ?) AND FormStatus = '7'";
            let param = [Ind_Email, likeParam];
            const [rst] = await connection.execute(sSql, param);
            connection.release();
            if (rst.length > 0) {
                return res.send(JSON.stringify({ status: false, data: { msg: 'Email or Phone already exist' } }));
            }
            else {
                return res.send(JSON.stringify({ status: true, data: { msg: 'Success' } }));
            }

        }

    } catch (error) {
        connection.release();
        console.error("Error check email an phome existing : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error check email an phome existing.' } }));
    }


};