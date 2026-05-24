// Mock data – יוחלף ב-Strapi בעתיד

export type AssetType = 'real-estate' | 'business' | 'other';
export type AssetStatus = 'active' | 'pending' | 'sold';
export type ProposalStatus = 'open' | 'approved' | 'rejected' | 'pending';

export interface Member {
    id: string;
    name: string;
    avatar: string;
    email: string;
    joinedAt: string;
    totalShares: number; // סך כל המניות שמחזיק בקבוצה
}

export interface Holding {
    memberId: string;
    sharesPercent: number; // אחוז אחזקה בנכס הספציפי
    investmentAmount: number; // ההשקעה הראשונית בש"ח
}

export interface Asset {
    id: string;
    name: string;
    type: AssetType;
    status: AssetStatus;
    location: string;
    image: string;
    description: string;
    purchasePrice: number; // מחיר הרכישה הכולל
    currentValue: number; // הערכת שווי נוכחית
    monthlyIncome: number; // הכנסה חודשית (שכ"ד / רווחים)
    purchaseDate: string;
    holdings: Holding[];
    tags: string[];
}

export interface Comment {
    id: string;
    memberId: string;
    text: string;
    createdAt: string;
}

export interface Vote {
    memberId: string;
    vote: 'yes' | 'no' | 'abstain';
    weight: number; // משקל הצבעה לפי מניות
}

export interface Proposal {
    id: string;
    title: string;
    type: AssetType;
    status: ProposalStatus;
    proposedBy: string; // memberId
    proposedAt: string;
    deadline: string;
    location: string;
    image: string;
    description: string;
    askingPrice: number;
    estimatedReturn: number; // תשואה צפויה % שנתי
    minInvestment: number;
    documents: { name: string; url: string }[];
    votes: Vote[];
    comments: Comment[];
}

export const members: Member[] = [
    { id: 'm1', name: 'יוסי כהן', avatar: '👨‍💼', email: 'yossi@example.com', joinedAt: '2023-01-15', totalShares: 320 },
    { id: 'm2', name: 'שרה לוי', avatar: '👩‍💼', email: 'sarah@example.com', joinedAt: '2023-02-10', totalShares: 280 },
    { id: 'm3', name: 'דוד מזרחי', avatar: '🧔', email: 'david@example.com', joinedAt: '2023-03-22', totalShares: 200 },
    { id: 'm4', name: 'מיכל גולן', avatar: '👩', email: 'michal@example.com', joinedAt: '2023-04-05', totalShares: 150 },
    { id: 'm5', name: 'אברהם פרידמן', avatar: '👨', email: 'avi@example.com', joinedAt: '2023-05-18', totalShares: 100 },
    { id: 'm6', name: 'רחל אדרי', avatar: '👩‍🦰', email: 'rachel@example.com', joinedAt: '2023-07-01', totalShares: 80 }
];

// המשתמש המחובר כרגע (מוקאפ)
export const currentMemberId = 'm1';

