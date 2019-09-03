// react libraries
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { config } from 'dotenv';

// third-party libraries
import {
  configure, shallow, mount, render
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


config();

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.jest = jest;
global.sinon = sinon;

configure({ adapter: new Adapter() });
