<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		imagePosition?: 'left' | 'right';
		children?: Snippet;
	};

	const { imagePosition = 'left', children }: Props = $props();
</script>

<div class={imagePosition === 'right' ? 'md:flex md:flex-row-reverse gap-6' : 'relative'}>
	{#if children}
		{@render children()}
	{/if}
</div>
