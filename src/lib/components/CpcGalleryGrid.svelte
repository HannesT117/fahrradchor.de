<script lang="ts">
	type Props = {
		images: any[];
		chunkSize?: number;
	};

	const { images, chunkSize = 7 }: Props = $props();

	const imageGroups = $derived.by(() => {
		return images.flatMap((x, i) =>
			i % chunkSize === 0 ? [images.slice(i, i + chunkSize)] : []
		);
	});
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
	{#each imageGroups as imageGroup}
		<div class="grid gap-4">
			{#each imageGroup as image, index}
				<enhanced:img
					class="h-auto rounded-lg object-cover"
					src={image}
				/>
			{/each}
		</div>
	{/each}
</div>
