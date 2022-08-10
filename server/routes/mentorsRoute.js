import express from 'express';
const router = express.Router();


router.get('/', (req, res)=>{
    res.send({
        msg: 'Mentors route.'
    });
});


export default router;