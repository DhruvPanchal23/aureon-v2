'use client';

import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Copy, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAISummary } from '../hooks/useWorkforce';

const SkeletonText = memo(() => (
  <div className="space-y-2">
    {[100, 90, 95, 80, 85].map((w, i) => (
      <div key={i} className={`h-3 rounded-full bg-muted/60 animate-pulse`} style={{ width: `${w}%` }} />
    ))}
  </div>
));
SkeletonText.displayName = 'SkeletonText';

function parseMarkdownBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
  );
}

export default function AIWorkforceSummary() {
  const { data: summary, loading, error, refetch } = useAISummary();

  const handleCopy = React.useCallback(() => {
    if (summary) {
      navigator.clipboard.writeText(summary.replace(/\*\*/g, ''));
      toast.success('Summary copied to clipboard');
    }
  }, [summary]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="relative px-5 py-4 border-b border-border">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 blob-primary opacity-15" />
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">AI Workforce Summary</h3>
              <p className="text-xs text-muted-foreground">Generated from live workforce data</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              suppressHydrationWarning
              onClick={handleCopy}
              disabled={!summary}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-40"
              title="Copy summary"
            >
              <Copy size={13} />
            </button>
            <button
              suppressHydrationWarning
              onClick={refetch}
              disabled={loading}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-40"
              title="Regenerate"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">AI is analyzing workforce data...</span>
            </div>
            <SkeletonText />
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Failed to generate summary</p>
            <button
              suppressHydrationWarning
              onClick={refetch}
              className="px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground transition-all"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {summary ? parseMarkdownBold(summary) : ''}
            </p>

            {/* Action chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                'View Engineering Bench',
                'Review Retention Risks',
                'Accelerate Hiring',
              ].map(action => (
                <button
                  key={action}
                  suppressHydrationWarning
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {action}
                  <ChevronRight size={11} />
                </button>
              ))}
            </div>

            {/* Confidence indicator */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-positive" />
                <span className="text-xs text-muted-foreground">Confidence: 94%</span>
              </div>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">Based on 1,579 employee records</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
