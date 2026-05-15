'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useActivityTimeline } from '../hooks/useWorkforce';
import { ActivityEvent } from '../types/workforce.types';
import { CardSkeleton, ErrorState } from './WorkforceShared';
import { formatRelativeTime, getAvatarGradient } from '../utils/tableUtils';
import { UserPlus, Calendar, AlertTriangle, TrendingUp, Star, ArrowRight, UserMinus } from 'lucide-react';

const eventConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  hire: { icon: UserPlus, color: 'text-positive', bg: 'bg-positive/10 border-positive/20' },
  leave: { icon: Calendar, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  promotion: { icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  offboard: { icon: UserMinus, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
  alert: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/10 border-danger/20' },
  review: { icon: Star, color: 'text-accent', bg: 'bg-accent/10 border-accent/20' },
  transfer: { icon: ArrowRight, color: 'text-info', bg: 'bg-info/10 border-info/20' },
};

const TimelineEvent = memo(({ event, index, isLast }: { event: ActivityEvent; index: number; isLast: boolean }) => {
  const config = eventConfig[event.type] ?? eventConfig.alert;
  const IconComp = config.icon;
  const gradClass = getAvatarGradient(event.actorAvatar.charCodeAt(0) % 8);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex gap-4 group"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${config.bg} ${config.color} shrink-0`}>
          <IconComp size={13} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[16px]" />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-4 ${isLast ? '' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradClass} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
              {event.actorAvatar.slice(0, 1)}
            </div>
            <p className="text-xs text-foreground">
              <span className="font-medium">{event.actor}</span>
              {' '}
              <span className="text-muted-foreground">{event.description}</span>
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
            {formatRelativeTime(event.timestamp)}
          </span>
        </div>
        {event.metadata && Object.keys(event.metadata).length > 0 && (
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {Object.entries(event.metadata).slice(0, 3).map(([k, v]) => (
              <span key={k} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">
                {k}: {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});
TimelineEvent.displayName = 'TimelineEvent';

export default function ActivityTimeline() {
  const { data: events, loading, error, refetch } = useActivityTimeline();

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Activity Timeline</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Recent workforce events</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <CardSkeleton lines={5} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div>
            {events?.map((event, i) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={i}
                isLast={i === (events?.length ?? 0) - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
