const express= require ('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require ('path');
//inicializaciones 
const app= express();

//configuraciones 
app.set('port',process.env.PORT ||4000 );
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine','.hbs');

//middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales 
app.use((req,res,next)=>{
    next();
});


//rutas del servidor 
app.use(require('./routes/index'));



//archivos publicos 


//starting server 
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
