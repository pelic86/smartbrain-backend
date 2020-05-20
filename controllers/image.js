
// To make sure the API keys only shows in backend end NOT front end
const Clarifai = require('clarifai');

// You must enter your own API key from Clarifai
const app = new Clarifai.App({
    apiKey: '3b68bc30b3c548418d3cec6259b95329'
  });

const handleApiCall = () => (req, res) =>  {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}  

const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    // increment by the amount of the column (instead of update)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('uable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};