<script lang="ts">
	import type Task from "../../../../models/task";

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
	}

	div {
		display: flex;
		align-items: center;
	}

	button {
		margin-left: 5px;
	}

	.finished-task {
		color: cornflowerblue;
	}
</style>

<div>
	<p class:finished-task={task.completed}>{task.name}</p>
	{#if !task.completed}
		<button on:click={markAsCompleted}>
			Mark as completed
		</button>
	{:else}
		<button on:click={markAsNotCompleted}>
			Mark as not completed
		</button>
	{/if}
	<button on:click={onDelete}>
		Delete
	</button>
</div>
