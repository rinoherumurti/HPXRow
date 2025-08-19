import { poolRow } from '../../database/dbrow.js';

export const getBank = async (req, res) => {
    let connection = await poolRow.getConnection();
    try {

        let sSql = "SELECT BankID,BankName,ShortName,isInvestorAccount,syariah,other_bank FROM tblmasterbank;";

        const [rst] = await connection.query(sSql);
        // const arrProvince = rst.map(rst => rst['provinsi']);
        connection.release();

        if (rst.length > 0) {
            return res.send(JSON.stringify({ status: true, data:  rst  }));
        }
        else {
            return res.send(JSON.stringify({ status: false, data: { msg: '[DB]Error getBank.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error getBank : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error getBank.' } }));
    }


};