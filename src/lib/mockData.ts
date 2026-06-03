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

// ===== אירועים =====
export type EventType = 'meeting' | 'site-visit' | 'deadline' | 'signing';

export interface CalendarEvent {
    id: string;
    title: string;
    type: EventType;
    date: string;
    time: string;
    location: string;
    description: string;
    relatedAssetId?: string;
    relatedProposalId?: string;
    rsvps: { memberId: string; status: 'yes' | 'no' | 'maybe' }[];
}

export const calendarEvents: CalendarEvent[] = [
    {
        id: 'e1',
        title: 'אסיפת חברים – סקירת רבעון Q2',
        type: 'meeting',
        date: '2026-06-03',
        time: '20:00',
        location: 'משרדי יוסי, רח\' ההסתדרות 14 ת"א',
        description: 'סקירת ביצועי הנכסים, אישור דוחות והצגת הצעות חדשות. כיבוד קל.',
        rsvps: [
            { memberId: 'm1', status: 'yes' },
            { memberId: 'm2', status: 'yes' },
            { memberId: 'm3', status: 'yes' },
            { memberId: 'm4', status: 'maybe' },
            { memberId: 'm5', status: 'yes' }
        ]
    },
    {
        id: 'e2',
        title: 'ביקור בנכס – דופלקס רמת גן',
        type: 'site-visit',
        date: '2026-05-28',
        time: '17:30',
        location: 'רח\' ביאליק 23, רמת גן',
        description: 'סיור משותף בנכס המוצע. הבעלים יציג ונפגוש את השכנים.',
        relatedProposalId: 'p1',
        rsvps: [
            { memberId: 'm1', status: 'yes' },
            { memberId: 'm3', status: 'yes' },
            { memberId: 'm5', status: 'maybe' }
        ]
    },
    {
        id: 'e3',
        title: 'דדליין הצבעה – קפיטריה נתניה',
        type: 'deadline',
        date: '2026-05-30',
        time: '23:59',
        location: 'אונליין',
        description: 'יום אחרון להצבעה על רכישת הקפיטריה.',
        relatedProposalId: 'p2',
        rsvps: []
    },
    {
        id: 'e4',
        title: 'חתימת חוזה – מגרש חריש',
        type: 'signing',
        date: '2026-06-12',
        time: '11:00',
        location: 'משרד עו"ד גולדברג, חיפה',
        description: 'חתימה סופית על העברת הבעלות וההיתר.',
        relatedAssetId: 'a3',
        rsvps: [
            { memberId: 'm1', status: 'yes' },
            { memberId: 'm2', status: 'maybe' }
        ]
    }
];

// ===== פיד פעילות =====
export type ActivityType = 'vote' | 'comment' | 'proposal-added' | 'income' | 'event-created' | 'market-listing';

export interface Activity {
    id: string;
    type: ActivityType;
    memberId: string;
    text: string;
    timestamp: string;
    href?: string;
    icon: string;
}

export const activities: Activity[] = [
    { id: 'act1', type: 'income', memberId: 'm1', text: 'התקבל שכ"ד מבניין הרצל 42 (38,000 ₪)', timestamp: '2026-05-22', href: '/assets/a1', icon: '💰' },
    { id: 'act2', type: 'vote', memberId: 'm3', text: 'הצביע בעד "דופלקס רמת גן"', timestamp: '2026-05-22', href: '/proposals/p1', icon: '✅' },
    { id: 'act3', type: 'comment', memberId: 'm2', text: 'הוסיף תגובה ל"קפיטריה נתניה"', timestamp: '2026-05-20', href: '/proposals/p2', icon: '💬' },
    { id: 'act4', type: 'market-listing', memberId: 'm5', text: 'פרסם הצעת מכירה: 5% מבניין הרצל', timestamp: '2026-05-19', href: '/market', icon: '🔄' },
    { id: 'act5', type: 'proposal-added', memberId: 'm6', text: 'העלה הצעה חדשה: "קפיטריה נתניה"', timestamp: '2026-05-18', href: '/proposals/p2', icon: '💡' },
    { id: 'act6', type: 'event-created', memberId: 'm1', text: 'יצר אירוע: אסיפת חברים Q2 (3.6.26)', timestamp: '2026-05-17', href: '/calendar', icon: '📅' },
    { id: 'act7', type: 'vote', memberId: 'm4', text: 'הצביע נגד "קפיטריה נתניה"', timestamp: '2026-05-19', href: '/proposals/p2', icon: '❌' },
    { id: 'act8', type: 'proposal-added', memberId: 'm1', text: 'העלה הצעה חדשה: "מחסן ברקן"', timestamp: '2026-05-22', href: '/proposals/p3', icon: '💡' }
];

// ===== שוק פנימי – מסחר משני באחזקות =====
export type ListingType = 'sell' | 'buy';
export type ListingStatus = 'open' | 'matched' | 'closed';

export interface MarketListing {
    id: string;
    type: ListingType;
    status: ListingStatus;
    memberId: string;
    assetId: string;
    sharesPercent: number; // כמה אחוזים רוצה למכור/לקנות
    askPrice: number; // מחיר מבוקש לעסקה
    createdAt: string;
    note: string;
    interestedMemberIds: string[];
}

export const marketListings: MarketListing[] = [
    {
        id: 'ml1',
        type: 'sell',
        status: 'open',
        memberId: 'm5',
        assetId: 'a1',
        sharesPercent: 5,
        askPrice: 750_000,
        createdAt: '2026-05-19',
        note: 'מוכר חצי מהחלק שלי. צריך נזילות לפרויקט אחר. גמיש במחיר.',
        interestedMemberIds: ['m1', 'm2']
    },
    {
        id: 'ml2',
        type: 'buy',
        status: 'open',
        memberId: 'm6',
        assetId: 'a1',
        sharesPercent: 10,
        askPrice: 1_400_000,
        createdAt: '2026-05-21',
        note: 'מעוניינת להגדיל אחזקה בבניין. פתוחה לדבר עם כל מי שרוצה לצאת.',
        interestedMemberIds: []
    },
    {
        id: 'ml3',
        type: 'sell',
        status: 'matched',
        memberId: 'm4',
        assetId: 'a4',
        sharesPercent: 10,
        askPrice: 105_000,
        createdAt: '2026-05-08',
        note: 'נמצא קונה - מחכים לחתימה.',
        interestedMemberIds: ['m3']
    }
];

export const eventTypeLabels: Record<EventType, string> = {
    'meeting': 'אסיפה',
    'site-visit': 'ביקור בנכס',
    'deadline': 'דדליין',
    'signing': 'חתימה'
};

export const eventTypeIcons: Record<EventType, string> = {
    'meeting': '👥',
    'site-visit': '🚗',
    'deadline': '⏰',
    'signing': '✍️'
};

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
