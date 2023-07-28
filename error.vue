<script setup>
defineProps({
	error: {
		type: Object,
		default: () => ({}),
	},
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
	<main
		class="prose flex h-full min-h-screen w-full max-w-none flex-col items-center bg-gray-100 p-12"
	>
		<h1>{{ error.message }}</h1>
		<button @click="handleError">Go back home</button>
	</main>
</template>
