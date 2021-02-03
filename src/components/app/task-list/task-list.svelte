<script lang="ts">
	import TaskListItem from './task-list-item/task-list-item.svelte';

	import type Task from './../../../models/task';

	import { tasks } from './../../../store/task-store';

	import TaskService from '../../../services/task-service';

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

<div>
	{#each taskList as task}
		<TaskListItem task={task} />
	{/each}
</div>
