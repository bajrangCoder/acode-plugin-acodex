<script lang="ts">
	import { Header, Footer } from '../../components';
</script>

	<div class="flex-grow flex">
		<aside class="w-64 bg-gray-800 p-4">
			<nav>
				<ul class="space-y-2">
					<li><a href="/docs" class="text-gray-300 hover:text-white">Getting Started</a></li>
					<li><a href="/docs/features" class="text-gray-300 hover:text-white">Features</a></li>
					<li>
						<a href="/docs/configuration" class="text-gray-300 hover:text-white">Configuration</a>
					</li>
					<li><a href="/docs/api" class="text-gray-300 hover:text-white">API</a></li>
				</ul>
			</nav>
		</aside>
		<main class="flex-grow bg-gray-900 p-8">
			<slot />
		</main>
	</div>
