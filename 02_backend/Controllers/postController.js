const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Post = require('../Models/postModel');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


//FIND BY ID:
exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                })
            }
            req.post = post
            next()
        })
}

//SHOW ALL POSTS WITH FINDBYID:
exports.getPosts = (req, res) => {
    Post.find({})
        .limit(10)
        .sort({ createdAt: -1 })
        .exec((err, posts) => {
            if (err) console.log(err);
            res.json(posts);
        })
}

//SHOW SINGLE POST:
exports.getSinglePost = (req, res) => {
    let id = req.params.id;
    Post.findById(id, (err, post) => {
        res.json(post);
    });
}

// CREATE A POST WITH FORMIDABLE(could be Mulder or Formidable)
exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        let post = new Post(fields)

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

        post.save((err, post) => {
            if (err) {
                return res.status(400).json({ error: 'Error creating post' })
            }

            res.json({ post });
        })
    })
}

// UPDATE A POST WITH FORMIDABLE(could be Mulder or Formidable)
exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        let post = req.post
        post = _.extend(post, fields)

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

        post.save((err, post) => {
            if (err) {
                return res.status(400).json({ error: 'Error creating post' })
            }

            res.json({ post });
        })
    })
}

//DELETE A POST WITH TOKEN:
exports.deletePost = (req, res) => {
    const { id } = req.params;
    Post.findOneAndRemove(id).exec((err, post) => {
        if (err) console.log(err)
        res.json({
            message: 'Post Deleted :)'
        })
    })
}


//GET PHOTO
exports.photo = (req, res) => {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data)
}

//LOGIN IS NOT GOING TO DB - JUST ONE ADMIN:
exports.login = (req, res) => {
    const { name, password } = req.body;
    if (password === process.env.PASSWORD) {
        //generate token and send to client/react
        const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '365d' })
        return res.json({ token, name })
    } else {
        return res.status(400).json({
            error: 'Incorrect Password'
        });
    }
}

//REQUIRE SIGN IN AS MIDDLEWARE
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET //req.user.name
})

//SIGN OUT:
exports.signout = (req, res) => {
    res.clearCookie('t')
    return res.json({ message: 'Admin Signout Success!' })
}

//getDistance:
// exports.getDistance = (req, res) => {
//     fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.latitudeUser},${this.state.longitudeUser}&destinations=40.6655101%2C-73.891889699999982%7C&key=AIzaSyALUiIOx7GDeZ2LZNseEaVsjvZHkvac4Nw`,
// }

// >>>>>>> CODE BELLOW IS A MORE SIMPLE AND STREIGTH FOWARD WAY, WITHOUT findById >>>>>>>>>>

//SHOW ALL POSTS:
// exports.getPosts = (req, res) => {
//     Post.find((err, posts) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(posts);
//         }
//     });
// }


//CREATE A POST:
// exports.createPost = (req, res) => {
//     let post = new Post(req.body);
//     post.save()
//         .then(post => {
//             // res.status(200).json({ 'post': 'new pub added successfully' })
//             res.json(post)
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(400).send('adding new pub failed');
//         });
// }



// DELETE A POST:
// exports.deletePost = (req, res, next) => {
//     let id = req.params.id;
//     Post.findByIdAndRemove(id, (err, post) => {
//         if (err) res.status(400).send('Cannot delete')
//         res.json({ "message": "Post deleted ;(" });
//     });
// }


//UPDATE A POST:
// exports.updatePost = (req, res) => {
//     Post.findById(req.params.id, (err, post) => {
//         if (!post)
//             res.status(404).send("post not found");
//         else
//             post.title = req.body.title;
//         post.body = req.body.body;
//         post.save().then(post => {
//             res.json('Post updated!');
//         })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// }

