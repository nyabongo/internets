import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withStateHandlers from 'recompose/withStateHandlers';
import fetchForexRates from './fetch-forex-rates';

function convert(value, currency, rates) {
  if (rates && rates[currency]) {
    const converted = (value * rates[currency]) / rates.UGX;
    return converted;
  }
  return value;
}

function formatPlans(dataplans, currency, fxRates) {
  const plans = [];
  dataplans.forEach((plan) => {
    const price = (plan.price.price)
      ? plan.price.price : plan.price;
    const ppgb = (plan.pricepergigabyte.price)
      ? plan.pricepergigabyte.price : plan.pricepergigabyte;
    plans.push({
      ...plan,
      price: {
        price: convert(price, currency, fxRates),
        priceCurrency: currency,
      },
      pricepergigabyte: {
        price: convert(ppgb, currency, fxRates),
        priceCurrency: currency,
      },
      currency,
    });
  });
  return plans;
}


export default compose(
  withStateHandlers(({ dataplans }) => {
    const currency = 'UGX';
    const fxRates = null;
    const plans = formatPlans(dataplans, currency, fxRates);
    return { dataplans: plans, fxRates, currency };
  },
  {
    setFxRates: ({ currency }, { dataplans }) => (rates) => {
      const plans = formatPlans(dataplans, currency, rates);

      return { dataplans: plans, fxRates: rates, currency };
    },
    setCurrency: ({ fxRates }, { dataplans }) => (newCurrency) => {
      const plans = formatPlans(dataplans, newCurrency, fxRates);


      return { dataplans: plans, currency: newCurrency };
    },

  }),
  lifecycle({
    componentWillMount() {
      fetchForexRates().then((rates) => {
        this.props.setFxRates(rates);
      });
    },
  }),
);
