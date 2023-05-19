const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const commonFile = require('./common')
const myUnderscore = require('underscore')


const arr2 = [1,2,3,5,6,7];
router.get('/missingNumber',function(req,res){
    let n = arr2[arr2.length-1]
    console.log(n)
    let sumOfNaturalNos = (n*(n+1))/2;
    let sumOfarr = 0;
    for(let i=0;i<arr2.length;i++){
        sumOfarr = sumOfarr + arr2[i];
    }
    let missingNo = sumOfNaturalNos - sumOfarr;
    console.log("Missing number is",missingNo);
})

const arr3 = [33,34,35,37,38];
router.get('/missingNumber2',function(req,res){
    let n = arr3.length;
    let last = arr3[n-1];
    let first = arr3[0];
    let sumOfAP = ((n+1)*(first+last))/2;       // here we are using n+1 because there is a number missing from AP therefore we are adding 1
    let sumOfarr = 0;
    for(let i=0;i<arr3.length;i++){
        sumOfarr = sumOfarr + arr3[i];
    }
    let missingNumber = sumOfAP - sumOfarr;
    res.send({msg:missingNumber});
})

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