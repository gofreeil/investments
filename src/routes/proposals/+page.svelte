<script lang="ts">
    import {
        proposals, getMember, formatCurrency, currentMemberId,
        proposalApprovalPercent, proposalStatusLabels, type ProposalStatus
    } from '$lib/mockData';

    let filterStatus = $state<ProposalStatus | ''>('');

    const filtered = $derived(proposals.filter(p => !filterStatus || p.status === filterStatus));

    function daysLeft(deadline: string): number {
        const ms = new Date(deadline).getTime() - new Date('2026-05-24').getTime();
        return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    }
</script>

<section class="mb-6 flex items-start justify-between flex-wrap gap-4">
    <div>
        <h1 class="text-3xl font-black text-white mb-1">💡 הצעות השקעה</h1>
        <p class="text-gray-400">הצעות פתוחות להצבעה ולדיון</p>
    </div>
    <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg">
        ➕ הוסף הצעה חדשה
    </button>
</section>

<section class="flex gap-2 flex-wrap mb-6">
    <button
        onclick={() => filterStatus = ''}
        class="px-3 py-1.5 rounded-lg text-sm font-bold transition-colors
               {filterStatus === '' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
    >הכל</button>
    {#each Object.entries(proposalStatusLabels) as [key, label]}
        <button
            onclick={() => filterStatus = key as ProposalStatus}
            class="px-3 py-1.5 rounded-lg text-sm font-bold transition-colors
                   {filterStatus === key ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}"
        >{label}</button>
    {/each}
</section>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {#each filtered as p (p.id)}
        {@const tally = proposalApprovalPercent(p)}
        {@const myVote = p.votes.find(v => v.memberId === currentMemberId)}
        {@const proposedBy = getMember(p.proposedBy)}
        {@const days = daysLeft(p.deadline)}
        <a
            href="/proposals/{p.id}"
            class="block rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/25 transition-all"
        >
            <div class="flex items-start gap-4">
                <div class="text-5xl" aria-hidden="true">{p.image}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2 mb-1">
                        <h3 class="font-black text-white text-lg leading-tight">{p.title}</h3>
                        <span class="text-xs flex-shrink-0 px-2 py-0.5 rounded-full font-bold
                            {p.status === 'open' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30' : ''}
                            {p.status === 'pending' ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30' : ''}
                            {p.status === 'approved' ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30' : ''}
                            {p.status === 'rejected' ? 'bg-red-900/40 text-red-300 border border-red-500/30' : ''}">
                            {proposalStatusLabels[p.status]}
                        </span>
                    </div>
                    <div class="text-xs text-gray-400">
                        הוצע ע"י {proposedBy?.avatar} {proposedBy?.name} · {p.proposedAt}
                    </div>
                    <p class="text-sm text-gray-300 mt-2 line-clamp-2">{p.description}</p>

                    <div class="grid grid-cols-3 gap-2 mt-3 text-center">
                        <div class="bg-white/5 rounded-lg p-2">
                            <div class="text-xs text-gray-400">מחיר</div>
                            <div class="text-sm font-black text-white">{formatCurrency(p.askingPrice)}</div>
                        </div>
                        <div class="bg-white/5 rounded-lg p-2">
                            <div class="text-xs text-gray-400">תשואה</div>
                            <div class="text-sm font-black text-emerald-300">{p.estimatedReturn}%</div>
                        </div>
                        <div class="bg-white/5 rounded-lg p-2">
                            <div class="text-xs text-gray-400">סף כניסה</div>
                            <div class="text-sm font-black text-blue-300">{formatCurrency(p.minInvestment)}</div>
                        </div>
                    </div>

                    {#if p.status === 'open'}
                        <div class="mt-4">
                            <div class="flex items-center gap-2 mb-1.5">
                                <div class="flex-1 h-2 rounded-full bg-white/10 overflow-hidden flex">
                                    <div class="bg-emerald-500" style="width: {tally.yes}%"></div>
                                    <div class="bg-red-500" style="width: {tally.no}%"></div>
                                    <div class="bg-gray-500" style="width: {tally.abstain}%"></div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between text-xs">
                                <div class="flex gap-3">
                                    <span class="text-emerald-300 font-bold">בעד {tally.yes}%</span>
                                    <span class="text-red-300 font-bold">נגד {tally.no}%</span>
                                    <span class="text-gray-400">נמנע {tally.abstain}%</span>
                                </div>
                                <span class="text-amber-300 font-bold">⏱ {days} ימים</span>
                            </div>
                            <div class="mt-2 text-xs">
                                {#if myVote}
                                    <span class="text-blue-300">✓ הצבעת: {myVote.vote === 'yes' ? 'בעד' : myVote.vote === 'no' ? 'נגד' : 'נמנע'}</span>
                                {:else}
                                    <span class="text-amber-300">⚠ טרם הצבעת</span>
                                {/if}
                            </div>
                        </div>
                    {/if}

                    <div class="mt-3 flex items-center gap-3 text-xs text-gray-400">
                        <span>💬 {p.comments.length} תגובות</span>
                        <span>📎 {p.documents.length} מסמכים</span>
                    </div>
                </div>
            </div>
        </a>
    {/each}
</section>
