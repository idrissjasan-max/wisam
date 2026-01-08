const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");
const minimist = require("minimist");

const dbPath = path.join(__dirname, "app.db");
const schemaPath = path.join(__dirname, "schema.sql");

function initializeDatabase() {
  const isNew = !fs.existsSync(dbPath);
  const db = new Database(dbPath);

  if (isNew) {
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema);
  }

  return db;
}

function printUsage() {
  console.log("Usage:");
  console.log('  node index.js add --name "Ali" --email "a@a.com"');
  console.log("  node index.js list");
  console.log('  node index.js delete --email "a@a.com"');
}

function addUser(db, name, email) {
  if (!name || !email) {
    console.error("Both --name and --email are required.");
    process.exitCode = 1;
    return;
  }

  const createdAt = new Date().toISOString();
  try {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)"
    );
    const info = stmt.run(name, email, createdAt);
    console.log(`User added with id ${info.lastInsertRowid}.`);
  } catch (error) {
    console.error(`Failed to add user: ${error.message}`);
    process.exitCode = 1;
  }
}

function listUsers(db) {
  const stmt = db.prepare(
    "SELECT id, name, email, created_at FROM users ORDER BY id ASC"
  );
  const rows = stmt.all();

  if (rows.length === 0) {
    console.log("No users found.");
    return;
  }

  console.table(rows);
}

function deleteUser(db, email) {
  if (!email) {
    console.error("--email is required.");
    process.exitCode = 1;
    return;
  }

  const stmt = db.prepare("DELETE FROM users WHERE email = ?");
  const info = stmt.run(email);

  if (info.changes === 0) {
    console.log("No user found with that email.");
  } else {
    console.log(`Deleted ${info.changes} user(s).`);
  }
}

function main() {
  const args = minimist(process.argv.slice(2));
  const command = args._[0];

  if (!command) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const db = initializeDatabase();

  switch (command) {
    case "add":
      addUser(db, args.name, args.email);
      break;
    case "list":
      listUsers(db);
      break;
    case "delete":
      deleteUser(db, args.email);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exitCode = 1;
  }

  db.close();
}

main();
