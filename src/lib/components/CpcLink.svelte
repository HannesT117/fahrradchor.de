<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		target?: string;
		children?: Snippet;
	};

	const { href, target = "_blank", children }: Props = $props();
</script>

<a href={href} target={target} class="text-cpc-900 hover:text-cpcAnalog-500 hover:underline">
    {#if children}
		{@render children()}
	{/if}
</a>
