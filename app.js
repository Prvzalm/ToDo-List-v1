const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')

const app = express();

let items = ["Wake Up", "Check the Mails","Eat the Breakfast"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {

    const day = date.getDate();
    
    res.render('list', {listTitle: day, addedItems: items})

})

app.post('/', (req,res) => {

    let listItem = req.body.newItem;

    if (req.body.list==='Work'){
        workItems.push(listItem)
        res.redirect('/work')
    } else {
        items.push(listItem)
        res.redirect('/')
    }
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", addedItems: workItems});
})

app.post('/work', (req,res) => {
    let listItem = req.body.newItem;
    workItems.push(listItem);
    res.redirect('/work');
})

const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log(`Server has started on ${Port}`));