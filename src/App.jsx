import React, { useState } from 'react';
import { 
  Sparkles, Camera, ArrowRight, Bone, ChevronLeft, CheckCircle2, 
  Bookmark, Volume2, X, Info, Trophy, Star, History, Compass, 
  ArrowLeft, Share2, Download, QrCode, Heart 
} from 'lucide-react';

const PawNamesApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedName, setSelectedName] = useState(null);
  const [sharingName, setSharingName] = useState(null);
  const [wizardData, setWizardData] = useState({
    petType: '',
    appearance: { color: '', size: '' },
    personality: []
  });

  // 模拟数据：名字结果及深度分析
  const generatedNames = [
    { 
      name: '云朵', 
      score: 98, 
      origin: '中式·治愈系', 
      tags: ['温柔', '纯洁'],
      summary: '象征轻盈与自由的极简之选。',
      analysis: {
        etymology: '取自“行到水穷处，坐看云起时”。代表一种随遇而安、从容淡泊的生命姿态。',
        personality: '适合性格温顺、动作轻盈的宠物，能强化其灵动治愈的视觉感受。',
        popularity: '在精致宠物圈中极受欢迎。'
      }
    },
    { 
      name: 'Lucky', 
      score: 92, 
      origin: '英文·经典', 
      tags: ['幸运', '活力'],
      summary: '寓意好运与无限活力的名字。',
      analysis: {
        etymology: '经典的英文命名，代表家庭的幸运星。',
        personality: '适合活泼好动，总能给家里带来欢笑的宠物。',
        popularity: '全球范围内长盛不衰的经典。'
      }
    }
  ];

  // --- 组件：Apple 风格选择卡片 ---
  const SelectionCard = ({ label, emoji, isSelected, onClick, description }) => (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 active:scale-[0.96] ${
        isSelected ? 'border-indigo-600 bg-indigo-50/30 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
    >
      {isSelected && <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-indigo-600" />}
      <span className="text-4xl mb-4 grayscale-[0.2]">{emoji}</span>
      <h4 className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{label}</h4>
      {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
    </button>
  );

  // --- 欢迎页面 ---
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
          <div className="mx-auto w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-12">
            <Bone className="w-10 h-10 text-white -rotate-12" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">PawNames</h1>
            <p className="text-lg text-slate-500">为你的爱宠找到那个“独一无二”的名字</p>
          </div>
          <button onClick={() => setCurrentScreen('dashboard')} className="btn-apple-primary w-full text-lg py-4">
            开始起名之旅 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // --- 仪表盘页面 ---
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 animate-fade-in-up">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Bone className="w-5 h-5 text-white" />
              </div>
              <span>PawNames</span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-8 space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">AI 智能起名中心</h2>
            <p className="text-slate-500">结合品种与性格特征，让起名更懂你的宠物</p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div onClick={() => { setCurrentScreen('wizard'); setWizardStep(1); }} className="glass-card p-10 cursor-pointer group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">文本起名向导</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">基于专业问答，深入分析宠物的内在特质。</p>
              <span className="text-indigo-600 font-semibold flex items-center gap-2">
                立即开始 <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="glass-card p-10 border-dashed border-2 border-slate-300 bg-slate-50/50 shadow-none">
              <div className="w-14 h-14 bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center mb-6">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">视觉起名（开发中）</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">上传照片，AI 将分析毛色与气质氛围。</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- 向导页面 ---
  if (currentScreen === 'wizard') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <button onClick={() => wizardStep === 1 ? setCurrentScreen('dashboard') : setWizardStep(wizardStep-1)} className="p-2 hover:bg-slate-100 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 mb-1">STEP {wizardStep} / 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(s => <div key={s} className={`h-1 w-8 rounded-full ${s <= wizardStep ? 'bg-indigo-600' : 'bg-slate-200'}`} />)}
              </div>
            </div>
            <div className="w-9" />
          </div>
        </header>

        <main className="max-w-3xl mx-auto w-full px-6 py-12">
          {wizardStep === 1 && (
            <div className="space-y-8 animate-slide-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">伙伴的类型？</h2>
                <p className="text-slate-500">选择类型将确定名字的语言节奏</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{id:'dog', l:'狗狗', e:'🐕'},{id:'cat', l:'猫咪', e:'🐱'}].map(t => (
                  <SelectionCard key={t.id} label={t.l} emoji={t.e} isSelected={wizardData.petType===t.id} onClick={()=>{setWizardData({...wizardData, petType:t.id}); setWizardStep(2)}} />
                ))}
              </div>
            </div>
          )}
          {wizardStep === 2 && (
            <div className="space-y-8 animate-slide-in">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">描述它的颜色</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['纯黑', '纯白', '奶油', '橘黄'].map(c => (
                    <button key={c} onClick={()=>{setWizardData({...wizardData, appearance: {...wizardData.appearance, color:c}}); setWizardStep(3)}} className={`px-6 py-3 rounded-full border ${wizardData.appearance.color===c ? 'bg-slate-900 text-white' : 'bg-white'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {wizardStep === 3 && (
            <div className="text-center space-y-8 animate-slide-in">
              <h2 className="text-3xl font-bold">准备好生成了吗？</h2>
              <button onClick={() => setCurrentScreen('results')} className="btn-apple-primary w-full py-4">生成专属方案</button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // --- 结果展示页面 ---
  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-fade-in-up">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex justify-between items-center">
            <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 text-slate-400">
              <ArrowLeft className="w-4 h-4" /> <span className="text-xs font-bold tracking-widest">返回</span>
            </button>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><Bone className="w-5 h-5 text-white" /></div>
          </header>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">精心挑选的方案</h1>
            <p className="text-slate-500">基于 AI 算法计算出的高共鸣起名建议。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generatedNames.map((item, idx) => (
              <div key={idx} className="apple-card group" onClick={() => setSelectedName(item)}>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-indigo-600" /></div>
                    <div className="px-3 py-1 bg-slate-50 rounded-full border text-[10px] font-bold text-slate-400 tracking-tighter">MATCH {item.score}%</div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-bold group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{item.origin}</p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.summary}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 flex items-center gap-1">深度解析 <Info className="w-3 h-3" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setSharingName(item); }} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 深度解析模态框 */}
        {selectedName && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 apple-blur" onClick={() => setSelectedName(null)} />
            <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl animate-fade-in-up">
              <button onClick={() => setSelectedName(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl font-bold tracking-tighter mb-2">{selectedName.name}</h2>
                  <div className="flex gap-2">{selectedName.tags.map(t => <span key={t} className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{t}</span>)}</div>
                </div>
                <section className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">寓意溯源</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedName.analysis.etymology}</p>
                </section>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">性格契合</span><p className="text-sm text-slate-700 mt-1">{selectedName.analysis.personality}</p></div>
                  <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50"><span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">趋势</span><p className="text-sm text-indigo-900 mt-1 font-medium">{selectedName.analysis.popularity}</p></div>
                </div>
                <button className="btn-apple-primary w-full py-4 text-lg">选定这个名字</button>
              </div>
            </div>
          </div>
        )}

        {/* 分享海报模态框 */}
        {sharingName && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSharingName(null)} />
            <div className="relative w-full max-w-sm">
              <div className="share-poster flex flex-col p-10 justify-between bg-white animate-fade-in-up">
                <div className="poster-gradient" />
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2"><div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center"><Heart className="w-3 h-3 text-white fill-current" /></div><span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">PawNames AI Selection</span></div>
                  <div className="text-right"><p className="text-[8px] font-bold text-slate-400 uppercase leading-none">Match Score</p><p className="text-xl font-black text-indigo-600">{sharingName.score}</p></div>
                </div>
                <div className="relative z-10 space-y-3">
                  <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">{sharingName.name}</h2>
                  <p className="text-lg text-slate-600 font-medium">“{sharingName.summary}”</p>
                </div>
                <div className="relative z-10 flex items-end justify-between pt-8 border-t">
                  <p className="text-[10px] text-slate-400 max-w-[150px] leading-tight">{sharingName.analysis.etymology.slice(0, 40)}...</p>
                  <div className="flex flex-col items-center gap-1"><div className="p-1 bg-white border rounded shadow-sm"><QrCode className="w-8 h-8 text-slate-900" /></div><span className="text-[6px] font-bold text-slate-300 tracking-tighter">SCAN TO FIND NAMES</span></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white text-slate-900 rounded-xl py-3 text-sm font-bold shadow-xl">保存到相册</button>
                <button onClick={() => setSharingName(null)} className="p-3 bg-white/10 rounded-xl text-white"><X className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default PawNamesApp;
