import React, { useState } from 'react';
import HeaderLessModal from '../HeaderLessModal/HeaderLessModal';
import LoginForm from '@/components/AuthComponents/LoginForm';
import SignUp from '@/components/AuthComponents/SignUp';

function AuthModal({ opened, close }) {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const isUserLogedIn = (val) => {
    setIsLogedIn(val);
  };

  return (
    <div>
      <HeaderLessModal opened={opened} close={close}>
        {isLogedIn ? (
          <LoginForm isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
        ) : (
          <SignUp isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
        )}
      </HeaderLessModal>
    </div>
  );
}

export default AuthModal;
