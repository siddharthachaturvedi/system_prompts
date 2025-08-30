import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setCurrentWorkspace } from '../../../store/slices/workspaceSlice';
import { useGetWorkspacesQuery } from '../../../store/api';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils/cn';

const WorkspaceSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state: RootState) => state.workspace);
  const { data: workspacesResponse, isLoading } = useGetWorkspacesQuery();
  
  const workspaces = workspacesResponse?.data || [];

  const handleWorkspaceChange = (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (workspace) {
      dispatch(setCurrentWorkspace(workspace));
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse bg-gray-200 h-8 w-48 rounded-lg" />
    );
  }

  return (
    <Listbox value={currentWorkspace?.id} onChange={handleWorkspaceChange}>
      <div className="relative">
        <Listbox.Button className="relative w-48 cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <span className="flex items-center">
            <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
            <span className="block truncate font-medium">
              {currentWorkspace?.name || 'Select Workspace'}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>

        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg border border-gray-200 focus:outline-none">
            {workspaces.map((workspace) => (
              <Listbox.Option
                key={workspace.id}
                value={workspace.id}
                className={({ active }) =>
                  cn(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <div>
                      <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {workspace.name}
                      </span>
                      {workspace.description && (
                        <span className="text-xs text-gray-500 truncate">
                          {workspace.description}
                        </span>
                      )}
                    </div>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
            
            {/* Add new workspace option */}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button className="w-full text-left px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors">
                + Create New Workspace
              </button>
            </div>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default WorkspaceSelector;