const DownArrowSvg = ({ search }) => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.282 5.7207L8.47866 9.52404C8.02949 9.9732 7.29449 9.9732 6.84533 9.52404L3.04199 5.7207"
        stroke={search !== true ? '#091E42' : 'white'}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DownArrowSvg;
