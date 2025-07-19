import { YMaps} from '@pbe/react-yandex-maps';
import Geocode from './components/layout/geocode-map';
import config from './config/config.json'

function App() {

  return (
    <YMaps> 
      <Geocode/>
    </YMaps> 
  )
}

export default App
