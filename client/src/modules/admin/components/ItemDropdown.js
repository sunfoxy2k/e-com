import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import * as api from '../../../utils/api/index.js';
import React, { useState, useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItemDropdown(props){
  const [newState,updateNewState] = useState('');

  useEffect(()=>{updateNewState(props.status)},[props.status])

  const setItemState = async (newStatus) => {
    await api.OrderService.setOrderStatus(props.id ,newStatus);
    if (newStatus === 0){
      updateNewState('Processing')
    }
    if (newStatus === 1){
      updateNewState('Packaging')
    }
    if (newStatus === 2){
      updateNewState('Delivering')
    }
    if (newStatus === 3){
      updateNewState('Complete')
    }
    try {
      // nothing
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {newState}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item onClick = {(() => setItemState(0))}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Processing
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {(() => setItemState(1))}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Packaging
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {(() => setItemState(2))}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Delivering
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick = {(() => setItemState(3))}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Complete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
