const express = require('express');
const users = require('../data/helpers/userDb');
const router = express.Router();

router.post('/', (req, res) => {
    const newUser = req.body;
    users
        .insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        });
});

router.get('/', (req, res) => {
    users
        .get()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    userId = req.params.id
    users
        .getById(userId)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
                return;
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        });
});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;
    users
        .getUserPosts(userId)
        .then(posts => {
            if(posts === 0) {
                res.status(404).json({ message: "There are no posts from this user."});
                return;
            }
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "Posts from this user could not be found."})
        })
})

router.delete('/:id', (req, res) => {
    const userId = req.params.id
    users
        .remove(userId)
        .then(userId => {
            if (userId === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
                return;
            }
            res.status(200).json(userId);
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        });
});

router.put('/:id', (req, res) => {
    const updateId = req.params.id
    users
        .update(updateId, req.body)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
                return;
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        });
});

module.exports = router;