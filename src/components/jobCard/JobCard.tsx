'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import { Building2, MapPin, Clock } from 'lucide-react';
import { IJob } from '../../app/(search)/search.type';

interface IJobCardProps {
   job: IJob;
}

const JobCardComponent = forwardRef<HTMLDivElement, IJobCardProps>(({ job }, ref) => (
   <div
      ref={ref}
      className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
   >
      <div className="p-6">
         <div className="flex items-start mb-4">
            <div className="w-16 h-16 flex-shrink-0 mr-5 bg-slate-100 rounded-xl flex items-center justify-center">
               {job.companyLogo ? (
                  <Image
                     src={job.companyLogo}
                     alt={`${job.company} logo`}
                     width={64}
                     height={64}
                     className="object-contain w-full h-full p-2 rounded-xl"
                  />
               ) : (
                  <Building2 className="text-slate-400" size={32} />
               )}
            </div>
            <div className="flex-1">
               <p className="text-slate-500 text-sm">{job.company}</p>
               <h3 className="text-lg font-bold text-slate-800 mt-1 line-clamp-2 leading-tight">{job.position}</h3>
            </div>
         </div>
         {job.salary && <p className="text-md font-semibold text-emerald-600 mb-3">{job.salary}</p>}
      </div>
      <div className="border-t border-slate-100 mt-auto p-6 space-y-3">
         <div className="flex items-center text-sm text-slate-500">
            <MapPin size={16} className="mr-3 flex-shrink-0 text-slate-400" />
            <span className="truncate">{job.location}</span>
         </div>
         <div className="flex items-center text-sm text-slate-500">
            <Clock size={16} className="mr-3 flex-shrink-0 text-slate-400" />
            <span>{job.agoTime || job.date}</span>
         </div>
         <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg py-2 mt-4 transition-colors duration-300"
         >
            Ver detalhes
         </a>
      </div>
   </div>
));
JobCardComponent.displayName = 'JobCard';

export const JobCard = JobCardComponent;

export const SkeletonCard = () => (
   <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
      <div className="flex items-start mb-4">
         <div className="w-16 h-16 flex-shrink-0 mr-5 bg-slate-100 rounded-xl animate-pulse"></div>
         <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-full animate-pulse"></div>
         </div>
      </div>
      <div className="space-y-3 mt-auto pt-6">
         <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
         <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
         <div className="h-10 bg-slate-200 rounded-lg mt-4 animate-pulse"></div>
      </div>
   </div>
);