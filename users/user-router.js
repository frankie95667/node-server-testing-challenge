const router = require("express").Router();

const { all, insert, remove } = require("./user-model");

router.get("/", (req, res) => {
    all()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({errorMessage: "Something went wrong"}))
})

router.post("/", (req, res) => {
    insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch(err => res.status(500).json({errorMessage: "Something went wrong"}))
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    remove(id)
    .then((count) => {
        if(count){
          res.status(200).json({message: "User was successfully deleted"})  
        } else {
            res.status(401).json({message:"User could not be found"})
        }
    })
    .catch(err => res.status(500).json({errorMessage: "Something went wrong"}))
})



module.exports = router;