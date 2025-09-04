
import { poolRow } from '../../database/dbrow.js';

export const additionalData = async (req, res) => {

    const { Ind_BekerjaPadaEfek, Ind_PerusahaanEfekRekening,Ind_BeneficialOwner,Ind_BeneficialOwner_Nama,
        rekening_efek_lain, rekening_sid, Ind_InstruksiAS,kode_sales,promo,
        last_page,token } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let $update = {
            "Ind_BekerjaPadaEfek": Ind_BekerjaPadaEfek,
            "Ind_PerusahaanEfekRekening": Ind_PerusahaanEfekRekening,
            "Ind_BeneficialOwner": Ind_BeneficialOwner,
            "Ind_BeneficialOwner_Nama": Ind_BeneficialOwner_Nama,
            "rekening_efek_lain": rekening_efek_lain,
            "rekening_sid": rekening_sid,
            "Ind_InstruksiAS": Ind_InstruksiAS,
            "kode_sales": kode_sales,
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
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Additional Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Additional Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Additional Data.' } }));
    }


};
