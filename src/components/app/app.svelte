<script lang="ts">
	import './tailwind.svelte';

	import CreateTask from './create-task/create-task.svelte';
	import TaskList from './task-list/task-list.svelte';
</script>

<div class='dark font-mono bg-gray-700 h-screen'>
	<div class='dark:bg-gray-700 max-w-full'>
		<h3 class='dark:text-gray-100 text-2xl font-thin p-2'>
			Doity
		</h3>

		<CreateTask />
		<TaskList />
	</div>
</div>
