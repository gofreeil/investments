<script lang="ts">
    import {
        calendarEvents, getMember, currentMemberId,
        eventTypeLabels, eventTypeIcons, getAsset, getProposal
    } from '$lib/mockData';

    const today = '2026-05-24';

    const upcoming = $derived([...calendarEvents]
        .filter(e => e.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date)));

    const past = $derived([...calendarEvents]
        .filter(e => e.date < today)
        .sort((a, b) => b.date.localeCompare(a.date)));

    let myRsvp = $state<Record<string, 'yes' | 'no' | 'maybe' | null>>({});

    function setRsvp(eventId: string, status: 'yes' | 'no' | 'maybe') {
        myRsvp[eventId] = status;
    }

    function getMyRsvp(eventId: string): 'yes' | 'no' | 'maybe' | null {
        if (myRsvp[eventId]) return myRsvp[eventId];
        const e = calendarEvents.find(x => x.id === eventId);
        return e?.rsvps.find(r => r.memberId === currentMemberId)?.status ?? null;
    }

    function daysUntil(date: string): number {
        return Math.ceil((new Date(date).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24));
    }

    function dayBadge(date: string) {
        const d = daysUntil(date);
        if (d === 0) return { text: 'היום', color: 'bg-red-500/30 text-red-200 border-red-400/40' };
        if (d === 1) return { text: 'מחר', color: 'bg-amber-500/30 text-amber-200 border-amber-400/40' };
        if (d <= 7) return { text: `בעוד ${d} ימים`, color: 'bg-blue-500/30 text-blue-200 border-blue-400/40' };
        return { text: `בעוד ${d} ימים`, color: 'bg-white/10 text-gray-300 border-white/20' };
    }
</script>

<section class="mb-6 flex items-start justify-between flex-wrap gap-4">
    <div>
        <h1 class="text-3xl font-black text-white mb-1">📅 יומן הקבוצה</h1>
        <p class="text-gray-400">אסיפות, ביקורי שטח, דדליינים וחתימות</p>
    </div>
    <button class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 shadow-lg">
        ➕ הוסף אירוע
    </button>
</section>

<section class="mb-10">
    <h2 class="text-lg font-bold text-gray-300 mb-3">🔜 אירועים קרובים</h2>
    {#if upcoming.length === 0}
        <p class="text-gray-400 text-sm">אין אירועים קרובים</p>
    {:else}
        <div class="space-y-3">
            {#each upcoming as event (event.id)}
                {@const author = getMember(event.memberId ?? '')}
                {@const badge = dayBadge(event.date)}
                {@const mine = getMyRsvp(event.id)}
                {@const yesCount = event.rsvps.filter(r => r.status === 'yes').length + (myRsvp[event.id] === 'yes' && !event.rsvps.find(r => r.memberId === currentMemberId) ? 1 : 0)}
                {@const linkedAsset = event.relatedAssetId ? getAsset(event.relatedAssetId) : undefined}
                {@const linkedProposal = event.relatedProposalId ? getProposal(event.relatedProposalId) : undefined}
                <article class="rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-all">
                    <div class="flex items-start gap-4 flex-wrap md:flex-nowrap">
                        <div class="flex-shrink-0 text-center min-w-[80px]">
                            <div class="text-5xl mb-1" aria-hidden="true">{eventTypeIcons[event.type]}</div>
                            <div class="text-xs font-bold text-gray-400">{eventTypeLabels[event.type]}</div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <h3 class="font-black text-white text-lg leading-tight">{event.title}</h3>
                                <span class="text-xs px-2 py-1 rounded-full font-bold border {badge.color}">
                                    {badge.text}
                                </span>
                            </div>
                            <div class="text-sm text-gray-400 mt-1">
                                📆 {event.date} בשעה {event.time} · 📍 {event.location}
                            </div>
                            <p class="text-gray-300 text-sm mt-2">{event.description}</p>

                            {#if linkedAsset}
                                <a href="/assets/{linkedAsset.id}" class="inline-flex mt-2 text-xs px-2 py-1 rounded-lg bg-blue-900/30 text-blue-300 border border-blue-500/30 hover:bg-blue-900/50">
                                    🔗 קשור לנכס: {linkedAsset.name}
                                </a>
                            {/if}
                            {#if linkedProposal}
                                <a href="/proposals/{linkedProposal.id}" class="inline-flex mt-2 text-xs px-2 py-1 rounded-lg bg-indigo-900/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/50">
                                    🔗 קשור להצעה: {linkedProposal.title}
                                </a>
                            {/if}

                            <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                                <div class="text-xs text-gray-400">
                                    <span class="text-emerald-300 font-bold">{yesCount}</span> מאשרים הגעה
                                    {#if event.rsvps.length > 0}
                                        · <span class="text-gray-500">{event.rsvps.map(r => getMember(r.memberId)?.avatar).join('')}</span>
                                    {/if}
                                </div>
                                <div class="flex gap-1">
                                    <button
                                        onclick={() => setRsvp(event.id, 'yes')}
                                        class="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all
                                               {mine === 'yes' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-emerald-900/30 hover:border-emerald-500/40'}"
                                    >✓ אגיע</button>
                                    <button
                                        onclick={() => setRsvp(event.id, 'maybe')}
                                        class="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all
                                               {mine === 'maybe' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-amber-900/30 hover:border-amber-500/40'}"
                                    >? אולי</button>
                                    <button
                                        onclick={() => setRsvp(event.id, 'no')}
                                        class="px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all
                                               {mine === 'no' ? 'bg-red-600 border-red-400 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-red-900/30 hover:border-red-500/40'}"
                                    >✗ לא</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    {/if}
</section>

{#if past.length > 0}
    <section>
        <h2 class="text-lg font-bold text-gray-300 mb-3">🕓 אירועים שעברו</h2>
        <div class="space-y-2">
            {#each past as event (event.id)}
                <div class="rounded-xl bg-white/5 border border-white/10 p-3 opacity-60">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">{eventTypeIcons[event.type]}</span>
                        <div class="flex-1 min-w-0">
                            <div class="font-bold text-gray-200 truncate">{event.title}</div>
                            <div class="text-xs text-gray-500">{event.date}</div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
{/if}
