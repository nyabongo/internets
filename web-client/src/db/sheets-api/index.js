import Parser from './sheet-2-json';

const clientId = '49810281275-knl4096cr6ljk4rg86o21brb1l9p5o12.apps.googleusercontent.com';
const apiKey = 'AIzaSyAuH60EtBu0reVycvPqJ4Q-nsxApAN4J2g';
const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';

const initSheetsAPI = spreadsheetId => new Promise((resolve, reject) => {
  const { gapi } = window;
  const discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
  const ranges = [
    'providers!A1:Z3',
    'providers!A4:Z',
    'services!A1:Z3',
    'services!A4:Z',
    'plans!A1:Z3',
    'plans!A4:Z',
  ];
  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId,
      apiKey,
      scope,
      discoveryDocs,
    })
      .then(() => gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId,
        ranges,
      }))
      .then((response) => {
        const [
          providerHeaders, providers,
          serviceHeaders, services,
          planHeaders, plans,
        ] = response.result.valueRanges;
        const providerParser = new Parser(providerHeaders.values);
        const serviceParser = new Parser(serviceHeaders.values);
        const planParser = new Parser(planHeaders.values);

        const data = {
          serviceProviders: providers.values.map(provider => providerParser.parse(provider)),
          services: services.values.map(service => serviceParser.parse(service)),
          plans: plans.values.map((plan, index) => ({
            id: index.toString(),
            ...planParser.parse(plan),
          })),
        };
        return resolve(data);
      })
      .catch(e => reject(e));
  });
});


export default initSheetsAPI;
