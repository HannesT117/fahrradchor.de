<script>
    let { children, tag = 'h2' } = $props();
</script>

<svelte:element this={tag} class="mb-4 font-extralight text-center text-3xl md:text-4xl lg:text-5xl text-cpc-900">
    {@render children()}
</svelte:element>
