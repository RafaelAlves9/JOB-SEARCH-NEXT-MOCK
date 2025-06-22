'use client';

import { Briefcase } from 'lucide-react';

export const NoResults = () => (
   <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-6">
         <Briefcase size={40} className="text-sky-500" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Nenhuma vaga encontrada</h2>
      <p className="text-slate-500 max-w-md mx-auto">
         Tente usar palavras-chave diferentes ou mais abrangentes para encontrar sua vaga ideal.
      </p>
   </div>
); 