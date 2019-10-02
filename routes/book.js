var express = require('express');
var router = express.Router();
const BookService = require("../services/bookservice");

router.get('/', async (req, res) => {

  const result = await BookService.getAllBook();

  if (result.err) {
    res.end("Nothing to show...");
    return;
  }
  return res.render("index", { "books": result.data.Items });
})

router.get('/search', async (req, res) => {
  const {year, name} = req.query;
  
  const result = await BookService.searchBook(year, name);

  if (result.err) {
    res.end("error: Nothing to show...");
    console.log('ERROR search: ', JSON.stringify(err, null, 2));
    return;
  }
  return res.render('searchbook',
    {
      "books": result.data.Items,
      "year": year,
      "name": name
    }
  );
})

router.get('/addbook', async (req, res) => {
  return res.render('addbook');
})

router.post('/addbook', async (req, res) => {
  const {name, year, type, author} = req.body;

  let result = await BookService.create(name, year, type, author);

  if(result.err){
    res.send('Unble to create book.');
    console.error("ERROR Create: ", JSON.stringify(err,null,2));
    return;
  }
  return res.redirect('./');
})

router.get('/updatebook', async (req, res) =>{
  const {name, year} = req.query;
  return res.render('updatebook',{
    'name': name,
    'year': year
  });
})

router.post('/updatebook', async (req, res) => {
  const {name, year, type, author} = req.body;
  let result = await BookService.update(name, year, type, author);

  if(result.err){
    res.send('Unble to update book');
    console.error("ERROR Update: ", JSON.stringify(err,null,2));
    return;
  }

  return res.redirect('./');
})

router.get('/deletebook', async (req, res) =>{
  const {name, year} = req.query;
  let result = await BookService.delete(name, year);

  if(result.err){
    res.send('Unble to delete book');
    console.error("ERROR Delete: ", JSON.stringify(err,null,2));
    return;
  }

  return res.redirect('./');
})

module.exports = router;
