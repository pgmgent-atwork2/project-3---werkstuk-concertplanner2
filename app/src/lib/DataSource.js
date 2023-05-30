/* eslint-disable no-undef */
import dotenv from 'dotenv';

// we read some environment variables from the .env file, so we need to load it
dotenv.config();
import { DataSource } from 'typeorm';

// import van de navigation item entity
import entities from '../models/index.js';

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities, // vertel aan de datasource welke entities die moet gebruiken
});

export default DS;
