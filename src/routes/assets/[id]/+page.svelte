<script lang="ts">
    import { page } from '$app/state';
    import {
        getAsset, getMember, formatCurrencyFull, formatCurrency,
        assetStatusLabels, assetTypeLabels, currentMemberId, memberHoldingInAsset
    } from '$lib/mockData';

    const asset = $derived(getAsset(page.params.id));
    const myHolding = $derived(asset ? memberHoldingInAsset(asset, currentMemberId) : undefined);
    const profit = $derived(asset ? ((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100 : 0);
</script>

{#if !asset}
    <div class="text-center py-20 text-gray-400">
        <p class="text-lg">הנכס לא נמצא</p>
        <a href="/assets" class="text-blue-400 hover:text-blue-300 font-bold mt-4 inline-block">→ חזור לרשימת הנכסים</a>
    </div>
{:else}
    <a href="/assets" class="text-sm text-gray-400 hover:text-white mb-4 inline-block">→ חזור לכל הנכסים</a>

    <header class="mb-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 md:p-8">
        <div class="flex items-start gap-4 md:gap-6">
            <div class="text-6xl md:text-7xl" aria-hidden="true">{asset.image}</div>
            <div class="flex-1 min-w-0">
                <div class="flex flex-wrap gap-2 mb-2">
                    <span class="text-xs bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-bold">
                        {assetTypeLabels[asset.type]}
                    </span>
                    <span class="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full font-bold">
                        {assetStatusLabels[asset.status]}
                    </span>
                </div>
                <h1 class="text-2xl md:text-4xl font-black text-white">{asset.name}</h1>
                <div class="text-gray-400 mt-1">📍 {asset.location} · נרכש ב-{asset.purchaseDate}</div>
            </div>
        </div>
        <p class="text-gray-300 mt-5 leading-relaxed">{asset.description}</p>
        <div class="flex flex-wrap gap-2 mt-4">
            {#each asset.tags as tag}
                <span class="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded-full border border-white/10">#{tag}</span>
            {/each}
        </div>
    </header>

    <!-- Key figures -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">מחיר רכישה</div>
            <div class="text-xl font-black text-white mt-1">{formatCurrency(asset.purchasePrice)}</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">שווי נוכחי</div>
            <div class="text-xl font-black text-white mt-1">{formatCurrency(asset.currentValue)}</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">שינוי</div>
            <div class="text-xl font-black mt-1 {profit >= 0 ? 'text-emerald-300' : 'text-red-300'}">
                {profit >= 0 ? '+' : ''}{profit.toFixed(1)}%
            </div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">הכנסה חודשית</div>
            <div class="text-xl font-black text-emerald-300 mt-1">{formatCurrency(asset.monthlyIncome)}</div>
        </div>
    </section>

    {#if myHolding}
        <section class="mb-8 rounded-2xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 p-5">
            <h2 class="text-lg font-bold text-amber-200 mb-3">⭐ האחזקה שלי</h2>
            <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                    <div class="text-xs text-gray-400">אחוז</div>
                    <div class="text-2xl font-black text-amber-300">{myHolding.sharesPercent}%</div>
                </div>
                <div>
                    <div class="text-xs text-gray-400">השקעה ראשונית</div>
                    <div class="text-2xl font-black text-white">{formatCurrency(myHolding.investmentAmount)}</div>
                </div>
                <div>
                    <div class="text-xs text-gray-400">שווי נוכחי</div>
                    <div class="text-2xl font-black text-emerald-300">{formatCurrency(asset.currentValue * myHolding.sharesPercent / 100)}</div>
                </div>
            </div>
        </section>
    {/if}

    <!-- Cap table -->
    <section class="mb-8">
        <h2 class="text-xl font-bold text-white mb-4">👥 חלוקת אחזקות</h2>
        <div class="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-white/5 text-gray-400 text-xs uppercase">
                    <tr>
                        <th class="text-right p-3">חבר/ה</th>
                        <th class="text-center p-3">אחוז</th>
                        <th class="text-right p-3">השקעה ראשונית</th>
                        <th class="text-right p-3">שווי נוכחי</th>
                        <th class="text-right p-3">הכנסה חודשית</th>
                    </tr>
                </thead>
                <tbody>
                    {#each asset.holdings as h}
                        {@const member = getMember(h.memberId)}
                        <tr class="border-t border-white/5 hover:bg-white/5">
                            <td class="p-3">
                                <div class="flex items-center gap-2">
                                    <span class="text-2xl">{member?.avatar}</span>
                                    <span class="font-bold text-white">{member?.name}</span>
                                    {#if h.memberId === currentMemberId}
                                        <span class="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">אני</span>
                                    {/if}
                                </div>
                            </td>
                            <td class="text-center p-3">
                                <span class="inline-block px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full font-black">{h.sharesPercent}%</span>
                            </td>
                            <td class="p-3 text-gray-200">{formatCurrencyFull(h.investmentAmount)}</td>
                            <td class="p-3 text-white font-bold">{formatCurrency(asset.currentValue * h.sharesPercent / 100)}</td>
                            <td class="p-3 text-emerald-300">{formatCurrency(asset.monthlyIncome * h.sharesPercent / 100)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="flex flex-wrap gap-3">
        <button class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">
            📄 דוחות פיננסיים
        </button>
        <button class="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-colors">
            💬 פתח דיון
        </button>
        <button class="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-colors">
            🗳 העלה הצבעה
        </button>
    </section>
{/if}
