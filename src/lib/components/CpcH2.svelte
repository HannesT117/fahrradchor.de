<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: 'h1' | 'h2' | 'h3';
		align?: 'center' | 'left';
	};

	let { children, tag = 'h2', align = 'center', ...rest }: Props = $props();
</script>

<svelte:element
	this={tag}
	{...rest}
	class="mb-8 text-{align} text-cpc-900 text-3xl font-extralight md:text-4xl lg:text-5xl"
>
	{@render children?.()}
</svelte:element>
