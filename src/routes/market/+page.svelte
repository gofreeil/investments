<script lang="ts">
    import {
        marketListings, getMember, getAsset, currentMemberId,
        formatCurrency, formatCurrencyFull, memberHoldingInAsset
    } from '$lib/mockData';

    let filterType = $state<'all' | 'sell' | 'buy'>('all');

    const filtered = $derived(marketListings.filter(l => {
        if (l.status !== 'open' && l.status !== 'matched') return true;
        if (filterType === 'all') return true;
        return l.type === filterType;
    }));

    const openListings = $derived(filtered.filter(l => l.status === 'open'));
    const matchedListings = $derived(filtered.filter(l => l.status === 'matched'));
</script>

<section class="mb-6 flex items-start justify-between flex-wrap gap-4">
    <div>
        <h1 class="text-3xl font-black text-white mb-1">🔄 שוק פנימי</h1>
        <p class="text-gray-400">מסחר באחזקות בין חברי הקבוצה - מי שרוצה לצאת או להגדיל פוזיציה</p>
    </div>
    <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg">
        ➕ פרסם הצעה
    </button>
</section>

<section class="flex gap-2 mb-6">
    <button
        onclick={() => filterType = 'all'}
        class="px-4 py-2 rounded-lg text-sm font-bold transition-colors
               {filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
    >הכל</button>
    <button
        onclick={() => filterType = 'sell'}
        class="px-4 py-2 rounded-lg text-sm font-bold transition-colors
               {filterType === 'sell' ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
    >💰 הצעות מכירה</button>
    <button
        onclick={() => filterType = 'buy'}
        class="px-4 py-2 rounded-lg text-sm font-bold transition-colors
               {filterType === 'buy' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
    >📈 הצעות קנייה</button>
</section>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
    {#each openListings as listing (listing.id)}
        {@const seller = getMember(listing.memberId)}
        {@const asset = getAsset(listing.assetId)}
        {@const isMine = listing.memberId === currentMemberId}
        {@const iAmInterested = listing.interestedMemberIds.includes(currentMemberId)}
        {@const myHolding = asset ? memberHoldingInAsset(asset, currentMemberId) : undefined}
        {@const pricePer1Pct = listing.askPrice / listing.sharesPercent}
        {@const marketValue = asset ? (asset.currentValue * listing.sharesPercent / 100) : 0}
        {@const discount = marketValue > 0 ? ((marketValue - listing.askPrice) / marketValue) * 100 : 0}

        <article class="rounded-2xl border p-5 transition-all
            {listing.type === 'sell'
              ? 'bg-gradient-to-br from-red-900/15 to-orange-900/15 border-red-500/25 hover:border-red-400/40'
              : 'bg-gradient-to-br from-emerald-900/15 to-teal-900/15 border-emerald-500/25 hover:border-emerald-400/40'}">

            <div class="flex items-start justify-between gap-2 mb-3">
                <span class="text-xs px-3 py-1 rounded-full font-bold
                    {listing.type === 'sell' ? 'bg-red-500/30 text-red-200 border border-red-400/40' : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'}">
                    {listing.type === 'sell' ? '💰 מציע למכור' : '📈 מחפש לקנות'}
                </span>
                {#if isMine}
                    <span class="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold">ההצעה שלי</span>
                {/if}
            </div>

            <div class="flex items-start gap-3 mb-4">
                <div class="text-4xl">{asset?.image}</div>
                <div class="flex-1 min-w-0">
                    <a href="/assets/{asset?.id}" class="font-black text-white text-lg hover:text-blue-300">{asset?.name}</a>
                    <div class="text-xs text-gray-400">📍 {asset?.location}</div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="bg-white/5 rounded-lg p-3">
                    <div class="text-xs text-gray-400">גודל עסקה</div>
                    <div class="text-xl font-black text-white mt-0.5">{listing.sharesPercent}%</div>
                </div>
                <div class="bg-white/5 rounded-lg p-3">
                    <div class="text-xs text-gray-400">מחיר מבוקש</div>
                    <div class="text-xl font-black text-white mt-0.5">{formatCurrency(listing.askPrice)}</div>
                </div>
            </div>

            <div class="rounded-lg bg-white/5 p-3 mb-4 text-xs">
                <div class="flex justify-between text-gray-400">
                    <span>שווי שוק (הערכת קבוצה)</span>
                    <span class="font-bold text-gray-200">{formatCurrencyFull(marketValue)}</span>
                </div>
                <div class="flex justify-between mt-1">
                    <span class="text-gray-400">פער ממחיר שוק</span>
                    <span class="font-black {discount > 0 ? 'text-emerald-300' : discount < 0 ? 'text-red-300' : 'text-gray-300'}">
                        {discount > 0 ? `-${discount.toFixed(1)}% (מתחת לשוק)` : discount < 0 ? `+${(-discount).toFixed(1)}% (מעל השוק)` : 'במחיר השוק'}
                    </span>
                </div>
                <div class="flex justify-between mt-1">
                    <span class="text-gray-400">מחיר ל-1%</span>
                    <span class="font-bold text-gray-200">{formatCurrency(pricePer1Pct)}</span>
                </div>
            </div>

            <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">{seller?.avatar}</span>
                <div class="text-sm">
                    <div class="font-bold text-white">{seller?.name}</div>
                    <div class="text-xs text-gray-400">{listing.createdAt}</div>
                </div>
            </div>

            {#if listing.note}
                <blockquote class="text-sm text-gray-300 italic border-r-2 border-white/20 pr-3 mb-4">"{listing.note}"</blockquote>
            {/if}

            {#if listing.type === 'sell' && myHolding}
                <div class="text-xs text-blue-300 mb-2">💼 כבר יש לך {myHolding.sharesPercent}% בנכס זה</div>
            {/if}

            <div class="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
                <div class="text-xs text-gray-400">
                    {#if listing.interestedMemberIds.length > 0}
                        🙋 {listing.interestedMemberIds.length} מתעניינים
                    {:else}
                        אין מתעניינים עדיין
                    {/if}
                </div>
                {#if !isMine}
                    <button class="px-4 py-2 rounded-lg text-sm font-bold transition-all
                        {iAmInterested
                          ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40'
                          : listing.type === 'sell'
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'}">
                        {iAmInterested ? '✓ סימנת עניין' : listing.type === 'sell' ? '🤝 אני מעוניין/ת לקנות' : '🤝 אני יכול/ה למכור'}
                    </button>
                {:else}
                    <button class="px-4 py-2 rounded-lg text-sm font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10">
                        ⚙ ניהול
                    </button>
                {/if}
            </div>
        </article>
    {/each}
</section>

{#if matchedListings.length > 0}
    <section>
        <h2 class="text-lg font-bold text-gray-300 mb-3">✓ עסקאות בתהליך</h2>
        <div class="space-y-2">
            {#each matchedListings as listing (listing.id)}
                {@const seller = getMember(listing.memberId)}
                {@const asset = getAsset(listing.assetId)}
                <div class="rounded-xl bg-white/5 border border-emerald-500/20 p-3 flex items-center gap-3">
                    <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">מצאו התאמה</span>
                    <span class="text-2xl">{asset?.image}</span>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-white truncate">{listing.sharesPercent}% מ-{asset?.name}</div>
                        <div class="text-xs text-gray-400">{seller?.avatar} {seller?.name} · {formatCurrency(listing.askPrice)} · ממתין לחתימה</div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
{/if}
