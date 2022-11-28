import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import * as http from '../../utils/api';
import { setUserStore, store } from '../../store/user';
import { LockClosedIcon } from '@heroicons/react/solid';
import sushiIcon from "./assets/sushiIcon.png";

const LoginPopup = () => {

  const ref = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (username, password) => {
    try {
      const { Name, Role, sessionId } = await http.AuthenticateService.login(username, password);
      store.dispatch(setUserStore({name: Name, role: Role, sessionId }));
    } catch (err) {
      alert("Invalid username or password");
    } finally {
      if (ref) {
        ref.current?.close();
      }
    }
  };

  return(
    <Popup ref={ref} trigger={<button className="w-full">Login</button>} position="right center" modal>
      <div style = {{borderRadius: "15px"}} className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-300">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={sushiIcon}
              alt="sushi Icon"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={event => setUsername(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => login(username, password)}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
}
export default LoginPopup