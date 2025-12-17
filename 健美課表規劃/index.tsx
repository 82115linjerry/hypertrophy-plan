import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";

// --- Icons ---
const Icon = ({ path, size = 20, className = "" }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {path}
    </svg>
);

const Icons = {
    Activity: (props: any) => <Icon {...props} path={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>} />,
    BarChart: (props: any) => <Icon {...props} path={<><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></>} />,
    Target: (props: any) => <Icon {...props} path={<><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></>} />,
    Calendar: (props: any) => <Icon {...props} path={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>} />,
    CheckCircle: (props: any) => <Icon {...props} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>} />,
    ChevronRight: (props: any) => <Icon {...props} path={<polyline points="9 18 15 12 9 6"></polyline>} />,
    ClipboardList: (props: any) => <Icon {...props} path={<><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2-2v1"></path></>} />,
    Dumbbell: (props: any) => <Icon {...props} path={<><path d="m6.5 6.5 11 11"></path><path d="m21 21-1-1"></path><path d="m3 3 1 1"></path><path d="m18 22 4-4"></path><path d="m2 6 4-4"></path><path d="m3 10 7-7"></path><path d="m14 21 7-7"></path></>} />,
    LayoutDashboard: (props: any) => <Icon {...props} path={<><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></>} />,
    Settings: (props: any) => <Icon {...props} path={<><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>} />,
    Trash2: (props: any) => <Icon {...props} path={<><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></>} />,
    Plus: (props: any) => <Icon {...props} path={<><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></>} />,
    RefreshCw: (props: any) => <Icon {...props} path={<><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></>} />,
    X: (props: any) => <Icon {...props} path={<><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>} />,
    User: (props: any) => <Icon {...props} path={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>} />,
    Flame: (props: any) => <Icon {...props} path={<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>} />,
    Zap: (props: any) => <Icon {...props} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>} />,
    TrendingUp: (props: any) => <Icon {...props} path={<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>} />,
    PieChart: (props: any) => <Icon {...props} path={<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>} />,
    Clock: (props: any) => <Icon {...props} path={<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>} />,
    Utensils: (props: any) => <Icon {...props} path={<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3"></path>} />,
    Download: (props: any) => <Icon {...props} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></>} />,
};

