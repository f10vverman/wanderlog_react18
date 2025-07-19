import React from 'react';
import { PanelContainer, ActionButton } from './geocode-map-styled'
interface ControlPanelProps {
  isBuilding: boolean;
  hasPoints: boolean;
  onToggleBuilding: () => void;
  onResetRoute: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isBuilding,
  hasPoints,
  onToggleBuilding,
  onResetRoute,
}) => {
  return (
    <PanelContainer>
      <ActionButton 
        onClick={onToggleBuilding}
        $isActive={isBuilding}
      >
        {isBuilding ? 'Закончить построение' : 'Начать построение'}
      </ActionButton>
      
      {hasPoints && (
        <ActionButton 
          onClick={onResetRoute}
          $isReset
        >
          Сбросить маршрут
        </ActionButton>
      )}
    </PanelContainer>
  );
};