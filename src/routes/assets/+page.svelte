<script lang="ts">
    import {
        assets, currentMemberId, formatCurrency, memberHoldingInAsset,
        assetStatusLabels, assetTypeLabels, type AssetType, type AssetStatus
    } from '$lib/mockData';

    let filterType = $state<AssetType | ''>('');
    let filterStatus = $state<AssetStatus | ''>('');
    let onlyMine = $state(false);

    const filtered = $derived(assets.filter(a => {
        if (filterType && a.type !== filterType) return false;
        if (filterStatus && a.status !== filterStatus) return false;
        if (onlyMine && !memberHoldingInAsset(a, currentMemberId)) return false;
        return true;
    }));
</script>

<section class="mb-6">
    <h1 class="text-3xl font-black text-white mb-1">🏢 נכסי הקבוצה</h1>
    <p class="text-gray-400">כל הנכסים שהקבוצה מחזיקה בהם</p>
</section>

<section class="flex gap-2 flex-wrap mb-6">
    <select bind:value={filterType} class="rounded-xl bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
        <option value="">כל הסוגים</option>
        <option value="real-estate">נדל"ן</option>
        <option value="business">עסקים</option>
        <option value="other">אחר</option>
    </select>
    <select bind:value={filterStatus} class="rounded-xl bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
        <option value="">כל הסטטוסים</option>
        <option value="active">פעיל</option>
        <option value="pending">בתהליך</option>
        <option value="sold">נמכר</option>
    </select>
    <label class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 cursor-pointer">
        <input type="checkbox" bind:checked={onlyMine} class="accent-blue-500" />
        רק שלי
    </label>
    <div class="ml-auto text-sm text-gray-400 self-center">
        {filtered.length} נכסים
    </div>
</section>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filtered as asset (asset.id)}
        {@const h = memberHoldingInAsset(asset, currentMemberId)}
        {@const profit = ((asset.currentValue - asset.purchasePrice) / asset.purchasePrice) * 100}
        <a
            href="/assets/{asset.id}"
            class="block rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 hover:border-white/25 transition-all"
        >
            <div class="flex items-start justify-between mb-3">
                <div class="text-5xl" aria-hidden="true">{asset.image}</div>
                <div class="flex flex-col gap-1 items-end">
                    <span class="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                        {assetTypeLabels[asset.type]}
                    </span>
                    <span class="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                        {assetStatusLabels[asset.status]}
                    </span>
                </div>
            </div>
            <h3 class="font-black text-white text-lg leading-tight">{asset.name}</h3>
            <div class="text-xs text-gray-400 mt-1">📍 {asset.location}</div>
            <p class="text-sm text-gray-300 mt-2 line-clamp-2">{asset.description}</p>

            <div class="grid grid-cols-2 gap-2 mt-4">
                <div class="bg-white/5 rounded-lg p-2">
                    <div class="text-xs text-gray-400">שווי</div>
                    <div class="text-sm font-bold text-white">{formatCurrency(asset.currentValue)}</div>
                </div>
                <div class="bg-white/5 rounded-lg p-2">
                    <div class="text-xs text-gray-400">שינוי משווי רכישה</div>
                    <div class="text-sm font-bold {profit >= 0 ? 'text-emerald-300' : 'text-red-300'}">
                        {profit >= 0 ? '+' : ''}{profit.toFixed(1)}%
                    </div>
                </div>
            </div>

            {#if h}
                <div class="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span class="text-xs text-amber-300 font-bold">✓ אחזקה שלי: {h.sharesPercent}%</span>
                    <span class="text-xs text-gray-400">{formatCurrency(asset.currentValue * h.sharesPercent / 100)}</span>
                </div>
            {:else}
                <div class="mt-3 pt-3 border-t border-white/10 text-xs text-gray-500">
                    אינך מחזיק/ה בנכס זה
                </div>
            {/if}
        </a>
    {/each}
</section>
