const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();


const database =
{
	users:
	[

	]
};
	
app.use(bodyParser.json());
app.use(cors());



app.get('/',(req,res) =>
{
	res.send(database.users);
})


app.post('/register',(req,res) =>
{
	const {name,email,password} = req.body;

	if(name != '' || email != '' || password != '') res.json('failed to register');
	database.users.push(
	{
		id: ''+database.users.length,
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined : new Date(),
	})
	res.json('success');
})


app.get('/profile/:id', (req,res)=>
{
	const {id} = req.params;
	let found = false;

	database.users.forEach(user =>
	{
		if(id === user.id)
		{
			found = true;
			return res.json(user);
		}
	})
	if(!found) res.status(404).json('no such user');
})



app.put('/image', (req,res)=>
{
	const {id} = req.body;
	let found = false;

	database.users.forEach(user =>
	{
		if(id === user.id)
		{
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found) res.status(404).json('no such user');
})




app.post('/signin',(req,res) =>
{
	const {email,password} = req.body;
	let found = false;

	database.users.forEach(user =>
	{
		if(email === user.email && password === user.password)
		{
			found = true;
			return res.json('success');
		}
	})
	if(!found) res.status(404).json('no such user');
})



app.listen(3000, () =>
{
	console.log("Node is running");
})