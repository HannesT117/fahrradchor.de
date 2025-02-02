<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		before?: Date;
		after?: Date;
		children: Snippet;
	};

	const { children, before, after }: Props = $props();
	const now = new Date();
	const showBefore = !before || now < before;
	const showAfter = !after || now > after;
	const show = showBefore && showAfter;
</script>

{#if show}
	{@render children?.()}
{/if}
