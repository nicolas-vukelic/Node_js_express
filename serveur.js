//import express from "express"
var express = require('express');
const res = require('express/lib/response');
var app= express();
var session = require('express-session');

app.use(session({
    secret : 'admin',
    resave: true,
    saveUninitialized: true
}));

//Authentification
var auth = function(req,res,next){
    if(req.session && req.session.user === 'admin' && req.session.admin)
    return next();
    else return res.sendStatuts(404);
};

app.post('/submit-form',function(req,res){
    //res.render('formulaire.ejs');
    if(!req.query.username || !req.query.password){
        res.send('authentification échouée !');
    }
    else if (req.query.username === 'admin' || req.query.password === "admin"){
        req.session.user="admin";
        req.session.admin = true;
        res.render('index.ejs');
       //res.render('index.ejs');
    }
});



// app.get('/', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Vous êtes à l\'accueil');
// });

app.get('/accueil', function(req, res) {
    res.render('index.ejs');

})

app.get('/a_propos', auth,function(req, res) {
    res.render('a_propos.ejs');

})

.get('/etage/:etagenum/chambre', function(req, res) {
    
    res.render('chambre.ejs', {etage: req.params.etagenum});
})

.get('/formulaire',function(req,res){
    res.render('formulaire.ejs');
})

.get('/download',function(req,res){
    const fichier =`${__dirname}/views/quokka.jpg`;
    res.download(fichier);
})


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');


});






app.listen(8080);