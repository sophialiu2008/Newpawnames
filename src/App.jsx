import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Camera, ArrowRight, Bone, ChevronLeft, CheckCircle2, 
  Bookmark, Volume2, X, Info, Trophy, Star, History, Compass, 
  ArrowLeft, Share2, Download, QrCode, Heart, ShieldCheck, 
  Plus, Image as ImageIcon, MessageCircle, BarChart3, Bell, User
} from 'lucide-react';

const PawNamesApp = () => {
  // --- 状态管理：页面路由与业务数据 ---
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedName, setSelectedName] = useState(null);
  const [sharingName, setSharingName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [wizardData, setWizardData] = useState({
    petType: '', breed: '', appearance: { color: '', size: '' },
    personality: [], style: ''
  });

  const [myPets, setMyPets] = useState([
    { id: 'PET-8829', name: '云朵', type: '猫咪', breed: '布偶猫', status: '健康' }
  ]);

  // --- 模拟数据：名字结果 ---
  const generatedNames = [
    { 
      name: '云朵', score: 98, origin: '中式·治愈系', tags: ['温柔', '纯洁'],
      summary: '象征轻盈与自由的极简之选。',
      analysis: { etymology: '取自“坐看云起时”，代表从容淡泊。', personality: '契合温顺特质。', popularity: '高增长趋势' }
    },
    { 
      name: 'Nimbus', score: 91, origin: '英式·自然', tags: ['高贵', '灵动'],
      summary: '拉丁语意为“雨云”，自带贵族气息。',
      analysis: { etymology: '源自古典拉丁语。', personality: '适合高冷且优雅的宠物。', popularity: '小众精英选' }
    }
  ];

  // --- 组件：通用返回与进度头 ---
  const ScreenHeader = ({ title, onBack, showProgress = false, step = 1 }) => (
    <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        {showProgress ? (
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Step {step} of 5</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(s => <div key={s} className={`h-1 w-6 rounded-full ${s <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />)}
            </div>
          </div>
        ) : <h2 className="font-bold text-slate-800">{title}</h2>}
        <div className="w-9" />
      </div>
    </header>
  );

  // ================= 1. 初始接触与起名中心 =================
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        <div className="mx-auto w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-200 mb-8 rotate-12">
          <Bone className="w-12 h-12 text-white -rotate-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">PawNames</h1>
        <p className="text-lg text-slate-500 mb-10 max-w-xs">为你的爱宠开启一段充满智慧的命名之旅</p>
        <button onClick={() => setCurrentScreen('dashboard')} className="btn-apple-primary w-full max-w-sm py-4 text-lg">
          开始起名之旅 <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // AI 智能起名中心仪表板
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        <header className="p-8 max-w-5xl mx-auto flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">你好，铲屎官</h2>
            <p className="text-slate-400 text-sm">今天想为哪位新成员寻找名字？</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100"><User className="text-slate-400" /></div>
        </header>

        <main className="max-w-5xl mx-auto px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => { setCurrentScreen('wizard'); setWizardStep(1); }} className="apple-card group cursor-pointer border-none shadow-md">
              <Sparkles className="w-8 h-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">文本起名向导</h3>
              <p className="text-slate-500 text-sm">通过性格、品种等5步问答获取精准推荐。</p>
            </div>
            <div onClick={() => setCurrentScreen('vision')} className="apple-card group cursor-pointer bg-slate-900 text-white border-none">
              <Camera className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">视觉起名（灵眸）</h3>
              <p className="text-slate-400 text-sm">AI 识别照片特征，捕捉独特的瞬间灵感。</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 flex flex-col items-center gap-2">
              <Trophy className="text-amber-500" />
              <span className="text-sm font-bold">热门榜单</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center gap-2 text-slate-400">
              <Compass />
              <span className="text-sm font-bold">命理/星盘</span>
            </div>
          </div>
        </main>
        {/* 底部导航栏 */}
        <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 h-20 flex items-center justify-around px-8 z-50">
          <button onClick={() => setCurrentScreen('dashboard')} className="text-indigo-600 flex flex-col items-center gap-1"><Sparkles className="w-6 h-6" /><span className="text-[10px] font-bold">起名</span></button>
          <button onClick={() => setCurrentScreen('community')} className="text-slate-400 flex flex-col items-center gap-1"><MessageCircle className="w-6 h-6" /><span className="text-[10px] font-bold">社区</span></button>
          <button onClick={() => setCurrentScreen('my_pets')} className="text-slate-400 flex flex-col items-center gap-1"><Bone className="w-6 h-6" /><span className="text-[10px] font-bold">宠物</span></button>
        </nav>
      </div>
    );
  }

  // ================= 2. 视觉起名分析流 (路径 B) =================
  if (currentScreen === 'vision') {
    return (
      <div className="min-h-screen bg-white flex flex-col animate-fade-in-up">
        <ScreenHeader title="灵眸视觉起名" onBack={() => setCurrentScreen('dashboard')} />
        <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
          {!isAnalyzing ? (
            <div className="w-full max-w-sm space-y-8">
              <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group hover:border-indigo-400 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="text-indigo-600" />
                </div>
                <p className="font-bold text-slate-900">上传宠物照片</p>
                <p className="text-sm text-slate-400 mt-2">AI 将分析毛色、体态与神韵</p>
              </div>
              <button onClick={() => setIsAnalyzing(true)} className="btn-apple-primary w-full py-4">开始视觉分析</button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><Camera className="text-indigo-600 animate-pulse" /></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">灵眸分析中...</h3>
                <p className="text-slate-400 animate-pulse italic">“正在识别毛色特征与性格神韵...”</p>
              </div>
              {/* 模拟分析完成后跳转 */}
              {setTimeout(() => setCurrentScreen('results'), 3000) && null}
            </div>
          )}
        </main>
      </div>
    );
  }

  // ================= 3. 名字建议结果、收藏与出生证明 =================
  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen bg-slate-50 pb-12 animate-fade-in-up">
        <header className="p-8 flex justify-between items-end">
          <div className="space-y-2">
            <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-widest"><ArrowLeft className="w-3 h-3"/> 重新寻找</button>
            <h1 className="text-3xl font-bold">名字建议方案</h1>
          </div>
          <button onClick={() => setCurrentScreen('my_pets')} className="p-3 bg-white rounded-full border border-slate-100 shadow-sm"><Bookmark className="w-5 h-5 text-indigo-600"/></button>
        </header>

        <main className="px-8 grid grid-cols-1 gap-6">
          {generatedNames.map((item, idx) => (
            <div key={idx} className="apple-card flex flex-col md:flex-row justify-between gap-6" onClick={() => setSelectedName(item)}>
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-black tracking-tighter">{item.name}</h3>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md">MATCH {item.score}%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">{item.summary}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 border border-slate-100"><Volume2 className="w-3.5 h-3.5"/> 语音试读</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 border border-slate-100"><BarChart3 className="w-3.5 h-3.5"/> 重名查询</button>
                </div>
              </div>
              <div className="flex md:flex-col justify-end gap-3">
                <button onClick={(e) => { e.stopPropagation(); setSharingName(item); }} className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors"><Share2 className="w-5 h-5"/></button>
                <button onClick={(e) => { e.stopPropagation(); setCurrentScreen('certificate'); }} className="btn-apple-primary px-8">确定此名</button>
              </div>
            </div>
          ))}
        </main>

        {/* 4. 生成宠物出生证明 (流程关系 2) */}
        {currentScreen === 'certificate' && (
          <div className="fixed inset-0 z-[200] bg-white animate-in slide-in-from-bottom duration-500 overflow-y-auto">
            <ScreenHeader title="宠物出生证明" onBack={() => setCurrentScreen('results')} />
            <div className="p-8 max-w-lg mx-auto space-y-10">
              {/* 证书预览区 */}
              <div className="relative aspect-[1/1.4] bg-[#FDFCF8] border-[12px] border-double border-slate-200 rounded-sm p-8 flex flex-col items-center justify-between shadow-xl">
                <div className="text-center space-y-2">
                  <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto" />
                  <h2 className="font-serif text-2xl uppercase tracking-[0.2em] border-b border-slate-300 pb-2">Birth Certificate</h2>
                </div>
                <div className="text-center space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400 italic">This is to certify that</p>
                    <p className="text-5xl font-serif font-bold text-slate-900 underline decoration-indigo-200 underline-offset-8">云朵</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400 italic">was officially named on</p>
                    <p className="font-medium">2025年12月26日</p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-end border-t border-slate-100 pt-6">
                  <div className="text-left"><p className="text-[8px] uppercase text-slate-400">PetID</p><p className="font-mono text-xs">PAW-88292025</p></div>
                  <QrCode className="w-12 h-12 text-slate-300" />
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 btn-apple-primary py-4"><Download className="w-4 h-4"/> 下载证书</button>
                <button onClick={() => setCurrentScreen('my_pets')} className="flex-1 btn-apple-secondary border-indigo-200 text-indigo-600">同步到档案</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= 5. 宠物档案与健康管理 (流程关系 3) =================
  if (currentScreen === 'my_pets') {
    return (
      <div className="min-h-screen bg-slate-50 animate-fade-in-up pb-24">
        <header className="p-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">我的宠物档案</h1>
          <Plus className="text-slate-400" />
        </header>

        <main className="px-8 space-y-6">
          {myPets.map(pet => (
            <div key={pet.id} className="apple-card p-6 border-none shadow-sm space-y-6">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-3xl">🐱</div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{pet.name}</h3>
                  <div className="flex gap-2 text-xs text-slate-400 font-medium">
                    <span>{pet.breed}</span> • <span>ID: {pet.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button onClick={() => setCurrentScreen('health')} className="flex items-center justify-center gap-2 p-4 bg-indigo-50 rounded-2xl text-indigo-600 text-sm font-bold">
                  <Bell className="w-4 h-4"/> 健康管家
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl text-slate-600 text-sm font-bold">
                  <ImageIcon className="w-4 h-4"/> 照片墙
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* 健康管家子模块 */}
        {currentScreen === 'health' && (
          <div className="fixed inset-0 z-[200] bg-white animate-in slide-in-from-right duration-500 overflow-y-auto">
            <ScreenHeader title="健康管家" onBack={() => setCurrentScreen('my_pets')} />
            <div className="p-8 space-y-8">
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">近期提醒</h4>
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm"><Bell className="animate-bounce" /></div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-rose-900">驱虫提醒</p>
                    <p className="text-xs text-rose-600">距离下次内驱虫还有 3 天</p>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">健康日记</h4>
                <div className="space-y-3">
                  {['12/20：精神饱满，食欲佳', '12/15：完成第二针疫苗接种'].map((note, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-600 border border-slate-100">{note}</div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 h-20 flex items-center justify-around px-8 z-50">
          <button onClick={() => setCurrentScreen('dashboard')} className="text-slate-400 flex flex-col items-center gap-1"><Sparkles className="w-6 h-6" /><span className="text-[10px] font-bold">起名</span></button>
          <button onClick={() => setCurrentScreen('community')} className="text-slate-400 flex flex-col items-center gap-1"><MessageCircle className="w-6 h-6" /><span className="text-[10px] font-bold">社区</span></button>
          <button onClick={() => setCurrentScreen('my_pets')} className="text-indigo-600 flex flex-col items-center gap-1"><Bone className="w-6 h-6" /><span className="text-[10px] font-bold">宠物</span></button>
        </nav>
      </div>
    );
  }

  // ================= 6. 社区互动与分享 (流程关系 4) =================
  if (currentScreen === 'community') {
    return (
      <div className="min-h-screen bg-white animate-fade-in-up pb-24">
        <header className="p-8 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-40">
          <h1 className="text-2xl font-bold">发现社区灵感</h1>
          <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide text-xs font-bold uppercase tracking-widest">
            <span className="text-indigo-600 border-b-2 border-indigo-600 pb-2">名字故事</span>
            <span className="text-slate-400 pb-2">名字PK投票</span>
            <span className="text-slate-400 pb-2">热门榜单</span>
          </div>
        </header>

        <main className="p-8 space-y-10">
          {[1, 2].map(i => (
            <div key={i} className="space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full" />
                <div className="space-y-0.5"><p className="text-sm font-bold text-slate-900">铲屎官小王</p><p className="text-[10px] text-slate-400">2小时前发布</p></div>
              </div>
              <div className="aspect-video bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 overflow-hidden shadow-sm">
                <ImageIcon className="w-12 h-12 opacity-20" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-bold text-indigo-600">#名字故事</span> 为我家猫咪选了“云朵”，感觉它真的像天边飘来的一样温柔...
              </p>
              <div className="flex gap-6 pt-2 text-slate-300">
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"><Heart className="w-4 h-4"/> <span className="text-xs font-bold">128</span></button>
                <button className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"><MessageCircle className="w-4 h-4"/> <span className="text-xs font-bold">45</span></button>
              </div>
            </div>
          ))}
        </main>

        <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 h-20 flex items-center justify-around px-8 z-50">
          <button onClick={() => setCurrentScreen('dashboard')} className="text-slate-400 flex flex-col items-center gap-1"><Sparkles className="w-6 h-6" /><span className="text-[10px] font-bold">起名</span></button>
          <button onClick={() => setCurrentScreen('community')} className="text-indigo-600 flex flex-col items-center gap-1"><MessageCircle className="w-6 h-6" /><span className="text-[10px] font-bold">社区</span></button>
          <button onClick={() => setCurrentScreen('my_pets')} className="text-slate-400 flex flex-col items-center gap-1"><Bone className="w-6 h-6" /><span className="text-[10px] font-bold">宠物</span></button>
        </nav>
      </div>
    );
  }

  return null;
};

export default PawNamesApp;
