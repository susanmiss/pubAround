const express = require('express');
const { getPosts, createPost, getSinglePost, postById, deletePost, updatePost, photo, login, requireSignin, signout } = require('../Controllers/postController');

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3VzYW4iLCJpYXQiOjE2MDMzNzAwMjIsImV4cCI6MTYzNDkwNjAyMn0.rRptY6x3hJo5-maU5a6ZHUxAMi7r0vzm7Nr6nWI240c
const router = express.Router();


router.get('/posts', getPosts)
router.get('/post/:id', getSinglePost)
router.post('/post/create', requireSignin, createPost)
router.delete('/post/:id', requireSignin, deletePost)
router.put('/post/:id', requireSignin, updatePost)
router.get('/post/photo/:id', photo);


router.post('/login', login);
router.get('/signout', signout)

router.param('id', postById)

// TESTING SECRET: 
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        // data: req.user
        data: req.user.name
    })
})


module.exports = router;