// --- EXPANDED Exercise Database ---
const FULL_EXERCISE_LIBRARY = [
    // Chest
    { id: 'ch1', name: '槓鈴臥推 (Barbell Bench Press)', group: '胸部', tier: 'S', type: 'Free Weight', rest: 180 },
    { id: 'ch2', name: '上斜啞鈴臥推 (Incline DB Press)', group: '胸部', tier: 'S', type: 'Free Weight', rest: 150 },
    { id: 'ch3', name: '雙槓撐體 (Dips)', group: '胸部', tier: 'S', type: 'Bodyweight', rest: 120 },
    { id: 'ch4', name: '機械胸推 (Machine Chest Press)', group: '胸部', tier: 'A', type: 'Machine', rest: 90 },
    { id: 'ch5', name: '啞鈴平胸臥推 (DB Bench Press)', group: '胸部', tier: 'A', type: 'Free Weight', rest: 120 },
    { id: 'ch6', name: '纜繩夾胸 (Cable Fly)', group: '胸部', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'ch7', name: '蝴蝶機夾胸 (Pec Deck)', group: '胸部', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'ch8', name: '史密斯上斜臥推 (Smith Incline Press)', group: '胸部', tier: 'A', type: 'Machine', rest: 90 },
    { id: 'ch9', name: '下斜槓鈴臥推 (Decline Barbell Press)', group: '胸部', tier: 'A', type: 'Free Weight', rest: 120 },
    { id: 'ch10', name: '上斜纜繩夾胸 (Incline Cable Fly)', group: '胸部', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'ch11', name: '機械飛鳥 (Machine Fly)', group: '胸部', tier: 'B', type: 'Machine', rest: 60 },
    
    // Back
    { id: 'bk1', name: '引體向上 (Pull Up)', group: '背部', tier: 'S', type: 'Bodyweight', rest: 120 },
    { id: 'bk2', name: '槓鈴划船 (Barbell Row)', group: '背部', tier: 'S', type: 'Free Weight', rest: 150 },
    { id: 'bk3', name: '傳統硬舉 (Deadlift)', group: '背部', tier: 'S', type: 'Free Weight', rest: 180 },
    { id: 'bk4', name: '滑輪下拉 (Lat Pulldown)', group: '背部', tier: 'A', type: 'Cable', rest: 90 },
    { id: 'bk5', name: '坐姿划船 (Seated Cable Row)', group: '背部', tier: 'A', type: 'Cable', rest: 90 },
    { id: 'bk6', name: '單臂啞鈴划船 (One Arm Row)', group: '背部', tier: 'A', type: 'Free Weight', rest: 90 },
    { id: 'bk7', name: '直臂下壓 (Straight Arm Pulldown)', group: '背部', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'bk8', name: 'T-Bar 划船 (T-Bar Row)', group: '背部', tier: 'A', type: 'Machine', rest: 120 },
    { id: 'bk9', name: '梅多斯划船 (Meadows Row)', group: '背部', tier: 'A', type: 'Free Weight', rest: 90 },
    { id: 'bk10', name: '反手滑輪下拉 (Reverse Grip Pulldown)', group: '背部', tier: 'A', type: 'Cable', rest: 90 },
    { id: 'bk11', name: '輔助引體向上 (Assisted Pull Up)', group: '背部', tier: 'A', type: 'Machine', rest: 90 },
    { id: 'bk12', name: '海豹划船 (Seal Row)', group: '背部', tier: 'A', type: 'Free Weight', rest: 120 },

    // Legs (Quad)
    { id: 'qu1', name: '槓鈴深蹲 (Back Squat)', group: '腿部', tier: 'S', type: 'Free Weight', rest: 180 },
    { id: 'qu2', name: '前蹲舉 (Front Squat)', group: '腿部', tier: 'S', type: 'Free Weight', rest: 180 },
    { id: 'qu3', name: '腿推機 (Leg Press)', group: '腿部', tier: 'A', type: 'Machine', rest: 120 },
    { id: 'qu4', name: '哈克深蹲 (Hack Squat)', group: '腿部', tier: 'A', type: 'Machine', rest: 120 },
    { id: 'qu5', name: '保加利亞分腿蹲 (Bulgarian Split Squat)', group: '腿部', tier: 'A', type: 'Free Weight', rest: 120 },
    { id: 'qu6', name: '股四頭肌伸展 (Leg Extension)', group: '腿部', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'qu7', name: '弓箭步 (Lunges)', group: '腿部', tier: 'B', type: 'Free Weight', rest: 90 },
    { id: 'qu8', name: '高腳杯深蹲 (Goblet Squat)', group: '腿部', tier: 'B', type: 'Free Weight', rest: 90 },
    { id: 'qu9', name: '史密斯深蹲 (Smith Squat)', group: '腿部', tier: 'A', type: 'Machine', rest: 120 },

    // Legs (Ham/Glute/Calf)
    { id: 'hg1', name: '羅馬尼亞硬舉 (RDL)', group: '腿部', tier: 'S', type: 'Free Weight', rest: 150 },
    { id: 'hg2', name: '臀推 (Hip Thrust)', group: '腿部', tier: 'S', type: 'Free Weight', rest: 120 },
    { id: 'hg3', name: '坐姿腿後勾 (Seated Leg Curl)', group: '腿部', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'hg4', name: '臥姿腿後勾 (Lying Leg Curl)', group: '腿部', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'hg5', name: '羅馬椅挺身 (Back Extension)', group: '腿部', tier: 'B', type: 'Bodyweight', rest: 60 },
    { id: 'hg6', name: '站姿提踵 (Standing Calf Raise)', group: '腿部', tier: 'C', type: 'Machine', rest: 45 },
    { id: 'hg7', name: '坐姿提踵 (Seated Calf Raise)', group: '腿部', tier: 'C', type: 'Machine', rest: 45 },
    { id: 'hg8', name: '單腳硬舉 (Single Leg RDL)', group: '腿部', tier: 'B', type: 'Free Weight', rest: 90 },
    { id: 'hg9', name: '壺鈴擺盪 (Kettlebell Swing)', group: '腿部', tier: 'B', type: 'Free Weight', rest: 60 },

    // Shoulders
    { id: 'sh1', name: '站姿槓鈴肩推 (OHP)', group: '肩膀', tier: 'S', type: 'Free Weight', rest: 150 },
    { id: 'sh2', name: '坐姿啞鈴肩推 (Seated DB Press)', group: '肩膀', tier: 'S', type: 'Free Weight', rest: 120 },
    { id: 'sh3', name: '機械肩推 (Machine Shoulder Press)', group: '肩膀', tier: 'A', type: 'Machine', rest: 90 },
    { id: 'sh4', name: '啞鈴側平舉 (DB Lateral Raise)', group: '肩膀', tier: 'B', type: 'Free Weight', rest: 60 },
    { id: 'sh5', name: '纜繩側平舉 (Cable Lateral Raise)', group: '肩膀', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'sh6', name: '臉拉 (Face Pull)', group: '肩膀', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'sh7', name: '反向飛鳥 (Reverse Pec Deck)', group: '肩膀', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'sh8', name: '阿諾肩推 (Arnold Press)', group: '肩膀', tier: 'A', type: 'Free Weight', rest: 90 },
    { id: 'sh9', name: '直立划船 (Upright Row)', group: '肩膀', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'sh10', name: '俯身啞鈴飛鳥 (Rear Delt Fly)', group: '肩膀', tier: 'B', type: 'Free Weight', rest: 60 },

    // Arms (Biceps/Triceps)
    { id: 'ar1', name: '槓鈴彎舉 (Barbell Curl)', group: '手臂', tier: 'A', type: 'Free Weight', rest: 90 },
    { id: 'ar2', name: '啞鈴彎舉 (Dumbbell Curl)', group: '手臂', tier: 'B', type: 'Free Weight', rest: 60 },
    { id: 'ar3', name: '垂式彎舉 (Hammer Curl)', group: '手臂', tier: 'B', type: 'Free Weight', rest: 60 },
    { id: 'ar4', name: '三頭下壓 (Tricep Pushdown)', group: '手臂', tier: 'A', type: 'Cable', rest: 60 },
    { id: 'ar5', name: '仰臥三頭伸展 (Skull Crusher)', group: '手臂', tier: 'A', type: 'Free Weight', rest: 90 },
    { id: 'ar6', name: '過頭三頭伸展 (Overhead Extension)', group: '手臂', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'ar7', name: '傳教士彎舉 (Preacher Curl)', group: '手臂', tier: 'B', type: 'Machine', rest: 60 },
    { id: 'ar8', name: '集中彎舉 (Concentration Curl)', group: '手臂', tier: 'B', type: 'Free Weight', rest: 60 },
    { id: 'ar9', name: '窄握臥推 (Close Grip Bench)', group: '手臂', tier: 'A', type: 'Free Weight', rest: 120 },
    { id: 'ar10', name: '板凳撐體 (Bench Dips)', group: '手臂', tier: 'B', type: 'Bodyweight', rest: 60 },
    { id: 'ar11', name: '蜘蛛彎舉 (Spider Curl)', group: '手臂', tier: 'B', type: 'Free Weight', rest: 60 },

    // Abs & Core
    { id: 'ab1', name: '懸垂舉腿 (Hanging Leg Raise)', group: '核心', tier: 'A', type: 'Bodyweight', rest: 60 },
    { id: 'ab2', name: '纜繩捲腹 (Cable Crunch)', group: '核心', tier: 'B', type: 'Cable', rest: 60 },
    { id: 'ab3', name: '滾輪 (Ab Wheel)', group: '核心', tier: 'A', type: 'Bodyweight', rest: 90 },
    { id: 'ab4', name: '俄羅斯轉體 (Russian Twist)', group: '核心', tier: 'B', type: 'Bodyweight', rest: 45 },
    { id: 'ab5', name: '棒式 (Plank)', group: '核心', tier: 'B', type: 'Bodyweight', rest: 60 },
    { id: 'ab6', name: '死蟲式 (Dead Bug)', group: '核心', tier: 'C', type: 'Bodyweight', rest: 45 },
    { id: 'ab7', name: '登山者 (Mountain Climber)', group: '核心', tier: 'C', type: 'Bodyweight', rest: 45 },

    // Cardio (For Fat Loss)
    { id: 'cd1', name: '低強度有氧 (LISS)', group: '有氧', tier: 'C', type: 'Cardio', rest: 0 },
    { id: 'cd2', name: '高強度間歇 (HIIT)', group: '有氧', tier: 'A', type: 'Cardio', rest: 60 },
    { id: 'cd3', name: '跑步機爬坡 (Incline Walk)', group: '有氧', tier: 'C', type: 'Cardio', rest: 0 },
    { id: 'cd4', name: '划船機 (Rowing)', group: '有氧', tier: 'B', type: 'Cardio', rest: 60 }
];

const MUSCLE_GROUPS = ['胸部', '背部', '腿部', '肩膀', '手臂', '核心', '有氧'];

