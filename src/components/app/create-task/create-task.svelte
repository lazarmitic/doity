<script lang="ts">
	import Task from '../../../models/task';

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

<div>
	<input type='text' bind:value={taskName} />
	<button on:click={createTask}>
		Create Task
	</button>
</div>

