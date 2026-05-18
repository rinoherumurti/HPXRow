// const winston = require('winston');
// const path = require('path');
import winston from 'winston';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Function to create a logger with a dynamic filename
export const getDynamicLogger = (logIdentifier) => {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // const filename = path.join(__dirname, `logs/${logIdentifier}-${date}.log`);
  const filename = `logs/${logIdentifier}-${date}.log`;


  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: filename, level: 'info' })
    ]
  });
};