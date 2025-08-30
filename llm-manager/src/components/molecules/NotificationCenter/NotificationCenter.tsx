import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { markNotificationRead, removeNotification } from '../../../store/slices/uiSlice';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../utils/cn';

const NotificationCenter: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.ui);

  const handleMarkRead = (id: string) => {
    dispatch(markNotificationRead(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.slice(0, 5).map((notification) => (
        <Transition
          key={notification.id}
          show={true}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={cn(
              'rounded-lg border p-4 shadow-lg',
              getNotificationColors(notification.type),
              !notification.read && 'ring-2 ring-primary-500 ring-opacity-50'
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-lg">
                  {getNotificationIcon(notification.type)}
                </span>
              </div>
              
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                  {notification.message}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              <div className="ml-4 flex-shrink-0 flex space-x-1">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkRead(notification.id)}
                    className="text-xs text-primary-600 hover:text-primary-800"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleRemove(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default NotificationCenter;