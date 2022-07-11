// BUILD YOUR SERVER HERE
const express = require('express');
const model = require('./users/model.js');

const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    model.find()
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json({ message: 'The users information could not be retrieved'})
    })
})

server.get('/api/users/:id', (req, res) => {
    model.findById(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).json({ message: `"The user with the specified ID does not exist`});
        }else{
            res.status(200).json(user)
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'The user information could not be retrieved'})
    })
})

server.post('/api/users', (req, res) => {
    const body = req.body;

    if(!req.body.name || !req.body.bio){
        res.status(400).json({ message: 'Please provide name and bio for the user'})
        return;
    }

    model.insert(body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        res.status(500).json({ message: 'There was an error while saving the user to the database' })
    })
})

server.delete('/api/users/:id', (req, res) => {
    model.remove(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).json({ message: `The user with the specified ID does not exist`});
        } else {
            res.status(200).json(user);
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'The user could not be removed'})
    })
})

server.put('/api/users/:id', (req, res) => {
    const user = req.body;

    if(!req.body.name || !req.body.bio){
        res.status(400).json({ message: 'Please provide name and bio for the user'})
        return;
    }

    model.update(req.params.id, user)
    .then(user => {
        if(user == null){
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        }else{
            res.status(200).json(user);
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'The user information could not be modified' })
    })
})


server.listen(8000, () => {
    console.log('server running on port 8000');
})

module.exports = server; // EXPORT YOUR SERVER instead of {}