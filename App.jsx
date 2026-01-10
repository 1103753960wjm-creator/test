import React, { useState } from 'react';
import { 
  Upload, 
  Layers, 
  Box, 
  Zap, 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  CheckCircle, 
  LayoutTemplate,
  Maximize2,
  Settings,
  Database,
  ArrowRight,
  Menu,
  X,
  Loader2,
  RefreshCw,
  History,
  Clock,
  MessageSquare,
  Send,
  Home,
  Monitor,
  ShoppingBag,
  ChevronRight,
  Download
} from 'lucide-react';

/**
 * Structura AI - Professional Interior Design Platform (V2)
 * * Updates:
 * - Added Design Categories (Interior, Poster, Product)
 * - Added Design History Sidebar
 * - Added Natural Language Refinement (In-painting)
 */

// --- Mock Data ---

const CATEGORIES = [
  { id: 'interior', name: '家装设计', icon: <Home className="w-4 h-4" />, desc: '结构锁定，精准施工图还原' },
  { id: 'poster', name: '海报设计', icon: <Monitor className="w-4 h-4" />, desc: '创意排版，营销视觉增强' },
  { id: 'product', name: '商品设计', icon: <ShoppingBag className="w-4 h-4" />, desc: '三维建模，材质光影模拟' }
];

