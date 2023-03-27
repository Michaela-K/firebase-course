import React, { Fragment, useState } from 'react';

import { Popover, Disclosure, Menu, Transition } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import firebase from '../../firebase/clientApp';
import { useUser } from './user-context';
import { USERS } from '../../firebase/index';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Layout = ({ children }) => {
  // Google Auth (needs to be enabled in Firebase Console - https://console.firebase.google.com)
  const auth = firebase.auth();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const { user } = useUser();

  if (user?.loading) return null;

  const navigation = [
    { name: 'Home', href: '/', exact: true },
    { name: 'My List', href: '/my-list', exact: false },
    { name: 'Users', href: '/users', exact: false },
  ];

  //Create a NEW USER & PROFILE after adding a new account in the singInWithPopUp window
  const createNewUserInFirebase = (newUser) => {
    const { uid, displayName } = newUser;
  
    const userRef = firebase.firestore().collection(USERS).doc(uid);
    
    userRef.get()
    .then((doc) => {
      if (doc.exists) {
        console.log("User already exists");
      } else {
        const newUser = {
          displayName,
          isAdmin: false,
          uid,
          about: ''
        };
        userRef.set(newUser);
      }
    });
  };
    
    const handleClick = () =>{
      auth.signInWithPopup(googleAuthProvider)
      .then((data) =>{
        createNewUserInFirebase(data.user)
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Popover as="header" className="relative">
        <Disclosure as="nav" className="bg-transparent">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-end h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {user ? (
                      <Menu as="div" className="ml-3 flex justify-between">
                        <p className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                          {user.displayName}
                        </p>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={() => firebase.auth().signOut()}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'w-full block px-4 py-2 text-base font-medium text-gray-700 '
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleClick()}
                        className="inline-flex items-center px-2.5 py-1.5 rounded-md shadow text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      exact
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Popover>

      {children}
    </div>
  );
};

export default Layout;
