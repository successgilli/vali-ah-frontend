// import React from 'react';

// import './Header.scss';
// import Signin from '../Signin';
// import Signup from '../Signup';
// import Search from '../Search';

// const Header = () => (
//   <header className="header">
//     <a href="/#">
//       <img src="./src/assets/images/1KbIdeas.svg" alt="1kbIdeas logo" />
//     </a>
//     <Search className="searchBar" />
//     <nav className="homeNavLinks">
//       <Signup />
//       <Signin />
//     </nav>
//   </header>
// );

// export default Header;


import React from 'react';

import './Header.scss';
import Search from '../Search';

const Header = () => (
  <header className="header">
    <a href="/#">
      <img src="./src/assets/images/1KbIdeas.svg" alt="1kbIdeas logo" />
    </a>
    <Search className="searchBar" />
  </header>
);

export default Header;
