<script lang="ts">
	// Components
	import Button from 'components/ui-elements/button.svelte';
	import Dialog from 'components/ui-elements/dialog.svelte';
	import DialogTitle from 'components/ui-elements/dialog-title.svelte';
	import DialogContent from 'components/ui-elements/dialog-content.svelte';
	import DialogActions from 'components/ui-elements/dialog-actions.svelte';

	// Models
	import Task from 'models/task';

	// Services
	import TaskService from 'services/task-service';

	// Store
	import { tasks } from 'store/task-store';

	let taskName: string = '';
	let taskEstimate: number;
	let dialogOpen: boolean = false;

	async function createTask() {
		if (!taskName) {
			return;
		}

		const task = new Task(taskName, taskEstimate);

		tasks.update((tasks) => {
			return [
				...tasks,
				task
			];
		});
		taskName = '';
		dialogOpen = false;

		await TaskService.saveTask(task);
	}

	function openDialog() {
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
	}
</script>

<div class='flex flex-col items-center'>
	<Button label='Create Task' onClick={openDialog} />
	{#if dialogOpen}
		<Dialog open={dialogOpen} onClose={closeDialog}>
			<DialogTitle>
				Create new task
			</DialogTitle>
			<DialogContent>
				<input placeholder='Enter task name' class='w-96 bg-gray-600 text-gray-200 outline-none p-1 mb-2' type='text' bind:value={taskName} />
				<input placeholder='Enter task estimate' class='w-96 bg-gray-600 text-gray-200 outline-none p-1 mb-2' type='number' bind:value={taskEstimate} />
			</DialogContent>
			<DialogActions>
				<Button label='Close' onClick={closeDialog} />
				<Button label='Create' onClick={createTask} />
			</DialogActions>
		</Dialog>
	{/if}
</div>
