interface Links {
  web: string;
}

interface Attributes {
  address: string;
  name: string;

  minimum_order_value?: number;
  deliveryFee?: number;
  delivery_time?: string;
  delivery_time_units?: string;
  delivery_time_ranking?: number;
  image_url?: string;
  price_category?: number;
  price_category_symbol?: string;
  fulfillment_type?: string;
  delivery_status?: string;
  newly_added?: boolean;
  rating_percentage?: number;
  rating_formatted_count?: string;
}

interface Shop {
  id: number;
  test: boolean;
  type?: string;

  attributes: Attributes;
  links?: Links;
}

const shops: Shop[] = [
  {
    id: 1,
    attributes: {
      name: 'Frederiksberg Centret',
      address: 'frederiksberg centret',
    },
    test: true,
  },
  {
    id: 2,
    attributes: {
      name: 'Nordre Fansanvej 123',
      address: 'Fotex Nordre Fansenvej',
    },
    test: false,
  },
  {
    id: 3,
    attributes: {
      name: 'CPH Airport',
      address: 'CPH Airport',
    },
    test: false,
  },
  {
    id: 4,
    attributes: {
      name: 'Test Shop',
      address: 'Langelandsvej 47 A',
    },
    test: true,
  },
]

export { shops }
