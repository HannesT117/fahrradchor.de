<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag: 'h1' | 'h2' | 'h3';
	};

	let { children, tag = 'h2', ...rest }: Props = $props();
</script>

<svelte:element
	this={tag}
	{...rest}
	class="mb-4 text-center text-3xl font-extralight text-cpc-900 md:text-4xl lg:text-5xl"
>
	{@render children?.()}
</svelte:element>
