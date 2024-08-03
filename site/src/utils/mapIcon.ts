import Leaftlet from 'leaflet';

import mapMarkerImg from '@/assets/map-marker.svg';

const mapIcon = new Leaftlet.Icon({
	iconUrl: mapMarkerImg.src,
	iconRetinaUrl: mapMarkerImg.src,

	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [0, -60],
})

export default mapIcon;