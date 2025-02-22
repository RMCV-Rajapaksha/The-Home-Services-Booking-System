import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/images/loader.json';

function Loader() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] flex justify-center items-center z-[1000]">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default Loader;