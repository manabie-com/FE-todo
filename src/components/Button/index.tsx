import theme from 'globalTheme';
import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  /* box-shadow: 2px 0 2px currentColor; */
  border-radius: 4px;
  min-height: 32px;
  min-width: 80px;
  padding: 4px 8px;

  &:hover {
    opacity: 0.85;
  }
`;

export default Button;
