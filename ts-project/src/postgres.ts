import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pgClient = new Client({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false, // Important for Neon and other managed DBs
  },
});

async function main() {
  try {
    await pgClient.connect();

    pgClient.query("BEGIN;")

    const response = await pgClient.query(
      "SELECT * FROM tables;"
    );

    pgClient.query("COMMIT;")
    console.log(response.rows); // .rows contains the actual result
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await pgClient.end();
  }
}

main();
