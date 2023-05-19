const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const commonFile = require('./common')
const myUnderscore = require('underscore')



let arr = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins'];

router.get('/getMovies', function (req, res) {
    res.send({ msg: arr })
})


router.get('/getMovies/:indexNumber', function (req, res) {
    let index = req.params.indexNumber
    if (index < 0 || index >= arr.length) {
        return res.send({ msg: "Invalid Index" })
    }
    res.send({ msg: arr[index] })
})

let movieArr = [{
    id: 1,
    name: 'The Shining'
}, {
    id: 2,
    name: 'Incendies'
}, {
    id: 3,
    name: 'Rang de Basanti'
}, {
    id: 4,
    name: 'Finding Nemo'
}]

router.get('/getMovieObject',function(req,res){
    res.send({msg:movieArr})
})

router.get('/getMovieObject/:uniqueId',function(req,res){
    let id = req.params.uniqueId
    for(let i=0;i<movieArr.length;i++){
        if(movieArr[i].id == id){
            return res.send({msg:movieArr[i]})
        }
    }
    res.send({msg:"Invalid id"})
})


let players = [
    {
        name: "manish",
        dob: "1/1/1995",
        gender: "male",
        city: "jalandhar",
        sports: ["swimming"]
    },
    {
        name: "Aditya",
        dob: "1/1/1997",
        gender: "male",
        city: "Ghaziabad",
        sports: ["snooker"]
    },
    {
        name: "Vishal",
        dob: "1/1/1994",
        gender: "male",
        city: "Delhi",
        sports: ["cricket"]
    }
]

router.post('/addPlayer',function(req,res){
    let data = req.body;
    let addedPlayer = req.body.name
    for(let i=0;i<players.length;i++){
        if(players[i].name == req.body.name){
            return res.send({msg:"Player already exists with this name",addedPlayer})
        }
    }
    players.push(data);
    console.log(players);
    res.send({msg:players});
})

router.get('/test-me', function (req, res) {
    res.send('This should be working!')
});

router.get('/test-you', function (req, res) {
    console.log('The exported module is: ', commonFile)
    commonFile.doSomething()
    console.log('This is the constant I created', commonFile.name)
    res.send('Hello there, welcome to this application!')
});

router.get('/test-underscore', function (req, res) {
    let result = myUnderscore.first([11, 12, 23, 44, 15], 4)
    console.log('the result is', result)
    res.send('done')
})

router.get('/cohorts', function (request, response) {
    // logic to get the cohorts from database
    // logic tp get only the active cohorts
    // logic to get only the cohort with a size than 50
    // logic to get only the backend cohorts
    response.send(['technetium', 'nobelium'])
})

router.get('/students', function (req, res) {
    // receive or access the query params in the code
    // write a logic on these query params
    // city, score
    console.log(req.query)
    let requestedCity = req.query.city
    let sortField = req.query.sort
    // logic to get students
    res.send(["Sabiha", "Neha", "Akash", "Sonali"])
})

router.get('/students/:studentName', function (req, res) {
    console.log(req.params.studentName)
    /// go to database and search for studentName student
    // store the data found in this variable - studentDetails
    //res.send({data: studentDetails})
    res.send('student data')
})


module.exports = router;