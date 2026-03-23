const express = require('express');


const app = express()

const port = 2700;


app.use(express.static('public'));

app.use(express.json());

const userdata = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

app.post('/users', (req, res) => {

    const {  name, email } = req.body;

    const user = {
        id:userdata.length+1,
        name,
        email
    };

    userdata.push(user);

   

    res.status(201).json(user);

});


app.get('/users', (req, res) => {
    res.json(userdata);
});

app.put('/users/:id', (req, res) => {
    const userfilter = userdata.find(u => u.id === parseInt(req.params.id));
    if (!userfilter) return res.status(404).json({ message: 'User not found' });
    
    userfilter.name = req.body.name;
    userfilter.email = req.body.email;

    res.json(userfilter);
});


app.delete('/users/:id', (req, res) => {
    const userIndex = userdata.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    const deletedUser = userdata.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

app.listen(port, () => {
    console.log(`server listing port on  ${port}`);

})

