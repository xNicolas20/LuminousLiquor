import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token){
            return res.send({message: "Invalid"})
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                console.log(err)
            }

            req.user = user
            next()
        })
    } catch (err) {
        console.log(err)
    }
}

export default auth