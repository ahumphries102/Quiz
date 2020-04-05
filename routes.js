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
            res.send('No cats found')
        }
    });
    next()
})


router.post('/cat', (req, res, next) => {
    let newCat = new Kitten(req.body)
    newCat.save()
    .then(result => res.send(result))
    .catch(err=>{
        res.send(err.message)
    })  
    
    return next()
})

router.patch('/fixcat/:name', (req,res,next)=>{
    Kitten.update({name:req.params.name}, {
        name:req.body.name
    }, (err,result)=>{
        if(req.params.name === req.body.name){
            res.status(400)
            return res.send('Cannot update name to same name')
        }
        else if(result.n > 0){
            return res.send(result,`Your kitten's new name is ${req.body.name}`)
        }else{
            res.status(400)
            return res.send(`There was no cat named ${req.params.name} to update`)
        }
    })
    next()
})

router.del('/remove', (req,res,next)=>{
    Kitten.remove({
        name:req.body.name
    }, (err, result)=>{
        if(result.n > 0){
            res.send(`You deleted ${req.body.name}`)
        }else{
            res.status(400)
            res.send(`There is no cat named ${req.body.name}`)
        }
    })
    return next()

})

module.exports = router