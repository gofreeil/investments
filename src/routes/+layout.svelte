<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { navigating } from '$app/state';

    let { children, data } = $props();
</script>

<svelte:head>
    <title>קבוצת המשקיעים – ניהול השקעות משותפות</title>
    <meta name="description" content="פלטפורמת ניהול לקבוצת משקיעים: נכסים משותפים, הצעות השקעה והצבעות" />
</svelte:head>

<a href="#main" class="skip-link">דלג לתוכן הראשי</a>

<!-- פס התקדמות בזמן ניווט: SvelteKit נשאר על הדף הקודם עד שהחדש מוכן, ובלי סימן כלשהו הלחיצה מרגישה כאילו לא קרה כלום. הפס נדלק מיידית עם הלחיצה — משוב תוך כדי הטעינה, גם במחיר הבהוב קצר בניווט מהיר. -->
{#if navigating.to}
    <div class="nav-progress" role="status" aria-label="טוען…"></div>
{/if}

<div class="min-h-screen flex flex-col">
    <Header user={data.user} />
    <main id="main" tabindex="-1" class="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {@render children()}
    </main>
    <Footer />
</div>

<style>
    /* פס ההתקדמות של הניווט */
    .nav-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 100;
        transform-origin: left center;
        background: linear-gradient(90deg, #4f46e5, #7c3aed, #f5d57a);
        animation: nav-progress 8s cubic-bezier(0.15, 0.85, 0.25, 1) forwards;
    }
    :global(html[dir="rtl"]) .nav-progress {
        transform-origin: right center;
    }
    @keyframes nav-progress {
        0% { transform: scaleX(0.04); opacity: 1; }
        25% { transform: scaleX(0.55); }
        60% { transform: scaleX(0.82); }
        100% { transform: scaleX(0.97); opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
        .nav-progress { animation-duration: 0s; transform: scaleX(1); opacity: 1; }
    }
</style>
