import { useState } from 'react';
import { TypeSelector, Placemark, Polyline } from '@pbe/react-yandex-maps';
import { MapStyled, Geodesk } from './geocode-map-styled';
import { calculateSegmentDistance, calculateTotalDistance } from './caculateDistande';
import { ControlPanel } from './ControlPanel';
type CoordinatesType = number[];


const getWalkingTime = (distance: number): number => {
  return distance / 5000 * 60;
};

function Geocode() {
  const [points, setPoints] = useState<CoordinatesType[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  const toggleBuilding = () => {
    setIsBuilding(!isBuilding);
  };

  const handleClickMap = (e: any) => {
    if (!isBuilding) return;
    
    const coords = e.get("coords");
    setPoints(prev => [...prev, coords]);

    if (points.length > 0) {
      const segmentDist = calculateSegmentDistance(points[points.length-1], coords);
      const totalDist = calculateTotalDistance([...points, coords]);
      
      console.log('--- Новая точка ---');
      console.log(`Координаты: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`);
      console.log(`Дистанция отрезка: ${(segmentDist / 1000).toFixed(3)} км`);
      console.log(`Общая дистанция: ${(totalDist / 1000).toFixed(3)} км`);
      console.log(`Общее время пешком: ~${Math.round(getWalkingTime(totalDist))} мин`);
    }
  };

  const resetRoute = () => {
    setPoints([]);
    setIsBuilding(false);
  };

  return (
    <Geodesk>
      <MapStyled 
        defaultState={{ center: [51.533405, 46.034048], zoom: 12 }}
        options={{ yandexMapDisablePoiInteractivity: true }}
        onClick={handleClickMap}
      >
        <TypeSelector options={{float: "right"}} />
        
        {points.map((point, index) => (
          <Placemark 
            key={index}
            geometry={point}
            options={{
              preset: index === 0 ? 'islands#greenDotIcon' : 
                     index === points.length-1 ? 'islands#redDotIcon' : 
                     'islands#blueDotIcon',
              draggable: true
            }}
            properties={{
              hintContent: `Точка ${index + 1}`,
              balloonContent: `
                <div>
                  <strong>Точка ${index + 1}</strong><br/>
                  Широта: ${point[0].toFixed(6)}<br/>
                  Долгота: ${point[1].toFixed(6)}<br/>
                  ${index > 0 ? `Дистанция от предыдущей: ${(calculateSegmentDistance(points[index-1], point) / 1000).toFixed(3)} км` : ''}
                </div>
              `
            }}
          />
        ))}
        
        {points.length > 1 && (
          <Polyline
            geometry={points}
            options={{
              strokeColor: '#FF0000',
              strokeWidth: 5,
              strokeOpacity: 0.7,
              cursor: 'pointer'
            }}
          />
        )}
      </MapStyled>

      <ControlPanel
        isBuilding={isBuilding}
        hasPoints={points.length > 0}
        onToggleBuilding={toggleBuilding}
        onResetRoute={resetRoute}
      />

      {points.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 100,
          maxWidth: '300px'
        }}>
          <h3 style={{ marginTop: 0 }}>Информация о маршруте</h3>
          <p><strong>Точек:</strong> {points.length}</p>
          <p><strong>Общая дистанция:</strong> {(calculateTotalDistance(points) / 1000).toFixed(3)} км</p>
          <p><strong>Примерное время пешком:</strong> ~{Math.round(getWalkingTime(calculateTotalDistance(points)))} мин</p>
          <p><small>Кликните на точку для подробностей</small></p>
          <p><small>Статус: {isBuilding ? 'строится' : 'завершён'}</small></p>
        </div>
      )}
    </Geodesk>
  );
}

export default Geocode;