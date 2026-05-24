<script lang="ts">
    import { page } from '$app/state';
    import {
        getProposal, getMember, formatCurrency, formatCurrencyFull,
        currentMemberId, proposalApprovalPercent, proposalStatusLabels,
        members
    } from '$lib/mockData';

    const proposal = $derived(getProposal(page.params.id));
    const proposedBy = $derived(proposal ? getMember(proposal.proposedBy) : undefined);
    const tally = $derived(proposal ? proposalApprovalPercent(proposal) : { yes: 0, no: 0, abstain: 0 });
    const myVote = $derived(proposal?.votes.find(v => v.memberId === currentMemberId));

    let newComment = $state('');
    let selectedVote = $state<'yes' | 'no' | 'abstain' | null>(null);

    function submitVote() {
        if (!selectedVote || !proposal) return;
        alert(`(מוקאפ) ההצבעה "${selectedVote === 'yes' ? 'בעד' : selectedVote === 'no' ? 'נגד' : 'נמנע'}" נשמרה`);
    }

    function submitComment() {
        if (!newComment.trim()) return;
        alert(`(מוקאפ) התגובה נוספה: "${newComment}"`);
        newComment = '';
    }

    function whoVoted(vote: 'yes' | 'no' | 'abstain') {
        return proposal?.votes.filter(v => v.vote === vote).map(v => getMember(v.memberId)).filter(Boolean) ?? [];
    }
</script>

