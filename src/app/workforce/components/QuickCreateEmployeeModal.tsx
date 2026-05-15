'use client';

import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Building2, MapPin, Calendar, Briefcase, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { QuickCreateEmployeeForm } from '../types/workforce.types';
import { employeeService } from '../services/workforceService';
import { workforceToasts } from './WorkforceShared';
import Icon from '@/components/ui/AppIcon';


const departments = ['Engineering', 'Product', 'Design', 'Finance', 'Sales', 'Human Resources', 'Analytics', 'Marketing'];
const branches = ['HQ - New York', 'London', 'Tokyo', 'Berlin', 'Paris', 'Mexico City', 'Singapore', 'Dubai'];
const managers = ['Marcus Aldridge', 'Priya Sharma', 'Tariq Al-Hassan', 'Claire Okonkwo', 'Amara Diallo'];

const initialForm: QuickCreateEmployeeForm = {
  name: '',
  role: '',
  department: '',
  branch: '',
  email: '',
  shiftType: 'Flexible',
  contractType: 'Full-time',
  startDate: '',
  manager: '',
};

interface QuickCreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (name: string) => void;
}

const inputClass = 'w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all';
const labelClass = 'block text-xs font-medium text-muted-foreground mb-1.5';

const SelectField = memo(({ label, value, onChange, options, icon: Icon }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon?: React.ElementType;
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    <div className="relative">
      {Icon && <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${inputClass} ${Icon ? 'pl-9' : ''} appearance-none pr-8`}
        suppressHydrationWarning
      >
        <option value="">Select {label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  </div>
));
SelectField.displayName = 'SelectField';

export default function QuickCreateEmployeeModal({ open, onClose, onCreated }: QuickCreateEmployeeModalProps) {
  const [form, setForm] = useState<QuickCreateEmployeeForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuickCreateEmployeeForm, string>>>({});

  const update = useCallback(<K extends keyof QuickCreateEmployeeForm>(key: K, value: QuickCreateEmployeeForm[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }, []);

  const validate = useCallback(() => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.role.trim()) errs.role = 'Role is required';
    if (!form.department) errs.department = 'Department is required';
    if (!form.branch) errs.branch = 'Branch is required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
    return errs;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const result = await employeeService.create(form);
      if (result.error) throw new Error(result.error);
      const t = workforceToasts.employeeCreated(form.name);
      toast.success(t.message, { description: t.description });
      onCreated?.(form.name);
      setForm(initialForm);
      onClose();
    } catch {
      toast.error('Failed to create employee', { description: 'Please try again' });
    } finally {
      setLoading(false);
    }
  }, [form, validate, onCreated, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-border">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 blob-primary opacity-15" />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Add New Employee</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Onboarding workflow will be auto-initiated</p>
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={onClose}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Name + Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Jane Smith"
                        className={`${inputClass} pl-9 ${errors.name ? 'border-danger/50' : ''}`}
                        suppressHydrationWarning
                      />
                    </div>
                    {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Job Title *</label>
                    <div className="relative">
                      <Briefcase size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={form.role}
                        onChange={e => update('role', e.target.value)}
                        placeholder="Senior Engineer"
                        className={`${inputClass} pl-9 ${errors.role ? 'border-danger/50' : ''}`}
                        suppressHydrationWarning
                      />
                    </div>
                    {errors.role && <p className="text-xs text-danger mt-1">{errors.role}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Work Email *</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="jane.smith@novatech.com"
                      className={`${inputClass} pl-9 ${errors.email ? 'border-danger/50' : ''}`}
                      suppressHydrationWarning
                    />
                  </div>
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
                </div>

                {/* Department + Branch */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <SelectField
                      label="Department *"
                      value={form.department}
                      onChange={v => update('department', v)}
                      options={departments}
                      icon={Building2}
                    />
                    {errors.department && <p className="text-xs text-danger mt-1">{errors.department}</p>}
                  </div>
                  <div>
                    <SelectField
                      label="Branch *"
                      value={form.branch}
                      onChange={v => update('branch', v)}
                      options={branches}
                      icon={MapPin}
                    />
                    {errors.branch && <p className="text-xs text-danger mt-1">{errors.branch}</p>}
                  </div>
                </div>

                {/* Manager + Start Date */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Reporting Manager"
                    value={form.manager}
                    onChange={v => update('manager', v)}
                    options={managers}
                    icon={User}
                  />
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <div className="relative">
                      <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={e => update('startDate', e.target.value)}
                        className={`${inputClass} pl-9`}
                        suppressHydrationWarning
                      />
                    </div>
                  </div>
                </div>

                {/* Shift + Contract */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Shift Type"
                    value={form.shiftType}
                    onChange={v => update('shiftType', v as QuickCreateEmployeeForm['shiftType'])}
                    options={['Morning', 'Evening', 'Night', 'Flexible']}
                  />
                  <SelectField
                    label="Contract Type"
                    value={form.contractType}
                    onChange={v => update('contractType', v as QuickCreateEmployeeForm['contractType'])}
                    options={['Full-time', 'Part-time', 'Contract', 'Intern']}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-border">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    suppressHydrationWarning
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Add Employee'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
