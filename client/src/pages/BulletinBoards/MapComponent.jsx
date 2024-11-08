import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Tạo icon tùy chỉnh
const customIcon = new L.Icon({
  iconUrl: 'https://www.clker.com//cliparts/e/3/F/I/0/A/google-maps-marker-for-residencelamontagne-hi.png', // Đường dẫn tới icon của bạn
  iconSize: [24, 36], // Kích thước icon
  iconAnchor: [12, 36] // Điểm neo icon
})

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition(e.latlng) // Cập nhật vị trí khi nhấn vào bản đồ
    }
  })

  // Chỉ hiển thị marker nếu có vị trí được nhấn
  return position ? <Marker position={position} icon={customIcon} /> : null
}

function MapComponent({ position, setPosition }) {
  return (
    <MapContainer center={[10.762622, 106.660172]} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker position={position} setPosition={setPosition} />
    </MapContainer>
  )
}

export default MapComponent
