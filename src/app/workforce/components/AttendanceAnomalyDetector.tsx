'use client';

import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingDown, Activity, Zap, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAttendanceAnomalies } from '../hooks/useWorkforce';
import { AttendanceAnomaly } from '../types/workforce.types';
import { CardSkeleton, ErrorState } from './WorkforceShared';
import { workforceToasts } from './WorkforceShared';

const anomalyTypeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  late_pattern: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  absence_spike: { icon: TrendingDown, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
  overtime_risk: { icon: Activity, color: 'text-info', bg: 'bg-info/10 border-info/20' },
  leave_clustering: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  low_engagement: { icon: Zap, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
};

const severityColors: Record<string, string> = {
  low: 'bg-info/10 text-info',
  medium: 'bg-warning/10 text-warning',
  high: 'bg-danger/10 text-danger',
};

const AnomalyCard = memo(({ anomaly, onDismiss }: { anomaly: AttendanceAnomaly; onDismiss: (id: string) => void }) => {
  const config = anomalyTypeConfig[anomaly.type] ?? anomalyTypeConfig.late_pattern;
  const IconComp = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      className={`rounded-lg border p-4 ${config.bg} group`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center shrink-0 ${config.color}`}>
          <IconComp size={15} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-foreground">{anomaly.employeeName}</p>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${severityColors[anomaly.severity]}`}>
              {anomaly.severity}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{anomaly.description}</p>
          {anomaly.pattern && (
            <p className={`text-xs font-medium mt-1.5 ${config.color}`}>{anomaly.pattern}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-muted-foreground">{anomaly.department}</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground">Detected today</span>
          </div>
        </div>
        <button
          suppressHydrationWarning
          onClick={() => onDismiss(anomaly.id)}
          className="p-1 rounded text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0"
        >
          <X size={12} />
        </button>
      </div>
    </motion.div>
  );
});
AnomalyCard.displayName = 'AnomalyCard';

export default function AttendanceAnomalyDetector() {
  const { data: anomalies, loading, error, refetch } = useAttendanceAnomalies();
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set());

  const handleDismiss = React.useCallback((id: string) => {
    setDismissed(prev => new Set([...prev, id]));
    const t = workforceToasts.anomalyDismissed();
    toast.success(t.message, { description: t.description });
  }, []);

  const visible = anomalies?.filter(a => !dismissed.has(a.id)) ?? [];
  const highCount = visible.filter(a => a.severity === 'high').length;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Attendance Anomalies</h3>
            {highCount > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-danger/15 text-danger">
                {highCount} high severity
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">AI-detected patterns requiring attention</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
          <span className="text-xs text-muted-foreground">{visible.length} active</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {loading ? (
          <CardSkeleton lines={3} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : visible.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-positive/10 border border-positive/20 flex items-center justify-center text-positive mx-auto mb-3">
              <Activity size={18} />
            </div>
            <p className="text-sm font-medium text-foreground">All clear</p>
            <p className="text-xs text-muted-foreground mt-1">No attendance anomalies detected</p>
          </div>
        ) : (
          visible.map(anomaly => (
            <AnomalyCard key={anomaly.id} anomaly={anomaly} onDismiss={handleDismiss} />
          ))
        )}
      </div>
    </div>
  );
}
