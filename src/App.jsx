import React, { useState } from 'react';
import { Sparkles, Camera, Book, Stars, ArrowRight, PawPrint, Heart, Users, TrendingUp, ChevronLeft, Volume2, RefreshCw, Search, Bookmark, FileText, Download, Share2, Award, Calendar, MessageCircle, Globe, MapPin, Trophy, Flame, Clock, Plus, Edit, Image, Syringe, Scissors, Bath, Bell, ChevronRight } from 'lucide-react';

const PawNamesApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    petType: '',
    breed: '',
    appearance: { color: '', size: '', eyes: '' },
    personality: [],
    style: []
  });
  const [generatedNames, setGeneratedNames] = useState([]);
  const [savedNames, setSavedNames] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedNameForCert, setSelectedNameForCert] = useState(null);
  const [certData, setCertData] = useState({
    ownerName: '',
    birthDate: '',
    adoptDate: '',
    specialNote: ''
  });
  const [certStep, setCertStep] = useState(1);
  const [rankingFilter, setRankingFilter] = useState('global');
  const [communityTab, setCommunityTab] = useState('stories');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [newStory, setNewStory] = useState({
    petName: '',
    petType: '🐕',
    story: ''
  });
  const [userStories, setUserStories] = useState([]);
  const [votedPKs, setVotedPKs] = useState({});
  const [userChallenges, setUserChallenges] = useState([]);

  const petTypes = [
    { id: 'dog', name: '狗狗', emoji: '🐕' },
    { id: 'cat', name: '猫咪', emoji: '🐱' },
    { id: 'rabbit', name: '兔子', emoji: '🐰' },
    { id: 'hamster', name: '仓鼠', emoji: '🐹' },
    { id: 'bird', name: '鸟类', emoji: '🦜' },
    { id: 'other', name: '其他', emoji: '🐾' }
  ];

  const breeds = {
    dog: ['金毛', '哈士奇', '柯基', '泰迪', '柴犬', '比熊', '边牧', '拉布拉多', '萨摩耶', '博美', '吉娃娃', '混血'],
    cat: ['英短', '美短', '布偶', '暹罗', '波斯', '加菲', '狸花猫', '橘猫', '缅因猫', '折耳猫', '无毛猫', '混血'],
    rabbit: ['垂耳兔', '侏儒兔', '安哥拉兔', '荷兰兔', '狮子兔', '混血'],
    hamster: ['金丝熊', '三线仓鼠', '一线仓鼠', '银狐', '紫仓', '布丁仓鼠'],
    bird: ['虎皮鹦鹉', '玄凤鹦鹉', '文鸟', '金丝雀', '牡丹鹦鹉', '其他'],
    other: ['不确定']
  };

  const colors = ['黑色', '白色', '棕色', '灰色', '黄色', '橘色', '奶油色', '花色', '三花', '玳瑁', '其他'];
  const sizes = ['迷你型', '小型', '中型', '大型', '超大型'];
  const eyeColors = ['棕色', '蓝色', '绿色', '琥珀色', '黄色', '异瞳', '其他'];

  const personalities = [
    { id: 'active', name: '活泼好动', emoji: '⚡', desc: '精力充沛，喜欢运动' },
    { id: 'calm', name: '温和安静', emoji: '😌', desc: '性格温顺，不吵不闹' },
    { id: 'smart', name: '聪明机灵', emoji: '🧠', desc: '学习能力强，反应快' },
    { id: 'loyal', name: '忠诚可靠', emoji: '💙', desc: '对主人忠心耿耿' },
    { id: 'playful', name: '爱玩调皮', emoji: '🎾', desc: '喜欢玩耍，充满好奇' },
    { id: 'gentle', name: '温柔体贴', emoji: '🌸', desc: '温柔善良，体贴人心' },
    { id: 'brave', name: '勇敢无畏', emoji: '🦁', desc: '勇敢坚强，不畏困难' },
    { id: 'cute', name: '软萌可爱', emoji: '🥰', desc: '萌萌哒，讨人喜欢' },
    { id: 'independent', name: '独立自主', emoji: '👑', desc: '独立性强，有主见' },
    { id: 'friendly', name: '友善亲人', emoji: '🤗', desc: '友好热情，亲近人类' }
  ];

  const styles = [
    { id: 'chinese', name: '中式古典', desc: '诗意优雅', emoji: '🏮', example: '如：星辰、云朵' },
    { id: 'english', name: '英文洋气', desc: '时尚国际', emoji: '🌍', example: '如：Lucky、Max' },
    { id: 'cute', name: '软萌可爱', desc: '甜美治愈', emoji: '🍭', example: '如：团子、小雪球' },
    { id: 'cool', name: '霸气酷炫', desc: '个性十足', emoji: '⚡', example: '如：霸王、Thor' },
    { id: 'food', name: '食物系', desc: '美味诱人', emoji: '🍰', example: '如：奶茶、布丁' },
    { id: 'anime', name: '动漫游戏', desc: '二次元', emoji: '🎮', example: '如：皮卡丘、龙猫' },
    { id: 'noble', name: '高贵典雅', desc: '气质非凡', emoji: '👑', example: '如：公爵、伯爵' },
    { id: 'simple', name: '简单好记', desc: '朗朗上口', emoji: '✨', example: '如：豆豆、球球' }
  ];

  const generateNames = () => {
    const names = [
      { name: '云朵', meaning: '像云朵一样柔软纯净，象征着温柔和自由', origin: '中文诗意', popularity: '较少重名', score: 95 },
      { name: 'Lucky', meaning: '幸运的象征，寓意给家庭带来好运', origin: '英文常用', popularity: '热门选择', score: 88 },
      { name: '奶茶', meaning: '温暖香甜，如奶茶般治愈人心', origin: '食物系', popularity: '中等热度', score: 92 },
      { name: '星辰', meaning: '璀璨如星辰，照亮你的生活', origin: '中式古典', popularity: '较少重名', score: 94 }
    ];
    setGeneratedNames(names);
    setCurrentScreen('results');
  };

  const togglePersonality = (id) => {
    setWizardData(prev => ({
      ...prev,
      personality: prev.personality.includes(id)
        ? prev.personality.filter(p => p !== id)
        : [...prev.personality, id]
    }));
  };

  const toggleStyle = (id) => {
    setWizardData(prev => ({
      ...prev,
      style: prev.style.includes(id)
        ? prev.style.filter(s => s !== id)
        : [...prev.style, id]
    }));
  };

  const toggleSaveName = (name) => {
    setSavedNames(prev => 
      prev.find(n => n.name === name.name)
        ? prev.filter(n => n.name !== name.name)
        : [...prev, name]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setCurrentScreen('visual');
    
    setTimeout(() => {
      setAnalysisResult({
        petType: '猫咪',
        breed: '橘猫',
        color: '橘色',
        features: ['圆脸', '大眼睛', '短毛'],
        personality: ['活泼', '好奇', '亲人'],
        confidence: 95
      });
      setIsAnalyzing(false);
      
      setTimeout(() => {
        const visualNames = [
          { 
            name: '橘子', 
            meaning: '温暖如阳光的橘色，甜蜜可爱的小家伙',
            origin: '食物系·视觉灵感',
            popularity: '热门选择',
            score: 96
          },
          { 
            name: 'Sunny', 
            meaning: '阳光般温暖明亮，照亮你的每一天',
            origin: '英文洋气·色彩联想',
            popularity: '中等热度',
            score: 94
          },
          { 
            name: '小橘', 
            meaning: '简单亲切，一看就是可爱的橘猫宝宝',
            origin: '软萌可爱·直观描述',
            popularity: '较少重名',
            score: 93
          },
          { 
            name: '琥珀', 
            meaning: '如琥珀般温润透亮，充满灵性',
            origin: '中式古典·宝石意象',
            popularity: '较少重名',
            score: 95
          }
        ];
        setGeneratedNames(visualNames);
        setCurrentScreen('results');
      }, 1500);
    }, 2500);
  };

  // 欢迎页面
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        
        <div className="text-center max-w-md relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full shadow-2xl animate-bounce">
              <PawPrint className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
            PawNames
          </h1>
          <p className="text-xl text-gray-600 mb-8">为你的爱宠找到完美的名字</p>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center justify-center gap-3 text-gray-700 transform hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>AI智能起名</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700 transform hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-pink-500" />
              <span>专属宠物档案</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700 transform hover:scale-105 transition-transform">
              <Users className="w-5 h-5 text-orange-500" />
              <span>活跃社区互动</span>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            开始起名之旅
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // 仪表板
  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                PawNames
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              AI智能起名中心
            </h1>
            <p className="text-gray-600 text-lg">选择你喜欢的方式，为爱宠找到独特的名字</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div 
              onClick={() => { setCurrentScreen('wizard'); setWizardStep(1); }}
              className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-purple-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                文本起名向导
              </h3>
              <p className="text-gray-600 mb-6">通过5步问答，详细了解你的宠物特征，生成最贴合的个性化名字</p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                开始起名
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-pink-100">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  视觉起名（灵眸）
                </h3>
                <p className="text-gray-600 mb-6">只需上传一张照片，AI即刻分析宠物特征，智能推荐专属名字</p>
                <div className="flex items-center gap-2 text-pink-600 font-semibold">
                  上传照片
                  <ArrowRight className="w-4 h-4" />
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setCurrentScreen('ranking')}
              className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 text-center transform hover:scale-105"
            >
              <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">热门榜单</p>
              <p className="text-sm text-gray-500 mt-1">查看流行名字</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('community')}
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 text-center transform hover:scale-105"
            >
              <Users className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <p className="font-semibold text-gray-800">社区互动</p>
              <p className="text-sm text-gray-500 mt-1">分享你的故事</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 文本起名向导
  if (currentScreen === 'wizard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => wizardStep === 1 ? setCurrentScreen('dashboard') : setWizardStep(wizardStep - 1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className="flex-1">
                  <div className={`h-2 rounded-full ${step <= wizardStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'}`}></div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">步骤 {wizardStep} / 5</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {wizardStep === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3 text-gray-800">你的宠物是什么类型？</h2>
              <p className="text-gray-600 mb-8">选择一个最符合的分类</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {petTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => { 
                      setWizardData({...wizardData, petType: type.id}); 
                      setWizardStep(2); 
                    }}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 ${
                      wizardData.petType === type.id
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl shadow-purple-500/50'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-2xl hover:shadow-purple-300/30'
                    }`}
                  >
                    <div className="text-6xl mb-4 animate-bounce">{type.emoji}</div>
                    <div className="font-bold text-lg text-gray-800">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3 text-gray-800">选择具体品种</h2>
              <p className="text-gray-600 mb-8">帮助我们更精准地推荐名字</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {breeds[wizardData.petType]?.map(breed => (
                  <button
                    key={breed}
                    onClick={() => { 
                      setWizardData({...wizardData, breed}); 
                      setWizardStep(3); 
                    }}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      wizardData.breed === breed
                        ? 'border-purple-500 bg-purple-50 font-bold'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{breed}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3 text-gray-800">描述宠物的外观特征</h2>
              <p className="text-gray-600 mb-8">选择最符合的特征</p>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-2xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-lg">🎨</span>
                    </div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">毛色/颜色</h3>
                    <span className="text-sm text-red-500">*</span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setWizardData({
                          ...wizardData,
                          appearance: {...wizardData.appearance, color}
                        })}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium transform hover:scale-110 ${
                          wizardData.appearance.color === color
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-xl shadow-purple-500/50'
                            : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:shadow-lg'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 shadow-2xl border border-pink-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-lg">📏</span>
                    </div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">体型大小</h3>
                    <span className="text-sm text-red-500">*</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setWizardData({
                          ...wizardData,
                          appearance: {...wizardData.appearance, size}
                        })}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium transform hover:scale-110 ${
                          wizardData.appearance.size === size
                            ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-pink-100 text-pink-700 shadow-xl shadow-pink-500/50'
                            : 'border-gray-200 hover:border-pink-300 text-gray-700 hover:shadow-lg'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-2xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-lg">👁️</span>
                    </div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">眼睛颜色</h3>
                    <span className="text-sm text-gray-400">（选填）</span>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {eyeColors.map(eye => (
                      <button
                        key={eye}
                        onClick={() => setWizardData({
                          ...wizardData,
                          appearance: {...wizardData.appearance, eyes: eye}
                        })}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium transform hover:scale-110 ${
                          wizardData.appearance.eyes === eye
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 shadow-xl shadow-orange-500/50'
                            : 'border-gray-200 hover:border-orange-300 text-gray-700 hover:shadow-lg'
                        }`}
                      >
                        {eye}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setWizardStep(4)}
                  disabled={!wizardData.appearance.color || !wizardData.appearance.size}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  下一步
                  <ArrowRight className="w-5 h-5" />
                </button>
                {(!wizardData.appearance.color || !wizardData.appearance.size) && (
                  <p className="text-center text-sm text-red-500">请填写必填项（*）</p>
                )}
              </div>
            </div>
          )}

          {wizardStep === 4 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3 text-gray-800">描述宠物的性格特点</h2>
              <p className="text-gray-600 mb-8">可以选择多个标签（至少选1个）</p>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {personalities.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePersonality(p.id)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                        wizardData.personality.includes(p.id) 
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl shadow-purple-500/50' 
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl'
                      }`}
                    >
                      <div className="text-4xl mb-2 animate-bounce">{p.emoji}</div>
                      <div className="text-sm font-bold text-gray-800 mb-1">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-200 shadow-lg">
                  <p className="text-sm text-gray-700">
                    已选择 <span className="font-bold text-purple-600 text-lg">{wizardData.personality.length}</span> 个性格标签
                  </p>
                </div>

                <button
                  onClick={() => setWizardStep(5)}
                  disabled={wizardData.personality.length === 0}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  下一步
                  <ArrowRight className="w-5 h-5" />
                </button>
                {wizardData.personality.length === 0 && (
                  <p className="text-center text-sm text-red-500 mt-2">请至少选择1个性格标签</p>
                )}
              </div>
            </div>
          )}

          {wizardStep === 5 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3 text-gray-800">选择喜欢的名字风格</h2>
              <p className="text-gray-600 mb-8">可以选择多个风格（至少选1个）</p>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {styles.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleStyle(s.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                        wizardData.style.includes(s.id) 
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl shadow-purple-500/50' 
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl'
                      }`}
                    >
                      <div className="text-5xl mb-3 animate-bounce">{s.emoji}</div>
                      <div className="font-bold text-gray-800 mb-1">{s.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{s.desc}</div>
                      <div className="text-xs text-gray-400">{s.example}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 mb-6 border border-pink-200 shadow-lg">
                  <p className="text-sm text-gray-700">
                    已选择 <span className="font-bold text-pink-600 text-lg">{wizardData.style.length}</span> 个名字风格
                  </p>
                </div>

                <button
                  onClick={generateNames}
                  disabled={wizardData.style.length === 0}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  生成专属名字
                </button>
                {wizardData.style.length === 0 && (
                  <p className="text-center text-sm text-red-500 mt-2">请至少选择1个名字风格</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 视觉起名页面
  if (currentScreen === 'visual') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => {
                  setCurrentScreen('dashboard');
                  setUploadedImage(null);
                  setAnalysisResult(null);
                  setIsAnalyzing(false);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <div className="w-16"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mb-4 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-800">视觉起名（灵眸）</h1>
            <p className="text-gray-600 text-lg">上传宠物照片，AI即刻分析特征并推荐专属名字</p>
          </div>

          {!uploadedImage && !isAnalyzing && !analysisResult && (
            <div className="max-w-2xl mx-auto">
              <label className="block">
                <div className="border-4 border-dashed border-gray-300 rounded-3xl p-12 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-all">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">点击上传照片</h3>
                  <p className="text-gray-500 mb-6">支持 JPG、PNG 格式，建议清晰的正面照片</p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold">
                    <Camera className="w-5 h-5" />
                    选择照片
                  </div>
                </div>
              </label>

              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  拍摄建议
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📸</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">光线充足</h4>
                    <p className="text-sm text-gray-600">自然光下拍摄效果最佳</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">👁️</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">正面清晰</h4>
                    <p className="text-sm text-gray-600">能看清五官和毛色</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">主体突出</h4>
                    <p className="text-sm text-gray-600">避免过多背景干扰</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">AI正在分析中...</h3>
                <p className="text-gray-600 mb-6">识别宠物特征、分析外观和性格</p>
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">识别宠物类型和品种...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">分析毛色和外观特征...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">推测性格和气质...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-pink-500" />
                    AI识别结果
                  </h3>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-semibold text-green-700">
                      识别置信度 {analysisResult.confidence}%
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mb-4">
                      {uploadedImage && (
                        <img 
                          src={uploadedImage} 
                          alt="上传的宠物照片" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setUploadedImage(null);
                        setAnalysisResult(null);
                      }}
                      className="w-full py-2 border-2 border-gray-200 rounded-xl text-gray-600 hover:border-pink-300 transition-all"
                    >
                      重新上传
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">基本信息</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">宠物类型:</span>
                          <span className="font-semibold text-gray-800">{analysisResult.petType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">可能品种:</span>
                          <span className="font-semibold text-gray-800">{analysisResult.breed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">主要毛色:</span>
                          <span className="font-semibold text-gray-800">{analysisResult.color}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">外观特征</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.features.map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-pink-200">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">性格推测</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.personality.map((trait, index) => (
                          <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-orange-200">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200">
                  <p className="text-center text-gray-700">
                    <Sparkles className="w-4 h-4 inline mr-2 text-pink-500" />
                    <span className="font-semibold">正在为你生成专属名字...</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 名字结果页面
  if (currentScreen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentScreen('wizard')} className="flex items-center gap-2 text-gray-600">
                <ChevronLeft className="w-5 h-5" />
                重新生成
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <button onClick={() => setCurrentScreen('dashboard')} className="text-gray-600">
                完成
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">精心为你挑选的名字</h1>
            <p className="text-gray-600">点击收藏喜欢的名字</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {generatedNames.map((name, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl font-bold text-gray-800">{name.name}</h3>
                      <div className="px-3 py-1 bg-purple-100 rounded-full">
                        <span className="text-xs font-semibold text-purple-600">{name.score}分</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{name.origin}</p>
                  </div>
                  <button onClick={() => toggleSaveName(name)} className="p-2">
                    <Bookmark className={`w-6 h-6 ${savedNames.find(n => n.name === name.name) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                
                <p className="text-gray-700 mb-4">{name.meaning}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-gray-200 rounded-lg">
                    <Volume2 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold">试读</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold">
                    选择
                  </button>
                </div>
              </div>
            ))}
          </div>

          {savedNames.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                我的收藏 ({savedNames.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {savedNames.map((name, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg border-2 border-purple-200">
                    <span className="font-semibold text-purple-700">{name.name}</span>
                    <button onClick={() => toggleSaveName(name)} className="text-purple-400">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 宠物出生证明生成页面
  if (currentScreen === 'certificate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => {
                  if (certStep === 1) {
                    setCurrentScreen('results');
                  } else {
                    setCertStep(1);
                  }
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <div className="w-16"></div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {certStep === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2 text-gray-800">生成宠物出生证明</h1>
                <p className="text-gray-600">填写宠物信息，生成精美的数字证书</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    选定的名字
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">
                          {selectedNameForCert?.name}
                        </h4>
                        <p className="text-gray-600 mb-2">{selectedNameForCert?.meaning}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600">
                            {selectedNameForCert?.origin}
                          </span>
                          <span className="text-xs px-2 py-1 bg-white rounded-full text-purple-600 font-semibold">
                            评分: {selectedNameForCert?.score}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentScreen('results')}
                        className="text-sm text-purple-600 hover:text-purple-700 underline"
                      >
                        更换名字
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    补充信息
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        主人姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={certData.ownerName}
                        onChange={(e) => setCertData({...certData, ownerName: e.target.value})}
                        placeholder="请输入您的姓名"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        出生日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={certData.birthDate}
                        onChange={(e) => setCertData({...certData, birthDate: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        领养日期
                      </label>
                      <input
                        type="date"
                        value={certData.adoptDate}
                        onChange={(e) => setCertData({...certData, adoptDate: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        特殊备注
                      </label>
                      <textarea
                        value={certData.specialNote}
                        onChange={(e) => setCertData({...certData, specialNote: e.target.value})}
                        placeholder="记录特殊时刻或寓意（选填）"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCertStep(2)}
                    disabled={!certData.ownerName || !certData.birthDate}
                    className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    生成证明
                  </button>
                </div>
              </div>
            </>
          )}

          {certStep === 2 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">🎉 证明生成成功！</h1>
                <p className="text-gray-600">您可以下载、打印或分享这份珍贵的证书</p>
              </div>

              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 p-12">
                    {/* 装饰性边框 */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-purple-300 rounded-tl-2xl"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-pink-300 rounded-tr-2xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-pink-300 rounded-bl-2xl"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-purple-300 rounded-br-2xl"></div>

                    {/* 证书主体 */}
                    <div className="relative bg-white rounded-2xl p-10 shadow-lg">
                      {/* 标题 */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
                          <PawPrint className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                          宠物出生证明
                        </h2>
                        <p className="text-gray-500 text-sm">Pet Birth Certificate</p>
                      </div>

                      {/* 分割线 */}
                      <div className="h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 rounded-full mb-8"></div>

                      {/* 信息区域 */}
                      <div className="space-y-6">
                        {/* 名字 */}
                        <div className="text-center mb-8">
                          <p className="text-gray-600 mb-2">名字 / Name</p>
                          <h3 className="text-5xl font-bold text-gray-800 mb-3">
                            {selectedNameForCert?.name}
                          </h3>
                          <div className="max-w-md mx-auto p-4 bg-purple-50 rounded-xl">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {selectedNameForCert?.meaning}
                            </p>
                          </div>
                        </div>

                        {/* 详细信息 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5">
                            <p className="text-sm text-gray-600 mb-1">主人姓名</p>
                            <p className="text-lg font-bold text-gray-800">{certData.ownerName}</p>
                          </div>

                          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5">
                            <p className="text-sm text-gray-600 mb-1">出生日期</p>
                            <p className="text-lg font-bold text-gray-800">{certData.birthDate}</p>
                          </div>

                          {certData.adoptDate && (
                            <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-xl p-5">
                              <p className="text-sm text-gray-600 mb-1">领养日期</p>
                              <p className="text-lg font-bold text-gray-800">{certData.adoptDate}</p>
                            </div>
                          )}

                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5">
                            <p className="text-sm text-gray-600 mb-1">名字来源</p>
                            <p className="text-lg font-bold text-gray-800">{selectedNameForCert?.origin}</p>
                          </div>
                        </div>

                        {/* 特殊备注 */}
                        {certData.specialNote && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                            <p className="text-sm text-gray-600 mb-2">特殊备注</p>
                            <p className="text-gray-700 leading-relaxed">{certData.specialNote}</p>
                          </div>
                        )}

                        {/* AI画像 */}
                        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-xl p-5 text-center">
                          <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <span className="text-4xl">🐾</span>
                          </div>
                          <p className="text-sm text-gray-600">AI生成的专属标识</p>
                        </div>
                      </div>

                      {/* 底部信息 */}
                      <div className="mt-8 pt-6 border-t-2 border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          <span>由 PawNames AI 生成</span>
                        </div>
                        <div>
                          证书编号: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all">
                  <Download className="w-5 h-5" />
                  下载PDF
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-pink-300 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all">
                  <Share2 className="w-5 h-5" />
                  分享证书
                </button>
                <button 
                  onClick={() => setCurrentScreen('dashboard')}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <PawPrint className="w-5 h-5" />
                  完成
                </button>
              </div>

              {/* 提示信息 */}
              <div className="max-w-2xl mx-auto mt-6 bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  温馨提示
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 证书已自动保存到"我的宠物档案"</li>
                  <li>• 您可以随时在档案中查看和下载证书</li>
                  <li>• 支持分享到微信、小红书等社交平台</li>
                  <li>• 建议打印后作为实体纪念保存</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 热门榜单页面
  if (currentScreen === 'ranking') {
    const topNames = {
      global: [
        { rank: 1, name: 'Lucky', count: '12,548', trend: 'up', petType: '🐕', change: '+125' },
        { rank: 2, name: '小白', count: '11,892', trend: 'up', petType: '🐱', change: '+98' },
        { rank: 3, name: 'Coco', count: '10,234', trend: 'same', petType: '🐕', change: '0' },
        { rank: 4, name: '橘子', count: '9,876', trend: 'up', petType: '🐱', change: '+45' },
        { rank: 5, name: 'Max', count: '9,234', trend: 'down', petType: '🐕', change: '-23' },
        { rank: 6, name: '球球', count: '8,765', trend: 'up', petType: '🐰', change: '+67' },
        { rank: 7, name: 'Bella', count: '8,432', trend: 'same', petType: '🐕', change: '0' },
        { rank: 8, name: '奶茶', count: '7,998', trend: 'up', petType: '🐱', change: '+89' },
        { rank: 9, name: 'Charlie', count: '7,654', trend: 'down', petType: '🐕', change: '-12' },
        { rank: 10, name: '花花', count: '7,321', trend: 'up', petType: '🐱', change: '+34' }
      ],
      local: [
        { rank: 1, name: '小白', count: '2,345', trend: 'up', petType: '🐱', change: '+45' },
        { rank: 2, name: 'Lucky', count: '2,198', trend: 'up', petType: '🐕', change: '+32' },
        { rank: 3, name: '球球', count: '1,987', trend: 'same', petType: '🐰', change: '0' },
        { rank: 4, name: '奶茶', count: '1,876', trend: 'up', petType: '🐱', change: '+23' },
        { rank: 5, name: '豆豆', count: '1,654', trend: 'up', petType: '🐕', change: '+18' }
      ],
      breed: [
        { rank: 1, name: '橘子', count: '3,456', trend: 'up', petType: '🐱', breed: '橘猫', change: '+56' },
        { rank: 2, name: '小橘', count: '2,987', trend: 'up', petType: '🐱', breed: '橘猫', change: '+43' },
        { rank: 3, name: 'Garfield', count: '2,654', trend: 'same', petType: '🐱', breed: '橘猫', change: '0' },
        { rank: 4, name: 'Sunny', count: '2,345', trend: 'up', petType: '🐱', breed: '橘猫', change: '+29' },
        { rank: 5, name: '暖阳', count: '2,123', trend: 'up', petType: '🐱', breed: '橘猫', change: '+21' }
      ]
    };

    const currentNames = topNames[rankingFilter] || topNames.global;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <div className="w-16"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-800">热门名字榜单</h1>
            <p className="text-gray-600 text-lg">实时更新，看看大家都在用什么名字</p>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-3 mb-6 justify-center">
            <button
              onClick={() => setRankingFilter('global')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                rankingFilter === 'global'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Globe className="w-5 h-5" />
              全球热门
            </button>
            <button
              onClick={() => setRankingFilter('local')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                rankingFilter === 'local'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-5 h-5" />
              本地热门
            </button>
            <button
              onClick={() => setRankingFilter('breed')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                rankingFilter === 'breed'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <PawPrint className="w-5 h-5" />
              按品种
            </button>
          </div>

          {/* 榜单列表 */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* 前三名特殊展示 */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {currentNames.slice(0, 3).map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-500 mb-1">NO.{item.rank}</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">{item.petType}</span>
                      <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                    </div>
                    <div className="text-purple-600 font-semibold mb-2">{item.count} 只宠物</div>
                    <div className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                      item.trend === 'up' ? 'bg-green-100 text-green-600' :
                      item.trend === 'down' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.trend === 'up' && '↑'}
                      {item.trend === 'down' && '↓'}
                      {item.trend === 'same' && '—'}
                      <span>{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-10名列表 */}
            <div className="divide-y divide-gray-100">
              {currentNames.slice(3, 10).map((item, index) => (
                <div key={index} className="p-5 hover:bg-gray-50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        item.rank <= 5 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{item.petType}</span>
                          <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                          {item.breed && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                              {item.breed}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{item.count} 只宠物使用</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      item.trend === 'up' ? 'bg-green-50 text-green-600' :
                      item.trend === 'down' ? 'bg-red-50 text-red-600' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {item.trend === 'up' && '↑'}
                      {item.trend === 'down' && '↓'}
                      {item.trend === 'same' && '—'}
                      <span className="font-semibold">{item.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 更新时间 */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>榜单每小时更新一次 • 最后更新: 10分钟前</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 社区互动页面
  if (currentScreen === 'community') {
    const stories = [
      {
        id: 1,
        user: '铲屎官小王',
        avatar: '👨',
        petName: 'Lucky',
        petType: '🐕',
        story: '我家Lucky是在一个雨天遇见的，当时它瑟瑟发抖地躲在纸箱里。带回家后，它给我们带来了无数欢乐。Lucky这个名字寓意着幸运，因为遇见它，我们全家都变得更幸运了！',
        likes: 234,
        comments: 45,
        time: '2小时前',
        isLiked: false
      },
      {
        id: 2,
        user: '猫奴阿美',
        avatar: '👩',
        petName: '奶茶',
        petType: '🐱',
        story: '第一次见到奶茶的时候，它那奶茶色的毛发在阳光下特别温暖。它的性格也像奶茶一样，温和甜蜜，每天都能治愈我的心。奶茶这个名字，是我们爱情的见证❤️',
        likes: 189,
        comments: 32,
        time: '5小时前',
        isLiked: false
      },
      {
        id: 3,
        user: '兔兔爱好者',
        avatar: '🧑',
        petName: '雪球',
        petType: '🐰',
        story: '雪球是只纯白色的垂耳兔，圆滚滚的样子就像冬天的小雪球。它特别喜欢吃胡萝卜，每次看到它吃东西的样子都觉得超级可爱！',
        likes: 156,
        comments: 28,
        time: '1天前',
        isLiked: false
      },
      ...userStories
    ];

    const pkVotes = [
      {
        id: 1,
        nameA: 'Milo',
        nameB: 'Max',
        votesA: 1234 + (votedPKs['1'] === 'A' ? 1 : 0),
        votesB: 987 + (votedPKs['1'] === 'B' ? 1 : 0),
        petType: '🐕',
        timeLeft: '23小时'
      },
      {
        id: 2,
        nameA: '小白',
        nameB: '小黑',
        votesA: 876 + (votedPKs['2'] === 'A' ? 1 : 0),
        votesB: 1045 + (votedPKs['2'] === 'B' ? 1 : 0),
        petType: '🐱',
        timeLeft: '15小时'
      }
    ];

    const challenges = [
      {
        id: 1,
        title: '最有创意的食物系名字',
        emoji: '🍰',
        participants: 2345 + userChallenges.filter(c => c.challengeId === 1).length,
        prize: '精美证书',
        deadline: '3天后截止'
      },
      {
        id: 2,
        title: '双胞胎宠物最佳配对名',
        emoji: '👯',
        participants: 1876 + userChallenges.filter(c => c.challengeId === 2).length,
        prize: '社区勋章',
        deadline: '5天后截止'
      },
      {
        id: 3,
        title: '最霸气的英文名字',
        emoji: '⚡',
        participants: 1654 + userChallenges.filter(c => c.challengeId === 3).length,
        prize: '热门推荐',
        deadline: '7天后截止'
      }
    ];

    const handleVote = (pkId, choice) => {
      setVotedPKs(prev => ({...prev, [pkId]: choice}));
    };

    const handleSubmitStory = () => {
      if (newStory.petName && newStory.story) {
        const story = {
          id: Date.now(),
          user: '我',
          avatar: '😊',
          petName: newStory.petName,
          petType: newStory.petType,
          story: newStory.story,
          likes: 0,
          comments: 0,
          time: '刚刚',
          isLiked: false
        };
        setUserStories(prev => [story, ...prev]);
        setNewStory({ petName: '', petType: '🐕', story: '' });
        setShowStoryModal(false);
      }
    };

    const handleJoinChallenge = (challengeId, challengeTitle) => {
      setShowChallengeModal(true);
      setNewStory(prev => ({ ...prev, challengeId, challengeTitle }));
    };

    const handleSubmitChallenge = () => {
      if (newStory.petName && newStory.story) {
        const entry = {
          id: Date.now(),
          challengeId: newStory.challengeId,
          petName: newStory.petName,
          petType: newStory.petType,
          story: newStory.story,
          time: '刚刚'
        };
        setUserChallenges(prev => [...prev, entry]);
        setNewStory({ petName: '', petType: '🐕', story: '' });
        setShowChallengeModal(false);
      }
    };

    const toggleLike = (storyId) => {
      setUserStories(prev => prev.map(s => 
        s.id === storyId ? {...s, likes: s.isLiked ? s.likes - 1 : s.likes + 1, isLiked: !s.isLiked} : s
      ));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
                返回
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">PawNames</span>
              </div>
              <div className="w-16"></div>
            </div>

            {/* 标签切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setCommunityTab('stories')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  communityTab === 'stories'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                名字故事墙
              </button>
              <button
                onClick={() => setCommunityTab('pk')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  communityTab === 'pk'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                名字PK投票
              </button>
              <button
                onClick={() => setCommunityTab('challenges')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  communityTab === 'challenges'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                话题挑战
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 名字故事墙 */}
          {communityTab === 'stories' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-purple-500" />
                  名字故事墙
                </h2>
                <button 
                  onClick={() => setShowStoryModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  分享我的故事
                </button>
              </div>

              {/* 故事发布弹窗 */}
              {showStoryModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">分享你的命名故事</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">宠物名字</label>
                        <input
                          type="text"
                          value={newStory.petName}
                          onChange={(e) => setNewStory({...newStory, petName: e.target.value})}
                          placeholder="输入宠物名字"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">宠物类型</label>
                        <div className="flex gap-2">
                          {['🐕', '🐱', '🐰', '🐹', '🦜'].map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => setNewStory({...newStory, petType: emoji})}
                              className={`text-3xl p-3 rounded-xl border-2 transition-all ${
                                newStory.petType === emoji ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">你的故事</label>
                        <textarea
                          value={newStory.story}
                          onChange={(e) => setNewStory({...newStory, story: e.target.value})}
                          placeholder="分享你和宠物名字背后的温馨故事..."
                          rows={5}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowStoryModal(false)}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSubmitStory}
                        disabled={!newStory.petName || !newStory.story}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {stories.map(story => (
                  <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                    {/* 用户信息 */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                        {story.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{story.user}</h4>
                        <p className="text-sm text-gray-500">
                          给{story.petType} 起名 "{story.petName}"
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">{story.time}</span>
                    </div>

                    {/* 故事内容 */}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {story.story}
                    </p>

                    {/* 互动按钮 */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => story.id > 1000 ? toggleLike(story.id) : null}
                        className={`flex items-center gap-2 transition-all ${
                          story.isLiked ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${story.isLiked ? 'fill-current' : ''}`} />
                        <span className="font-semibold">{story.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-all">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-semibold">{story.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-all ml-auto">
                        <Share2 className="w-5 h-5" />
                        <span className="font-semibold">分享</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 名字PK投票 */}
          {communityTab === 'pk' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  名字PK投票
                </h2>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  发起PK
                </button>
              </div>

              <div className="space-y-6">
                {pkVotes.map(pk => {
                  const totalVotes = pk.votesA + pk.votesB;
                  const percentA = (pk.votesA / totalVotes * 100).toFixed(1);
                  const percentB = (pk.votesB / totalVotes * 100).toFixed(1);
                  const hasVoted = votedPKs[pk.id];

                  return (
                    <div key={pk.id} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pk.petType}</span>
                          <span className="font-semibold text-gray-600">哪个名字更好听？</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{pk.timeLeft}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        {/* 选项A */}
                        <button 
                          onClick={() => !hasVoted && handleVote(pk.id, 'A')}
                          disabled={hasVoted}
                          className={`group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transition-all border-2 ${
                            hasVoted === 'A' 
                              ? 'border-purple-500 shadow-xl' 
                              : hasVoted 
                              ? 'border-transparent opacity-60 cursor-not-allowed' 
                              : 'border-transparent hover:from-purple-100 hover:to-purple-200 hover:border-purple-400'
                          }`}
                        >
                          <h3 className="text-3xl font-bold text-gray-800 mb-3">{pk.nameA}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-600 font-semibold">{pk.votesA} 票</span>
                            <span className="text-2xl font-bold text-purple-600">{percentA}%</span>
                          </div>
                          <div className="h-3 bg-white rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500"
                              style={{width: `${percentA}%`}}
                            ></div>
                          </div>
                          {hasVoted === 'A' && (
                            <div className="mt-3 text-sm text-purple-600 font-semibold">✓ 已投票</div>
                          )}
                        </button>

                        {/* 选项B */}
                        <button 
                          onClick={() => !hasVoted && handleVote(pk.id, 'B')}
                          disabled={hasVoted}
                          className={`group bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 transition-all border-2 ${
                            hasVoted === 'B' 
                              ? 'border-pink-500 shadow-xl' 
                              : hasVoted 
                              ? 'border-transparent opacity-60 cursor-not-allowed' 
                              : 'border-transparent hover:from-pink-100 hover:to-pink-200 hover:border-pink-400'
                          }`}
                        >
                          <h3 className="text-3xl font-bold text-gray-800 mb-3">{pk.nameB}</h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-pink-600 font-semibold">{pk.votesB} 票</span>
                            <span className="text-2xl font-bold text-pink-600">{percentB}%</span>
                          </div>
                          <div className="h-3 bg-white rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
                              style={{width: `${percentB}%`}}
                            ></div>
                          </div>
                          {hasVoted === 'B' && (
                            <div className="mt-3 text-sm text-pink-600 font-semibold">✓ 已投票</div>
                          )}
                        </button>
                      </div>

                      <div className="text-center text-sm text-gray-500">
                        已有 {totalVotes} 人参与投票
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 话题挑战 */}
          {communityTab === 'challenges' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Stars className="w-6 h-6 text-yellow-500" />
                  话题挑战
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {challenges.map(challenge => {
                  const hasJoined = userChallenges.some(c => c.challengeId === challenge.id);
                  
                  return (
                    <div key={challenge.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <div className="text-5xl mb-4 text-center">{challenge.emoji}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                        {challenge.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">参与人数:</span>
                          <span className="font-semibold text-purple-600">{challenge.participants}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">奖励:</span>
                          <span className="font-semibold text-pink-600">{challenge.prize}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">截止时间:</span>
                          <span className="font-semibold text-gray-600">{challenge.deadline}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJoinChallenge(challenge.id, challenge.title)}
                        disabled={hasJoined}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          hasJoined 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        }`}
                      >
                        {hasJoined ? '✓ 已参与' : '立即参与'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* 挑战参与弹窗 */}
              {showChallengeModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">参与挑战</h3>
                    <p className="text-gray-600 mb-6">{newStory.challengeTitle}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">宠物名字</label>
                        <input
                          type="text"
                          value={newStory.petName}
                          onChange={(e) => setNewStory({...newStory, petName: e.target.value})}
                          placeholder="输入你的创意名字"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">宠物类型</label>
                        <div className="flex gap-2">
                          {['🐕', '🐱', '🐰', '🐹', '🦜'].map(emoji => (
                            <button
                              key={emoji}
                              onClick={() => setNewStory({...newStory, petType: emoji})}
                              className={`text-3xl p-3 rounded-xl border-2 transition-all ${
                                newStory.petType === emoji ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">创意说明</label>
                        <textarea
                          value={newStory.story}
                          onChange={(e) => setNewStory({...newStory, story: e.target.value})}
                          placeholder="分享这个名字的创意和灵感..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowChallengeModal(false)}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleSubmitChallenge}
                        disabled={!newStory.petName || !newStory.story}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        提交
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 往期精彩 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  往期精彩获奖作品
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <div>
                        <p className="font-semibold text-gray-800">上期冠军: "布丁 & 果冻"</p>
                        <p className="text-sm text-gray-600">双胞胎猫咪配对名</p>
                      </div>
                    </div>
                    <button className="text-purple-600 text-sm font-semibold">查看</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-800">往期优秀: "Thor 雷神"</p>
                        <p className="text-sm text-gray-600">最霸气英文名</p>
                      </div>
                    </div>
                    <button className="text-purple-600 text-sm font-semibold">查看</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default PawNamesApp;
