<script lang="ts">
	import type Task from "../../../../models/task";

	import Button from './../../../ui-elements/button.svelte';

	import TaskService from './../../../../services/task-service';

	import {tasks} from './../../../../store/task-store';

	export let task: Task;

	function markAsCompleted() {
		task.completed = true;

		TaskService.updateTask(task);
	}

	function markAsNotCompleted() {
		task.completed = false;

		TaskService.updateTask(task);
	}

	function onDelete() {
		tasks.update((tasks) => {
			return tasks.filter((storeTask) => {
				return storeTask._id !== task._id;
			});
		});

		TaskService.deleteTask(task);
	}
</script>

<style>
	p {
		margin-right: 5px;
		width: 500px;
	}

	div {
		display: flex;
		align-items: center;
		width: 90%;
		margin: 5px 0px 5px 36px;
		box-sizing: border-box;
	}

	.finished-task {
		color: cornflowerblue;
	}
</style>

<div class='space-x-10'>
	<p class:finished-task={task.completed} class='dark:text-gray-200'>
		{task.name}
	</p>
	{#if !task.completed}
		<Button label='Mark as completed' onClick={markAsCompleted} />
	{:else}
		<Button label='Mark as not completed' onClick={markAsNotCompleted} />
	{/if}

	<Button label='Delete' onClick={onDelete} />
</div>
