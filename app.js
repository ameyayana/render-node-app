const http = require("http");
const { Client } = require("pg");

const PORT = process.env.PORT || 3000;

// Connect to database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();

// Create table if not exists
client.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255)
  )
`);

const server = http.createServer(async (req, res) => {
  if (req.url === "/add") {
    await client.query("INSERT INTO messages(text) VALUES($1)", ["Hello DB "]);
    res.end("Data added!");
  } else {
    const result = await client.query("SELECT * FROM messages");
    let output = "<h1>Messages:</h1>";
    result.rows.forEach(row => {
      output += `<p>${row.text}</p>`;
    });
    res.end(output);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
