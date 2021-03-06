import React from 'react';

import type { ItemT } from '~/types';

import { SEO_SCHEMA_BASE_URL } from '~/constants';
import { OfferSEO, ItemManufacturer } from '~/helpers';
import { getItemContributorAvatarSrc } from '~/utils';

export type ProductSEOProps = {
  item: ItemT
}

export const ProductSEO = ({ item }: ProductSEOProps) => {
  return (
    <div
      itemType={`${SEO_SCHEMA_BASE_URL}/Product`}
      itemScope
    >
      <meta itemProp={'name'} content={item.title}/>

      {(item.images || []).map(image => (
        <meta key={image.src} itemProp={'image'} content={image.src}/>
      ))}

      {item.content && (
        <meta itemProp={'description'} content={item.content}/>
      )}

      <ItemManufacturer item={item}/>

      {item.price && (
        <OfferSEO item={item}/>
      )}

      {(item.contributors || []).map(contributor => (
        <div
          key={contributor.name}
          itemType={`${SEO_SCHEMA_BASE_URL}/Person`}
          itemProp={'contributor'}
          itemScope
        >
          <meta itemProp={'name'} content={contributor.name}/>
          <meta itemProp={'image'} content={getItemContributorAvatarSrc(contributor.src)}/>
        </div>
      ))}
    </div>
  );
};
