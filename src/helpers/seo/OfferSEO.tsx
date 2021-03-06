import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import {
  getItemPrice,
  getItemAvailabilitySEOSchema,
  OfferShippingDetailsSEO,
  ItemInventoryLevel,
  ItemMeasurement
} from '~/helpers';
import { useCategory, useSelectedItemOptionId } from '~/hooks';

export type OfferSEOProps = {
  item: ItemT
}

export const OfferSEO = ({ item }: OfferSEOProps) => {
  const selectedItemOptionId = useSelectedItemOptionId(item);

  const itemPrice = getItemPrice(item, selectedItemOptionId);
  const itemAvailabilitySEOSchema = getItemAvailabilitySEOSchema(item, selectedItemOptionId);

  const category = useCategory(item.categoryId);
  if (!category) {
    return null;
  }

  return (
    <div
      itemProp={'offers'}
      itemType={`${SEO_SCHEMA_BASE_URL}/Offer`}
      itemScope
    >
      <meta itemProp={'url'} content={`/item/${item.id}`}/>
      <meta itemProp={'category'} content={category.name}/>
      <meta itemProp={'price'} content={itemPrice.toString()}/>
      <meta itemProp={'priceCurrency'} content={'UAH'}/>
      <meta itemProp={'availability'} content={itemAvailabilitySEOSchema}/>
      <meta itemProp={'itemCondition'} content={`${SEO_SCHEMA_BASE_URL}/NewCondition`}/>

      <ItemInventoryLevel item={item}/>
      <ItemMeasurement item={item}/>

      <OfferShippingDetailsSEO/>
    </div>
  );
};
