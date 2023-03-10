import { transform, transformExtent } from 'ol/proj';
import { getTopLeft, getBottomLeft, getTopRight, getBottomRight } from 'ol/extent';

const getCurrentViewExtentCoordinates = ({map}) => {
  const extent = map.getView().calculateExtent(map.getSize());
  const transformedExtent = transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
  const tl = getTopLeft(transformedExtent);
  return [
    tl,
    getBottomLeft(transformedExtent),
    getBottomRight(transformedExtent),
    getTopRight(transformedExtent),
    tl
  ];
}

window.farm_regen_digital_map_utils = {
  getCurrentViewExtentCoordinates,
  transform,
}
