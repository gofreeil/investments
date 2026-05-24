<script lang="ts">
    import {
        members, assets, formatCurrency, currentMemberId,
        totalPortfolioValue, totalInvested, memberHoldingInAsset
    } from '$lib/mockData';

    const totalShares = members.reduce((s, m) => s + m.totalShares, 0);
</script>

<section class="mb-6">
    <h1 class="text-3xl font-black text-white mb-1">👥 חברי הקבוצה</h1>
    <p class="text-gray-400">{members.length} חברים · סך {totalShares} מניות בקבוצה</p>
</section>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each [...members].sort((a, b) => b.totalShares - a.totalShares) as member (member.id)}
        {@const myAssetCount = assets.filter(a => memberHoldingInAsset(a, member.id)).length}
        {@const portfolio = totalPortfolioValue(member.id)}
        {@const invested = totalInvested(member.id)}
        {@const sharesPct = (member.totalShares / totalShares) * 100}
        <article class="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-all">
            <div class="flex items-start gap-3 mb-4">
                <div class="text-5xl">{member.avatar}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <h3 class="font-black text-white text-lg">{member.name}</h3>
                        {#if member.id === currentMemberId}
                            <span class="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">אני</span>
                        {/if}
                    </div>
                    <div class="text-xs text-gray-400 truncate">{member.email}</div>
                    <div class="text-xs text-gray-500 mt-0.5">חבר/ה מ-{member.joinedAt}</div>
                </div>
            </div>

            <div class="mb-3">
                <div class="flex items-center justify-between text-xs mb-1">
                    <span class="text-gray-400">נתח בקבוצה</span>
                    <span class="text-amber-300 font-bold">{member.totalShares} מניות ({sharesPct.toFixed(1)}%)</span>
                </div>
                <div class="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-amber-500 to-orange-500" style="width: {sharesPct}%"></div>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-2 text-center">
                <div class="bg-white/5 rounded-lg p-2">
                    <div class="text-xs text-gray-400">נכסים</div>
                    <div class="text-sm font-black text-white">{myAssetCount}</div>
                </div>
                <div class="bg-white/5 rounded-lg p-2">
                    <div class="text-xs text-gray-400">השקעה</div>
                    <div class="text-sm font-black text-blue-300">{formatCurrency(invested)}</div>
                </div>
                <div class="bg-white/5 rounded-lg p-2">
                    <div class="text-xs text-gray-400">שווי</div>
                    <div class="text-sm font-black text-emerald-300">{formatCurrency(portfolio)}</div>
                </div>
            </div>
        </article>
    {/each}
</section>
