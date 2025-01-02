'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NprogressProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#091E42" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default NprogressProvider;
