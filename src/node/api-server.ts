import mongo from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';

import Config from './../../config';

import type Task from '../models/task';

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const uri = Config.mongoConnectUrl;

const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((error) => {
	if (error) {
		console.log(error);
	}
	else {
		console.log('Connected');
	}
});

app.get('/api/tasks', async (req, res) => {
	const database = client.db('Doity');
	const taskCollection = database.collection<Task>('task');

	const cursor = taskCollection.find();

	const tasks = await cursor.toArray();

	res.send(tasks);
});

app.post<{}, {}, Task>('/api/task', async (req, res) => {
	const task = req.body;

	const database = client.db('Doity');
	const taskCollection = database.collection<Task>('task');

	await taskCollection.insertOne({
		_id: task._id,
		name: task.name,
		completed: task.completed
	});

	res.send('success');
});

app.patch<{}, {}, Task>('/api/task', async (req, res) => {
	const task = req.body;

	const database = client.db('Doity');
	const taskCollection = database.collection('task');

	const updateTask = {
		$set: {
			completed: task.completed,
		}
	};
	await taskCollection.updateOne({
		_id: task._id,
	}, updateTask);

	res.send('success');
});

app.delete<{}, {}, Task>('/api/task', async (req, res) => {
	const task = req.body;

	const database = client.db('Doity');
	const taskCollection = database.collection('task');

	await taskCollection.deleteOne({
		_id: task._id
	});

	res.send('success');
});

app.listen(3000, () => {
	console.log('Server listening on port http://localhost:3000');
});
