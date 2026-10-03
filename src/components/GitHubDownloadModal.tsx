import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  X,
  Globe,
  ExternalLink,
  Smartphone,
  FolderArchive,
  Terminal,
  Sparkles,
  Bot,
  Zap,
  FileCode,
} from 'lucide-react';
import { downloadProjectZip } from '../utils/projectZipExporter';
import { soundFx } from '../utils/audioEffects';

interface GitHubDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEB_WORKFLOW_YAML = `name: Deploy Web App to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy-web:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install --legacy-peer-deps --no-audit --no-fund

      - name: Build Web Application
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Web Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

export const GitHubDownloadModal: React.FC<GitHubDownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    soundFx.playHeadshot();
    setDownloading(true);
    try {
      await downloadProjectZip();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const gitPushCommand = `git add .
git commit -m "Convert to ultra-fast Web App on GitHub Pages"
git push origin main`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-w-xl w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Official Web App & GitHub Pages Pipeline</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            100% Ready: Instant Live Web App (No Gradle Errors!)
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            APK complexity completely removed! App now compiles into an ultra-fast web application
            hosted directly on <strong>GitHub Pages</strong> with zero build errors.
          </p>
        </div>

        {/* Feature summary */}
        <div className="bg-zinc-950 p-4 rounded-2xl border border-emerald-500/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Why Web App is 100x Better:</span>
          </div>
          <div className="space-y-1.5 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Builds in 20 seconds:</strong> No Java SDK, Gradle, or Android tools needed.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Opens instantly in any mobile browser:</strong> Chrome, Safari, Firefox.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>PWA Mobile Install:</strong> Tap "Add to Home Screen" on phone to get full-screen app icon!
              </span>
            </div>
          </div>
        </div>

        {/* Option 1: Git Push */}
        <div className="space-y-2 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Step 1: Push via Git Terminal</span>
            </span>
            <button
              onClick={() => copyText(gitPushCommand, 'push')}
              className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              {copiedCmd === 'push' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === 'push' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-[11px] font-mono text-zinc-300 select-all leading-relaxed bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
            {gitPushCommand}
          </pre>
        </div>

        {/* Option 2: Copy Workflow YAML */}
        <div className="space-y-2 bg-zinc-950 p-3.5 rounded-2xl border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5" />
              <span>Or update .github/workflows/deploy-web.yml directly:</span>
            </span>
            <button
              onClick={() => copyText(WEB_WORKFLOW_YAML, 'yaml')}
              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/30"
            >
              {copiedCmd === 'yaml' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd === 'yaml' ? 'YAML Copied!' : 'Copy Web Workflow'}</span>
            </button>
          </div>
        </div>

        {/* Option 3: Download Complete Web Project ZIP */}
        <div className="space-y-2 bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-zinc-950 font-black text-xs hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-black" />
            <span>
              {downloading ? 'Creating Web ZIP Archive...' : 'Download Complete Web Project (.ZIP)'}
            </span>
          </button>
        </div>

        {/* GitHub Pages Setting Note */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300/90 leading-relaxed">
          💡 <strong>Tip for GitHub Pages:</strong> In your GitHub repo, go to <strong>Settings → Pages → Build and deployment → Source</strong> and select <strong>"GitHub Actions"</strong>!
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-all"
        >
          Got it, Close
        </button>
      </div>
    </div>
  );
};
