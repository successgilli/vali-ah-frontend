import React from 'react';

import Icon from './index';

describe('Icon component', () => {
  it('should renders properly', () => {
    const icon = shallow(<Icon icon="upvote" clickHandler={() => {}} />);

    expect(icon.find('button')).toHaveLength(1);
    expect(icon.find('button').hasClass('icon')).toBe(true);
    expect(icon.find('button').hasClass('icon--upvote')).toBe(true);
  });

  it('check validity of props', () => {
    const icon = mount(<Icon icon="upvote" clickHandler={() => {}} />);

    expect(icon.props().clickHandler).toBeInstanceOf(Function);
    expect(icon.props().active).toBe(false);
  });

  it('validates active props ', () => {
    const icon = mount(<Icon icon="upvote" active clickHandler={() => {}} />);

    expect(icon.props().active).toBe(true);
    expect(icon.find('button').hasClass('active')).toBe(true);
  });

  it('should handle onclick event', () => {
    const mockFn = jest.fn();
    const icon = shallow(<Icon icon="upvote" active clickHandler={mockFn} />);

    icon.find('.icon').simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