// --- Training Techniques ---
const ADVANCED_TECHNIQUES: any = {
    'none': { name: '標準 (Standard)', desc: '正常組數與休息', color: 'text-slate-400 border-slate-700' },
    'dropset': { name: '遞減組 (Drop Set)', desc: '力竭後減輕重量立即繼續', color: 'text-red-400 border-red-500 bg-red-900/20' },
    'superset': { name: '超級組 (Super Set)', desc: '與下一個動作無間歇接續', color: 'text-yellow-400 border-yellow-500 bg-yellow-900/20' },
    'eccentric': { name: '離心專注 (Eccentric)', desc: '下放階段放慢至 3-4 秒', color: 'text-blue-400 border-blue-500 bg-blue-900/20' },
    'pause': { name: '頂峰暫停 (Peak Pause)', desc: '收縮頂點暫停 1-2 秒', color: 'text-purple-400 border-purple-500 bg-purple-900/20' },
    'amrap': { name: '力竭組 (AMRAP)', desc: '最後一組做到無法再做為止', color: 'text-orange-400 border-orange-500 bg-orange-900/20' }
};

const TRAINING_SPLITS: any = {
    1: { name: '全身極簡 (Full Body)', desc: '維持期或極度忙碌，高強度全身訓練。' },
    2: { name: '全身 A/B (Full Body)', desc: '適合初學者，每次刺激全身，頻率適中。' },
    3: { name: '全身 / 上下肢混合', desc: '靈活度高，適合一般上班族。' },
    4: { name: '上/下肢分化 (Upper/Lower)', desc: '最推薦的肌肥大分化，恢復與刺激平衡。' },
    5: { name: 'PPL + 上/下肢 (Hybrid)', desc: '進階者，增加特定部位容量。' },
    6: { name: '推/拉/腿 循環 (PPL x2)', desc: '高強度運動員，極大化訓練頻率。' }
};

// --- PERIODIZATION LOGIC (Long Term) ---
const PERIODIZATION_PLAN: any = {
    'hypertrophy': [
        { id: 1, months: [1, 2], name: '基礎適應與容量期 (Adaptation)', focus: 'eccentric', rpe: 7, desc: '建立動作模式，專注於離心控制，提高肌耐力與結締組織強度。' },
        { id: 2, months: [3, 4], name: '肌肥大累積期 (Accumulation)', focus: 'none', rpe: 8, desc: '增加訓練容量 (Volume)，主要肌肥大成長階段，保持標準動作品質。' },
        { id: 3, months: [5, 6], name: '強度強化期 (Intensification)', focus: 'dropset', rpe: 9, desc: '提高重量，降低次數，引入遞減組等技巧突破停滯期。' },
        { id: 4, months: [7, 8], name: '代謝壓力期 (Metabolic)', focus: 'superset', rpe: 9, desc: '縮短組間休息，使用超級組，最大化代謝壓力。' },
        { id: 5, months: [9, 10], name: '力量轉化期 (Strength)', focus: 'pause', rpe: 9.5, desc: '大重量低次數 (3-5RM)，提升神經徵召效率。' },
        { id: 6, months: [11, 12], name: '主動恢復與重置 (Deload/Reset)', focus: 'none', rpe: 6, desc: '降低強度與容量，讓身體完全恢復，準備下一個大週期。' }
    ],
    'fat_loss': [
        { id: 1, months: [1], name: '熱量赤字適應期 (Deficit Intro)', focus: 'none', rpe: 7, desc: '適應較低的碳水攝取，訓練以維持肌力為主，不宜過度力竭。' },
        { id: 2, months: [2], name: '代謝推動期 (Metabolic Push)', focus: 'superset', rpe: 8, desc: '引入超級組與有氧，增加訓練密度，提升熱量消耗。' },
        { id: 3, months: [3], name: '高強度保留期 (Intensity Retention)', focus: 'none', rpe: 9, desc: '訓練量(組數)下降，但重量(強度)必須維持，以告訴身體「需要肌肉」。' },
        { id: 4, months: [4], name: '最後衝刺/去脂 (Peaking/Depletion)', focus: 'amrap', rpe: 9.5, desc: '高次數力竭組消耗肝醣，配合嚴格飲食進行最後減脂。' }
    ]
};

// --- Helper: Generate Program ---
const generateProgramStructure = (days: number, trainingLevel: number, weakPoint: string, goal: string, currentMonth: number) => {
    const baseSets = trainingLevel === 1 ? 3 : trainingLevel === 2 ? 4 : 5;
    
    // Determine Phase Adjustments
    const plan = PERIODIZATION_PLAN[goal].find((p: any) => p.months.includes(currentMonth)) || PERIODIZATION_PLAN[goal][0];
    let setMultiplier = 0;
    let repRange = '8-12';
    
    // Periodization Logic Adjustments
    if (goal === 'hypertrophy') {
        if (plan.id === 1) { repRange = '12-15'; setMultiplier = 0; }
        if (plan.id === 2) { repRange = '8-12'; setMultiplier = 1; } // High Volume
        if (plan.id === 3) { repRange = '6-10'; setMultiplier = 0; }
        if (plan.id === 5) { repRange = '3-6'; setMultiplier = -1; } // Strength, lower volume
    } else {
        // Fat Loss Logic
        if (plan.id === 2) { repRange = '12-15'; setMultiplier = 0; } // Metabolic
        if (plan.id === 3) { repRange = '5-8'; setMultiplier = -1; } // Strength maintenance, low volume
        if (plan.id === 4) { repRange = '15-20'; setMultiplier = 0; } // Depletion
    }

    const createSession = (name: string, exIds: string[]) => ({
        name,
        exercises: exIds.map(eid => {
            const ex = FULL_EXERCISE_LIBRARY.find(e => e.id === eid);
            if (!ex) return null;
            
            let sets = ((ex.tier === 'S' || ex.tier === 'A') ? baseSets : 3) + setMultiplier;
            if (sets < 2) sets = 2; // Min floor
            
            if (weakPoint && ex.group === weakPoint) {
                sets += 1; 
            }

            // Override rep range for heavy compounds if not in depletion phase
            let finalReps = repRange;
            if ((ex.tier === 'S') && plan.id !== 4 && plan.id !== 1) {
                finalReps = goal === 'hypertrophy' && plan.id === 5 ? '3-5' : '5-8';
            }

            return { 
                id: eid, 
                sets: sets, 
                reps: finalReps, 
                weight: 0,
                isWeakPoint: ex.group === weakPoint,
                technique: plan.focus // Apply phase technique default
            };
        }).filter(Boolean) as any[]
    });

    let newProgram: any[] = [];
    const templates: any = {
        1: [['全身綜合 (Full Body)', ['qu1', 'ch1', 'bk2', 'sh1', 'hg1', 'ar1', 'ab1']]],
        2: [['全身 A (Squat Focus)', ['qu1', 'ch1', 'bk2', 'sh4', 'ar4', 'ab2']], ['全身 B (Hinge Focus)', ['hg1', 'ch2', 'bk4', 'sh1', 'ar1', 'ab3']]],
        3: [['推 (Push)', ['ch1', 'sh2', 'qu3', 'ch4', 'ar4']], ['拉 (Pull)', ['bk3', 'bk4', 'hg3', 'ar1', 'bk6']], ['腿/全 (Legs/Full)', ['qu1', 'hg1', 'sh4', 'ab1', 'qu5']]],
        4: [['上半身 A (Upper Power)', ['ch1', 'bk2', 'sh1', 'bk4', 'ar4']], ['下半身 A (Lower Squat)', ['qu1', 'hg2', 'qu3', 'hg6', 'ab2']], ['上半身 B (Upper Hyper)', ['ch2', 'bk5', 'sh4', 'ch6', 'ar1']], ['下半身 B (Lower Hinge)', ['hg1', 'qu5', 'qu6', 'hg3', 'ab3']]],
        5: [['上半身 (Upper)', ['ch1', 'bk2', 'sh2', 'ar4', 'ar1']], ['下半身 (Lower)', ['qu1', 'hg1', 'qu3', 'hg4', 'ab1']], ['推 (Push)', ['ch2', 'sh1', 'ch7', 'sh5', 'ar6']], ['拉 (Pull)', ['bk1', 'bk6', 'bk7', 'ar2', 'sh6']], ['腿 (Legs)', ['qu4', 'hg2', 'qu7', 'hg6', 'ab2']]],
        6: [['推 A (Push)', ['ch1', 'sh2', 'ch3', 'sh4', 'ar4']], ['拉 A (Pull)', ['bk1', 'bk2', 'sh6', 'ar1', 'bk7']], ['腿 A (Legs)', ['qu1', 'hg3', 'qu3', 'hg6', 'ab1']], ['推 B (Push)', ['ch2', 'sh1', 'ch6', 'sh5', 'ar6']], ['拉 B (Pull)', ['bk3', 'bk4', 'bk6', 'ar2', 'ab2']], ['腿 B (Legs)', ['hg1', 'qu5', 'qu6', 'hg4', 'ab3']]]
    };

    const selectedTemplate = templates[days] || templates[4];
    newProgram = selectedTemplate.map((t: any, idx: number) => ({ ...createSession(t[0], t[1]), day: idx + 1 }));

    // Cardio Addition for Fat Loss
    if (goal === 'fat_loss') {
        newProgram.forEach((day, i) => {
            // Add cardio to end of session
            day.exercises.push({
                id: i % 2 === 0 ? 'cd2' : 'cd1', // Rotate HIIT and LISS
                sets: 1,
                reps: i % 2 === 0 ? '15-20 min' : '30-40 min',
                weight: 0,
                isWeakPoint: false,
                technique: 'none',
                note: '減脂期必修'
            });
        });
    }

    return newProgram;
};

