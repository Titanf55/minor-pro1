'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { FileUpload } from '@/components/FileUpload';
import { ProcessingPipeline } from '@/components/ProcessingPipeline';
import { ClaimCard } from '@/components/ClaimCard';
import { ConfidenceBar } from '@/components/ConfidenceBar';
import { PRESET_SAMPLES } from '@/lib/mockData';
import { analyzeText } from '@/lib/api';
import { AnalysisResult } from '@/lib/types';
import {
  Play,
  Sliders,
  RotateCcw,
  AlertCircle,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowUp,
  FileText
} from 'lucide-react';

export default function HomePage() {
  // Input state
  const [generatedText, setGeneratedText] = useState('');
  const [referenceText, setReferenceText] = useState('');
  const [referenceFileName, setReferenceFileName] = useState<string | undefined>();
  const [activePreset, setActivePreset] = useState('');

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [threshold, setThreshold] = useState(0.82);
  const [temperature, setTemperature] = useState(1.25);

  // Processing
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState({ step: 1, title: '', detail: '' });
  const [error, setError] = useState<string | null>(null);

  // Results
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const loadPreset = (presetId: string) => {
    const preset = PRESET_SAMPLES.find((p) => p.id === presetId);
    if (preset) {
      setActivePreset(preset.id);
      setGeneratedText(preset.generatedText);
      setReferenceText(preset.referenceText);
      setReferenceFileName(preset.mockResult.referenceFileName);
      setError(null);
      setResult(null);
    }
  };

  const handleReset = () => {
    setGeneratedText('');
    setReferenceText('');
    setReferenceFileName(undefined);
    setActivePreset('');
    setError(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!generatedText.trim()) {
      setError('Please paste the LLM-generated text to analyze.');
      return;
    }
    if (!referenceText.trim()) {
      setError('Please provide reference text or upload a document.');
      return;
    }
    setError(null);
    setResult(null);
    setIsAnalyzing(true);

    try {
      const res = await analyzeText(
        { generatedText, referenceText, referenceFileName, confidenceThreshold: threshold, temperature },
        (stage) => setCurrentStage(stage)
      );
      setResult(res);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const m = result?.metrics;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center text-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              Hallucination Detector
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              SLM meets LLM — Confidence-based adaptive routing with evidence grounding
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200">
              <Cpu className="w-3 h-3" /> DeBERTa-v3
            </span>
            <span className="flex items-center gap-1 bg-purple-50 text-purple-600 px-2 py-1 rounded border border-purple-200">
              <Sparkles className="w-3 h-3" /> Groq LLaMA-3
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* Preset Samples */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Load sample:</span>
          {PRESET_SAMPLES.map((p) => (
            <button
              key={p.id}
              onClick={() => loadPreset(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                activePreset === p.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p.title}
            </button>
          ))}
          {(generatedText || referenceText) && (
            <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 ml-auto">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* LLM Generated Text */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h2 className="text-sm font-bold text-gray-800">LLM-Generated Response</h2>
            </div>
            <TextInput
              label=""
              value={generatedText}
              onChange={(v) => { setGeneratedText(v); setActivePreset(''); setResult(null); }}
              rows={8}
              placeholder="Paste the text you want to fact-check..."
              onClear={() => setGeneratedText('')}
            />
          </div>

          {/* Reference Document */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <h2 className="text-sm font-bold text-gray-800">Reference Document</h2>
            </div>
            <div className="space-y-3">
              <FileUpload
                currentFileName={referenceFileName}
                onFileLoaded={(name, text) => { setReferenceFileName(name); setReferenceText(text); setActivePreset(''); setResult(null); }}
                onClear={() => { setReferenceFileName(undefined); setReferenceText(''); }}
              />
              <TextInput
                label="Or paste reference text"
                value={referenceText}
                onChange={(v) => { setReferenceText(v); setActivePreset(''); setResult(null); }}
                rows={4}
                placeholder="Paste reference evidence directly..."
                onClear={() => setReferenceText('')}
              />
            </div>
          </div>
        </div>

        {/* Settings Toggle */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-between w-full text-xs font-semibold text-gray-600"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-500" />
              Routing Settings
            </span>
            <span className="text-blue-500">{showSettings ? 'Hide' : 'Show'}</span>
          </button>
          {showSettings && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid md:grid-cols-2 gap-5 text-xs">
              <div>
                <div className="flex justify-between mb-1 text-gray-600">
                  <span>Confidence Threshold (τ)</span>
                  <span className="font-bold text-blue-600">{(threshold * 100).toFixed(0)}%</span>
                </div>
                <input type="range" min="0.50" max="0.95" step="0.01" value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full accent-blue-500" />
                <p className="text-gray-400 mt-1">Below this → claim goes to LLM</p>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-gray-600">
                  <span>Temperature Scaling (T)</span>
                  <span className="font-bold text-blue-600">{temperature.toFixed(2)}</span>
                </div>
                <input type="range" min="0.80" max="2.00" step="0.05" value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-blue-500" />
                <p className="text-gray-400 mt-1">Higher T → softer/less overconfident scores</p>
              </div>
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            disabled={isAnalyzing}
            onClick={handleAnalyze}
            className={`px-8 py-3 rounded-xl text-sm font-bold text-white shadow flex items-center gap-2 ${
              isAnalyzing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            } transition`}
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                Analyze Claims
              </>
            )}
          </button>
        </div>

        {/* Processing Pipeline */}
        {isAnalyzing && <ProcessingPipeline currentStage={currentStage} />}

        {/* ═══════════ RESULTS SECTION ═══════════ */}
        {result && (
          <div className="space-y-6 pt-4 border-t-2 border-blue-200">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900">Analysis Results</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {m?.totalClaims} claims extracted · {result.timestamp}
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-semibold">Supported</span>
                </div>
                <p className="text-2xl font-bold text-green-700">{m?.supportedCount}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-red-600 mb-1">
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Contradicted</span>
                </div>
                <p className="text-2xl font-bold text-red-700">{m?.contradictedCount}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-yellow-600 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Insufficient</span>
                </div>
                <p className="text-2xl font-bold text-yellow-700">{m?.insufficientCount}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-blue-600 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-semibold">Latency</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{m?.overallLatencyMs}<span className="text-sm font-normal text-gray-400"> ms</span></p>
              </div>
            </div>

            {/* SLM vs LLM Split Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Routing Split — Who handled the claims?
              </p>
              <div className="h-7 w-full rounded-full overflow-hidden flex text-xs font-bold text-white">
                <div className="bg-blue-500 h-full flex items-center justify-center" style={{ width: `${m?.slmPercentage}%` }}>
                  SLM {m?.slmPercentage}%
                </div>
                <div className="bg-purple-500 h-full flex items-center justify-center" style={{ width: `${m?.llmPercentage}%` }}>
                  LLM {m?.llmPercentage}%
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                <span>⚡ {m?.slmCount} claims via SLM (fast, ~38ms each)</span>
                <span>🔍 {m?.llmCount} claims via LLM (deep verification)</span>
              </div>
            </div>

            {/* Cost / Latency Savings */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-xs text-green-600 font-semibold">Latency Saved</p>
                <p className="text-xl font-bold text-green-700">{m?.latencyReductionPct}%</p>
                <p className="text-xs text-green-500">{m?.overallLatencyMs}ms vs {m?.estimatedBaselineLlmLatencyMs}ms baseline</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-xs text-blue-600 font-semibold">Cost Saved</p>
                <p className="text-xl font-bold text-blue-700">{m?.costSavingsPct}%</p>
                <p className="text-xs text-blue-500">${m?.estimatedCostUsd?.toFixed(4)} vs ${m?.baselineLlmCostUsd?.toFixed(4)} baseline</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <p className="text-xs text-purple-600 font-semibold">Avg Confidence</p>
                <p className="text-xl font-bold text-purple-700">{((m?.averageConfidence ?? 0) * 100).toFixed(1)}%</p>
                <p className="text-xs text-purple-500">after calibration (T = {temperature})</p>
              </div>
            </div>

            {/* Claim Cards */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Extracted Claims ({result.claims.length})
              </h3>
              <div className="space-y-4">
                {result.claims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
              </div>
            </div>

            {/* Scroll to top */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3" /> Back to top
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
