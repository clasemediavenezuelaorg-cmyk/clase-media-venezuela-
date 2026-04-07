import { motion, AnimatePresence } from "motion/react";
import { X, Youtube } from "lucide-react";

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export function YouTubeModal({ isOpen, onClose, videoId, title }: YouTubeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-black shadow-2xl"
          >
            <div className="flex items-center justify-between bg-zinc-900/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-600/10 p-2 text-red-600">
                  <Youtube className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">{title}</h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10 transition-colors">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
