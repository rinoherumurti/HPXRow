import { poolRow } from '../../database/dbrow.js';
import { getDynamicLogger } from '../../middlewares/Logger.js';

export const potData = async (req, res) => {

    const { Ind_HubunganPOT, Ind_NomorIdPOT,Ind_NamaLengkapPOT,Ind_TempatLahirPOT,Ind_TglLahirPOT,Ind_JenisKelaminPOT,
        Ind_POT_alamat1, Ind_POT_Rt, Ind_POT_Rw, Ind_POT_kodepos,Ind_POT_propinsi,Ind_POT_kota,Ind_POT_kecamatan,Ind_POT_kelurahan,
        Ind_AgamaPOT,Ind_PerkawinanPOT,Ind_PekerjaanPOT,Ind_PekerjaanPOT_Lainnya,Ind_SumberUtamaDanaPOT,Ind_SumberUtamaDanaPOT_Lainnya,Ind_PenghasilanTahunPOT,
        Ind_BidangUsahaPOT,Ind_JabatanPOT,Ind_KantorPOT,Ind_Kantor_alamat1POT,Ind_Kantor_teleponPOT,
        last_page,token } = req.body;
    let connection = await poolRow.getConnection();

    const controllerLogger = getDynamicLogger(token);
    controllerLogger.info('POTData', req.body);
    try {
        let sSql;
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
        
        sSql = "UPDATE web_dashboard.tblprafpre SET ";
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
            return res.send(JSON.stringify({ status: false, data: { msg: 'Error POT Data.' } }));
        }


    } catch (error) {
        connection.release();
        console.error("Error POT Data : ", error.message, sSql);
        controllerLogger.debug('POTData ERROR', sSql);
        return res.send(JSON.stringify({ status: false, data: { msg: 'Error POT Data.' } }));
    }


};
