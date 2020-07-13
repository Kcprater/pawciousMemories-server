const express = require('express');
const router = express.Router();
const MemModel = require('../db').import('../models/memory.js')
const multer = require('multer');

// CHANGE FILENAME
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// NOT ALLOW FILES THAT AREN'T JPEG OR PNG
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    dest: '/tmp/', //SET FOLDER DESTINATION
    limits: { // SET FILE SIZE LIMIT
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter //CALL FILE FILTER
});

// POST A MEMORY
router.post('/memory', upload.single('file'), (req, res) => {
    if(req.file) {
        let file = req.file;

        const memFromReq = {
            file: file.path,
            memory: req.body.memory,
            pet: req.body.pet,
            owner: req.user.id
        }

        MemModel.create(memFromReq) 
        .then(img => res.status(200).json(img))
        .catch(err => res.json({
            error: err
        }))

    } else {
        const memFromReq = {
            memory: req.body.memory,
            pet: req.body.pet,
            owner: req.user.id
        }
        
        MemModel.create(memFromReq) 
            .then(img => res.status(200).json(img))
            .catch(err => res.json({
                error: err
            }))
    }
  })

// DELETE A MEMORY
router.delete('/memory/:id', (req, res) => {
    MemModel.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(mem => res.status(200).json(mem))
    .catch(err => res.json({
        error: err
    }))
});

// UPDATE A MEMORY
router.put('/memory/:id', upload.single('file'), (req, res) => {
    const updateReq = {
        file: req.file.path,
        memory: req.body.memory,
        pet: req.body.pet,
        owner: req.user.id
    }

    MemModel.update(updateReq, {
        where: {
            id: req.params.id
        }
    })
    .then(mem => res.status(200).json(mem))
    .catch(err => res.json(err))
})

// GET A MEMORY BY ID
router.get('/memory/:id', (req, res) => {
    MemModel.findOne({
        where: {
            id: req.params.id
        }
})
    .then(mem => res.status(200).json(mem))
    .catch(err => res.status(500).json({
        error: err
    }))
})

// GET ALL MEMORIES FOR AN INDIVIDUAL USER
router.get('/memory', (req, res) => {
    MemModel.findAll({
        where: { owner: req.user.id }
    })
        .then(mem => res.status(200).json(mem))
        .catch(err => res.status(500).json({
            error: err
        }))
});


module.exports = router;