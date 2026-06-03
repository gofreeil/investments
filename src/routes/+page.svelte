<script lang="ts">
    import {
        assets, proposals, members, currentMemberId, getMember,
        formatCurrency, totalPortfolioValue, totalMonthlyIncome,
        totalInvested, memberHoldingInAsset, assetStatusLabels,
        proposalApprovalPercent, activities, calendarEvents,
        eventTypeIcons
    } from '$lib/mockData';

    const today = '2026-05-24';
    const nextEvent = [...calendarEvents]
        .filter(e => e.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date))[0];
    const recentActivities = [...activities]
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        .slice(0, 6);

    const me = getMember(currentMemberId)!;
    const myPortfolio = totalPortfolioValue(currentMemberId);
    const myIncome = totalMonthlyIncome(currentMemberId);
    const myInvested = totalInvested(currentMemberId);
    const myReturn = myInvested > 0 ? ((myPortfolio - myInvested) / myInvested) * 100 : 0;

    const myAssets = assets.filter(a => memberHoldingInAsset(a, currentMemberId));
    const openProposals = proposals.filter(p => p.status === 'open');

    const totalGroupValue = assets.reduce((s, a) => s + a.currentValue, 0);
    const totalGroupIncome = assets.reduce((s, a) => s + a.monthlyIncome, 0);
</script>

