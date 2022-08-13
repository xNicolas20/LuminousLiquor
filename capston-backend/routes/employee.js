import express from "express"
import Employee from '../schema/employeeSchema.js'
import id from '../index.js'
const router = express.Router()

// get all employee
router.route('/').get( async (req, res) => {

    // Employee.find({}, function(err, val){
    //     res.send(val)
    // })

    const query = Employee.find({}).select({'password' : 0, '__v': 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        res.send(val);
    })

})

router.route('/currentUser').get( async (req, res) => {

    // Employee.find({}, function(err, val){
    //     res.send(val)
    // })

    const query = Employee.findById({_id: id}).select({'password' : 0, '__v': 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        res.send(val);
    })

})

//new employee
router.route('/').post( async (req, res, next) => {
    const employee = new Employee(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            age: req.body.age,
            role: req.body.role,
            totalHours: req.body.totalHours,
            biWeeklyHours: req.body.biWeeklyHours,
            rate: req.body.rate
        }
    )

    try{
        employee.save()
    }
    catch(err){
        console.log(err)
    }

    console.log("It Worked")
    res.send('Employee Created')
})

//get id
//https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
router.route('/:id').get( async (req, res, next) => {
    const getId = req.params.id;

    const query = Employee.findById({_id: getId}).select({'password' : 0, '__v': 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        res.send(val);
    })

    //res.send(getId)
})

//delete employee
router.route('/:id').delete( async (req, res, next) => {
    const getId = req.params.id;

    Employee.findByIdAndDelete({_id: getId}).catch((err) => {console.log(err)})

    res.send("User Deleted")
    //res.send(getId)
})

//edit employee
router.route('/:id').put( async (req, res, next) => {
    const getId = req.params.id;

    Employee.findByIdAndUpdate({_id: getId}, req.body).catch((err) => {console.log(err)})

    res.send("User Updated")
})

//get employee Salary 
router.route('/salary/:id').get( async (req, res, next) => {
    const getId = req.params.id;
    

    const query = Employee.findById({_id: getId}).select({'password' : 0, '__v': 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        //res.send(val);
        var rate = val.rate
        var biweekly = val.biWeeklyHours
        var amount = rate * biweekly
        var grossSalary = (0.04 * amount) + amount 

        const salary = {
            "salary": grossSalary
        }

        console.log(rate)
        console.log(biweekly)
        console.log(amount)
        res.send(salary)
    })

})

//set biweeklyHours and update total hours
router.route('/setBiWeeklyHours/:id').put( async (req, res, next) => {
    const getId = req.params.id;
    
    const query = Employee.findById({_id: getId}).select({'password' : 0, '__v': 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        var totalHours = val.totalHours
        var biWeeklyHours = val.biWeeklyHours

        var newTotalHours = totalHours + biWeeklyHours
        var newbiWeeklyHours = req.body.biWeeklyHours

        const updatebiWeeklyHours = {
            "totalHours": newTotalHours,
            "biWeeklyHours": newbiWeeklyHours
        }

        Employee.findByIdAndUpdate({_id: getId},updatebiWeeklyHours).catch((err) => {console.log(err)})

        res.send("BiWeeklyHour Updated");
        console.log("It Worked")
    })

})


export default router