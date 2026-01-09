const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'jam3eea.db');
const schemaPath = path.join(__dirname, 'schema.sql');

function ensureDataDir() {
  fs.mkdirSync(dataDir, { recursive: true });
}

function openDb() {
  return new sqlite3.Database(dbPath);
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function runCallback(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function exec(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function ensureSchema(db) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  await exec(db, schema);
}

async function withDb(fn) {
  ensureDataDir();
  const db = openDb();
  try {
    await ensureSchema(db);
    await fn(db);
  } finally {
    db.close();
  }
}

yargs(hideBin(process.argv))
  .command(
    'member:add',
    'Add a new member',
    (y) =>
      y
        .option('name', {
          type: 'string',
          demandOption: true,
          describe: 'Full name',
        })
        .option('phone', {
          type: 'string',
          demandOption: true,
          describe: 'Phone number',
        })
        .option('email', {
          type: 'string',
          demandOption: true,
          describe: 'Email address',
        }),
    async (argv) => {
      await withDb(async (db) => {
        const joinedAt = new Date().toISOString();
        await run(
          db,
          'INSERT INTO members (full_name, phone, email, joined_at) VALUES (?, ?, ?, ?)',
          [argv.name, argv.phone, argv.email, joinedAt]
        );
        console.log('Member added.');
      });
    }
  )
  .command(
    'member:list',
    'List members',
    () => {},
    async () => {
      await withDb(async (db) => {
        const rows = await all(
          db,
          'SELECT id, full_name, phone, email, joined_at FROM members ORDER BY id'
        );
        if (rows.length === 0) {
          console.log('No members found.');
          return;
        }
        console.table(rows);
      });
    }
  )
  .command(
    'member:delete',
    'Delete member by id',
    (y) =>
      y.option('id', {
        type: 'number',
        demandOption: true,
        describe: 'Member ID',
      }),
    async (argv) => {
      await withDb(async (db) => {
        const result = await run(db, 'DELETE FROM members WHERE id = ?', [argv.id]);
        if (result.changes === 0) {
          console.log('Member not found.');
          return;
        }
        console.log('Member deleted.');
      });
    }
  )
  .command(
    'donation:add',
    'Add a donation',
    (y) =>
      y
        .option('amount', {
          type: 'number',
          demandOption: true,
          describe: 'Donation amount',
        })
        .option('note', {
          type: 'string',
          demandOption: true,
          describe: 'Donation note',
        })
        .option('member_id', {
          type: 'number',
          describe: 'Member ID (optional)',
        }),
    async (argv) => {
      await withDb(async (db) => {
        const donatedAt = new Date().toISOString();
        await run(
          db,
          'INSERT INTO donations (member_id, amount, note, donated_at) VALUES (?, ?, ?, ?)',
          [argv.member_id ?? null, argv.amount, argv.note, donatedAt]
        );
        console.log('Donation added.');
      });
    }
  )
  .command(
    'donation:list',
    'List donations',
    () => {},
    async () => {
      await withDb(async (db) => {
        const rows = await all(
          db,
          'SELECT id, member_id, amount, note, donated_at FROM donations ORDER BY id'
        );
        if (rows.length === 0) {
          console.log('No donations found.');
          return;
        }
        console.table(rows);
      });
    }
  )
  .demandCommand(1, 'Please provide a command')
  .strict()
  .help()
  .parse();