<section class="mb-8 flex items-start justify-between gap-4 flex-wrap">
    <div>
        <h1 class="text-3xl md:text-4xl font-black text-white">
            שלום, {me.name.split(' ')[0]} {me.avatar}
        </h1>
        <p class="text-gray-400 mt-1">ברוך/ה הבא/ה לפלטפורמת קבוצת המשקיעים</p>
    </div>
    {#if nextEvent}
        <a
            href="/calendar"
            class="rounded-2xl bg-gradient-to-l from-amber-900/30 to-orange-900/20 border border-amber-500/30 px-4 py-3 hover:border-amber-400/50 transition-all max-w-sm"
        >
            <div class="text-xs text-amber-300 font-bold mb-1">📅 האירוע הקרוב</div>
            <div class="flex items-center gap-2">
                <span class="text-2xl">{eventTypeIcons[nextEvent.type]}</span>
                <div class="min-w-0">
                    <div class="font-bold text-white truncate">{nextEvent.title}</div>
                    <div class="text-xs text-gray-400">{nextEvent.date} · {nextEvent.time}</div>
                </div>
            </div>
        </a>
    {/if}
</section>

<section class="mb-10" aria-label="הסטטיסטיקות שלי">
    <h2 class="text-lg font-bold text-gray-300 mb-3">💼 התיק שלי</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div class="rounded-2xl bg-gradient-to-br from-blue-900/40 to-blue-700/20 border border-blue-500/30 p-4">
            <div class="text-xs text-blue-300 font-bold mb-1">שווי תיק נוכחי</div>
            <div class="text-2xl md:text-3xl font-black text-white">{formatCurrency(myPortfolio)}</div>
        </div>
        <div class="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 border border-emerald-500/30 p-4">
            <div class="text-xs text-emerald-300 font-bold mb-1">הכנסה חודשית</div>
            <div class="text-2xl md:text-3xl font-black text-white">{formatCurrency(myIncome)}</div>
        </div>
        <div class="rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-700/20 border border-purple-500/30 p-4">
            <div class="text-xs text-purple-300 font-bold mb-1">סך השקעה</div>
            <div class="text-2xl md:text-3xl font-black text-white">{formatCurrency(myInvested)}</div>
        </div>
        <div class="rounded-2xl bg-gradient-to-br from-amber-900/40 to-amber-700/20 border border-amber-500/30 p-4">
            <div class="text-xs text-amber-300 font-bold mb-1">תשואה</div>
            <div class="text-2xl md:text-3xl font-black {myReturn >= 0 ? 'text-emerald-300' : 'text-red-300'}">
                {myReturn >= 0 ? '+' : ''}{myReturn.toFixed(1)}%
            </div>
        </div>
    </div>
</section>

<section class="mb-10" aria-label="סטטיסטיקת קבוצה">
    <h2 class="text-lg font-bold text-gray-300 mb-3">👥 סטטיסטיקות הקבוצה</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
            <div class="text-2xl font-black text-white">{assets.length}</div>
            <div class="text-xs text-gray-400 mt-1">נכסים פעילים</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
            <div class="text-2xl font-black text-white">{members.length}</div>
            <div class="text-xs text-gray-400 mt-1">חברים</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
            <div class="text-2xl font-black text-white">{formatCurrency(totalGroupValue)}</div>
            <div class="text-xs text-gray-400 mt-1">שווי קבוצתי</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
            <div class="text-2xl font-black text-white">{formatCurrency(totalGroupIncome)}</div>
            <div class="text-xs text-gray-400 mt-1">הכנסה חודשית</div>
        </div>
    </div>
</section>

<section class="mb-10">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white">🏢 הנכסים שלי</h2>
        <a href="/assets" class="text-sm text-blue-400 hover:text-blue-300 font-bold">הכל ←</a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each myAssets as asset (asset.id)}
            {@const h = memberHoldingInAsset(asset, currentMemberId)!}
            <a
                href="/assets/{asset.id}"
                class="block rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/25 transition-all"
            >
                <div class="flex items-start gap-3">
                    <div class="text-4xl" aria-hidden="true">{asset.image}</div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-2">
                            <h3 class="font-bold text-white truncate">{asset.name}</h3>
                            <span class="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 flex-shrink-0">
                                {assetStatusLabels[asset.status]}
                            </span>
                        </div>
                        <div class="text-xs text-gray-400 mt-1">📍 {asset.location}</div>
                        <div class="grid grid-cols-3 gap-2 mt-3 text-center">
                            <div class="bg-white/5 rounded-lg p-2">
                                <div class="text-xs text-gray-400">אחזקה</div>
                                <div class="text-sm font-black text-amber-300">{h.sharesPercent}%</div>
                            </div>
                            <div class="bg-white/5 rounded-lg p-2">
                                <div class="text-xs text-gray-400">שווי שלי</div>
                                <div class="text-sm font-black text-blue-300">{formatCurrency(asset.currentValue * h.sharesPercent / 100)}</div>
                            </div>
                            <div class="bg-white/5 rounded-lg p-2">
                                <div class="text-xs text-gray-400">חודשי</div>
                                <div class="text-sm font-black text-emerald-300">{formatCurrency(asset.monthlyIncome * h.sharesPercent / 100)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</section>

<section class="mb-10">
    <h2 class="text-xl font-bold text-white mb-4">🔔 פעילות אחרונה בקבוצה</h2>
    <div class="rounded-2xl bg-white/5 border border-white/10 divide-y divide-white/5">
        {#each recentActivities as act (act.id)}
            {@const member = getMember(act.memberId)}
            <a
                href={act.href ?? '#'}
                class="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
                <span class="text-2xl flex-shrink-0">{act.icon}</span>
                <span class="text-xl flex-shrink-0">{member?.avatar}</span>
                <div class="flex-1 min-w-0">
                    <div class="text-sm text-white">
                        <span class="font-bold">{member?.name}</span>
                        <span class="text-gray-300">- {act.text}</span>
                    </div>
                    <div class="text-xs text-gray-500 mt-0.5">{act.timestamp}</div>
                </div>
                <span class="text-gray-500 text-sm">←</span>
            </a>
        {/each}
    </div>
</section>

<section class="mb-10">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white">💡 הצעות פתוחות להצבעה</h2>
        <a href="/proposals" class="text-sm text-blue-400 hover:text-blue-300 font-bold">הכל ←</a>
    </div>
    {#if openProposals.length === 0}
        <p class="text-gray-400 text-sm">אין הצעות פתוחות כרגע</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each openProposals as p (p.id)}
                {@const tally = proposalApprovalPercent(p)}
                {@const myVote = p.votes.find(v => v.memberId === currentMemberId)}
                <a
                    href="/proposals/{p.id}"
                    class="block rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 p-5 hover:border-indigo-400/40 transition-all"
                >
                    <div class="flex items-start gap-3">
                        <div class="text-4xl" aria-hidden="true">{p.image}</div>
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-white">{p.title}</h3>
                            <div class="text-xs text-gray-400 mt-1">📍 {p.location} · 💰 {formatCurrency(p.askingPrice)} · 📈 {p.estimatedReturn}%</div>
                            <div class="flex items-center gap-2 mt-3">
                                <div class="flex-1 h-2 rounded-full bg-white/10 overflow-hidden flex">
                                    <div class="bg-emerald-500" style="width: {tally.yes}%"></div>
                                    <div class="bg-red-500" style="width: {tally.no}%"></div>
                                    <div class="bg-gray-500" style="width: {tally.abstain}%"></div>
                                </div>
                                <span class="text-xs text-emerald-300 font-bold">{tally.yes}% בעד</span>
                            </div>
                            <div class="mt-2 text-xs">
                                {#if myVote}
                                    <span class="text-blue-300">✓ הצבעת: {myVote.vote === 'yes' ? 'בעד' : myVote.vote === 'no' ? 'נגד' : 'נמנע'}</span>
                                {:else}
                                    <span class="text-amber-300">⚠ טרם הצבעת</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</section>
