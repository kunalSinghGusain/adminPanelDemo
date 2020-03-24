var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// global variables
var posts = [];
var DBName = 'Posts'
var dbURL = `mongodb://admin-stackbulls:${encodeURIComponent('stackbulls@1')}@cluster0-shard-00-00-xgajj.mongodb.net:27017,cluster0-shard-00-01-xgajj.mongodb.net:27017,cluster0-shard-00-02-xgajj.mongodb.net:27017/${DBName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
var Post = mongoose.model('post', {
    subject : String,
    url : String,
    body : String
});
//initialization method calls
app.use(express.static(__dirname))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    console.log('ERROR : ',err);
});
var server = app.listen(3000, () =>
{
    console.log('app is listening on port 3000')
})


// APIs
app.post('/api/posts',(req,res)=>{
    console.log('type of req body : '+typeof req.body)
    console.log('req body : '+JSON.stringify(req.body))
    posts.push(req.body);
    var post = new Post(req.body);
    post.save((err)=>{
        console.log(`ERROR Occured on trying to save : ${err}` );
    });
    res.sendStatus(200)
})
