"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function InteractiveSizingModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-sm text-[var(--color-accent)] underline underline-offset-4 font-medium transition-colors hover:text-black"
      >
        Find your size
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-serif text-xl text-[var(--color-secondary)]">Sizing Guide</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4 border-b border-gray-100 mb-6">
                <button className="pb-2 border-b-2 border-[var(--color-accent)] font-medium">Ring Size</button>
                <button className="pb-2 text-gray-400 hover:text-gray-600">Necklace Length</button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Measure the inside diameter of a ring that fits you well and compare it to our chart. Ensure you measure exactly through the center.
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="p-4 bg-gray-50 rounded-sm border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="font-bold mb-1 text-[var(--color-secondary)]">Size 6</div>
                    <div className="text-gray-500">16.5 mm</div>
                  </div>
                  <div className="p-4 bg-[#fdfaf1] border border-[var(--color-accent)] rounded-sm cursor-pointer shadow-sm">
                    <div className="font-bold mb-1 text-[var(--color-secondary)]">Size 7</div>
                    <div className="text-[var(--color-accent)]">17.3 mm</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-sm border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="font-bold mb-1 text-[var(--color-secondary)]">Size 8</div>
                    <div className="text-gray-500">18.1 mm</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm text-sm text-center">
                  <span className="block mb-2 font-medium">Prefer a printable guide?</span>
                  <a href="#" className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1">Download PDF Guide</a>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-[var(--color-secondary)] text-white hover:bg-black transition-colors rounded-sm text-xs tracking-widest uppercase font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
