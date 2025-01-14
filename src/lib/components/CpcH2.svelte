<script lang="ts">
	import type { HTMLAttributes  } from "svelte/elements";
    type Props = HTMLAttributes<HTMLHeadingElement> & {
        tag: 'h1' | 'h2' | 'h3'
    }

    let { children, tag = 'h2', ...rest }: Props = $props();
</script>

<svelte:element {...rest} this={tag} class="mb-4 font-extralight text-center text-3xl md:text-4xl lg:text-5xl text-cpc-900">
    {@render children?.()}
</svelte:element>
