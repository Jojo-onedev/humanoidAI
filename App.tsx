
import React, { useState } from 'react';
import { WritingStyle, HumanizeOptions, HumanizedResult } from './types';
import { GeminiService } from './services/geminiService';
import Metrics from './components/Metrics';

const App: React.FC = () => {
  const [view, setView] = useState<'app' | 'docs'>('app');
  const [inputText, setInputText] = useState('');
  const [options, setOptions] = useState<HumanizeOptions>({
    style: WritingStyle.NATURAL,
    intensity: 75,
    targetAudience: 'Public Général',
    preserveStructure: true
  });
  const [result, setResult] = useState<HumanizedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const service = new GeminiService();
      const res = await service.humanize(inputText, options);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError('Échec du traitement du texte. Veuillez vérifier votre connexion et réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Texte copié !');
  };

  const DocumentationPage = () => (
    <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Documentation Humanoide AI</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Bienvenue dans le guide complet de Humanoide AI. Notre outil utilise les modèles de langage les plus avancés pour transformer des textes générés par IA en contenus naturels, fluides et indétectables.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-indigo-400 font-bold mb-3 uppercase tracking-wider text-sm">Styles d'Écriture</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li><strong className="text-white">Naturel :</strong> Équilibre parfait pour un usage quotidien.</li>
            <li><strong className="text-white">Décontracté :</strong> Ton amical, parfait pour les blogs ou réseaux sociaux.</li>
            <li><strong className="text-white">Professionnel :</strong> Idéal pour les emails corporate et rapports.</li>
            <li><strong className="text-white">Créatif :</strong> Utilise des métaphores et une structure plus variée.</li>
            <li><strong className="text-white">Académique :</strong> Formel mais sans les lourdeurs typiques de l'IA.</li>
          </ul>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-indigo-400 font-bold mb-3 uppercase tracking-wider text-sm">Indicateurs clés</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li><strong className="text-white">Score Humain :</strong> Probabilité que le texte soit perçu comme écrit par un humain.</li>
            <li><strong className="text-white">Lisibilité :</strong> Mesure la fluidité et la facilité de lecture.</li>
            <li><strong className="text-white">Burstiness :</strong> Variation de la longueur des phrases pour briser la monotonie IA.</li>
          </ul>
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Conseils d'utilisation</h3>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl">
            <div className="text-indigo-400 font-bold">01</div>
            <p className="text-slate-300">Utilisez une <strong className="text-white">intensité élevée (80%+)</strong> si votre texte source est très robotique ou répétitif.</p>
          </div>
          <div className="flex gap-4 p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl">
            <div className="text-indigo-400 font-bold">02</div>
            <p className="text-slate-300">Activez <strong className="text-white">"Préserver la Structure"</strong> pour les documents techniques ou les articles structurés avec des listes à puces.</p>
          </div>
          <div className="flex gap-4 p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl">
            <div className="text-indigo-400 font-bold">03</div>
            <p className="text-slate-300">Spécifiez précisément votre <strong className="text-white">Public Cible</strong>. Un texte pour "Étudiants" n'aura pas le même vocabulaire qu'un texte pour "Directeurs Financiers".</p>
          </div>
        </div>
      </section>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center">
        <h3 className="text-xl font-bold text-white mb-4">Besoin d'aide supplémentaire ?</h3>
        <p className="text-slate-400 mb-6">Notre technologie est en constante évolution pour contourner les derniers détecteurs d'IA du marché.</p>
        <button onClick={() => setView('app')} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold transition">Retour à l'outil</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('app')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">H</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Humanoide AI
            </h1>
          </div>
          <nav className="flex gap-8 text-sm font-medium">
            <button 
              onClick={() => setView('app')} 
              className={`transition-colors ${view === 'app' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Application
            </button>
            <button 
              onClick={() => setView('docs')} 
              className={`transition-colors ${view === 'docs' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              Documentation
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'docs' ? (
          <DocumentationPage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar de configuration */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-6">Paramètres</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Style d'Écriture</label>
                    <select 
                      value={options.style}
                      onChange={(e) => setOptions(prev => ({ ...prev, style: e.target.value as WritingStyle }))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white"
                    >
                      <option value={WritingStyle.NATURAL}>Naturel</option>
                      <option value={WritingStyle.CASUAL}>Décontracté</option>
                      <option value={WritingStyle.PROFESSIONAL}>Professionnel</option>
                      <option value={WritingStyle.CREATIVE}>Créatif</option>
                      <option value={WritingStyle.ACADEMIC}>Académique</option>
                      <option value={WritingStyle.STORYTELLER}>Conteur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Intensité ({options.intensity}%)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={options.intensity}
                      onChange={(e) => setOptions(prev => ({ ...prev, intensity: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase font-bold">
                      <span>Léger</span>
                      <span>Extrême</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Public Cible</label>
                    <input 
                      type="text"
                      value={options.targetAudience}
                      onChange={(e) => setOptions(prev => ({ ...prev, targetAudience: e.target.value }))}
                      placeholder="Ex: Professionnels, Étudiants..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-xs font-semibold text-slate-200">Préserver la Structure</label>
                        <p className="text-[10px] text-slate-500 mt-0.5">Garde paragraphes & listes</p>
                      </div>
                      <button
                        onClick={() => setOptions(prev => ({ ...prev, preserveStructure: !prev.preserveStructure }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          options.preserveStructure ? 'bg-indigo-600' : 'bg-slate-700'
                        }`}
                      >
                        <span
                          className={`${
                            options.preserveStructure ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <div className="space-y-4">
                  <Metrics label="Ressemblance Humaine" value={result.humanScore} color="#6366f1" />
                  <Metrics label="Lisibilité" value={result.readabilityScore} color="#10b981" />
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                      <span className="text-xs text-slate-400 uppercase font-bold">Mots</span>
                      <span className="text-xl font-bold text-white">{result.wordCount}</span>
                  </div>
                </div>
              )}
            </aside>

            {/* Espace de travail principal */}
            <div className="lg:col-span-9 space-y-6">
              <div className="relative group">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Collez votre texte généré par IA ici (ChatGPT, Claude, etc.)..."
                  className="w-full h-64 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner placeholder:text-slate-600 resize-none text-white"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium bg-slate-950/50 px-2 py-1 rounded">
                    {inputText.length} caractères
                  </span>
                  <button 
                    onClick={() => setInputText('')}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    Effacer
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={handleHumanize}
                  disabled={loading || !inputText}
                  className={`px-10 py-4 rounded-full font-bold text-white text-lg shadow-2xl shadow-indigo-900/30 flex items-center gap-3 transition transform active:scale-95 ${
                    loading || !inputText ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Humanisation...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Humaniser le Texte
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  {error}
                </div>
              )}

              {result && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-slate-800/50 px-6 py-4 flex justify-between items-center border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Version Humanisée</h3>
                      {options.preserveStructure && (
                        <span className="ml-2 text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30 uppercase font-bold">Structure Préservée</span>
                      )}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(result.humanizedText)}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg text-xs font-bold transition-all border border-indigo-600/20 hover:border-indigo-600"
                    >
                      <svg className="w-4 h-4 transition-transform group-active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      COPIER LE RÉSULTAT
                    </button>
                  </div>
                  <div className="p-8 text-lg leading-relaxed text-slate-100 whitespace-pre-wrap selection:bg-indigo-500/30">
                    {result.humanizedText}
                  </div>
                </div>
              )}

              {result && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-black uppercase text-slate-500 mb-2 block">Avant (IA)</span>
                          <p className="text-sm text-slate-400 line-clamp-6 italic">"{result.originalText}"</p>
                      </div>
                      <div className="bg-indigo-950/10 border border-indigo-900/20 p-4 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-black uppercase text-indigo-400 mb-2 block">Après (Humanisé)</span>
                          <p className="text-sm text-indigo-300 line-clamp-6">"{result.humanizedText}"</p>
                      </div>
                  </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800 py-12 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center gap-2 justify-center mb-6">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-sm">H</div>
                <span className="font-bold text-white">Humanoide AI</span>
            </div>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
              Redonnez une voix naturelle et humaine à vos écrits numériques. Concept par Jonathan Bationo.
            </p>
            <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
                <button onClick={() => setView('app')} className="hover:text-indigo-400 transition-colors">Accueil</button>
                <button onClick={() => setView('docs')} className="hover:text-indigo-400 transition-colors">Documentation</button>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800/50 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                © 2026 Humanoide AI • Par Jonathan Bationo • Propulsé par Gemini 3 Flash
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
