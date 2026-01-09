import React, { useState, useEffect } from 'react';
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
  Eye
} from 'lucide-react';

const STYLES = [
  { id: 'modern', name: '现代简约', desc: '线条利落，黑白灰主调', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400' },
  { id: 'wabi-sabi', name: '侘寂风', desc: '自然质感，斑驳光影', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400' },
  { id: 'new-chinese', name: '新中式', desc: '东方雅韵，现代演绎', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400' },
  { id: 'french', name: '法式轻奢', desc: '雕花线条，浪漫格调', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=400' }
];

const MOCK_KNOWLEDGE_FILES = [
  { name: 'GB-50096 住宅设计规范.pdf', size: '2.4MB', type: 'doc', status: 'learned' },
  { name: '2024-意大利米兰家具展.zip', size: '156MB', type: 'image', status: 'processing' },
  { name: '品牌涂料色卡_V3.csv', size: '45KB', type: 'data', status: 'learned' }
];

const Header = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
          <Box className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">Structura<span className="text-indigo-600">.AI</span></span>
        </div>
        
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

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    {isMobileMenuOpen && (
      <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
        <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">首页</button>
        <button onClick={() => { setActiveTab('studio'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">设计工坊</button>
        <button onClick={() => { setActiveTab('knowledge'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">知识库</button>
      </div>
    )}
  </nav>
);

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
        通过投喂专业设计规范与材质库，让 AI 真正成为懂施工、懂美学的设计助理。
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
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Layers className="w-6 h-6" />, title: 'CAD 精准还原', desc: '智能识别 DXF/DWG 文件，严格锁定承重墙与门窗位置，拒绝"AI幻觉"。' },
          { icon: <Database className="w-6 h-6" />, title: '私有知识库', desc: '上传您的设计规范、常用材质与家具库，让模型学习您的个人设计语言。' },
          { icon: <Maximize2 className="w-6 h-6" />, title: '全景漫游生成', desc: '一键生成 720° 全景图与漫游视频，支持导出带材质参数的施工参考图。' },
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

const KnowledgeBase = () => (
  <div className="pt-24 px-4 max-w-7xl mx-auto pb-12">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">模型知识投喂中心</h2>
            <p className="text-slate-500 mt-2">在这里上传资料，增强 AI 对特定风格、规范或产品的理解能力。</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center">
            <Upload className="w-4 h-4 mr-2" /> 上传新资料
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-blue-600 font-semibold mb-1">当前模型版本</div>
              <div className="text-2xl font-bold text-slate-900">Structura Pro v2.1</div>
              <div className="text-xs text-blue-500 mt-2">上次更新: 2小时前</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="text-green-600 font-semibold mb-1">已学习资料</div>
              <div className="text-2xl font-bold text-slate-900">1,248 份</div>
              <div className="text-xs text-green-500 mt-2">涵盖 CAD 规范 / 材质库 / 风格图</div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <Cpu className="w-4 h-4 mr-2 text-indigo-500" /> 最近训练任务
            </h3>
            <div className="space-y-3">
              {MOCK_KNOWLEDGE_FILES.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:border-indigo-200 transition group">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded flex items-center justify-center mr-4 
                      ${file.type === 'doc' ? 'bg-orange-50 text-orange-500' : 
                        file.type === 'image' ? 'bg-purple-50 text-purple-500' : 'bg-green-50 text-green-500'}`}>
                      {file.type === 'doc' ? <FileText className="w-5 h-5" /> : 
                       file.type === 'image' ? <ImageIcon className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{file.name}</div>
                      <div className="text-xs text-slate-400">{file.size} • 自动解析中</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {file.status === 'learned' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> 已学习
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" /> 解析中
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DesignStudio = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = () => {
    setUploadedFile("floorplan_v1.dxf");
    setTimeout(() => setStep(2), 800);
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="pt-20 pb-12 px-4 h-screen flex flex-col max-w-7xl mx-auto">
      <div className="mb-6 flex items-center space-x-4 text-sm font-medium text-slate-400">
        <span className={`${step >= 1 ? 'text-indigo-600' : ''}`}>1. 导入图纸</span>
        <ArrowRight className="w-4 h-4" />
        <span className={`${step >= 2 ? 'text-indigo-600' : ''}`}>2. 风格与参数</span>
        <ArrowRight className="w-4 h-4" />
        <span className={`${step >= 3 ? 'text-indigo-600' : ''}`}>3. 智能生成</span>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {step === 1 && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-300 m-4 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer" onClick={handleUpload}>
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">点击上传 CAD / 图片文件</h3>
            <p className="text-slate-500 mb-6 text-center max-w-md">
              支持 .DWG, .DXF, .JPG, .PNG 格式。<br/>
              系统将自动识别墙体结构、门窗位置及房间标注。
            </p>
            <button className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium shadow-sm hover:bg-slate-50">
              选择文件
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 bg-slate-900 p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-mono flex items-center border border-white/20">
                <LayoutTemplate className="w-3 h-3 mr-2" />
                结构锁定模式: ON
              </div>
              <div className="flex-1 flex items-center justify-center border border-slate-700 rounded-lg bg-grid-pattern opacity-80">
                <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 stroke-white fill-none stroke-2">
                  <path d="M20,20 L180,20 L180,180 L20,180 Z" />
                  <path d="M20,100 L100,100 L100,180" />
                  <path d="M100,20 L100,60" />
                  <rect x="100" y="80" width="20" height="20" className="stroke-indigo-400" />
                  <text x="40" y="60" className="fill-slate-500 text-xs stroke-none">Living Room</text>
                  <text x="120" y="60" className="fill-slate-500 text-xs stroke-none">Master Bed</text>
                </svg>
              </div>
              <div className="mt-4 flex space-x-4 text-slate-400 text-xs font-mono">
                <span>DETECTED: 3 ROOMS</span>
                <span>AREA: 124 M²</span>
                <span>CEILING: 2.8M</span>
              </div>
            </div>

            <div className="bg-white p-6 border-l border-slate-200 overflow-y-auto">
              <h3 className="font-bold text-lg text-slate-900 mb-6">生成配置</h3>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">选择设计风格</label>
                <div className="grid grid-cols-2 gap-3">
                  {STYLES.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setSelectedStyle(s.id)}
                      className={`relative p-2 rounded-lg border text-left transition-all ${selectedStyle === s.id ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                    >
                      <div className="h-20 w-full bg-slate-200 rounded mb-2 overflow-hidden">
                        <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-sm text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-500 truncate">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-3">高级参数</label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>创意发散度</span>
                      <span>低 (严守结构)</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" min="0" max="100" defaultValue="20" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm text-slate-700">
                      <input type="checkbox" className="mr-2 rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      启用知识库增强 (RAG)
                    </label>
                    <p className="text-xs text-slate-400 mt-1 pl-6">模型将优先参考您上传的材质库和规范。</p>
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
                    <Loader2 className="w-5 h-5 animate-spin mr-2" /> 正在构建空间...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" /> 生成方案
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" 
                  className="w-full h-full object-cover opacity-90"
                  alt="Rendered Result" 
                />
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-2xl border border-white/50">
                   <button className="p-2 hover:bg-slate-100 rounded-full" title="重新生成"><RefreshCw className="w-5 h-5 text-slate-700" /></button>
                   <div className="h-6 w-px bg-slate-300"></div>
                   <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700">导出方案 (PDF)</button>
                   <button className="px-4 py-1.5 bg-slate-800 text-white rounded-full text-sm font-medium hover:bg-slate-900">全景漫游</button>
                </div>

                <div className="absolute top-6 right-6 flex flex-col space-y-2">
                   <div className="bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center border border-white/10">
                     <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                     尺寸误差 &lt; 1%
                   </div>
                   <div className="bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center border border-white/10">
                     <Database className="w-3 h-3 text-blue-400 mr-2" />
                     应用材质: 知识库 v2
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

      <div className="fixed bottom-6 right-6">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <span className="font-bold text-lg">?</span>
        </div>
      </div>
    </div>
  );
};

export default App;
