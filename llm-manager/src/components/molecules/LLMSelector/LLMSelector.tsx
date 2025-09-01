import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setActiveProvider, setActiveModel } from '../../../store/slices/llmSlice';
import { useGetLLMProvidersQuery } from '../../../store/api';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils/cn';
import Badge from '../../atoms/Badge/Badge';

const LLMSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { activeProvider, activeModel } = useSelector((state: RootState) => state.llm);
  const { data: providersResponse, isLoading } = useGetLLMProvidersQuery();
  
  const providers = providersResponse?.data || [];
  const currentProvider = providers.find(p => p.id === activeProvider);
  const currentModel = currentProvider?.models.find(m => m.id === activeModel);

  const handleProviderChange = (providerId: string) => {
    dispatch(setActiveProvider(providerId));
    const provider = providers.find(p => p.id === providerId);
    if (provider && provider.models.length > 0) {
      dispatch(setActiveModel(provider.models[0].id));
    }
  };

  const handleModelChange = (modelId: string) => {
    dispatch(setActiveModel(modelId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 h-8 w-32 rounded-lg" />
        <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Provider Selector */}
      <Listbox value={activeProvider} onChange={handleProviderChange}>
        <div className="relative">
          <Listbox.Button className="relative w-40 cursor-pointer rounded-xl bg-white py-2.5 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-primary-300 hover:shadow-soft transition-all duration-200">
            <span className="flex items-center">
              {currentProvider && (
                <>
                  <span className="block truncate font-medium">
                    {currentProvider.displayName}
                  </span>
                  <Badge
                    variant={currentProvider.status === 'active' ? 'success' : 'danger'}
                    size="sm"
                    className="ml-2"
                  >
                    {currentProvider.status}
                  </Badge>
                </>
              )}
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
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-strong border border-gray-200 focus:outline-none animate-scale-in">
              {providers.map((provider) => (
                <Listbox.Option
                  key={provider.id}
                  value={provider.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2.5 pl-3 pr-9 transition-colors duration-150',
                      active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                          {provider.displayName}
                        </span>
                        <Badge
                          variant={provider.status === 'active' ? 'success' : 'danger'}
                          size="sm"
                          className="ml-2"
                        >
                          {provider.status}
                        </Badge>
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
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Model Selector */}
      {currentProvider && (
        <Listbox value={activeModel} onChange={handleModelChange}>
          <div className="relative">
            <Listbox.Button className="relative w-36 cursor-pointer rounded-xl bg-white py-2.5 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-primary-300 hover:shadow-soft transition-all duration-200">
              <span className="block truncate font-medium">
                {currentModel?.displayName || 'Select Model'}
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-strong border border-gray-200 focus:outline-none animate-scale-in">
                {currentProvider.models.map((model) => (
                  <Listbox.Option
                    key={model.id}
                    value={model.id}
                    className={({ active }) =>
                      cn(
                        'relative cursor-pointer select-none py-2.5 pl-3 pr-9 transition-colors duration-150',
                        active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <div>
                          <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                            {model.displayName}
                          </span>
                          {model.description && (
                            <span className="text-xs text-gray-500 truncate">
                              {model.description}
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
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
};

export default LLMSelector;