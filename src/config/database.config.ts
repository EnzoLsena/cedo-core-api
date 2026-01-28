import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));
