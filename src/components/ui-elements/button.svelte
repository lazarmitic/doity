<script lang="ts">
	export let onClick: () => void;
	export let label: string = '';
</script>

<button class='dark:text-gray-200 bg-gray-600 pt-2 pb-2 pl-3 pr-3' on:click={onClick}>
	{label}
</button>