const STYLES = {
  interior: [
    { id: 'modern', name: '现代简约', desc: '线条利落，黑白灰主调', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400' },
    { id: 'wabi-sabi', name: '侘寂风', desc: '自然质感，斑驳光影', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400' },
  ],
  poster: [
    { id: 'minimal', name: '极简排版', desc: '留白艺术，突出主体', image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?auto=format&fit=crop&q=80&w=400' },
    { id: 'cyber', name: '赛博朋克', desc: '霓虹光效，未来科技', image: 'https://images.unsplash.com/photo-1535378437323-955586d7d65e?auto=format&fit=crop&q=80&w=400' },
  ],
  product: [
    { id: 'studio', name: '摄影棚光', desc: '纯净背景，高光质感', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { id: 'nature', name: '自然融合', desc: '户外场景，生态有机', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
  ]
};

const MOCK_HISTORY = [
  { id: 101, title: '滨江一号院客厅', type: 'interior', date: '2023-10-24 14:30', params: '现代简约, 结构锁定ON' },
  { id: 102, title: '双11美妆海报', type: 'poster', date: '2023-10-23 09:15', params: '赛博朋克, 尺寸9:16' },
  { id: 103, title: '智能音箱渲染', type: 'product', date: '2023-10-22 16:45', params: '摄影棚光, 4K分辨率' },
];

const MOCK_KNOWLEDGE_FILES = [
  { name: 'GB-50096 住宅设计规范.pdf', size: '2.4MB', type: 'doc', status: 'learned', category: 'interior' },
  { name: '2024-意大利米兰家具展.zip', size: '156MB', type: 'image', status: 'processing', category: 'interior' },
  { name: '品牌VI视觉规范.pdf', size: '12MB', type: 'doc', status: 'learned', category: 'poster' },
  { name: '产品3D源文件.obj', size: '45MB', type: 'data', status: 'learned', category: 'product' }
];

// --- Components ---

const Header = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
          <Box className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">Structura<span className="text-indigo-600">.AI</span></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-500'} transition`}>首页</button>
          <button onClick={() => setActiveTab('studio')} className={`${activeTab === 'studio' ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-500'} transition`}>设计工坊</button>
          <button onClick={() => setActiveTab('knowledge')} className={`${activeTab === 'knowledge' ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-500'} transition`}>专业知识库</button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-slate-500 hover:text-slate-800"><Settings className="h-5 w-5" /></button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
            DE
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
        <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">首页</button>
        <button onClick={() => { setActiveTab('studio'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">设计工坊</button>
        <button onClick={() => { setActiveTab('knowledge'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">知识库</button>
      </div>
    )}
  </nav>
);

const Hero = ({ onStart }) => (
  <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="text-center">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6 border border-indigo-100">
        <SparklesIcon className="w-4 h-4 mr-2" />
        设计师专用的生成式 AI 引擎 V2.0
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
        从 CAD 线稿到 <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          全真三维空间
        </span>
        ，仅需一瞬
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
        不止是生成图片，Structura AI 严格遵循户型结构与尺寸。
        新增海报与商品设计模块，全方位赋能设计行业。
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={onStart}
          className="px-8 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-all flex items-center"
        >
          开始设计 <ArrowRight className="ml-2 w-5 h-5" />
        </button>
        <button className="px-8 py-3.5 rounded-lg bg-white text-slate-700 font-semibold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all">
          查看演示案例
        </button>
      </div>
      
      {/* Feature Grid */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Layers className="w-6 h-6" />, title: '多领域模型调度', desc: '针对家装、平面、商品不同领域，智能切换底层扩散模型与ControlNet参数。' },
          { icon: <Database className="w-6 h-6" />, title: '分层知识库', desc: '设计规范、材质库、VI系统分门别类，精准投喂，避免知识污染。' },
          { icon: <MessageSquare className="w-6 h-6" />, title: '自然语言精修', desc: '生成结果不满意？直接像聊天一样告诉 AI：“把沙发换成皮质的”。' },
        ].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-left">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const KnowledgeBase = () => {
  const [activeCategory, setActiveCategory] = useState('interior');

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">专业知识库</h2>
              <p className="text-slate-500 mt-2">分领域管理您的设计资产，训练专属 AI 助手。</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center w-fit">
              <Upload className="w-4 h-4 mr-2" /> 上传新资料
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mt-8 flex space-x-1 bg-slate-200 p-1 rounded-lg w-fit">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                  activeCategory === cat.id 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.icon}
                <span className="ml-2">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Database className="w-4 h-4 mr-2 text-indigo-500" /> 
            {CATEGORIES.find(c => c.id === activeCategory)?.name} - 资料列表
          </h3>
          
          <div className="space-y-3">
            {MOCK_KNOWLEDGE_FILES.filter(f => f.category === activeCategory).length > 0 ? (
              MOCK_KNOWLEDGE_FILES.filter(f => f.category === activeCategory).map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:border-indigo-200 transition group">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded flex items-center justify-center mr-4 
                      ${file.type === 'doc' ? 'bg-orange-50 text-orange-500' : 
                        file.type === 'image' ? 'bg-purple-50 text-purple-500' : 'bg-green-50 text-green-500'}`}>
                      {file.type === 'doc' ? <FileText className="w-5 h-5" /> : 
                       file.type === 'image' ? <ImageIcon className="w-5 h-5" /> : <Cpu className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{file.name}</div>
                      <div className="text-xs text-slate-400">{file.size} • 状态: {file.status}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> 已生效
                      </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-slate-300" />
                </div>
                该分类下暂无资料，请上传
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DesignStudio = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('interior');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // History Sidebar State
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Refinement Chat State
  const [refinementText, setRefinementText] = useState('');
  const [refining, setRefining] = useState(false);

  // Helper to get current styles based on category
  const currentStyles = STYLES[activeCategory] || [];

  const handleUpload = () => {
    setUploadedFile("demo_file.dxf");
    setTimeout(() => setStep(2), 800);
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const handleRefinement = () => {
    if(!refinementText) return;
    setRefining(true);
    // Simulate AI thinking and regenerating
    setTimeout(() => {
      setRefining(false);
      setRefinementText('');
      alert("AI: 已根据您的指令调整了设计细节。");
    }, 1500);
  };

  const handleRestoreHistory = (item) => {
    if(window.confirm(`确定要加载历史项目 "${item.title}" 及其参数吗？`)) {
        setActiveCategory(item.type);
        setStep(3); // Jump to result for demo
        setIsHistoryOpen(false);
    }
  };

  return (
    <div className="pt-20 pb-12 px-4 h-screen flex flex-col max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Top Bar: Category Selector & History Toggle */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Switcher */}
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setStep(1); setSelectedStyle(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                activeCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.icon}
              <span className="ml-2 hidden sm:block">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
             {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-slate-400">
                <span className={`${step >= 1 ? 'text-indigo-600' : ''}`}>1. 导入</span>
                <ChevronRight className="w-4 h-4" />
                <span className={`${step >= 2 ? 'text-indigo-600' : ''}`}>2. 配置</span>
                <ChevronRight className="w-4 h-4" />
                <span className={`${step >= 3 ? 'text-indigo-600' : ''}`}>3. 生成</span>
            </div>

            <button 
                onClick={() => setIsHistoryOpen(true)}
                className="flex items-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm"
            >
                <History className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">历史记录</span>
            </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 m-4 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer" onClick={handleUpload}>
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
                {activeCategory === 'interior' ? '上传 CAD / 户型图' : 
                 activeCategory === 'poster' ? '上传 草图 / 布局线稿' : '上传 产品三视图 / 模型'}
            </h3>
            <p className="text-slate-500 mb-6 text-center max-w-md">
                当前模式: <span className="text-indigo-600 font-semibold">{CATEGORIES.find(c => c.id === activeCategory)?.name}</span><br/>
                {CATEGORIES.find(c => c.id === activeCategory)?.desc}
            </p>
            <button className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium shadow-sm hover:bg-slate-50">
              选择文件
            </button>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-3">
            {/* Left: Preview */}
            <div className="md:col-span-2 bg-slate-900 p-6 flex flex-col relative overflow-hidden">
               <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-mono flex items-center border border-white/20">
                <LayoutTemplate className="w-3 h-3 mr-2" />
                {activeCategory === 'interior' ? '结构锁定: ON' : '轮廓约束: ON'}
              </div>
              <div className="flex-1 flex items-center justify-center">
                 <div className="text-slate-500 text-sm font-mono border border-slate-700 p-12 rounded bg-slate-800/50">
                    [ PREVIEW OF UPLOADED FILE ]<br/>
                    MODE: {activeCategory.toUpperCase()}<br/>
                    ANALYZING LINES...
                 </div>
              </div>
            </div>

            {/* Right: Settings */}
            <div className="bg-white p-6 border-l border-slate-200 overflow-y-auto">
              <h3 className="font-bold text-lg text-slate-900 mb-6">生成配置 ({CATEGORIES.find(c => c.id === activeCategory)?.name})</h3>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">选择风格流派</label>
                <div className="grid grid-cols-2 gap-3">
                  {currentStyles.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className={`relative p-2 rounded-lg border text-left transition-all ${selectedStyle === s.id ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                    >
                      <div className="h-20 w-full bg-slate-200 rounded mb-2 overflow-hidden">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-sm text-slate-900">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">模型参数</label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{activeCategory === 'interior' ? '结构严格度' : '创意发散度'}</span>
                      <span>{activeCategory === 'interior' ? '高' : '中'}</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                     <div className="flex items-center text-sm font-medium text-indigo-900 mb-1">
                        <Database className="w-4 h-4 mr-2" /> 知识库联动
                     </div>
                     <p className="text-xs text-indigo-600">已加载 {activeCategory} 类别的 12 份规范文档。</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!selectedStyle || isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center transition-all
                  ${!selectedStyle ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30'}`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> AI 计算中...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" /> 开始生成
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result & Refinement */}
        {step === 3 && (
          <div className="w-full h-full flex flex-col bg-slate-50">
            {/* Main Canvas Area */}
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
                <div className="relative max-w-4xl w-full aspect-video bg-white shadow-2xl rounded-lg overflow-hidden ring-1 ring-slate-900/5 group">
                   {/* Result Image */}
                   <img 
                    src={currentStyles[0]?.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"} 
                    className="w-full h-full object-cover" 
                    alt="Result"
                   />
                   
                   {/* Image Overlay Controls - Updated: Always visible and emphasized */}
                   <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-2 bg-black/60 text-white rounded-lg hover:bg-black/80 backdrop-blur transition-colors" title="全屏预览">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-black/60 text-white rounded-lg hover:bg-black/80 backdrop-blur transition-colors" title="重新生成">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg transition-colors flex items-center space-x-1" 
                        title="下载高清原图"
                        onClick={() => alert("开始下载高清渲染图 (4K)...")}
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-xs font-bold">下载原图</span>
                      </button>
                   </div>
                   
                   {/* Refinement Loading Overlay */}
                   {refining && (
                     <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="bg-white px-6 py-4 rounded-xl shadow-xl flex items-center space-x-3">
                           <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                           <span className="font-medium text-slate-800">AI 正在根据您的指令调整局部...</span>
                        </div>
                     </div>
                   )}
                </div>
            </div>

            {/* Bottom: Natural Language Refinement Bar */}
            <div className="bg-white border-t border-slate-200 p-4 pb-8">
               <div className="max-w-3xl mx-auto">
                 <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2 text-indigo-500" />
                    自然语言精修 (Magic Refinement)
                 </label>
                 <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={refinementText}
                      onChange={(e) => setRefinementText(e.target.value)}
                      placeholder="对结果不满意？尝试输入：'把地板换成浅色木纹' 或 '增加一点暖色氛围灯'..."
                      className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleRefinement()}
                    />
                    <button 
                      onClick={handleRefinement}
                      disabled={!refinementText || refining}
                      className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                       <Send className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    <span className="text-xs text-slate-400 whitespace-nowrap">推荐指令:</span>
                    {['切换为夜景模式', '增加绿植点缀', '材质更具光泽感', '背景虚化'].map((tag, i) => (
                      <button key={i} onClick={() => setRefinementText(tag)} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md hover:bg-slate-200 transition whitespace-nowrap">
                        {tag}
                      </button>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* Sidebar: History Panel (Overlay) */}
        {isHistoryOpen && (
           <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-800 flex items-center"><History className="w-4 h-4 mr-2" /> 设计历史</h3>
                 <button onClick={() => setIsHistoryOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {MOCK_HISTORY.map(item => (
                   <div key={item.id} onClick={() => handleRestoreHistory(item)} className="p-3 rounded-lg border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer group transition-all bg-white">
                      <div className="flex justify-between items-start mb-1">
                         <span className="font-semibold text-slate-800 text-sm">{item.title}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                           item.type === 'interior' ? 'bg-orange-100 text-orange-700' :
                           item.type === 'poster' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                         }`}>
                           {CATEGORIES.find(c => c.id === item.type)?.name}
                         </span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2 flex items-center">
                         <Clock className="w-3 h-3 mr-1" /> {item.date}
                      </div>
                      <div className="text-xs text-slate-400 bg-slate-50 p-2 rounded group-hover:bg-white border border-transparent group-hover:border-indigo-100">
                         参数: {item.params}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="h-full">
        {activeTab === 'home' && <Hero onStart={() => setActiveTab('studio')} />}
        {activeTab === 'studio' && <DesignStudio />}
        {activeTab === 'knowledge' && <KnowledgeBase />}
      </main>

      {/* Helper icon for purely visual flair using standard component */}
      <div className="fixed bottom-6 right-6">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <span className="font-bold text-lg">?</span>
        </div>
      </div>
    </div>
  );
};

// Simple Sparkles Icon component
const SparklesIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M9 5h4" />
    <path d="M19 19v4" />
    <path d="M15 21h4" />
  </svg>
);

export default App;