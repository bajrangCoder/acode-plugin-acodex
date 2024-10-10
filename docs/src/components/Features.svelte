<script lang="ts">
	const features = [
	  		{
			title: 'Personalization',
			description: "Tailor the terminal's appearance and behavior to your preferences."
		},
		{
			title: 'Extensible',
			description: "Highly pluggable for other plugins to integrate and extend functionality."
		},
		{
			title: 'Mouse/Touch Selection',
			description: "Supports selection within the terminal using mouse or touch."
		},
		{
			title: 'Beautiful Themes',
			description: "Choose from 10+ stunning themes to personalize your coding environment."
		},
		{
			title: 'AI Assistance',
			description: 'Unsure about a command? Just ask, and AI will write it for you.'
		},
		{
			title: 'Boost Productivity',
			description:
				'Execute commands directly in Acode without switching apps, saving valuable time.'
		},
		{
			title: 'Customizable Terminal Panel',
			description: 'Move, resize, minimize, or maximize the terminal panel to fit your workflow.'
		},
		{
			title: 'Intuitive Interface',
			description: 'Designed for developers of all skill levels with an easy-to-use interface.'
		},
		{
			title: 'Many more',
			description: "There are a lots of more features such as image rendering, gui app support, easy directory navigation, transparent terminal, key bindings, preloaded nerd fonts"
		},
	];
</script>

<section id="features" class="py-20">
	<div class="container mx-auto px-4">
		<h2 class="text-4xl font-bold mb-12 text-center gradient-text">💥 Features</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature}
				<div class="feature-card">
					<div class="feature-content">
						<h3 class="text-xl font-semibold mb-2 gradient-text">{feature.title}</h3>
						<p class="text-gray-300">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
