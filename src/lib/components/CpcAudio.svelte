<script lang="ts">
	type Props = {
		src: string;
	};

	const { src }: Props = $props();
</script>

<audio class="w-full" {src} controls>Ihr Browser unterstützt keine Audiowiedergabe.</audio>
