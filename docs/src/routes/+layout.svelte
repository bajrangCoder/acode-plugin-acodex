<script>
	import '../app.css';
	import { Header, Footer } from '../components';
</script>

<svelte:head>
	<title>AcodeX - Terminal</title>
	<meta name="description" content="A full-fledged terminal plugin for Acode App" />
	<meta
		name="keywords"
		content="acodex, acode terminal, terminal, plugin, gui, image rendering, ai powered"
	/>
	<meta name="author" content="Raunak Raj" />
	<meta property="og:title" content="AcodeX" />
	<meta property="og:description" content="A full-fledged terminal plugin for Acode App" />
	<meta property="og:url" content="https://github.com/bajrangCoder/acode-plugin-acodex" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex flex-col min-h-screen">
		<Header />
		<slot />
		<Footer />
</div>
