<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};

	const { children }: Props = $props();
</script>

<p class="mb-2 leading-6">{@render children?.()}</p>
