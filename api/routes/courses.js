const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { request } = require('../../app');

const Course = require('../models/courses')

router.get('/', (req, res, next) => {
    /*let resultArray = [];
    mongoose.mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        const cursor = db.collection('quotes_tb').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.status.json(resultArray); 
        });
    });*/
    Course.find()
    .select('_id title provider rating enroll tag')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            courses: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    priority: doc.priority,
                    rating: doc.rating,
                    enroll: doc.enroll,
                    tags: doc.tag,
                    request: {
                        type: "GET",
                        url: "localhost:3000/courses/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.post('/', (req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        provider: req.body.provider,
        rating: req.body.rating,
        enroll: req.body.enroll,
        tag: req.body.tag
        
    });

    course
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Course Sucessfully',
            createdCourse: {
                _id: result._id,
                title: result.title,
                provider: result.provider,
                rating: result.rating,
                enroll: result.enroll,
                tags: result.tag,
                request: { 
                    type: "GET",
                    url: "localhost:3000/courses/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    });
});

router.get('/:courseId', (req, res, next) => {
    const id = req.params.courseId;   //extracting the product id
    Course.findById(id)
    .select('_id title provider enroll rating tag')
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        if (doc) {
            res.status(200).json(doc);   
        }
        else {
            res.status(404).json({
                message: 'No valid entry founded for ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

router.patch('/:courseId', (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Course.update(
        {_id: id},
        {$set: updateOps}
    )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:courseId', (req, res, next) => {
    const id = req.params.courseId;
    Course.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;