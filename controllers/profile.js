const handleProfileGet = (db) => (req, res) => {
    const {id} = req.params;
    db.select('*').from('users')
        .where({id})
        .then(user => {
        console.log(user)
        // To check if the user id is exist or not
        if (user.length) {
            res.json(user[0])
        }  else {
            res.status(400).json('Not found')
        }        
    })
    .catch(err => res.status(400).json('Not found'))
}

module.exports = {
    handleProfileGet: handleProfileGet
};