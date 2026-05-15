'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Users, Zap, Heart, BarChart2 } from 'lucide-react';
import { useTeamPerformance } from '../hooks/useWorkforce';
import { TeamPerformanceScore } from '../types/workforce.types';
import { CardSkeleton, ErrorState } from './WorkforceShared';
import Icon from '@/components/ui/AppIcon';


const trendConfig = {
  up: { icon: TrendingUp, color: 'text-positive' },
  down: { icon: TrendingDown, color: 'text-danger' },
  stable: { icon: Minus, color: 'text-muted-foreground' },
};

const scoreMetrics = [
  { key: 'velocityScore' as keyof TeamPerformanceScore, label: 'Velocity', icon: Zap, color: 'bg-primary' },
  { key: 'collaborationScore' as keyof TeamPerformanceScore, label: 'Collab', icon: Users, color: 'bg-accent' },
  { key: 'retentionScore' as keyof TeamPerformanceScore, label: 'Retention', icon: Heart, color: 'bg-positive' },
  { key: 'growthScore' as keyof TeamPerformanceScore, label: 'Growth', icon: Target, color: 'bg-info' },
];

const ScoreRing = memo(({ score, size = 40 }: { score: number; size?: number }) => {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#6366f1' : score >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={3} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - strokeDash }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
});
ScoreRing.displayName = 'ScoreRing';

const DeptScoreCard = memo(({ score, index }: { score: TeamPerformanceScore; index: number }) => {
  const trend = trendConfig[score.trend];
  const TrendIcon = trend.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ScoreRing score={score.overallScore} size={44} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-foreground tabular-nums">{score.overallScore}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{score.departmentName}</p>
            <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
              <TrendIcon size={11} />
              <span>{score.trendValue > 0 ? '+' : ''}{score.trendValue}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-metrics */}
      <div className="grid grid-cols-4 gap-1.5">
        {scoreMetrics.map(({ key, label, icon: Icon, color }) => {
          const val = score[key] as number;
          return (
            <div key={key} className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Icon size={10} className="text-muted-foreground" />
              </div>
              <div className="h-1 rounded-full bg-border overflow-hidden mb-1">
                <motion.div
                  className={`h-full rounded-full ${color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                />
              </div>
              <p className="text-[9px] text-muted-foreground">{label}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
DeptScoreCard.displayName = 'DeptScoreCard';

export default function TeamPerformanceScoring() {
  const { data: scores, loading, error, refetch } = useTeamPerformance();

  const avgScore = scores ? Math.round(scores.reduce((s, d) => s + d.overallScore, 0) / scores.length) : 0;
  const topDept = scores ? scores.reduce((a, b) => a.overallScore > b.overallScore ? a : b, scores[0]) : null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Team Performance Scoring</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Org avg: <span className="text-foreground font-medium">{avgScore}</span>
            {topDept && <> · Top: <span className="text-positive font-medium">{topDept.departmentName}</span></>}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} lines={2} />)}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scores?.map((score, i) => (
              <DeptScoreCard key={score.departmentId} score={score} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
