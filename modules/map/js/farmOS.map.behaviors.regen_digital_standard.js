(function () {
  farmOS.map.behaviors.regen_digital_standard = {
    attach: function (instance) {

      // Add layer group.
      const groupOpts = {
        title: 'DEA layers',
      };
      instance.addLayer('group', groupOpts)

      // Add WMS layers.
      const vegAttribution = '<a href="https://cmi.ga.gov.au/data-products/dea/607/dea-land-cover-landsat">© Commonwealth of Australia (Geoscience Australia) 2019</a>';
      let opts = {
        title: 'Vegetation cover',
        url: 'https://ows.dea.ga.gov.au/',
        params: {
          LAYERS: 'ga_ls_landcover_descriptors',
          VERSION: '1.3.0',
          STYLES: 'canopyco',
        },
        attribution: vegAttribution,
        group: 'DEA layers',
        visible: false,
      };
      instance.addLayer('wms', opts);

      const fcAttribution = '<a href="https://cmi.ga.gov.au/data-products/dea/629/dea-fractional-cover-landsat">© Commonwealth of Australia (Geoscience Australia) 2021</a>';
      opts = {
        title: 'Fractional cover (three-band)',
        url: 'https://ows.dea.ga.gov.au/',
        params: {
          LAYERS: 'ga_ls_fc_pc_cyear_3',
          VERSION: '1.3.0',
          STYLES: 'fc_rgb',
        },
        attribution: fcAttribution,
        group: 'DEA layers',
        visible: false,
      };
      instance.addLayer('wms', opts);
    }
  };
}());
