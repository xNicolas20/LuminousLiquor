import express from "express"
import User from '../schema/user.js'

const router = express.Router()

const app = express()
app.use(express.json())


const session = "62b5febdeac8ede4827fa0ca"

router.route('/').get( async (req, res) => {
    // User.findById(({_id: session}), function(err, val){
    //     res.send(val)
    // })

    const query = User.findById({_id: session}).select({'password' : 0})

    query.exec(function (err, val) {
        if (err) return next(err);
        res.send(val);
    })
})

// router.route('/').post( async (req, res, next) => {
//     //const { fullName, email, phoneNumber, Age } = req.body;
//     const editedUser = new User(
//         {
//             fullName: 'Update Test',
//             email: 'Update.Test@gmail.com',
//             phoneNumber: '0988765446',
//             Age: 20
//         }
//     )

//     try{
//         editedUser.save()
//     }
//     catch(err){
//         console.log(err)
//     }

//     //dummy.push(editUser)
//     console.log(editedUser)
//     res.send('Created User')
// })


router.route('/:id').put( async (req, res, next) => {
    console.log("id is" + req.params.id)
    const id = req.params.id
    User.findByIdAndUpdate({_id: id}, req.body).catch((err) => {console.log(err)})


    console.log(req.body) 
    res.send("User Updated")
})

router.route('/:id').delete( async (req, res, next) => {
    const id = req.params.id
    User.findByIdAndDelete({_id: id}).catch((err) => {console.log(err)})

    console.log("User Deleted") 
    res.send("User Deleted")
})

export default router