//ASI SE REQUIRE EXPRESS
const express= require ('express');
//ESTE ARCHIVO MORGAN SIRVE PARA SABEER QUE TIPO DE PETICIONES HTTP SE ESTAN HACIENDO
const morgan= require('morgan');
//ESTE MODULO SIRVE O ES EL MOTOR DE PLANTILLAS 
const exphbs= require('express-handlebars');
//ESTO ES PARA LAS DIRECCIONES DE LOS ARCHIVOS
const path= require ('path');
//inicializaciones 
const app= express();

//configuraciones 
app.set('port',process.env.PORT ||4000 ); //ESTE ES EL PUERTO
app.set('views',path.join(__dirname,'views'));//DIRECCION DONDE ESTAN LOS ARCHIVOS FRONT
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
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));




//archivos publicos 
app.use(express.static(path.join(__dirname,'public')));


//starting server 
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