export const assets: Asset[] = [
    {
        id: 'a1',
        name: 'בניין מגורים – רחוב הרצל 42',
        type: 'real-estate',
        status: 'active',
        location: 'תל אביב',
        image: '🏢',
        description: 'בניין מגורים בן 6 דירות במרכז תל אביב. כל הדירות מושכרות. נרכש כקבוצה בשנת 2023.',
        purchasePrice: 12_000_000,
        currentValue: 14_500_000,
        monthlyIncome: 38_000,
        purchaseDate: '2023-06-15',
        tags: ['מושכר במלואו', 'מרכז העיר', 'תשואה יציבה'],
        holdings: [
            { memberId: 'm1', sharesPercent: 30, investmentAmount: 3_600_000 },
            { memberId: 'm2', sharesPercent: 25, investmentAmount: 3_000_000 },
            { memberId: 'm3', sharesPercent: 20, investmentAmount: 2_400_000 },
            { memberId: 'm4', sharesPercent: 15, investmentAmount: 1_800_000 },
            { memberId: 'm5', sharesPercent: 10, investmentAmount: 1_200_000 }
        ]
    },
    {
        id: 'a2',
        name: 'מסעדת "הגפן" – ירושלים',
        type: 'business',
        status: 'active',
        location: 'ירושלים',
        image: '🍽️',
        description: 'מסעדה כשרה בעמק רפאים. רכשנו 60% מהעסק. מנוהלת ע"י השף-שותף, אנחנו שותפים פסיביים.',
        purchasePrice: 1_800_000,
        currentValue: 2_100_000,
        monthlyIncome: 22_000,
        purchaseDate: '2024-02-20',
        tags: ['ניהול פעיל ע"י שותף', 'צמיחה'],
        holdings: [
            { memberId: 'm1', sharesPercent: 25, investmentAmount: 450_000 },
            { memberId: 'm2', sharesPercent: 25, investmentAmount: 450_000 },
            { memberId: 'm3', sharesPercent: 20, investmentAmount: 360_000 },
            { memberId: 'm6', sharesPercent: 30, investmentAmount: 540_000 }
        ]
    },
    {
        id: 'a3',
        name: 'מגרש לבנייה – חריש',
        type: 'real-estate',
        status: 'pending',
        location: 'חריש',
        image: '🏗️',
        description: 'מגרש 800 מ"ר בייעוד מגורים. אושר לבנייה של 2 צמודי קרקע. בתהליך הוצאת היתר בנייה.',
        purchasePrice: 3_200_000,
        currentValue: 3_800_000,
        monthlyIncome: 0,
        purchaseDate: '2024-09-10',
        tags: ['ללא הכנסה שוטפת', 'פוטנציאל גבוה', 'בהיתר'],
        holdings: [
            { memberId: 'm1', sharesPercent: 35, investmentAmount: 1_120_000 },
            { memberId: 'm2', sharesPercent: 30, investmentAmount: 960_000 },
            { memberId: 'm4', sharesPercent: 20, investmentAmount: 640_000 },
            { memberId: 'm5', sharesPercent: 15, investmentAmount: 480_000 }
        ]
    },
    {
        id: 'a4',
        name: 'חנות נוחות "פיקס" – פתח תקווה',
        type: 'business',
        status: 'active',
        location: 'פתח תקווה',
        image: '🏪',
        description: 'רשת קטנה של 3 חנויות נוחות. עסק רווחי עם צוות עובדים יציב.',
        purchasePrice: 950_000,
        currentValue: 1_050_000,
        monthlyIncome: 14_500,
        purchaseDate: '2023-11-05',
        tags: ['רווחי', 'תזרים יציב'],
        holdings: [
            { memberId: 'm3', sharesPercent: 40, investmentAmount: 380_000 },
            { memberId: 'm4', sharesPercent: 35, investmentAmount: 332_500 },
            { memberId: 'm6', sharesPercent: 25, investmentAmount: 237_500 }
        ]
    }
];

export const proposals: Proposal[] = [
    {
        id: 'p1',
        title: 'דופלקס להשקעה – רמת גן',
        type: 'real-estate',
        status: 'open',
        proposedBy: 'm2',
        proposedAt: '2026-05-10',
        deadline: '2026-06-05',
        location: 'רמת גן',
        image: '🏘️',
        description: 'דופלקס 5 חדרים ברחוב ביאליק, מצב מצוין, מושכר ב-9,500 ש"ח לחודש. הבעלים מתפנה לחו"ל ומחפש מכירה מהירה.',
        askingPrice: 3_400_000,
        estimatedReturn: 3.4,
        minInvestment: 200_000,
        documents: [
            { name: 'נסח טאבו', url: '#' },
            { name: 'הערכת שמאי', url: '#' },
            { name: 'חוזה שכירות נוכחי', url: '#' }
        ],
        votes: [
            { memberId: 'm1', vote: 'yes', weight: 30 },
            { memberId: 'm3', vote: 'yes', weight: 20 },
            { memberId: 'm4', vote: 'abstain', weight: 15 }
        ],
        comments: [
            { id: 'c1', memberId: 'm1', text: 'נראה הזדמנות סולידית. שווי השוק באזור עומד על כ-3.7M.', createdAt: '2026-05-11' },
            { id: 'c2', memberId: 'm3', text: 'התשואה נמוכה יחסית, אבל הביטחון גבוה. בעד.', createdAt: '2026-05-12' },
            { id: 'c3', memberId: 'm5', text: 'מבקש לראות את חוות דעת המהנדס לפני שאצביע.', createdAt: '2026-05-15' }
        ]
    },
    {
        id: 'p2',
        title: 'רכישת קפיטריה במרכז מסחרי – נתניה',
        type: 'business',
        status: 'open',
        proposedBy: 'm6',
        proposedAt: '2026-05-18',
        deadline: '2026-05-30',
        location: 'נתניה',
        image: '☕',
        description: 'קפיטריה פעילה במרכז מסחרי איכותי. הבעלים פורש לפנסיה. מחזור חודשי 180,000 ש"ח, רווח נקי 28,000 ש"ח.',
        askingPrice: 1_200_000,
        estimatedReturn: 28,
        minInvestment: 80_000,
        documents: [
            { name: 'דוחות 3 שנים אחרונות', url: '#' },
            { name: 'חוזה שכירות מהמרכז', url: '#' }
        ],
        votes: [
            { memberId: 'm2', vote: 'yes', weight: 28 },
            { memberId: 'm4', vote: 'no', weight: 15 }
        ],
        comments: [
            { id: 'c4', memberId: 'm4', text: 'אין לנו מישהו שינהל את זה בפועל. נגד.', createdAt: '2026-05-19' },
            { id: 'c5', memberId: 'm2', text: 'הבעלים מוכן להישאר 6 חודשים לחפיפה ולעזור למצוא מנהל.', createdAt: '2026-05-20' }
        ]
    },
    {
        id: 'p3',
        title: 'מחסן לוגיסטי – אזור התעשייה ברקן',
        type: 'real-estate',
        status: 'pending',
        proposedBy: 'm1',
        proposedAt: '2026-05-22',
        deadline: '2026-06-15',
        location: 'ברקן',
        image: '🏭',
        description: 'מחסן 1,200 מ"ר עם רמפות העמסה. מושכר לחברת לוגיסטיקה בחוזה ארוך טווח (5 שנים). תשואה יציבה.',
        askingPrice: 5_800_000,
        estimatedReturn: 7.2,
        minInvestment: 400_000,
        documents: [
            { name: 'חוזה השכירות', url: '#' },
            { name: 'תשריט', url: '#' }
        ],
        votes: [],
        comments: []
    }
];

