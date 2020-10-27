const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const morgan = require('morgan');



mongoose.connect("mongodb+srv://amitk29:test123@mycluster.njlce.mongodb.net/test?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed!');
});

const Faq = require('./faq.js');

const app = express();
app.use(bodyParser.json());

//app.use(morgan('dev'));

//app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
})


app.get('/api/searchAllFAQ', (req, res, next) => {
    Faq.find({answer: {$ne: null}})
    .then(documents =>{
        res.status(200).json({
            message: 'Search Question done successfully',
            faq : documents
        });
    });
   
});

app.get('/api/searchAllUnansweredFAQ', (req, res, next) => {
    Faq.find({answer: {$eq: null}})
    .then(documents =>{
        res.status(200).json({
            message: 'Search Question done successfully',
            faq : documents
        });
    });
   
});


app.post('/api/createFAQ', (req, res, next) => {
    console.log('req body::',req.body);
    const faq = new Faq({
        
        technology : req.body.technology,
        version : req.body.version,
        question : req.body.question,
        answer:  req.body.answer,
        dateCreated : req.body.dateCreated,
        createdBy: req.body.createdBy

    });
    faq.save();
    res.status(201).json({
        message: 'Post FAQ done successfully'
    });
});


app.get('/api/searchFAQ', (req, res, next) => {

    // console.log(req.query)
    // const query = Faq.find();

    // if(req.query.technology ){
    //     query.where('technology').equals(req.query.technology);
    // }
    // // if(req.query.technology && req.query.question){
    // //     query.where('technology').equals(req.query.technology).and('question').equal(req.query.question);
    // //     //.and('version').equals(version);
    // // }
    // query.then(documents =>{
    //     console.log(documents);
    //     res.status(200).json({
    //         message: 'Search Question done successfully',
    //         faq : documents
    //     });
    // });

    Faq.find().or([{technology:req.query.technology},
        {version: req.query.version}, 
        {question: req.query.question}])
        .then(documents =>{
       console.log(documents);
       res.status(200).json({
           message: 'Search Question done successfully',
           faq : documents
       });
   });

})
    
   


app.get('/api/searchFAQById/:id', (req, res, next) => {
    console.log(req.params.id);
    Faq.findById({_id:req.params.id})
    .then(documents =>{
        res.status(200).json({
            message: 'Search FAQ by ID successfully',
            faq : documents
        });
    });
   
});

app.delete('/api/deleteFAQ/:id', (req, res, next) => {
    console.log('deleet', req.params.id);
    Faq.deleteOne({_id:req.params.id})
    .then(result => {
        res.status(200).json({message : 'FAQ deleted'});
    });
   
});

app.put('/api/updateFAQ/:id', (req, res, next) => {

    console.log(req.body)
    Faq.findByIdAndUpdate(req.params.id, req.body).then(result =>{
        console.log(result);
        res.status(200).json({message: "update successfull"});
    })
 
})

app.get('/api/technologies', (req, res, next) => {
    const technology = [
        {
            id:"1",
            name:"Java"
        },
        {
            id:"2",
            name:"Angular"
        },
    ];
    res.status(200).json({
        message: 'Technology fetched successfully',
        technologies: technology
    });
   
});

module.exports=app;