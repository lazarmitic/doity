import Axios from "axios";

import type Task from "../models/task";

export default class TaskService {
	static async loadTasks() {
		const response = await Axios.get<Task[]>('/api/tasks');

		return response.data;
	}

	static async saveTask(task: Task) {
		await Axios.post('/api/task', task);
	}

	static async updateTask(task: Task) {
		await Axios.patch('/api/task', task);
	}

	static async deleteTask(task: Task) {
		await Axios.delete('/api/task', {
			data: task
		});
	}
}
