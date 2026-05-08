import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Settings, Factory } from 'lucide-react';
import { MODULES, ModuleGroup } from '../../lib/modules';
import { cn } from '../../lib/utils';
export function Sidebar() {
  const groups: Record<ModuleGroup, typeof MODULES> = {
    OVERVIEW: MODULES.filter((m) => m.group === 'OVERVIEW'),
    OPERATIONS: MODULES.filter((m) => m.group === 'OPERATIONS'),
    'LOGISTICS & PEOPLE': MODULES.filter(
      (m) => m.group === 'LOGISTICS & PEOPLE'
    ),
    INSIGHTS: MODULES.filter((m) => m.group === 'INSIGHTS')
  };
  return (
    <aside className="w-64 bg-[#2A1D14] text-cream flex flex-col h-screen sticky top-0 border-r border-[#3B2A1F] hidden md:flex shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-[#3B2A1F]">
        <div className="flex items-center gap-2 text-avocado-400">
          <Factory className="h-6 w-6" />
          <span className="font-bold text-lg tracking-wide text-bone">
            TERRA FMCG
          </span>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="px-4 py-4">
        <button className="w-full flex items-center justify-between bg-[#3B2A1F] hover:bg-[#4A3528] px-3 py-2 rounded-lg transition-colors text-sm border border-[#4A3528]">
          <div className="flex flex-col items-start">
            <span className="font-medium text-bone">Kakira Factory</span>
            <span className="text-xs text-soil-200">Shift A</span>
          </div>
          <ChevronDown className="h-4 w-4 text-soil-300" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6 custom-scrollbar">
        {(Object.keys(groups) as ModuleGroup[]).map((group) =>
        <div key={group}>
            <h4 className="px-3 text-xs font-semibold text-soil-400 tracking-wider mb-2">
              {group}
            </h4>
            <div className="space-y-1">
              {groups[group].map((module) =>
            <NavLink
              key={module.id}
              to={module.path}
              className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group',
                isActive ?
                'bg-[#3B2A1F] text-bone border-l-2 border-soil-500' :
                'text-soil-200 hover:bg-[#3B2A1F]/50 hover:text-bone border-l-2 border-transparent'
              )
              }>
              
                  <module.icon
                className={cn(
                  'h-4 w-4',
                  'group-hover:text-avocado-400 transition-colors'
                )} />
              
                  {module.name}
                </NavLink>
            )}
            </div>
          </div>
        )}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#3B2A1F]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#3B2A1F] transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-soil-700 flex items-center justify-center text-bone font-bold text-sm shrink-0">
            AO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-bone truncate">
              Amara Okeke
            </p>
            <p className="text-xs text-soil-300 truncate">Plant Manager</p>
          </div>
          <Settings className="h-4 w-4 text-soil-400 shrink-0" />
        </div>
      </div>
    </aside>);

}