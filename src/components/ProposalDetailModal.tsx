import { motion, AnimatePresence } from "motion/react";
import { X, ThumbsUp, MessageSquare, Calendar, User, Tag, CheckCircle2, Clock, Edit3 } from "lucide-react";
import Markdown from "react-markdown";
import { Proposal } from "../types";
import { cn } from "@/src/lib/utils";

interface ProposalDetailModalProps {
  proposal: Proposal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalDetailModal({ proposal, isOpen, onClose }: ProposalDetailModalProps) {
  if (!proposal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[3rem] bg-brand-bone shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-48 flex-shrink-0 overflow-hidden bg-brand-blue p-8 text-white md:h-64 md:p-12">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-brand-gold px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {proposal.category}
                  </span>
                  <button 
                    onClick={onClose}
                    className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">{proposal.title}</h2>
                  <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-brand-bone/60">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>ID Autor: {proposal.authorId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Publicado: Hace 3 días</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {proposal.status === "approved" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : proposal.status === "under-review" ? (
                        <Clock className="h-4 w-4 text-brand-gold" />
                      ) : (
                        <Edit3 className="h-4 w-4" />
                      )}
                      <span className="capitalize">{proposal.status.replace("-", " ")}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl"></div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="mx-auto max-w-3xl space-y-8">
                {/* Abstract/Description */}
                <div className="rounded-3xl border border-brand-gold/10 bg-white p-8 shadow-sm">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-blue/40">Resumen Ejecutivo</h3>
                  <p className="text-lg font-medium leading-relaxed text-brand-blue">
                    {proposal.description}
                  </p>
                </div>

                {/* Main Content (Markdown) */}
                <div className="markdown-body prose prose-brand max-w-none">
                  <Markdown>{proposal.content}</Markdown>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-8 border-t border-brand-gold/10">
                  <Tag className="h-4 w-4 text-brand-slate/40 mr-2" />
                  {["reforma", "legal", "comunidad", "servicios"].map(tag => (
                    <span key={tag} className="rounded-lg bg-brand-bone px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-slate border border-brand-gold/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex-shrink-0 border-t border-brand-gold/10 bg-white p-6 md:px-12">
              <div className="mx-auto flex max-w-3xl items-center justify-between">
                <div className="flex items-center gap-8">
                  <button className="flex items-center gap-2 text-brand-blue transition-all hover:scale-110">
                    <ThumbsUp className="h-6 w-6" />
                    <span className="text-lg font-black">{proposal.votes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-brand-slate transition-all hover:scale-110">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-lg font-black">12</span>
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="rounded-2xl border border-brand-gold/20 bg-brand-bone px-8 py-4 text-sm font-bold text-brand-blue transition-all hover:bg-brand-gold/10">
                    Descargar PDF
                  </button>
                  <button className="rounded-2xl bg-brand-red px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95">
                    Apoyar Propuesta
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
