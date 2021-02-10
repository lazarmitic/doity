<script lang="ts">
	import Button from './../../ui-elements/button.svelte';

	import Task from 'models/task';

	import TaskService from './../../../services/task-service';

	import { tasks } from './../../../store/task-store';

	let taskName: string = '';

	async function createTask() {
		if (!taskName) {
			return;
		}

		const task = new Task(taskName);

		tasks.update((tasks) => {
			return [
				...tasks,
				task
			];
		});
		taskName = '';

		await TaskService.saveTask(task);
	}
</script>

<div class='flex flex-col items-center'>
	<input placeholder='Enter task name' class='w-96 bg-gray-600 text-gray-200 outline-none p-1 mb-2' type='text' bind:value={taskName} />
	<Button label='Create Task' onClick={createTask} />
</div>
