const restify = require('restify')
const Kitten = require ('./schema')
const Router = require('restify-router').Router
const router = new Router()

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
})

router.get('/allcats', (req,res,next)=>{
    
    Kitten.find({}, function (err, kitties) {
        let getKittenNames = kitties.map(ele=>ele.name)
        if(kitties.length){
            res.send(getKittenNames);
        }else{
            res.status(400)
            err = 'No Cats Found'
            res.send()
        }
    });
    next()
})


router.post('/cat', (req, res, next) => {
    let newCat = new Kitten(req.body)
    newCat.save()
    .then(result => res.send(result))
    .catch(err=>res.send(err.message))
    return next()
})

router.patch('/fixcat/:name', (req,res,next)=>{
    Kitten.findOneAndUpdate({name:req.params.name}, {
        name:req.body.name
    })
    .then(()=>console.log(req.body))
    .catch(err=>console.log(err))
    res.send(`Your kitten's new name is ${req.body.name}`)
    next()
})

router.del('/remove', (req,res,next)=>{
    Kitten.deleteOne({
        name:req.body.name
    })
    .then(()=>console.log('deleted'))
    .catch((err)=>console.log(err))
    res.send(200)
    return next()

})

module.exports = router