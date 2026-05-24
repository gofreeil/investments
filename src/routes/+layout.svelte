<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { children } = $props();
</script>

<svelte:head>
    <title>קבוצת המשקיעים – ניהול השקעות משותפות</title>
    <meta name="description" content="פלטפורמת ניהול לקבוצת משקיעים: נכסים משותפים, הצעות השקעה והצבעות" />
</svelte:head>

<a href="#main" class="skip-link">דלג לתוכן הראשי</a>

<div class="min-h-screen flex flex-col">
    <Header />
    <main id="main" tabindex="-1" class="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {@render children()}
    </main>
    <Footer />
</div>
