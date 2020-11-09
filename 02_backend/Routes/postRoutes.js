const express = require('express');
const { getPosts, createPost, getSinglePost, postById, deletePost, updatePost, photo, login, requireSignin, signout } = require('../Controllers/postController');

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