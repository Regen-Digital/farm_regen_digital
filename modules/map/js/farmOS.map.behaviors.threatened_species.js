(function () {
  farmOS.map.behaviors.threatened_species_action_plan = {
    attach: function (instance) {

      // Species taxa names grouped by family.
      const names = {
        bird: [
          'Botaurus poiciloptilus',
          'Manorina melanotis',
          'Zanda latirostris',
          'Accipiter hiogaster natalis',
          'Numenius madagascariensis',
          'Alwal Psephotus chrysopterygius',
          'Thinornis cucullatus cucullatus',
          'Acanthiza pusilla magnirostris',
          'Acanthornis magna greeniana',
          'Leipoa ocellata',
          'Pezoporus occidentalis',
          'Atrichornis clamosus',
          'Cyanoramphus cookii',
          'Neophema chrysogaster',
          'Pedionomus torquatus',
          'Polytelis alexandrae',
          'Erythrotriorchis radiatus',
          'Calyptorhynchus banksii graptogyne',
          'Anthochaera phrygia',
          'Lathamus discolor',
          'Kyloring Pezoporus flaviventris',
          'Yirlinkirrkirr Amytornis woodwardi',
        ],
        mammal: [
          'Neophoca cinerea',
          'Petrogale penicillata',
          'Antina Zyzomys pedunculatus',
          'Dasyurus geoffroii',
          'Luaner Dasyurus viverrinus',
          'Ngilkat Potorous gilbertii',
          'Macrotis lagotis',
          'Tachyglossus aculeatus multiaculeatus',
          'Phascolarctos cinereus',
          'Gymnobelideus leadbeateri',
          'Burramys parvus',
          'Pookila Pseudomys novaehollandiae',
          'Trichosurus vulpecula arnhemensis',
          'Yaminon Lasiorhinus krefftii',
          'Woorrentinta Notomys aquilo',
          'Dasyurus hallucatus',
          'Myrmecobius fasciatus',
          'Setonix brachyurus',
          'Pteropus conspicillatus',
          'Miniopterus orianae bassanii',
          'Pseudocheirus occidentalis',
        ],
        fish: [
          'Pristis pristis',
          'Carcharias taurus',
          'Zearaja maugeana',
          'Craterocephalus fluviatilis',
          'Thymichthys politus',
          'Scaturiginichthys vermeilipinnis',
          'Galaxias tantangara',
          'Galaxias fontanus',
          'Hippocampus whitei',
        ],
        frog: [
          'Litoria raniformis',
          'Taudactylus pleione',
          'Philoria kundagungan',
          'Cophixalus monticola',
          'Pseudophryne corroboree',
          'Anstisia alba',
        ],
        reptile: [
          'Bellatorias obiri',
          'Wollumbinia georgesi',
          'Tympanocryptis lineata',
          'Delma torquata',
          'Liopholis kintorei',
          'Chelonia mydas',
          'Lepidochelys olivacea',
          'Tiliqua adelaidensis',
          'Aipysurus apraefrontalis',
          'Pseudemydura umbrina',
          'Ctenophorus yinnietharra',
        ],
        invertebrate: [
          'Ammoniropa vigens',
          'Dendronephthya australis',
          'Paralucia pyrodiscus lucida',
          'Megascolides australis',
          'Hyridella glenelgensis',
          'Zephyrarchaea austini',
          'Dryococelus australis',
          'Engaewa pseudoreducta',
          'Pseudocharopa ledgbirdi',
          'Phyllodes imperialis smithersi',
          'Astacopsis gouldi',
        ],
        plant: [
          'Lachnagrostis adamsonii',
          'Gossia gonoclada',
          'Olearia arckaringensis',
          'Pimelea venosa',
          'Antrophyum austroqueenslandicum',
          'Macadamia jansenii',
          'Pomaderris walshii',
          'Phebalium daviesii',
          'Grevillea calliantha',
          'Spyridium furculentum',
          'Andersonia axilliflora',
          'Pimelea cremnophila',
          'Prasophyllum taphanyx',
          'Eucalyptus imlayensis',
          'Dichanthium queenslandicum',
          'Prasophyllum laxum',
          'Lepidorrhachis mooreana',
          'Macrozamia macdonnellii',
          'Eremophila subangustifolia',
          'Rhodomyrtus psidioides',
          'Eucalyptus leprophloia',
          'Persoonia micranthera',
          'Davidsonia johnsonii',
          'Senecio behrianus',
          'Banksia montana',
          'Acacia volubilis',
          'Acacia peuce',
          'Wollemia nobilis',
          'Philotheca wonganensis',
          'Spyridium fontis-woodii',
        ],
      };

      // Species count header and description.
      const speciesCount = document.createElement('h6');
      speciesCount.innerText = Drupal.t('Species count') + ` \u{21BB}`;
      const refreshLink = document.createElement('a');
      refreshLink.innerText = '(' +  Drupal.t('refresh') + ')';
      speciesCount.appendChild(refreshLink);
      document.querySelector('div#species-count-wrapper').append(speciesCount);
      const speciesDescription = document.createElement('p');
      speciesDescription.innerText = Drupal.t('The count of species currently visible on the map.')
      document.querySelector('div#species-count-wrapper').append(speciesDescription);

      // Species count UI.
      const speciesUl = document.createElement('ul');
      speciesUl.style.listStylePosition = 'inside';
      speciesUl.style.listStyleType = 'none';
      speciesUl.style.maxHeight = '300px';
      speciesUl.style.overflowY = 'scroll';
      document.querySelector('div#species-count-wrapper').append(speciesUl);

      // Create the map layer. Default to birds.
      let selectedCategory = 'bird';
      let selectedNames = names[selectedCategory].map(name => `taxa:(+"${name}")`).join(' OR ');
      let selectedFilter = `(${selectedNames})`;
      let psmOpts = {
        title: 'Protected species',
        url: 'https://biocache-ws.ala.org.au/ws/ogc/wms/reflect',
        params: {
          q: selectedFilter,
          qualityProfile: 'ALA',
          LAYERS: 'ALA:occurrences',
          VERSION: '1.1.1',
          ENV: `colormode:taxon_name;name:circle;size:5;opacity:1`,
        },
        visible: true,
      };
      const protectedSpeciesLayer = instance.addLayer('wms', psmOpts);

      // Update the map when species changes.
      const colorMode = 'common_name';
      const updateCategory = (event) => {
        selectedCategory = event.target.value;
        selectedNames = names[selectedCategory].map(name => `taxa:(+"${name}")`).join(' OR ');
        selectedFilter = `(${selectedNames})`;
        protectedSpeciesLayer.getSource().updateParams({
          q: selectedFilter,
          qualityProfile: 'ALA',
          LAYERS: 'ALA:occurrences',
          VERSION: '1.1.1',
          ENV: `colormode:${colorMode};name:circle;size:5;opacity:1`,
        });
        updateCount();
      };
      document.querySelector('select#edit-category').addEventListener('change', updateCategory);

      // Update the legend.
      const updateLegend = () => {
        const url = new URL('https://biocache-ws.ala.org.au/ws/mapping/legend');
        url.searchParams.set('q', selectedFilter);
        url.searchParams.set('cm', colorMode);

        fetch(url, {headers: {accept: 'application/json'}})
          .then(response => response.json())
          .then(data => {
            data.forEach(item => {
              let color = `rgb(${item.red}, ${item.green}, ${item.blue})`;
              speciesUl.querySelector(`li[data-species-name="${item.name}"]`)?.style.setProperty('--icon-color', color);
            })
          })
      }

      // Update the species count.
      const updateCount = () => {
        speciesUl.innerHTML = '';
        const coordinates = window.farm_regen_digital_map_utils.getCurrentViewExtentCoordinates(instance);
        const wkt = `POLYGON (( ${coordinates[0][0]} ${coordinates[0][1]}, ${coordinates[1][0]} ${coordinates[1][1]}, ${coordinates[2][0]} ${coordinates[2][1]}, ${coordinates[3][0]} ${coordinates[3][1]}, ${coordinates[0][0]} ${coordinates[0][1]}))`;
        const url = new URL('https://biocache-ws.ala.org.au/ws/mapping/species');
        url.searchParams.set('q', selectedFilter);
        url.searchParams.set('cm', colorMode);
        url.searchParams.set('wkt', wkt);
        fetch(url, {headers: {accept: 'application/json'}})
          .then(response => response.json())
          .then(data => {
            data.forEach(species => {
              let item = document.createElement('li');
              let name = species.commonName.length ? species.commonName : species.name;
              item.dataset.speciesName = name;
              item.innerHTML = `${name}: ${species.count}`;
              speciesUl.append(item);
            });
            updateLegend();
          });
      };
      speciesCount.addEventListener('click', updateCount);
      refreshLink.addEventListener('click', updateCount);

      // Wait a few seconds to update the count while the map zooms in.
      new Promise(resolve => setTimeout(resolve, 1500))
        .then(() => updateCount());

      // Create a popup and add it to the instance for future reference.
      instance.map.removeOverlay(instance.popup);
      instance.popup = instance.addPopup(function (event) {
        const coordinates = window.farm_regen_digital_map_utils.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        let zoom = Math.round(instance.map.getView().getZoom());
        let radiusMap = {
          3: 25,
          4: 25,
          5: 25,
          6: 20,
          7: 8,
          8: 4,
          9: 1.5,
          10: .5,
          11: .5,
          12: .5,
          13: .5,
          14: .5,
        };
        let radius = radiusMap[zoom] ?? 0.5;

        const url = new URL('https://biocache-ws.ala.org.au/ws/occurrences/info');
        url.searchParams.set('q', selectedFilter)
        url.searchParams.set('lat', coordinates[1]);
        url.searchParams.set('lon', coordinates[0]);
        url.searchParams.set('radius', radius);
        url.searchParams.set('zoom', zoom);
        url.searchParams.set('format', 'json');
        url.searchParams.set('qualtiyProfile', 'ALA');

        // Remove existing.
        document.querySelectorAll('div[data-farm-psm-popup]').forEach(element => element.remove());

        const descriptionDiv = document.createElement('div');
        descriptionDiv.dataset.farmPsmPopup = true;
        descriptionDiv.id = 'psm-popup';

        const nameHeader = document.createElement('h6');
        nameHeader.classList.add('ol-popup-name');
        nameHeader.innerHTML = 'Loading...';
        descriptionDiv.append(nameHeader);

        const ul = document.createElement('ul');
        descriptionDiv.append(ul);

        // Get the occurrence data.
        fetch(url)
          .then(response => response.json())
          .then(result => result['occurrences'] ?? [])
          .then(occurrences => {
            occurrences.forEach(id => {
              fetch(`https://biocache-ws.ala.org.au/ws/occurrences/${id}`)
                .then(response => response.json())
                .then(data => {
                  let name = data.processed.classification.vernacularName ?? data.processed.classification.speciesName ?? data.processed.classification.scientificName ?? 'Unknown';
                  let occurrence = document.createElement('a');
                  occurrence.href = `https://biocache.ala.org.au/occurrences/${id}`;
                  occurrence.target = '_blank';
                  occurrence.innerText = 'View';
                  let li = document.createElement('li');
                  li.innerHTML = `${name} - ${occurrence.outerHTML}`;
                  document.querySelector('div#psm-popup ul').append(li);
                });
            });

            // Display the occurrence count.
            if (occurrences.length === 0) {
              document.querySelector('div#psm-popup h6').innerText = 'No results';
            } else {
              document.querySelector('div#psm-popup h6').innerText = Drupal.formatPlural(occurrences.length, '@count occurrence', '@count occurrences');
            }
          })

        return descriptionDiv.outerHTML;
      });
    }
  };
}());
