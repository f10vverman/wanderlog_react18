import styled from 'styled-components';
import { Map } from '@pbe/react-yandex-maps';
export const MapStyled = styled(Map)`
    width: 100%;
    height: 700px;
`
export const Geodesk = styled.div`
    position: relative;
    height: 100%;
`;
export const PanelContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  display: flex;
  gap: 10px;
`;

export const ActionButton = styled.button<{ $isActive?: boolean; $isReset?: boolean }>`
  background: ${props => 
    props.$isReset ? '#ff4444' : 
    props.$isActive ? '#ff4444' : '#4CAF50'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;