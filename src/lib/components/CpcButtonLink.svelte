<script lang="ts">
    type Props = {
        href: string;
    }

    const { href }: Props = $props();
</script>

<a href={href} class="block w-fit rounded bg-cpc-500 mt-4 py-2 px-4 text-gray-700 hover:bg-cpc-900 hover:text-gray-100"><slot /></a>
