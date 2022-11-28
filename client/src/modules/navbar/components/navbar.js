import React, { useContext } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import SushiLogo from '../assets/sushi.png'
import loginIcon from '../assets/login-icon.svg';
import './navbar.css'
import CartContext from '../../store/cart-content'
import { Link } from "react-router-dom";
import LoginPopup from '../../popup/login';
import RegisterPopup from '../../popup/register';
import genericProfileIcon from '../assets/generic-profile-icon.png';
import { store, clearUserStore } from '../../../store/user';
import { connect } from 'react-redux';
import { AuthenticateService } from '../../../utils/api';

const navigation = [
  { name: 'Menu', href: '/', current: true },
  { name: 'Your order', href: '/userorder', current: true },
]

const userNavigation = [
  { name: 'Manage Product', href: '#' },
  { name: 'Manage Order', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function mapStateToProps (state, ownProps) {
  return {
    user: state,
  }
}

async function logout () {
  try {
    await AuthenticateService.logout();
  } catch (err) {
    console.log(err);
  }
  store.dispatch(clearUserStore());
}

const Navbar = (props) => {
  const userMenuItems = props.user.sessionId ? [
    <Menu.Item key='3'>
      <div className={'block px-4 py-2 text-sm text-gray-700'}>
        <b>{props.user.name}</b>
      </div>
    </Menu.Item>,
    props.user.role === 'Admin' ? 
    <Menu.Item key='4'>
      <a href="/manageproduct">
        <div className={'block px-4 py-2 text-sm text-gray-700'}>
          <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
            Manage Product
          </span>
        </div>
      </a>
    </Menu.Item> : null,
    props.user.role === 'Admin' ? 
    <Menu.Item key='4'>
      <a href="/manageorder">
        <div className={'block px-4 py-2 text-sm text-gray-700'}>
          <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
            Manage Order
          </span>
        </div>
      </a>
    </Menu.Item> : null,
    <Menu.Item key='5'>
      <div className={'block px-4 py-2 text-sm text-gray-700'} onClick={logout}>
        <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
          Logout
        </span>
      </div>
    </Menu.Item>
  ] : [
    <Menu.Item key='1'>
      {({ active }) => (
        <div className={classNames(active ? 'bg-gray-100' : '','block px-4 py-2 text-sm text-gray-700')}>
          <LoginPopup/>
        </div>
      )}
    </Menu.Item>,
    <Menu.Item key='2'>
      {({ active }) => (
        <div className={classNames(active ? 'bg-gray-100' : '','block px-4 py-2 text-sm text-gray-700')}>
          <RegisterPopup/>
        </div>
      )}
    </Menu.Item>
  ];

  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items);
  const numberOfCartItems = cartCtx.items.reduce((acc,item) => acc + item.amount,0);

  return(
  <div>
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src={SushiLogo}
                      alt="Workflow"
                    />
                  </div>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-700 text-white'
                            : 'hover:bg-gray-400 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="p-1 rounded-full text-black-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View Cart</span>
                    <Link to="/payment">
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" /> {numberOfCartItems}
                    </Link>
                  </button>

                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className='max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <img className="h-8 w-8 rounded-full" src={props.user.sessionId ? genericProfileIcon : loginIcon} alt="" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        { userMenuItems }
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </div>
  );
}
export default connect(mapStateToProps)(Navbar);
