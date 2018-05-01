const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

var Message = require('../models/message');

router.get('/', (req, res, next)=>{
    Message.find()
    .populate('user', 'firstName')
    .exec(function(err, messages){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Success',
            obj: messages
        })
    })
});


router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            })
        }
        next();
    })
})

router.post('/',(req, res, next)=>{
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Message Saved',
                obj: result
            });
        });
    }) 
    
});

router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, function(err, message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!message){
            return res.status(500).json({
                title: 'No message found',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: 'Users do not match'
            }) 
        }
        message.content= req.body.content;
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Saved',
                obj: result
            });
        })
    })
})

router.delete('/:id', function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!message){
            return res.status(500).json({
                title: 'No message found',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: 'Users do not match'
            }) 
        }
        message.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted Message',
                obj: result
            });
        })
    })
});

module.exports =router;