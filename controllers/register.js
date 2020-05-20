
const handleRegister = (db, bcrypt) => (req, res) => {
    
    const {email, name, password} =req.body;
    // check the validation
    if( !email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

        // Create the transaction when it's need to do more then two things at once!!
        // transaction users db into login db  ( use trx object )  
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            // first we updated the login table
            .into('login')
            // we got the login email
            .returning('email')

            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            // if it's commit send this transaction through        
            .then(trx.commit)
            .catch(trx.rollback)        
            })
        })
        
        .catch(err => {
            res.status(400).json('unable to register')
        })
} 

module.exports = {
    handleRegister: handleRegister
};