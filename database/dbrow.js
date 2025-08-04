
import mysql from 'mysql2/promise';

import { DbRow } from '../ServerConfig.js';

export const poolRow = mysql.createPool(DbRow);

//module.exports = poolRow;