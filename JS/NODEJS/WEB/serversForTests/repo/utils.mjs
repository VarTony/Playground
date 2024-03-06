import { db } from '../repo/index.mjs';
import * as uuid from 'uuid';

const saveClientToDb = async (data) => {
    const {
        userUid,
        firstName,
        lastName,
        dateOfBirth,
        mainEmail,
        mainPhone,
        phones,
        emails
    } = data;

    console.log('=saveClientToDb=', data);

    return new Promise((resolve, reject) => {
        const insertClient =
            `INSERT INTO clients (
                uid,
                first_name,
                last_name,
                main_email,
                main_phone,
                dateOfBirth,
                phones, 
                emails
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        db.run(insertClient,
            [
                userUid,
                firstName,
                lastName,
                mainEmail,
                mainPhone,
                dateOfBirth,
                JSON.stringify(phones),
                JSON.stringify(emails)
            ],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};


const saveCardToDb = (card) => {
    const {
        userUid,
        cardUid,
        number,
        level,
        mainAccount,
        giftAccount
    } = card;

    console.log('=saveCardToDb=', card);

    return new Promise((resolve, reject) => {
        const insertCard = `
            INSERT INTO cards (
                user_uid,
                card_uid,
                number,
                level,
                main_account,
                gift_account
            ) VALUES (?, ?, ?, ?, ?, ?);`;

        db.run(insertCard,
            [
                userUid,
                cardUid,
                number,
                level,
                JSON.stringify(mainAccount),
                JSON.stringify(giftAccount)
            ],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};


const selectClientById = async (id) => {
    if (typeof id !== 'string') {
        throw new Error(`id's type is ${typeof id}`);
    }

    return new Promise((resolve, reject) => {
        const selectClientQuery = `SELECT * FROM clients WHERE uid = (?);`;

        db.get(selectClientQuery, [id], (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
    });
}


const selectClientByPhone = async (phone) => {
    if (typeof phone !== 'string')
        throw new Error(`phone's type is ${typeof phone}`);

    return new Promise((resolve, reject) => {
        const selectClientQuery = `SELECT * FROM clients WHERE phone = ?;`;

        db.get(selectClientQuery, [phone], (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
    });
}


const selectCardByUserUid = (userUid) => {
    return new Promise((resolve, reject) => {
        if (typeof userUid !== 'string') {
            return reject(new Error(`userUid's type is ${typeof userUid}`));
        }

        const selectCard = `SELECT * FROM cards WHERE user_uid = ?;`;
        db.get(selectCard, [userUid], (err, card) => {
            if (err) {
                reject(err);
            } else {
                resolve(card);
            }
        });
    });
};



const createNewClient = async (data) => {
    const { firstName, lastName, email, phone, dateOfBirth } = data;
    const phones = [{ isMain: true, phone }];
    const emails = [email];
    const userUid = uuid.v4();
    console.log('=createNewClient=', data);

    const client = {
        userUid,
        firstName,
        lastName,
        mainEmail: email,
        mainPhone: phone,
        dateOfBirth,
        phones,
        emails
    };
    await saveClientToDb(client);
    await saveCardToDb(createRandomCard(userUid));

    return client
}


const createRandomCard = (userUid = uuid.v4()) => {
    const card = {
        userUid,
        cardUid: uuid.v4(),
        number: generateCardNumber(),
        level: 'virtual',
        mainAccount: {
            accountUid: userUid,
            balance: getRandomBalance(),
            accumulatedBalance: getRandomBalance()
        },
        giftAccount: {
            accountUid: userUid,
            balance: getRandomBalance()
        }
    };
    return card;
}


const generateCardNumber = () => {
    const minCardNumber = 1000_0000_0000_0000;
    const maxCardNumber = 9999_9999_9999_9999;
    const number = Math.floor
        (Math.random(minCardNumber) * maxCardNumber)
        .toString();

    return number.match(/.{1,4}/g).join('-');
}


const getRandomBalance = () => Math.floor(Math.random(0) * 5000);


export {
    createNewClient,
    selectClientById,
    selectClientByPhone,
    selectCardByUserUid
};