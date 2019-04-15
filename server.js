const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const methodOverride = require('method-override')
const dj         = require('./models/dj');


app.use('/assets', express.static('assets'))

// middleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))



// index route
app.get('/dj', (req, res) => {
    // res.send(dj);
    res.render('index.ejs', {dj:dj})
})

// create route
app.post('/dj', (req, res) => {
    dj.push(req.body);
    res.redirect('/dj');
})

app.get('/dj/new', (req, res) => {
    res.render('new.ejs')
    res.redirect('/dj')
})

// delete route
app.delete('/dj/:id', (req, res) => {
    dj.splice(req.params.id, 1);
    res.redirect('/dj');
})

// edit route
app.get('/dj/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        dj: dj[req.params.id],
        id: req.params.id
    })
})


// show route
app.get('/dj/:id', (req, res) => {
    res.render('show.ejs', {
        dj: dj[req.params.id],
        index: req.params.id
    })
})





app.listen(3000, (err) => {
    console.log(err || 'Dj app listening on port: ', 3000);
});


