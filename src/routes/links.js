const express= require('express');
const router = express.Router();

//ESTA ES LA CONEXION A LA BASE DE DATOS
const pool=require('../database');

//get-> pide los datos al server
router.get('/add',(req,res)=>{
    res.render('links/add');
});


//post->envia datos al server
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.redirect('/links');
});

router.get('/',async(req,res)=>{
    const links =await pool.query('SELECT *FROM links');
    console.log(links);
    res.render('links/list',{links});
});

router.get('/delete/:id',async(req,res)=>{
   // console.log(req.params.id);
    //res.send('DELETE');
    const{id}= req.params;
   await pool.query('DELETE FROM links WHERE ID= ?',[id]);
   res.redirect('/links');

});



module.exports= router;