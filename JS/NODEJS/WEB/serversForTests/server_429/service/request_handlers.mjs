import { 
    createNewClient,
    selectClientByPhone,
    selectClientById,
    selectCardByUserUid
} from '../repo/utils.mjs';
import { convertKeysToCamelCase } from '../repo/mapper.mjs';
import { validator, validateClient } from "./validators.mjs";

const saveClient = async (data) => {
    validator(data, validateClient);
    return await createNewClient(data);
};

const getClientByPhone = async (phone) => {
    let client = await selectClientByPhone(phone);  
    if(!client) {
        throw Object.assign(new Error('Клиент не найден'), {
            code: 'clientNotFound'
        });
    }
    client.phones = JSON.parse(client.phones);
    client.emails = JSON.parse(client.emails);

    return { ...client }
};

const getClientById = async (query) => {
    let client = await selectClientById(query.userUid);  
    if(!client) {
        throw Object.assign(new Error('Клиент не найден'), {
            code: 'clientNotFound'
        });
    }
    client.phones = JSON.parse(client.phones);
    client.emails = JSON.parse(client.emails);
    client.userUid = client.uid;
    console.log('=getClientById=', convertKeysToCamelCase(client));

    return { ...convertKeysToCamelCase(client) }
};

const getCardByUserUid = async (query) => {
    let card = await selectCardByUserUid(query.userUid);
    if(!card) {
        throw Object.assign(new Error('Клиент не найден'), {
            code: 'clientNotFound'
        });
    }

    card.main_account = JSON.parse(card.main_account);
    card.gift_account = JSON.parse(card.gift_account);

    console.log('=getCardByUserUid=', card);
    return { ...convertKeysToCamelCase(card) }
};


export {
    saveClient,
    getClientByPhone,
    getClientById,
    getCardByUserUid
};