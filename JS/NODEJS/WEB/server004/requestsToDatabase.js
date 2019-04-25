
const selectAll = (req, res, db, offset = 1) => { 
	
	new Promise((res, rej) =>
		db.all(`SELECT * FROM contacts LIMIT 5 OFFSET ${offset};`, (err, data) => { //each						
			err? rej(err): res(data)
	})).then(data =>  {		
		console.log(data);
		return res.send(data)	
	}).catch(err => console.error(err));
}


const selectContactForUpdate = (req, res, db, id) => {
	new Promise((res, rej) =>
		db.each(`SELECT * FROM contacts WHERE id=(?);`, id, (err, data) => {
			err? rej(err): res(data)
			})).then(data =>  {		
				console.log(data);
				return res.send(data);	
			}).catch(err => console.error(err));
}




const deleteAll = (db, superUser) =>	{
		db.run(`DELETE FROM contacts WHERE name!=(?);`, superUser, err => err 
			? console.log(err) 
			: console.log('successful'));
	}




module.exports.selectAll = selectAll;
module.exports.deleteAll = deleteAll;
module.exports.selectContactForUpdate = selectContactForUpdate;