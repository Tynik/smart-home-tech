import { ItemT, CategoryIdT } from '~/types';
import { ApplicationIdT } from '~/types';
import { ItemOptionIdT } from '~/types';

export const matchItemWithSearchKeyword = (
  item: ItemT,
  searchKeyword: string,
  applicationIds: ApplicationIdT[] = []
): boolean => {
  let itemIsMatched = item.title.toLowerCase().includes(searchKeyword);

  itemIsMatched ||= !itemIsMatched && item.subtitle.toLowerCase().includes(searchKeyword);

  if (item.developedBy) {
    itemIsMatched ||= item.developedBy.toLowerCase().includes(searchKeyword);
  }

  if (!itemIsMatched && item.content) {
    itemIsMatched ||= item.content.toLowerCase().includes(searchKeyword);
  }

  if (!itemIsMatched && item.seo) {
    itemIsMatched ||= item.seo.description.toLowerCase().includes(searchKeyword);

    itemIsMatched ||= item.seo.keywords.split(',').some(seoKeyword =>
      seoKeyword.trim().toLowerCase().split('-').some(seoKeywordPart =>
        seoKeywordPart.startsWith(searchKeyword)
      )
    );
  }

  if (!itemIsMatched && item.externalLinks) {
    itemIsMatched ||= item.externalLinks.some(externalLink =>
      externalLink.name.toLowerCase().includes(searchKeyword)
    );
  }

  if (!itemIsMatched && item.options) {
    itemIsMatched ||= Object.values(item.options).some(option =>
      option.name.toLowerCase().includes(searchKeyword)
    );
  }

  if (!itemIsMatched && item.drivers) {
    itemIsMatched ||= item.drivers.some(driver =>
      driver.name.toLowerCase().includes(searchKeyword)
    );
  }

  if (!itemIsMatched && applicationIds.length && item.applicationIds) {
    itemIsMatched ||= item.applicationIds.some(itemApplicationId =>
      applicationIds.includes(itemApplicationId)
    );
  }

  return itemIsMatched;
};

export const matchItemWithSearchKeywords = (
  item: ItemT,
  searchKeywords: string[],
  applicationIds: ApplicationIdT[] = []
): boolean =>
  searchKeywords.every(searchKeyword =>
    matchItemWithSearchKeyword(item, searchKeyword, applicationIds)
  );

export const matchItemWithSearch = (
  item: ItemT,
  {
    searchKeywords,
    categoryId,
    applicationIds
  }: {
    searchKeywords: string[]
    categoryId: CategoryIdT
    applicationIds: ApplicationIdT[]
  }
): boolean => {
  // show all items by default if nothing was passed
  let itemIsMatched = true;

  if (searchKeywords && searchKeywords.length) {
    itemIsMatched &&= matchItemWithSearchKeywords(
      item,
      searchKeywords,
      applicationIds
    );
  }
  if (categoryId) {
    itemIsMatched &&= item.categoryId === categoryId;
  }
  return itemIsMatched;
};

export const getItemDefaultOption = (item: ItemT) =>
  item.options && Object.keys(item.options).find(optionId => item.options[optionId].default);

export const getItemPrice = (item: ItemT, optionId: ItemOptionIdT) => {
  if (!item.price) {
    return;
  }
  if (typeof item.price === 'number') {
    return item.price;
  }
  optionId = optionId || getItemDefaultOption(item);

  return item.price[optionId];
};

export const getItemAvailabilitySEOSchema = (item: ItemT) => {
  if (item.availability) {
    return 'https://schema.org/InStock';
  }
  if (item.availability === 0) {
    return 'https://schema.org/SoldOut';
  }
  return 'https://schema.org/OutOfStock';
};
