import { styled } from '@stitches/react';
import React, { useEffect } from 'react';

const StyledButton = styled('button', {
  background: '#4b4be8',
  color: '#eb4034',
  padding: 12,
});

const Button = props => {
  useEffect(() => {
    console.log('hooks work');
  }, []);
  return <StyledButton onClick={(ev) => console.log(ev)}>Remote Button</StyledButton>;
};

export default Button;
