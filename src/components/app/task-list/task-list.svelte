<script lang="ts">
	// Components
	import TaskListItem from './task-list-item/task-list-item.svelte';

	// Models
	import type Task from 'models/task';

	// Store
	import { tasks } from 'store/task-store';

	// Service
	import TaskService from 'services/task-service';

	let taskList: Task[];

	tasks.subscribe((value) => {
		taskList = value;
	});

	async function loadTasks() {
		taskList = await TaskService.loadTasks();

		tasks.update(() => {
			return taskList;
		});
	}
	loadTasks();
</script>

<div class='mt-10'>
	{#each taskList as task}
		<TaskListItem task={task} />
	{/each}
</div>
