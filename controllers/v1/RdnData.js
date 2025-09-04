
import { poolRow } from '../../database/dbrow.js';

export const rdnData = async (req, res) => {

    const { bank_rdn, Ind_BankID, Ind_NamaBank, Ind_NamaPemilikRekening, Ind_NomorRekening,last_page,token } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let $update = {
            "bank_rdn": bank_rdn,
            "Ind_BankID": Ind_BankID,
            "Ind_NamaBank": Ind_NamaBank,
            "Ind_NamaPemilikRekening": Ind_NamaPemilikRekening,
            "Ind_NomorRekening": Ind_NomorRekening,
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
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error RDN Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error RDN Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error RDN Data.' } }));
    }


};
