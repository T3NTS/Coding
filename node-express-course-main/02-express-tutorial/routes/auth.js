const express = require('express')
const router = express.Router()

router.post('/', (req,res)=>{
    console.log(req.body)
    const {name} = req.body
    if (name){
        return res.status(200).send(`welcome ${name}!`)
    }
    res.status(401).send('provide data')
})

module.exports = router