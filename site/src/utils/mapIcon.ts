import Leaftlet from 'leaflet';

import mapMarkerImg from '@/assets/map-marker.svg';

const mapIcon = new Leaftlet.Icon({
	iconUrl: mapMarkerImg.src,
	iconRetinaUrl: mapMarkerImg.src,

	iconSize: [46, 59],
	iconAnchor: [29, 68],
})

export default mapIcon;