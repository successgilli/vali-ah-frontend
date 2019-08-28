// react libraries
import React from 'react';

// third-party libraries
import {
  configure, shallow, mount, render
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;

configure({ adapter: new Adapter() });
