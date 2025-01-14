<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	const { children, ...rest }: HTMLAnchorAttributes = $props();
</script>

<a
	{...rest}
	class="mt-4 block w-fit rounded bg-cpc-500 px-4 py-2 text-gray-700 hover:bg-cpc-900 hover:text-gray-100"
	>{@render children?.()}</a
>