// פונקציות עזר

export function getMember(id: string): Member | undefined {
    return members.find(m => m.id === id);
}

export function getAsset(id: string): Asset | undefined {
    return assets.find(a => a.id === id);
}

export function getProposal(id: string): Proposal | undefined {
    return proposals.find(p => p.id === id);
}

export function formatCurrency(amount: number): string {
    if (amount >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(2)}M ₪`;
    }
    if (amount >= 1_000) {
        return `${(amount / 1_000).toFixed(0)}K ₪`;
    }
    return `${amount.toLocaleString('he-IL')} ₪`;
}

export function formatCurrencyFull(amount: number): string {
    return `${amount.toLocaleString('he-IL')} ₪`;
}

export function memberHoldingInAsset(asset: Asset, memberId: string): Holding | undefined {
    return asset.holdings.find(h => h.memberId === memberId);
}

export function totalPortfolioValue(memberId: string): number {
    return assets.reduce((sum, asset) => {
        const h = memberHoldingInAsset(asset, memberId);
        if (!h) return sum;
        return sum + (asset.currentValue * h.sharesPercent / 100);
    }, 0);
}

export function totalMonthlyIncome(memberId: string): number {
    return assets.reduce((sum, asset) => {
        const h = memberHoldingInAsset(asset, memberId);
        if (!h) return sum;
        return sum + (asset.monthlyIncome * h.sharesPercent / 100);
    }, 0);
}

export function totalInvested(memberId: string): number {
    return assets.reduce((sum, asset) => {
        const h = memberHoldingInAsset(asset, memberId);
        if (!h) return sum;
        return sum + h.investmentAmount;
    }, 0);
}

export function proposalApprovalPercent(proposal: Proposal): { yes: number; no: number; abstain: number } {
    const totalWeight = proposal.votes.reduce((s, v) => s + v.weight, 0);
    if (totalWeight === 0) return { yes: 0, no: 0, abstain: 0 };
    return {
        yes: Math.round(proposal.votes.filter(v => v.vote === 'yes').reduce((s, v) => s + v.weight, 0)),
        no: Math.round(proposal.votes.filter(v => v.vote === 'no').reduce((s, v) => s + v.weight, 0)),
        abstain: Math.round(proposal.votes.filter(v => v.vote === 'abstain').reduce((s, v) => s + v.weight, 0))
    };
}

export const assetTypeLabels: Record<AssetType, string> = {
    'real-estate': 'נדל"ן',
    'business': 'עסק',
    'other': 'אחר'
};

export const assetStatusLabels: Record<AssetStatus, string> = {
    'active': 'פעיל',
    'pending': 'בתהליך',
    'sold': 'נמכר'
};

export const proposalStatusLabels: Record<ProposalStatus, string> = {
    'open': 'פתוח להצבעה',
    'approved': 'אושר',
    'rejected': 'נדחה',
    'pending': 'ממתין למידע'
};
