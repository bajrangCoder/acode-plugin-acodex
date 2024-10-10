<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let content = '';

	onMount(async () => {
		const response = await fetch('/docs/getting-started.md');
		const markdown = await response.text();
		content = marked(markdown);
	});
</script>

<svelte:head>
	<title>Documentation - AcodeX</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8 gradient-text">Documentation</h1>
	<div class="prose prose-invert max-w-none">
		{@html content}
	</div>
</div>
