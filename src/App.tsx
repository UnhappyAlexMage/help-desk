import { useState } from 'react';
import { Outlet, useNavigation } from 'react-router'

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css'

interface UserData {
    id: string;
    role: string;
    fullName: string;
};

export default function App() {
  const navigation = useNavigation();
  const [activeUser, setActiveUser] = useState<UserData | null>(null);

  const handleUserChange = (userData: UserData) => {
    setActiveUser(userData);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col bg-gray-50 ">
      <Header onUserChange={handleUserChange}/>
      <main className='flex-1'>
        {navigation.state === 'loading' ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-600">Загрузка...</p>
            </div>
          </div>
        ) : (
          <Outlet context={{ activeUser }} />
        )}
      </main>
      <Footer />
    </div>
  )
};
