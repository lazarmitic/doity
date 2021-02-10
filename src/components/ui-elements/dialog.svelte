<script lang="ts">
	export let open: boolean = false;
	export let onClose: () => void;
</script>


{#if open}
	<div on:mousedown|self={onClose} id='dialog-container' class="fixed w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-80 top-0">
		<div id='dialog-surface' class='w-3/6 bg-gray-700 shadow-md'>
			<slot></slot>
		</div>
	</div>
{/if}
