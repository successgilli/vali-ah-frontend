// react libraries
import React from 'react';

// component
import { ModalContent } from './index';

describe('Modal Content', () => {
  it('should close modal on click', () => {
    const handleClose = jest.fn();
    const wrapper = shallow(<ModalContent handleClose={handleClose} />);
    const button = wrapper.find('button').at(0);
    button.simulate('click');

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