{#if !proposal}
    <div class="text-center py-20 text-gray-400">
        <p class="text-lg">ההצעה לא נמצאה</p>
        <a href="/proposals" class="text-blue-400 hover:text-blue-300 font-bold mt-4 inline-block">→ חזור להצעות</a>
    </div>
{:else}
    <a href="/proposals" class="text-sm text-gray-400 hover:text-white mb-4 inline-block">→ חזור לכל ההצעות</a>

    <header class="mb-8 rounded-3xl bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/20 p-6 md:p-8">
        <div class="flex items-start gap-4 md:gap-6">
            <div class="text-6xl md:text-7xl" aria-hidden="true">{proposal.image}</div>
            <div class="flex-1 min-w-0">
                <div class="flex flex-wrap gap-2 mb-2">
                    <span class="text-xs px-3 py-1 rounded-full font-bold
                        {proposal.status === 'open' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30' : ''}
                        {proposal.status === 'pending' ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30' : ''}
                        {proposal.status === 'approved' ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30' : ''}
                        {proposal.status === 'rejected' ? 'bg-red-900/40 text-red-300 border border-red-500/30' : ''}">
                        {proposalStatusLabels[proposal.status]}
                    </span>
                </div>
                <h1 class="text-2xl md:text-4xl font-black text-white">{proposal.title}</h1>
                <div class="text-gray-300 mt-2">📍 {proposal.location}</div>
                <div class="text-sm text-gray-400 mt-1">
                    הוצע ע"י {proposedBy?.avatar} <strong>{proposedBy?.name}</strong> ב-{proposal.proposedAt}
                    · דדליין הצבעה: <strong class="text-amber-300">{proposal.deadline}</strong>
                </div>
            </div>
        </div>
        <p class="text-gray-200 mt-5 leading-relaxed">{proposal.description}</p>
    </header>

    <section class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">מחיר מבוקש</div>
            <div class="text-xl font-black text-white mt-1">{formatCurrencyFull(proposal.askingPrice)}</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4">
            <div class="text-xs text-gray-400">תשואה צפויה</div>
            <div class="text-xl font-black text-emerald-300 mt-1">{proposal.estimatedReturn}% שנתי</div>
        </div>
        <div class="rounded-xl bg-white/5 border border-white/10 p-4 col-span-2 md:col-span-1">
            <div class="text-xs text-gray-400">סף כניסה לחבר</div>
            <div class="text-xl font-black text-blue-300 mt-1">{formatCurrency(proposal.minInvestment)}</div>
        </div>
    </section>

    <!-- Voting -->
    <section class="mb-8 rounded-2xl bg-white/5 border border-white/10 p-5">
        <h2 class="text-xl font-bold text-white mb-4">🗳 הצבעה</h2>

        <div class="mb-5">
            <div class="flex items-center gap-2 mb-2">
                <div class="flex-1 h-4 rounded-full bg-white/10 overflow-hidden flex">
                    <div class="bg-emerald-500 flex items-center justify-center text-xs font-bold text-white" style="width: {tally.yes}%">
                        {tally.yes > 12 ? `${tally.yes}%` : ''}
                    </div>
                    <div class="bg-red-500 flex items-center justify-center text-xs font-bold text-white" style="width: {tally.no}%">
                        {tally.no > 12 ? `${tally.no}%` : ''}
                    </div>
                    <div class="bg-gray-500 flex items-center justify-center text-xs font-bold text-white" style="width: {tally.abstain}%">
                        {tally.abstain > 12 ? `${tally.abstain}%` : ''}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                    <div class="text-emerald-300 font-black">{tally.yes}%</div>
                    <div class="text-xs text-gray-400">בעד ({whoVoted('yes').length} חברים)</div>
                </div>
                <div>
                    <div class="text-red-300 font-black">{tally.no}%</div>
                    <div class="text-xs text-gray-400">נגד ({whoVoted('no').length} חברים)</div>
                </div>
                <div>
                    <div class="text-gray-300 font-black">{tally.abstain}%</div>
                    <div class="text-xs text-gray-400">נמנע ({whoVoted('abstain').length} חברים)</div>
                </div>
            </div>
        </div>

        {#if proposal.status === 'open'}
            <div class="border-t border-white/10 pt-5">
                {#if myVote}
                    <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-center">
                        <div class="text-blue-200 font-bold">
                            ✓ הצבעת: {myVote.vote === 'yes' ? 'בעד' : myVote.vote === 'no' ? 'נגד' : 'נמנע'}
                            (משקל {myVote.weight})
                        </div>
                        <button class="mt-2 text-xs text-blue-300 hover:text-blue-200 underline">שנה הצבעה</button>
                    </div>
                {:else}
                    <p class="text-sm text-gray-300 mb-3">בחר/י את עמדתך:</p>
                    <div class="grid grid-cols-3 gap-2 mb-3">
                        <button
                            onclick={() => selectedVote = 'yes'}
                            class="py-3 rounded-xl font-bold transition-all border-2
                                   {selectedVote === 'yes' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-emerald-900/20 hover:border-emerald-500/30'}"
                        >👍 בעד</button>
                        <button
                            onclick={() => selectedVote = 'no'}
                            class="py-3 rounded-xl font-bold transition-all border-2
                                   {selectedVote === 'no' ? 'bg-red-600 border-red-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-red-900/20 hover:border-red-500/30'}"
                        >👎 נגד</button>
                        <button
                            onclick={() => selectedVote = 'abstain'}
                            class="py-3 rounded-xl font-bold transition-all border-2
                                   {selectedVote === 'abstain' ? 'bg-gray-600 border-gray-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-gray-700/30 hover:border-gray-500/30'}"
                        >🤷 נמנע</button>
                    </div>
                    <button
                        onclick={submitVote}
                        disabled={!selectedVote}
                        class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    >שלח הצבעה</button>
                {/if}
            </div>
        {/if}
    </section>

    <!-- Documents -->
    {#if proposal.documents.length > 0}
        <section class="mb-8">
            <h2 class="text-xl font-bold text-white mb-3">📎 מסמכים</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                {#each proposal.documents as doc}
                    <a href={doc.url} class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span class="text-2xl">📄</span>
                        <span class="font-bold text-white">{doc.name}</span>
                        <span class="mr-auto text-blue-300 text-sm">הורד ←</span>
                    </a>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Comments -->
    <section class="mb-8">
        <h2 class="text-xl font-bold text-white mb-4">💬 דיון ({proposal.comments.length})</h2>

        <div class="rounded-2xl bg-white/5 border border-white/10 p-4 mb-4">
            <textarea
                bind:value={newComment}
                placeholder="הוסף תגובה לדיון..."
                rows="3"
                class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 resize-none"
            ></textarea>
            <div class="flex justify-end mt-2">
                <button
                    onclick={submitComment}
                    disabled={!newComment.trim()}
                    class="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >פרסם תגובה</button>
            </div>
        </div>

        <div class="space-y-3">
            {#each proposal.comments as c}
                {@const author = getMember(c.memberId)}
                <article class="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">{author?.avatar}</span>
                        <div>
                            <div class="font-bold text-white">{author?.name}</div>
                            <div class="text-xs text-gray-400">{c.createdAt}</div>
                        </div>
                    </div>
                    <p class="text-gray-200 leading-relaxed">{c.text}</p>
                </article>
            {/each}
        </div>
    </section>
{/if}
