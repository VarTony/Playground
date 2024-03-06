import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./example_db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS clients (
        uid UUID PRIMARY KEY,
        first_name TEXT NOT NULL, 
        last_name TEXT NOT NULL,
        main_email TEXT,
        main_phone TEXT NOT NULL,
        dateOfBirth Text NOT NULL,
        phones TEXT CHECK (json_valid(phones)) NOT NULL,
        emails TEXT CHECK (json_valid(emails)) NOT NULL  
    );`);

    db.run(`
    CREATE TABLE IF NOT EXISTS cards (
        user_uid TEXT NOT NULL,
        card_uid TEXT NOT NULL,
        number TEXT NOT NULL,
        level TEXT NOT NULL CHECK (level IN ('virtual', 'burgundy', 'silver', 'golden')),
        main_account TEXT CHECK (json_valid(main_account)) NOT NULL, -- JSON object as text
        gift_account TEXT CHECK (json_valid(gift_account)), -- JSON object as text, assuming it can be NULL
        PRIMARY KEY (card_uid)
    );
    `);
});


export { db };