<script lang="ts">
    import { page } from '$app/state';
    import { currentMemberId, getMember } from '$lib/mockData';

    const me = getMember(currentMemberId)!;

    const links = [
        { href: '/', label: 'דשבורד', icon: '📊' },
        { href: '/assets', label: 'נכסים', icon: '🏢' },
        { href: '/proposals', label: 'הצעות', icon: '💡' },
        { href: '/members', label: 'חברים', icon: '👥' }
    ];

    let mobileOpen = $state(false);

    function isActive(href: string) {
        if (href === '/') return page.url.pathname === '/';
        return page.url.pathname.startsWith(href);
    }
</script>

<header class="sticky top-0 z-50 bg-[#0b1220]/90 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <a href="/" class="flex items-center gap-2 font-black text-white text-lg">
            <span class="text-2xl" aria-hidden="true">🤝</span>
            <span class="hidden sm:inline">קבוצת המשקיעים</span>
        </a>

        <nav class="hidden md:flex items-center gap-1" aria-label="ניווט ראשי">
            {#each links as link}
                <a
                    href={link.href}
                    class="px-4 py-2 rounded-xl text-sm font-bold transition-all
                           {isActive(link.href)
                             ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40'
                             : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'}"
                >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                </a>
            {/each}
        </nav>

        <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span class="text-xl" aria-hidden="true">{me.avatar}</span>
                <div class="text-right leading-tight">
                    <div class="text-xs text-gray-400">מחובר/ת</div>
                    <div class="text-sm font-bold text-white">{me.name}</div>
                </div>
            </div>
            <button
                class="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
                onclick={() => mobileOpen = !mobileOpen}
                aria-label="תפריט"
            >
                {mobileOpen ? '✕' : '☰'}
            </button>
        </div>
    </div>

    {#if mobileOpen}
        <nav class="md:hidden border-t border-white/10 px-4 py-2" aria-label="ניווט נייד">
            {#each links as link}
                <a
                    href={link.href}
                    onclick={() => mobileOpen = false}
                    class="block px-4 py-3 rounded-xl text-sm font-bold transition-all
                           {isActive(link.href)
                             ? 'bg-blue-600/30 text-blue-200'
                             : 'text-gray-300 hover:bg-white/5'}"
                >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                </a>
            {/each}
        </nav>
    {/if}
</header>
