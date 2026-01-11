<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children?: Snippet;
	};

	const { title, children }: Props = $props();
</script>

<div>
	<h3 class="mb-4 text-3xl">{title}</h3>
	{#if children}
		{@render children()}
	{/if}
</div>
