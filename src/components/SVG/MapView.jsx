'use client';

const MapView = () => {
  return (
    <svg width="72" height="76" viewBox="0 0 72 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_748_1878)">
        <circle cx="32" cy="32" r="26.5" fill="white" stroke="#EBF8F1" />
        <path
          d="M30.4902 22.23L25.5002 24.11C24.3502 24.54 23.4102 25.9 23.4102 27.12V34.55C23.4102 35.73 24.1902 37.28 25.1402 37.99L29.4402 41.2C30.8502 42.26 33.1702 42.26 34.5802 41.2L38.8802 37.99C39.8302 37.28 40.6102 35.73 40.6102 34.55V27.12C40.6102 25.89 39.6702 24.53 38.5202 24.1L33.5302 22.23C32.6802 21.92 31.3202 21.92 30.4902 22.23Z"
          stroke="#1E1E82"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 32.5C33.1046 32.5 34 31.6046 34 30.5C34 29.3954 33.1046 28.5 32 28.5C30.8954 28.5 30 29.3954 30 30.5C30 31.6046 30.8954 32.5 32 32.5Z"
          stroke="#1E1E82"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 32.5V35.5"
          stroke="#1E1E82"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_748_1878"
          x="-8"
          y="-4"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_748_1878" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_748_1878" result="effect2_dropShadow_748_1878" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_748_1878" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default MapView;
