
import { poolRow } from '../../database/dbrow.js';

export const potData = async (req, res) => {

    const { Ind_HubunganPOT, Ind_NomorIdPOT,Ind_NamaLengkapPOT,Ind_TempatLahirPOT,Ind_TglLahirPOT,Ind_JenisKelaminPOT,
        Ind_POT_alamat1, Ind_POT_Rt, Ind_POT_Rw, Ind_POT_kodepos,Ind_POT_propinsi,Ind_POT_kota,Ind_POT_kecamatan,Ind_POT_kelurahan,
        Ind_AgamaPOT,Ind_PerkawinanPOT,Ind_PekerjaanPOT,Ind_PekerjaanPOT_Lainnya,Ind_SumberUtamaDanaPOT,Ind_SumberUtamaDanaPOT_Lainnya,Ind_PenghasilanTahunPOT,
        Ind_BidangUsahaPOT,Ind_JabatanPOT,Ind_KantorPOT,Ind_Kantor_alamat1POT,Ind_Kantor_teleponPOT,
        last_page,token } = req.body;
    let connection = await poolRow.getConnection();
    try {

        let $update = {
            "Ind_HubunganPOT": Ind_HubunganPOT,
            "Ind_NomorIdPOT": Ind_NomorIdPOT,
            "Ind_NamaLengkapPOT": Ind_NamaLengkapPOT,
            "Ind_TempatLahirPOT": Ind_TempatLahirPOT,
            "Ind_TglLahirPOT": Ind_TglLahirPOT,
            "Ind_JenisKelaminPOT": Ind_JenisKelaminPOT,
            "Ind_POT_alamat1": Ind_POT_alamat1,
            "Ind_POT_Rt": Ind_POT_Rt,
            "Ind_POT_Rw": Ind_POT_Rw,
            "Ind_POT_kodepos": Ind_POT_kodepos,
            "Ind_POT_propinsi": Ind_POT_propinsi,
            "Ind_POT_kota": Ind_POT_kota,
            "Ind_POT_kecamatan": Ind_POT_kecamatan,
            "Ind_POT_kelurahan": Ind_POT_kelurahan,
            "Ind_AgamaPOT": Ind_AgamaPOT,
            "Ind_PerkawinanPOT": Ind_PerkawinanPOT,
            "Ind_PekerjaanPOT": Ind_PekerjaanPOT,
            "Ind_PekerjaanPOT_Lainnya": Ind_PekerjaanPOT_Lainnya,
            "Ind_SumberUtamaDanaPOT": Ind_SumberUtamaDanaPOT,
            "Ind_SumberUtamaDanaPOT_Lainnya": Ind_SumberUtamaDanaPOT_Lainnya,
            "Ind_PenghasilanTahunPOT": Ind_PenghasilanTahunPOT,
            "Ind_BidangUsahaPOT": Ind_BidangUsahaPOT,
            "Ind_JabatanPOT": Ind_JabatanPOT,
            "Ind_KantorPOT": Ind_KantorPOT,
            "Ind_Kantor_alamat1POT": Ind_Kantor_alamat1POT,
            "Ind_Kantor_teleponPOT": Ind_Kantor_teleponPOT,
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
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error Occupation Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error Occupation Data : ", error.message);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error Occupation Data.' } }));
    }


};