// --- Helper: Calculate Nutrition ---
const calculateNutrition = (profile: any) => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    bmr += profile.gender === 'male' ? 5 : -161;

    // Activity Multiplier (Approx based on training days)
    const multiplier = 1.2 + (profile.trainingDays * 0.05) + (profile.trainingLevel * 0.05);
    const tdee = Math.round(bmr * multiplier);
    
    let targetCalories = tdee;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    if (profile.goal === 'hypertrophy') {
        // Hypertrophy Surplus
        targetCalories = tdee + 250;
        protein = Math.round(profile.weight * 2.0); // 2g per kg (Standard)
        fat = Math.round(profile.weight * 0.9); // 0.9g per kg
    } else {
        // Fat Loss Deficit
        targetCalories = tdee - 400; // Moderate deficit
        // Protein Higher in deficit to spare muscle
        protein = Math.round(profile.weight * 2.4); // 2.4g per kg (High)
        fat = Math.round(profile.weight * 0.7); // Lower fat
    }

    // Remaining cals to carbs
    carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4);
    if (carbs < 50) carbs = 50; // Min floor

    return { tdee, targetCalories, protein, fat, carbs };
};

// --- Main Component ---
function HyperSmartTrainerV4() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentMonth, setCurrentMonth] = useState(1); // Changed from Week to Month/Phase
    
    const [userProfile, setUserProfile] = useState({
        name: '健美新星',
        gender: 'male',
        age: 25,
        height: 175,
        weight: 75,
        trainingLevel: 2,
        trainingDays: 4,
        weakPoint: '胸部',
        goal: 'hypertrophy' // 'hypertrophy' (6 mo) or 'fat_loss' (4 mo)
    });

    const [program, setProgram] = useState<any[]>([]);
    
    // UI States
    const [activeWorkout, setActiveWorkout] = useState<any>(null);
    const [swapModalOpen, setSwapModalOpen] = useState(false);
    const [targetSwapData, setTargetSwapData] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMuscleFilter, setSelectedMuscleFilter] = useState('All');

    // Get Current Phase Info
    const currentPhase = useMemo(() => {
        const plan = PERIODIZATION_PLAN[userProfile.goal];
        return plan.find((p: any) => p.months.includes(currentMonth)) || plan[0];
    }, [userProfile.goal, currentMonth]);

    const maxMonths = userProfile.goal === 'hypertrophy' ? 12 : 4;

    useEffect(() => {
        const newProg = generateProgramStructure(
            userProfile.trainingDays, 
            userProfile.trainingLevel, 
            userProfile.weakPoint,
            userProfile.goal,
            currentMonth
        );
        setProgram(newProg);
    }, [userProfile.trainingDays, userProfile.trainingLevel, userProfile.weakPoint, userProfile.goal, currentMonth]);

    // --- Handlers ---
    const handleUpdateTechnique = (dayIdx: number, exIdx: number, technique: string) => {
        const newProgram = [...program];
        newProgram[dayIdx].exercises[exIdx].technique = technique;
        setProgram(newProgram);
    };

    const handleFinishWorkout = () => {
        alert("訓練完成！系統已記錄您的訓練量與疲勞度。");
        setActiveWorkout(null);
        setActiveTab('dashboard');
    };

    const openSwapModal = (dayIdx: number, exIdx: number) => {
        setTargetSwapData({ dayIdx, exIdx });
        setSwapModalOpen(true);
        setSearchQuery('');
        setSelectedMuscleFilter('All');
    };

    const handleSwapExercise = (newExerciseId: string) => {
        if (!targetSwapData) return;
        const { dayIdx, exIdx } = targetSwapData;
        const newProgram = [...program];
        const oldEx = newProgram[dayIdx].exercises[exIdx];
        const newExLib = FULL_EXERCISE_LIBRARY.find(e => e.id === newExerciseId);
        
        if (newExLib) {
            newProgram[dayIdx].exercises[exIdx] = {
                ...oldEx,
                id: newExerciseId,
                reps: newExLib.tier === 'S' ? '5-8' : '8-12',
                weight: 0
            };
            setProgram(newProgram);
        }
        setSwapModalOpen(false);
        setTargetSwapData(null);
    };

    const handleAddExercise = (dayIdx: number) => {
         const newProgram = [...program];
         const defaultEx = { id: 'ab1', sets: 3, reps: '12-15', weight: 0, technique: 'none' };
         newProgram[dayIdx].exercises.push(defaultEx);
         setProgram(newProgram);
         openSwapModal(dayIdx, newProgram[dayIdx].exercises.length - 1);
    };

    const handleRemoveExercise = (dayIdx: number, exIdx: number) => {
        if(!confirm("確定要移除這個動作嗎？")) return;
        const newProgram = [...program];
        newProgram[dayIdx].exercises.splice(exIdx, 1);
        setProgram(newProgram);
    };

    const handleExportCSV = () => {
        // CSV Header
        let csvContent = "Day,Session Name,Order,Exercise Name,Muscle Group,Tier,Sets,Reps,Rest (s),Technique,Note\n";

        program.forEach(day => {
            day.exercises.forEach((ex: any, index: number) => {
                const details = FULL_EXERCISE_LIBRARY.find(e => e.id === ex.id) || { name: 'Unknown', group: '-', tier: '-', rest: 0 };
                const techniqueName = ADVANCED_TECHNIQUES[ex.technique || 'none']?.name || 'Standard';
                const note = ex.isWeakPoint ? 'Weak Point Focus' : (ex.note || '');
                // Escape commas in strings
                const safeName = `"${details.name}"`;
                
                const row = [
                    `Day ${day.day}`,
                    `"${day.name}"`,
                    index + 1,
                    safeName,
                    details.group,
                    details.tier,
                    ex.sets,
                    `"${ex.reps}"`, 
                    details.rest,
                    `"${techniqueName}"`,
                    `"${note}"`
                ].join(",");
                csvContent += row + "\n";
            });
        });

        // Add BOM for proper UTF-8 handling in Excel
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `HyperSmart_Program_${userProfile.goal}_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Components ---
    const Badge = ({ tier }: any) => {
        let className = "px-2 py-0.5 text-xs font-bold rounded shadow-sm ";
        if (tier === 'S') className += "tier-s";
        else if (tier === 'A') className += "tier-a";
        else if (tier === 'B') className += "tier-b";
        else className += "tier-c";
        return <span className={className}>{tier} 級</span>;
    };

    // --- Views ---
    const renderDashboard = () => (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        早安, {userProfile.name} 
                        <span className={`text-xs px-2 py-1 rounded border ${userProfile.goal === 'hypertrophy' ? 'bg-blue-900 text-blue-300 border-blue-700' : 'bg-red-900 text-red-300 border-red-700'}`}>
                            {userProfile.goal === 'hypertrophy' ? '增肌期 (Bulking)' : '減脂期 (Cutting)'}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        目前進度: <span className="text-blue-400 font-bold">{currentPhase.name}</span> 
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors"
                        disabled={currentMonth <= 1}
                        onClick={() => setCurrentMonth(p => p > 1 ? p - 1 : 1)}>
                        上一月
                    </button>
                    <div className="bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-800 text-center min-w-[100px]">
                        <div className="text-xs text-blue-300">Month</div>
                        <div className="text-xl font-bold text-blue-400">{currentMonth} <span className="text-sm text-slate-500">/ {maxMonths}</span></div>
                    </div>
                    <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors"
                        disabled={currentMonth >= maxMonths}
                        onClick={() => setCurrentMonth(p => p < maxMonths ? p + 1 : 1)}>
                        下一月
                    </button>
                </div>
            </div>

            {/* Cycle Insight */}
            <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Icons.Activity size={100} /></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">RPE {currentPhase.rpe}</span>
                        <h3 className="text-lg font-bold text-white">本月週期重點：{currentPhase.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-2xl">{currentPhase.desc}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div className="bg-slate-900 p-2 rounded border border-slate-700">
                            <div className="text-slate-500">主打技巧</div>
                            <div className="text-blue-300 font-bold">{currentPhase.focus !== 'none' ? ADVANCED_TECHNIQUES[currentPhase.focus].name : '標準 (重基礎)'}</div>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-700">
                            <div className="text-slate-500">目標目標</div>
                            <div className="text-slate-300 font-bold">{userProfile.goal === 'hypertrophy' ? '最大化肌肥大' : '最大化燃脂/保肌'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Plan */}
            <div className="grid md:grid-cols-2 gap-4">
                {program.map((day, idx) => (
                    <div 
                        key={idx}
                        onClick={() => { setActiveWorkout({dayIndex: idx, exercises: day.exercises}); setActiveTab('workout'); }}
                        className="group bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-500/50 transition-all rounded-xl p-4 cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-700 group-hover:bg-blue-500 transition-colors"></div>
                        <div className="flex justify-between items-center pl-3">
                            <div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Day {day.day}</div>
                                <div className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">{day.name}</div>
                                <div className="text-sm text-slate-400 mt-1 flex gap-2">
                                    <span className="flex items-center gap-1"><Icons.Dumbbell size={12}/> {day.exercises.length} 動作</span>
                                    <span className="flex items-center gap-1"><Icons.Flame size={12}/> {day.exercises.reduce((acc: number,e: any)=>acc+e.sets,0)} 組</span>
                                </div>
                            </div>
                            <div className="bg-slate-900 p-2 rounded-full text-slate-500 group-hover:text-white group-hover:bg-blue-600 transition-all">
                                <Icons.ChevronRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPlanner = () => (
        <div className="space-y-6 animate-fade-in pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">課表編輯器</h2>
                    <p className="text-xs text-slate-400">客製化您的訓練技巧與動作安排 (Month {currentMonth})</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExportCSV} className="text-sm bg-green-700 px-3 py-1.5 rounded text-white flex gap-2 items-center hover:bg-green-600 border border-green-600 shadow-sm transition-all active:scale-95">
                        <Icons.Download size={14}/> 匯出 CSV (Excel)
                    </button>
                    <button onClick={()=>setActiveTab('settings')} className="text-sm bg-slate-700 px-3 py-1.5 rounded text-white flex gap-2 items-center hover:bg-slate-600 border border-slate-600">
                        <Icons.Settings size={14}/> 調整架構
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {program.map((day, dayIdx) => (
                    <div key={dayIdx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-sm">D{day.day}</div>
                                <h3 className="font-bold text-white">{day.name}</h3>
                            </div>
                            <button onClick={() => handleAddExercise(dayIdx)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                                <Icons.Plus size={14}/> 加動作
                            </button>
                        </div>
                        <div className="divide-y divide-slate-700/50">
                            {day.exercises.map((ex: any, exIdx: number) => {
                                const details = FULL_EXERCISE_LIBRARY.find(e => e.id === ex.id) || { name: '未知動作', group: '未知', type: '未知', tier: 'C', rest: 60 };
                                return (
                                    <div key={exIdx} className="p-4 flex flex-col md:flex-row md:items-center justify-between group hover:bg-slate-700/30 transition-colors gap-3">
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className="text-slate-600 font-mono text-sm w-4">{exIdx + 1}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-white font-medium cursor-pointer hover:text-blue-300" onClick={() => openSwapModal(dayIdx, exIdx)}>{details.name}</span>
                                                    <Badge tier={details.tier} />
                                                    {ex.isWeakPoint && <span className="text-[10px] bg-red-900/50 text-red-400 px-1 rounded border border-red-800">加強</span>}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1 flex gap-3 items-center flex-wrap">
                                                    <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">{details.group}</span>
                                                    <span className="text-white font-bold">{ex.sets} 組 x {ex.reps}</span>
                                                    <span className="flex items-center gap-1 text-yellow-500 font-medium bg-yellow-900/20 px-1.5 py-0.5 rounded border border-yellow-800/50">
                                                        <Icons.Clock size={10} /> 休息 {details.rest}s
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Technique Selector */}
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <select
                                                    value={ex.technique || 'none'}
                                                    onChange={(e) => handleUpdateTechnique(dayIdx, exIdx, e.target.value)}
                                                    className={`text-xs px-3 py-1.5 rounded border bg-slate-900 outline-none cursor-pointer appearance-none pr-8 transition-colors ${ADVANCED_TECHNIQUES[ex.technique || 'none'].color}`}
                                                >
                                                    {Object.entries(ADVANCED_TECHNIQUES).map(([key, info]: any) => (
                                                        <option key={key} value={key} className="bg-slate-800 text-slate-200">
                                                            {info.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <Icons.Zap size={10} className="text-slate-400"/>
                                                </div>
                                            </div>

                                            <div className="flex gap-1">
                                                <button onClick={() => openSwapModal(dayIdx, exIdx)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-900 rounded transition-colors"><Icons.RefreshCw size={16}/></button>
                                                <button onClick={() => handleRemoveExercise(dayIdx, exIdx)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded transition-colors"><Icons.Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAnalytics = () => {
        // Calculation for CNS Fatigue
        const fatigueStats: any = { 'Free Weight': 0, 'Machine': 0, 'Cable': 0, 'Bodyweight': 0, 'Cardio': 0 };
        let totalSets = 0;
        
        // Mock Volume Data based on User Goal
        let weeklyVolumeLoad = userProfile.goal === 'hypertrophy' 
            ? [12000, 13500, 14800, 15500, 16200, 17000, 10000, 18000] 
            : [15000, 16000, 15500, 14000];

        program.forEach(day => day.exercises.forEach((ex: any) => {
            const lib = FULL_EXERCISE_LIBRARY.find(e => e.id === ex.id);
            if (lib) {
                fatigueStats[lib.type] = (fatigueStats[lib.type] || 0) + ex.sets;
                totalSets += ex.sets;
            }
        }));

        return (
            <div className="space-y-6 animate-fade-in pb-20">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">數據分析中心</h2>
                    <div className="text-xs text-slate-400">Based on Scientific Hypertrophy Principles</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* 1. Training Efficiency (Volume) */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Icons.BarChart className="text-purple-400"/> 訓練容量預估 (Volume Load)</h3>
                        <div className="h-48 relative flex items-end justify-between px-2 border-l border-b border-slate-600">
                            {weeklyVolumeLoad.map((vol, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 group relative h-full">
                                    <div className="w-4 bg-purple-500/50 rounded-t hover:bg-purple-400 transition-colors" style={{height: `${(vol/20000)*100}%`}}></div>
                                    <div className="text-[10px] text-slate-500 mt-1">M{i+1}</div>
                                </div>
                            ))}
                        </div>
                         <div className="text-xs text-slate-400 mt-2 text-center">
                            預估每月總訓練量趨勢 (Kg * Reps)
                        </div>
                    </div>

                    {/* 2. CNS Fatigue Source */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Icons.Zap className="text-yellow-400"/> 神經控管：器材壓力配置 (CNS)</h3>
                        <div className="space-y-4">
                            {Object.entries(fatigueStats).map(([type, count]: any) => {
                                const pct = totalSets > 0 ? (count / totalSets) * 100 : 0;
                                let color = 'bg-slate-500';
                                if(type === 'Free Weight') color = 'bg-orange-500'; // High Fatigue
                                if(type === 'Machine') color = 'bg-green-500'; // Low Fatigue
                                if(type === 'Cable') color = 'bg-blue-400';
                                if(type === 'Bodyweight') color = 'bg-red-400';
                                if(type === 'Cardio') color = 'bg-cyan-400';

                                return (
                                    <div key={type}>
                                        <div className="flex justify-between text-xs mb-1 text-slate-300">
                                            <span>{type}</span>
                                            <span>{pct.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                                            <div className={`h-full ${color} bar-fill`} style={{width: `${pct}%`}}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 3. Strength Progression (Hypothetical) */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 md:col-span-2">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Icons.TrendingUp className="text-blue-400"/> 肌力成長與保留 (Strength)</h3>
                        <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-600 pb-2">
                            {[100, 102, 105, 108, 110, 112, 115, 118, 120, 122, 115, 125].slice(0, maxMonths).map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                    <div className="text-[10px] text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">{val}kg</div>
                                    <div className="w-full bg-blue-600/50 hover:bg-blue-500 rounded-t transition-all bar-fill relative" style={{height: `${(val/130)*100}%`}}></div>
                                    <div className="text-[10px] text-slate-500">M{i+1}</div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-xs text-slate-400 mt-2">S級動作 (如深蹲/硬舉) 1RM 預估趨勢</div>
                    </div>
                </div>
            </div>
        );
    };

    const renderNutrition = () => {
        const nutrition = calculateNutrition(userProfile);
        
        return (
             <div className="space-y-6 animate-fade-in pb-20">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Icons.Utensils className="text-orange-400"/> 營養與補給建議</h2>
                        <p className="text-xs text-slate-400">目前模式：{userProfile.goal === 'hypertrophy' ? '增肌 (Hypertrophy)' : '減脂 (Fat Loss)'}</p>
                    </div>
                </div>

                {/* TDEE & Calories */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center items-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 ${userProfile.goal === 'hypertrophy' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <div className="text-slate-400 text-sm mb-1">每日目標熱量 (Target Calories)</div>
                        <div className="text-4xl font-bold text-white flex items-baseline gap-1">
                            {nutrition.targetCalories} <span className="text-sm font-normal text-slate-500">kcal</span>
                        </div>
                        <div className={`text-xs mt-2 flex items-center gap-1 ${userProfile.goal === 'hypertrophy' ? 'text-orange-400' : 'text-green-400'}`}>
                            <Icons.TrendingUp size={12}/> 
                            {userProfile.goal === 'hypertrophy' ? '+250 kcal (盈餘)' : '-400 kcal (赤字)'}
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="font-bold text-white text-sm">三大營養素分配 (Macros)</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-blue-300">蛋白質 (Protein)</span>
                                    <span className="text-white font-bold">{nutrition.protein}g</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 rounded-full"><div className="bg-blue-500 h-full rounded-full" style={{width: `${(nutrition.protein * 4 / nutrition.targetCalories)*100}%`}}></div></div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{userProfile.goal === 'hypertrophy' ? '2.0g/kg (標準)' : '2.4g/kg (減脂期提高以保肌)'}</div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-yellow-300">碳水化合物 (Carbs)</span>
                                    <span className="text-white font-bold">{nutrition.carbs}g</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 rounded-full"><div className="bg-yellow-500 h-full rounded-full" style={{width: `${(nutrition.carbs * 4 / nutrition.targetCalories)*100}%`}}></div></div>
                                <div className="text-[10px] text-slate-500 mt-0.5">能量主要來源</div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-red-300">脂肪 (Fats)</span>
                                    <span className="text-white font-bold">{nutrition.fat}g</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 rounded-full"><div className="bg-red-500 h-full rounded-full" style={{width: `${(nutrition.fat * 9 / nutrition.targetCalories)*100}%`}}></div></div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{userProfile.goal === 'hypertrophy' ? '0.9g/kg' : '0.7g/kg (降低熱量)'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supplements & Timing */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <div className="p-4 bg-slate-900/50 border-b border-slate-700">
                        <h3 className="font-bold text-white">建議補給品與時機</h3>
                    </div>
                    <div className="divide-y divide-slate-700/50">
                         <div className="p-4 flex gap-4 items-start">
                             <div className="bg-blue-900/30 p-2 rounded text-blue-400 font-bold text-xs whitespace-nowrap">訓練前 Pre</div>
                             <div>
                                 <h4 className="text-white font-bold text-sm">咖啡因 (Caffeine) / 精氨酸 (Citrulline)</h4>
                                 <p className="text-xs text-slate-400 mt-1">提升專注力與充血感。減脂期咖啡因亦有助於提升代謝率。</p>
                             </div>
                         </div>
                         <div className="p-4 flex gap-4 items-start">
                             <div className="bg-green-900/30 p-2 rounded text-green-400 font-bold text-xs whitespace-nowrap">訓練後 Post</div>
                             <div>
                                 <h4 className="text-white font-bold text-sm">乳清蛋白 (Whey)</h4>
                                 <p className="text-xs text-slate-400 mt-1">
                                     {userProfile.goal === 'hypertrophy' ? '搭配快速碳水 (如香蕉/葡萄糖) 幫助回填。' : '單獨攝取乳清，減少多餘碳水攝取。'}
                                 </p>
                             </div>
                         </div>
                         <div className="p-4 flex gap-4 items-start">
                             <div className="bg-purple-900/30 p-2 rounded text-purple-400 font-bold text-xs whitespace-nowrap">每日 Daily</div>
                             <div>
                                 <h4 className="text-white font-bold text-sm">肌酸 (Creatine) {userProfile.goal === 'fat_loss' && '/ 魚油 (Fish Oil)'}</h4>
                                 <p className="text-xs text-slate-400 mt-1">肌酸每日 5g。{userProfile.goal === 'fat_loss' && '減脂期建議補充魚油 (Omega-3) 幫助抗發炎與脂肪代謝。'}</p>
                             </div>
                         </div>
                    </div>
                </div>
             </div>
        )
    };

    const renderSettings = () => (
        <div className="space-y-8 animate-fade-in pb-20">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-white">個人化參數設定</h2>
                <button className="text-xs text-blue-400 hover:text-blue-300">重置所有數據</button>
            </div>

            {/* Goal Selector */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <label className="block text-white font-bold text-lg mb-2">您的主要目標</label>
                <div className="flex gap-4">
                    <button 
                        onClick={() => { setUserProfile({...userProfile, goal: 'hypertrophy'}); setCurrentMonth(1); }}
                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${userProfile.goal === 'hypertrophy' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                        <Icons.TrendingUp size={24} />
                        <span className="font-bold">肌肥大 (Hypertrophy)</span>
                        <span className="text-xs opacity-75">週期：6-12 個月</span>
                    </button>
                    <button 
                        onClick={() => { setUserProfile({...userProfile, goal: 'fat_loss'}); setCurrentMonth(1); }}
                        className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${userProfile.goal === 'fat_loss' ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>
                        <Icons.Flame size={24} />
                        <span className="font-bold">減脂 (Fat Loss)</span>
                        <span className="text-xs opacity-75">週期：4 個月</span>
                    </button>
                </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">暱稱</label>
                        <input type="text" value={userProfile.name} onChange={(e)=>setUserProfile({...userProfile, name:e.target.value})} 
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-slate-400 text-sm mb-2">身高 (cm)</label>
                             <input type="number" value={userProfile.height} onChange={(e)=>setUserProfile({...userProfile, height:parseInt(e.target.value)})}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none"/>
                        </div>
                        <div>
                             <label className="block text-slate-400 text-sm mb-2">體重 (kg)</label>
                             <input type="number" value={userProfile.weight} onChange={(e)=>setUserProfile({...userProfile, weight:parseInt(e.target.value)})}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none"/>
                        </div>
                    </div>
                </div>

                {/* Training Stats */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">訓練年資</label>
                        <select value={userProfile.trainingLevel} onChange={(e)=>setUserProfile({...userProfile, trainingLevel:parseInt(e.target.value)})}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none">
                            <option value={1}>新手 (0-1年)</option>
                            <option value={2}>中階 (1-3年)</option>
                            <option value={3}>老手 (&gt;3年)</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-slate-400 text-sm mb-2">需加強弱項</label>
                        <select value={userProfile.weakPoint} onChange={(e)=>setUserProfile({...userProfile, weakPoint:e.target.value})}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none border-red-900/50 focus:border-red-500 text-red-100">
                            <option value="">無特別弱項</option>
                            {MUSCLE_GROUPS.filter(g => g!=='有氧').map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Frequency Selector */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <label className="block text-white font-bold text-lg mb-4">每週訓練天數 (Frequency)</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[1,2,3,4,5,6].map(d => (
                        <button
                            key={d}
                            onClick={() => setUserProfile({...userProfile, trainingDays: d})}
                            className={`py-3 rounded-lg border font-bold transition-all relative ${
                                userProfile.trainingDays === d 
                                ? 'bg-blue-600 text-white border-blue-500 ring-2 ring-blue-500/50' 
                                : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-700'
                            }`}
                        >
                            {d} 天
                        </button>
                    ))}
                </div>
                <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="text-blue-400 font-bold mb-1">{TRAINING_SPLITS[userProfile.trainingDays].name}</div>
                    <div className="text-slate-400 text-sm">{TRAINING_SPLITS[userProfile.trainingDays].desc}</div>
                </div>
            </div>
        </div>
    );

    // --- Modal & Workouts ---
    const renderSwapModal = () => {
        if (!swapModalOpen) return null;
        const filtered = FULL_EXERCISE_LIBRARY.filter(ex => 
            (ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || ex.group.includes(searchQuery)) &&
            (selectedMuscleFilter === 'All' || ex.group === selectedMuscleFilter)
        );

        return (
            <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-600 flex flex-col max-h-[85vh]">
                    <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-white">選擇動作</h3>
                        <button onClick={() => setSwapModalOpen(false)}><Icons.X className="text-slate-400 hover:text-white"/></button>
                    </div>
                    <div className="p-4 space-y-3 bg-slate-900/50">
                        <input type="text" placeholder="搜尋..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"/>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {['All', ...MUSCLE_GROUPS].map(m => (
                                <button key={m} onClick={()=>setSelectedMuscleFilter(m)}
                                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors border ${selectedMuscleFilter===m ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {filtered.map(ex => (
                            <button key={ex.id} onClick={() => handleSwapExercise(ex.id)}
                                className="w-full p-3 hover:bg-slate-700 rounded-lg flex justify-between items-center group transition-colors text-left border border-transparent hover:border-slate-600">
                                <div>
                                    <div className="text-white font-medium text-sm group-hover:text-blue-300">{ex.name}</div>
                                    <div className="text-slate-500 text-xs">{ex.group} • {ex.type}</div>
                                </div>
                                <div className="text-right">
                                    <Badge tier={ex.tier} />
                                    <div className="text-[10px] text-slate-500 mt-1">休 {ex.rest}s</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderWorkout = () => {
        if (!activeWorkout) return null;
        const dayInfo = program[activeWorkout.dayIndex];
        
        return (
            <div className="fixed inset-0 bg-slate-950 z-50 overflow-y-auto animate-slide-up flex flex-col">
                <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-4 flex justify-between items-center z-10 shadow-lg">
                    <div>
                        <h2 className="text-xl font-bold text-white">{dayInfo.name}</h2>
                        <div className="text-xs text-blue-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            訓練進行中
                        </div>
                    </div>
                    <button onClick={() => setActiveTab('dashboard')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"><Icons.X /></button>
                </div>

                <div className="flex-1 p-4 pb-32 max-w-3xl mx-auto w-full space-y-6">
                    {/* Stats Card */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700">
                        <h4 className="text-sm text-slate-400 mb-3">訓練前狀態檢核 (Readiness)</h4>
                        <div className="flex gap-2">
                            {['精神飽滿', '普通', '疲勞', '痠痛'].map(s => (
                                <button key={s} className="flex-1 py-3 text-xs md:text-sm bg-slate-800 border border-slate-600 rounded hover:bg-blue-600 hover:border-blue-500 hover:text-white text-slate-300 transition-all focus:ring-2 ring-blue-500">{s}</button>
                            ))}
                        </div>
                    </div>

                    {activeWorkout.exercises.map((ex: any, idx: number) => {
                        const details = FULL_EXERCISE_LIBRARY.find(e => e.id === ex.id) || { name: '未知', type: '未知', tier: 'C', rest: 60 };
                        return (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{details.name}</h3>
                                        <div className="text-xs text-slate-400 mt-1">{details.type} • 目標: {ex.reps} 下</div>
                                        <div className="flex gap-2 mt-2">
                                            {ex.technique && ex.technique !== 'none' && (
                                                <div className={`text-xs px-2 py-1 rounded border inline-block flex items-center gap-1 ${ADVANCED_TECHNIQUES[ex.technique].color}`}>
                                                    <Icons.Zap size={10} /> {ADVANCED_TECHNIQUES[ex.technique].name}
                                                </div>
                                            )}
                                            <div className="text-xs px-2 py-1 rounded border border-slate-700 bg-slate-800 text-slate-300 flex items-center gap-1">
                                                <Icons.Clock size={10} /> 休 {details.rest}s
                                            </div>
                                        </div>
                                    </div>
                                    <Badge tier={details.tier} />
                                </div>
                                <div className="p-4 space-y-2">
                                    {Array.from({length: ex.sets}).map((_, sIdx) => (
                                        <div key={sIdx} className="flex gap-2 items-center">
                                            <span className="w-6 text-slate-500 font-bold text-sm text-center">{sIdx+1}</span>
                                            <input type="number" placeholder="kg" className="flex-1 bg-slate-800 text-white rounded p-3 text-center border border-slate-700 focus:border-blue-500 outline-none"/>
                                            <span className="text-slate-600">x</span>
                                            <input type="text" placeholder={ex.reps} className="w-20 bg-slate-800 text-white rounded p-3 text-center border border-slate-700 focus:border-blue-500 outline-none"/>
                                            <button className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:bg-green-600 hover:border-green-500 hover:text-white flex items-center justify-center transition-all">
                                                <Icons.CheckCircle size={20}/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur border-t border-slate-800 z-20">
                    <div className="max-w-3xl mx-auto">
                        <button onClick={handleFinishWorkout} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/50 transition-all active:scale-[0.98]">
                            完成訓練 & 儲存紀錄
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen font-sans text-slate-200 overflow-hidden bg-slate-950">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
                        <Icons.Dumbbell className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight leading-none">HyperSmart</h1>
                        <span className="text-xs text-blue-400 font-medium">AI Coach V4</span>
                    </div>
                </div>
                <nav className="space-y-2 flex-1">
                    {[
                        { id: 'dashboard', icon: Icons.LayoutDashboard, label: '總覽儀表板' },
                        { id: 'planner', icon: Icons.ClipboardList, label: '課表規劃' },
                        { id: 'analytics', icon: Icons.PieChart, label: '數據分析' },
                        { id: 'nutrition', icon: Icons.Utensils, label: '營養建議' },
                        { id: 'settings', icon: Icons.Settings, label: '個人化設定' },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                            <item.icon size={20} /> {item.label}
                        </button>
                    ))}
                </nav>
                <div className="text-xs text-slate-600 text-center">
                    © 2023 HyperSmart Trainer
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Icons.Dumbbell className="text-white" size={18} />
                        </div>
                        <span className="font-bold text-white text-lg">HyperSmart V4</span>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-5xl mx-auto">
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'planner' && renderPlanner()}
                        {activeTab === 'analytics' && renderAnalytics()}
                        {activeTab === 'nutrition' && renderNutrition()}
                        {activeTab === 'settings' && renderSettings()}
                    </div>
                </main>

                {/* Mobile Navigation Bar */}
                <div className="md:hidden bg-slate-900 border-t border-slate-800 flex justify-around p-2 pb-safe z-30">
                    {[
                        { id: 'dashboard', icon: Icons.LayoutDashboard, label: '總覽' },
                        { id: 'planner', icon: Icons.ClipboardList, label: '課表' },
                        { id: 'analytics', icon: Icons.PieChart, label: '分析' },
                        { id: 'nutrition', icon: Icons.Utensils, label: '營養' },
                        { id: 'settings', icon: Icons.Settings, label: '設定' },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg flex-1 ${activeTab === item.id ? 'text-blue-400 bg-blue-900/10' : 'text-slate-500'}`}>
                            <item.icon size={22} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'workout' && renderWorkout()}
            {renderSwapModal()}
        </div>
    );
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<HyperSmartTrainerV4 />);
