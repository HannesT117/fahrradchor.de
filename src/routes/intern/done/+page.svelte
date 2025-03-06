<script lang="ts">
    import type { PageData } from './$types';
    
    interface Props {
		data: PageData;
	}
	const { data }: Props = $props();
</script>

<div class="flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<h1 class="text-cpc-500 mb-4 text-6xl font-bold">Vielen Dank</h1>
	<p>Deine Antwort ist gespeichert :)</p>
	<h2 class="text-cpc-900 text-center text-3xl font-extralight md:text-4xl lg:text-5xl">
		Aktuelle Stimmen
	</h2>
	<ul>
		{#each data.pieces as piece}
			<li>{piece[0]}: {piece[1]}</li>
		{/each}
	</ul>
</div>
