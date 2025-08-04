import { KEY } from '../../ServerConfig.js';



export const verifyAccessToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const ApiToken = authHeader && authHeader.split(' ')[1];

    if (ApiToken == null || ApiToken != KEY.apps ){
         return res.send(JSON.stringify({ status: false, data: { msg: 'Failed auth token' } }));

    }
    else
    {
         return next();
    }

};