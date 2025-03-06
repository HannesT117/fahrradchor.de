<script lang="ts">
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	const { data, form }: Props = $props();

	if (form?.error) {
		console.error(form.error);
	}
</script>

<form method="POST" class="flex flex-col gap-5">
	{#each data.pieces as piece}
		<fieldset class="flex items-center gap-3">
			<label class="flex flex-col items-center"
				><input
					name={piece}
					type="radio"
					value="1"
					class="focus:ring-cpc-300 dark:focus:ring-cpc-300 h-4 w-4 border-gray-300 focus:ring-2"
				/>
				ja</label
			>
			<label class="flex flex-col items-center"
				><input
					name={piece}
					type="radio"
					value="0"
					class="focus:ring-cpc-300 dark:focus:ring-cpc-300 h-4 w-4 border-gray-300 focus:ring-2"
				/>
				neutral</label
			>
			<label class="flex flex-col items-center"
				><input
					name={piece}
					type="radio"
					value="-1"
					class="focus:ring-cpc-300 dark:focus:ring-cpc-300 h-4 w-4 border-gray-300 focus:ring-2"
				/>
				nein</label
			>
			<span>{piece}</span>
		</fieldset>
	{/each}
	<div class="group relative z-0 mb-5 w-full">
		<input
			type="name"
			name="name"
			class="peer focus:border-cpc-900 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none"
			placeholder=" "
			required
		/>
		<label
			for="name"
			class="peer-focus:text-cpc-900 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
			>Dein Name</label
		>
	</div>
	{#if form?.duplicate}<p class="text-red-700">
			Unter diesem Namen hat leider schon eine Person teilgenommen.
		</p>{/if}
	<button
		class="bg-cpc-500 hover:bg-cpc-900 mt-4 block w-fit rounded-sm px-4 py-2 text-gray-700 hover:text-gray-100"
		>Abschicken</button
	>
</form>
