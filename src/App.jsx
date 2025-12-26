import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Camera, ArrowRight, Bone, ChevronLeft, CheckCircle2, 
  Bookmark, Volume2, X, Info, Trophy, Star, History, Compass, 
  ArrowLeft, Share2, Download, QrCode, Heart, ShieldCheck, 
  Plus, Image as ImageIcon, MessageCircle, BarChart3, Bell, User, LayoutGrid
} from 'lucide-react';

const PawNamesApp = () => {
  // --- 路由与全局状态 ---
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedName, setSelectedName] = useState(null);
  const [sharingName, setSharingName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // --- 业务数据状态 ---
  const [wizardData, setWizardData] = useState({
    petType: '', breed: '', color: '', size: '', personality: [], style: ''
  });
  
  const [myPets, setMyPets] = useState([
    { id: 'PAW-9901', name: '云朵', type: '猫咪', breed: '布偶', status: '健康', icon: '🐱' }
  ]);

  // --- 模拟生成的名字数据 ---
  const generatedResults = [
    { 
      name: '云朵', score: 98, origin: '中式治愈', summary: '像轻盈自由的浮云，自带温柔滤镜。',
      analysis: { etymology: '取自“闲看云卷云舒”，代表从容。', lucky: '性格温顺者的首选。', trend: '社交平台高人气词。' }
    },
    { 
      name: 'Pudding', score: 92, origin: '西式甜点', summary: '甜糯可爱，适合活泼亲人的小家伙。',
      analysis: { etymology: '源于法式甜点，象征生活甜美。', lucky: '适合橘黄色系宠物。', trend: '经典永不过时。' }
    }
  ];

  // --- 底部导航栏组件 ---
  const BottomNav = () => (
    <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 h-20 flex items-center justify-around px-6 z-[60]">
      {[
        { id: 'dashboard', icon: Sparkles, label: '起名' },
        { id: 'community', icon: MessageCircle, label: '社区' },
        { id: 'my_pets', icon: Bone, label: '我的' }
      ].map((tab) => (
        <button 
          key={tab.id}
          onClick={() => setCurrentScreen(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all ${currentScreen === tab.id ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <tab.icon className="w-6 h-6" strokeWidth={currentScreen === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
    </nav>
  );

  // ================= 模块 1: 启动与仪表盘 =================
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-10 text-center text-white">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-8 animate-bounce">
          <Bone className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter mb-4">PawNames</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-xs leading-relaxed">AI 驱动的宠物命名专家，为爱宠打造独一无二的数字身份。</p>
        <button onClick={() => setCurrentScreen('dashboard')} className="btn-apple-primary w-full max-w-sm">
          开启起名之旅 <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-brand-bg pb-24 animate-fade-in-up">
        <header className="p-8 flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">起名中心</h2>
            <p className="text-slate-400 text-sm">选择你喜欢的起名方式</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center"><User className="text-slate-300" /></div>
        </header>

        <main className="px-8 space-y-6">
          <div onClick={() => { setCurrentScreen('wizard'); setWizardStep(1); }} className="apple-card bg-indigo-600 text-white cursor-pointer group">
            <Sparkles className="w-8 h-8 mb-4 opacity-80 group-hover:scale-125 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">文本起名向导</h3>
            <p className="text-indigo-100 text-sm">通过5步问答，深度分析宠物性格与品种特质。</p>
          </div>
          <div onClick={() => setCurrentScreen('vision')} className="apple-card cursor-pointer group">
            <Camera className="w-8 h-8 text-indigo-600 mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-2xl font-bold mb-2 text-slate-900">视觉起名 (灵眸)</h3>
            <p className="text-slate-400 text-sm">基于 AI 图像识别技术，捕捉照片中的神韵灵感。</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 flex flex-col items-center gap-2"><Trophy className="text-amber-500" /><span className="text-xs font-bold">热门榜单</span></div>
            <div className="glass-card p-6 flex flex-col items-center gap-2 opacity-50"><Compass className="text-slate-400" /><span className="text-xs font-bold">命理星盘</span></div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ================= 模块 2: 起名向导与分析 =================
  if (currentScreen === 'wizard') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="h-16 border-b border-slate-50 flex items-center justify-between px-6">
          <button onClick={() => wizardStep === 1 ? setCurrentScreen('dashboard') : setWizardStep(wizardStep-1)}><ChevronLeft /></button>
          <div className="flex gap-1.5">{[1,2,3,4,5].map(s => <div key={s} className={`h-1 w-6 rounded-full ${s <= wizardStep ? 'bg-indigo-600' : 'bg-slate-100'}`} />)}</div>
          <div className="w-6" />
        </header>
        <main className="flex-1 p-8 animate-slide-in">
          {wizardStep === 1 && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">你的伙伴是什么类型？</h2>
              <div className="grid grid-cols-2 gap-4">
                {[{id:'dog', l:'狗狗', e:'🐕'}, {id:'cat', l:'猫咪', e:'🐱'}].map(t => (
                  <button key={t.id} onClick={() => { setWizardData({...wizardData, petType: t.id}); setWizardStep(2); }} className="p-8 rounded-[2rem] bg-slate-50 border-2 border-transparent hover:border-indigo-600 transition-all flex flex-col items-center gap-3">
                    <span className="text-5xl">{t.e}</span><span className="font-bold">{t.l}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {wizardStep === 2 && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">确认它的品种</h2>
              <input type="text" placeholder="输入品种 (如: 金毛, 布偶...)" className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 outline-none" />
              <button onClick={() => setWizardStep(3)} className="btn-apple-primary w-full">下一步</button>
            </div>
          )}
          {wizardStep === 3 && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">挑选外观色调</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {['雪白', '墨黑', '奶黄', '灰蓝', '花纹'].map(c => (
                  <button key={c} onClick={() => { setWizardData({...wizardData, color: c}); setWizardStep(4); }} className="px-8 py-3 rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all">{c}</button>
                ))}
              </div>
            </div>
          )}
          {wizardStep === 4 && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">它的性格是？</h2>
              <div className="grid grid-cols-2 gap-3">
                {['活泼粘人', '高冷安静', '调皮捣蛋', '温柔治愈'].map(p => (
                  <button key={p} onClick={() => setWizardStep(5)} className="p-5 bg-slate-50 rounded-2xl font-medium border border-transparent hover:border-indigo-600">{p}</button>
                ))}
              </div>
            </div>
          )}
          {wizardStep === 5 && (
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">偏好的命名风格</h2>
              <div className="grid grid-cols-1 gap-3">
                {['中式诗意', '英式经典', '搞怪有趣', '日系清新'].map(s => (
                  <button key={s} onClick={() => { setIsAnalyzing(true); setTimeout(() => { setIsAnalyzing(false); setCurrentScreen('results'); }, 2500); }} className="p-6 bg-slate-50 rounded-2xl text-lg font-bold">✨ {s}</button>
                ))}
              </div>
            </div>
          )}
        </main>
        {isAnalyzing && (
          <div className="fixed inset-0 z-[100] apple-blur flex flex-col items-center justify-center p-10 text-center text-white">
            <div className="w-20 h-20 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-6" />
            <h3 className="text-2xl font-bold mb-2 italic">AI 正在深度思考...</h3>
            <p className="text-indigo-200">正在从 10,000+ 个名字库中为你精准匹配</p>
          </div>
        )}
      </div>
    );
  }

  // ================= 模块 3: 建议结果与证书 =================
  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen bg-brand-bg p-8 pb-32 animate-fade-in-up">
        <header className="flex justify-between items-center mb-10">
          <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase"><ArrowLeft size={16}/> 返回</button>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><Bone size={20} className="text-white"/></div>
        </header>

        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">推荐方案</h1>
          <p className="text-slate-400">基于你的爱宠特征，我们锁定了以下名字。</p>
        </div>

        <div className="space-y-6">
          {generatedResults.map((res, i) => (
            <div key={i} className="apple-card relative overflow-hidden" onClick={() => setSelectedName(res)}>
              <div className="absolute top-0 right-0 p-4"><span className="text-[10px] font-black text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">MATCH {res.score}%</span></div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold">{res.name}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">{res.summary}</p>
                <div className="flex gap-4 pt-4 border-t border-slate-50 items-center justify-between">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Volume2 size={20}/></button>
                    <button onClick={(e) => { e.stopPropagation(); setSharingName(res); }} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Share2 size={20}/></button>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentScreen('certificate'); }} className="btn-apple-primary px-6 py-3 text-sm">选定此名</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 名字详情 Modal */}
        {selectedName && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 apple-blur" onClick={() => setSelectedName(null)} />
            <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl animate-fade-in-up">
              <button onClick={() => setSelectedName(null)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X size={20}/></button>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-5xl font-black">{selectedName.name}</h2>
                  <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">{selectedName.origin}</p>
                </div>
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300 font-bold uppercase text-[10px] tracking-widest"><History size={14}/> 名字解析</div>
                  <p className="text-slate-600 leading-relaxed text-lg">{selectedName.analysis.etymology}</p>
                </section>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100"><p className="text-[10px] font-bold text-slate-300 uppercase mb-2">性格建议</p><p className="text-sm font-medium">{selectedName.analysis.lucky}</p></div>
                  <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/30"><p className="text-[10px] font-bold text-indigo-400 uppercase mb-2">趋势分析</p><p className="text-sm font-bold text-indigo-900">{selectedName.analysis.trend}</p></div>
                </div>
                <button onClick={() => setCurrentScreen('certificate')} className="btn-apple-primary w-full text-lg">生成出生证明</button>
              </div>
            </div>
          </div>
        )}
        <BottomNav />
      </div>
    );
  }

  // ================= 模块 4: 出生证明与档案管理 =================
  if (currentScreen === 'certificate') {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center justify-center animate-fade-in-up">
        <div className="w-full max-w-sm space-y-10">
          <div className="bg-[#FCFBF7] rounded-sm p-8 flex flex-col items-center justify-between border-[16px] border-double border-slate-200 shadow-2xl relative aspect-[1/1.4]">
            <div className="text-center space-y-2">
              <ShieldCheck size={48} className="text-indigo-600 mx-auto" />
              <h2 className="font-serif text-2xl tracking-[0.3em] border-b border-slate-200 pb-2">CERTIFICATE</h2>
            </div>
            <div className="text-center space-y-6">
              <p className="text-[10px] italic text-slate-400 uppercase">Recognized globally as</p>
              <p className="text-6xl font-serif font-bold text-slate-900 underline decoration-indigo-200 underline-offset-8">云朵</p>
              <p className="text-sm font-medium mt-4">2025年12月26日 诞生</p>
            </div>
            <div className="w-full flex justify-between items-end border-t border-slate-100 pt-6">
              <div className="text-left"><p className="text-[8px] font-bold text-slate-400">PET ID</p><p className="font-mono text-[10px]">PAW-8829-001</p></div>
              <QrCode size={40} className="text-slate-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex-1 btn-apple-primary bg-white text-slate-900 border-none"><Download size={18}/> 保存</button>
            <button onClick={() => setCurrentScreen('my_pets')} className="flex-1 btn-apple-primary">完成同步</button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'my_pets') {
    return (
      <div className="min-h-screen bg-brand-bg pb-24 animate-fade-in-up">
        <header className="p-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">宠物档案</h1>
          <button className="p-3 bg-white rounded-2xl shadow-sm"><Plus size={20}/></button>
        </header>
        <main className="px-8 space-y-6">
          {myPets.map(pet => (
            <div key={pet.id} className="apple-card flex flex-col gap-6">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 bg-slate-100 rounded-[2.2rem] flex items-center justify-center text-4xl">{pet.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold">{pet.name}</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{pet.breed} • {pet.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-4 bg-indigo-50 rounded-2xl text-indigo-600 font-bold text-sm"><Bell size={16}/> 健康管理</button>
                <button className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl text-slate-500 font-bold text-sm"><ImageIcon size={16}/> 成长照片墙</button>
              </div>
            </div>
          ))}
        </main>
        <BottomNav />
      </div>
    );
  }

  // ================= 模块 5: 社区互动与分享 =================
  if (currentScreen === 'community') {
    return (
      <div className="min-h-screen bg-white pb-24 animate-fade-in-up">
        <header className="p-8 sticky top-0 bg-white/80 backdrop-blur-lg z-40 border-b border-slate-50">
          <h1 className="text-3xl font-bold">名字社区</h1>
          <div className="flex gap-6 mt-6 overflow-x-auto scrollbar-hide text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
            <span className="text-indigo-600 border-b-2 border-indigo-600 pb-2">名字故事</span>
            <span>名字 PK</span>
            <span>热门榜单</span>
          </div>
        </header>
        <main className="p-8 space-y-12">
          {[1,2].map(i => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full" />
                <div><p className="text-sm font-bold">铲屎官小王</p><p className="text-[10px] text-slate-300">3小时前发布</p></div>
              </div>
              <div className="aspect-[4/3] bg-slate-50 rounded-[2.5rem] flex items-center justify-center border border-slate-100 text-slate-200 italic"><ImageIcon size={48} className="opacity-20"/></div>
              <p className="text-slate-600 leading-relaxed"><span className="font-bold text-indigo-600">#名字故事</span> “云朵”真的是个很温柔的名字，每次叫它它都会慢慢回头看我，心都化了...</p>
              <div className="flex gap-6 text-slate-300">
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"><Heart size={18}/> <span className="text-xs font-bold">128</span></button>
                <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"><MessageCircle size={18}/> <span className="text-xs font-bold">45</span></button>
              </div>
            </div>
          ))}
        </main>
        <BottomNav />
      </div>
    );
  }

  return null;
};

export default PawNamesApp;
