<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';

	let { data } = $props();
	let phase = $state<'working' | 'not_registered'>('working');

	onMount(() => {
		if (data.error) {
			phase = 'not_registered';
			return;
		}
		signIn('gofreeil-sso', { callbackUrl: data.returnTo || '/' });
	});
</script>

<svelte:head><title>מתחבר…</title><meta name="robots" content="noindex" /></svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-12" dir="rtl">
	<div class="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-8 text-center shadow-2xl">
		{#if phase === 'working'}
			<div class="mb-4 text-5xl">🕊️</div>
			<h1 class="mb-2 text-2xl font-black text-white">מזהה אותך...</h1>
			<p class="text-sm text-gray-400">רק רגע, מתחברים דרך יוצאים לחירות</p>
		{:else}
			<div class="mb-4 text-5xl">🔒</div>
			<h1 class="mb-2 text-2xl font-black text-yellow-300">עדיין אין לכם חשבון</h1>
			<p class="mb-6 text-sm leading-relaxed text-gray-400">
				לא מצאנו אתכם ברשימת המשתמשים של יוצאים לחירות. ההרשמה לוקחת דקה, ומשם אתם מזוהים בכל אתרי הרשת — בלי להירשם שוב.
			</p>
			<div class="flex flex-col gap-2.5">
				<a href="/register" class="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-black text-white hover:opacity-90">✨ הרשמה לאתר</a>
				<a href="/login" class="mt-1 text-sm text-gray-400 underline hover:text-gray-200">חזרה להתחברות</a>
			</div>
		{/if}
	</div>
</div>
