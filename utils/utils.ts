import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const ENV = {
  USERNAME: process.env.WIKI_USERNAME || '',
  PASSWORD: process.env.WIKI_PASSWORD || '',
};

console.log('USERNAME loaded:', Boolean(process.env.WIKI_USERNAME));
console.log('PASSWORD loaded:', Boolean(process.env.WIKI_PASSWORD));
