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

      // Add ALA protected species layers.
      const species = [
        {
          label: 'Koala',
          taxa: 'e9d6fbbd-1505-4073-990a-dc66c930dad6',
          color: '9BC53D',
        },
        {
          label: 'Regent Honeyeater',
          taxa: '31869a0e-2ce5-40be-b6f6-c0231a48b414',
          color: 'FDE74C',
        },
        {
          label: 'Swift Parrot',
          taxa: '4cb195fd-b127-44cb-ad85-a62d224e9a96',
          color: 'E9B44C',
        },
        {
          label: 'Eastern Quoll',
          taxa: '52149285-a12a-4085-a285-b41af5ba3ce3',
          color: 'E94F37',
        },
      ];
      const alaAttribution = '<a href="https://www.ala.org.au/">© Atlas of Living Australia</a>';
      species.forEach((species_data) => {
        let species_layer_opts = {
          title: species_data.label,
          url: 'https://biocache-ws.ala.org.au/ws/ogc/wms/reflect',
          params: {
            q: `lsid:https://biodiversity.org.au/afd/taxa/${species_data.taxa}`,
            LAYERS: 'ALA:occurrences',
            VERSION: '1.1.1',
            ENV: `color:${species_data.color};name:circle;size:4;opacity:0.8`,
          },
          attribution: alaAttribution,
          group: 'Protected species',
          visible: false,
        };
        instance.addLayer('wms', species_layer_opts);
      });
    }
  };
}());
