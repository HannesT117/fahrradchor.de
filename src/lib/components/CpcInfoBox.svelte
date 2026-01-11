<script lang="ts">
	import CpcButtonLink from './CpcButtonLink.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		link?: string;
		linkText?: string;
		children?: Snippet;
	};

	const { title, link, linkText, children }: Props = $props();
</script>

<div>
	<h4 class="mb-2 text-xl">{title}</h4>
	{#if children}
		{@render children()}
	{/if}
	{#if link && linkText}
		<CpcButtonLink href={link}>{linkText}</CpcButtonLink>
	{/if}
</div>
