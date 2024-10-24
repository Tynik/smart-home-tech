import Stripe from 'stripe';

import { getStripeProductPricesList, ProductPrices } from '../helpers';

import { createHandler, initStripeClient, processProductPrices } from '../helpers';

export const handler = createHandler({ allowMethods: ['GET'] }, async ({ event }) => {
  const productIds = event.queryStringParameters?.ids?.split(',');
  if (!productIds) {
    return {
      status: 'error',
      data: {
        error: 'Product IDs are missed',
      },
    };
  }

  const stripe = initStripeClient();

  const products = await stripe.products.list({
    ids: productIds,
    limit: 100,
  });

  const productsPrices: Record<Stripe.Product['id'], ProductPrices> = {};

  const getProductsPricesTasks = products.data.map(async product => {
    const prices = await getStripeProductPricesList(stripe, product.id);

    productsPrices[product.id] = processProductPrices(prices);
  });

  await Promise.all(getProductsPricesTasks);

  return {
    status: 'ok',
    data: products.data.map(product => ({
      id: product.id,
      prices: productsPrices[product.id],
    })),
  };
});
