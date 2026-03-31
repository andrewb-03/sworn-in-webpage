export interface ProductVariant {
  size:    string;
  color:   string;
  inStock: boolean;
}

export interface Product {
  id:           string;
  name:         string;
  slug:         string;
  price:        number;
  category:     'hoodies' | 'long-sleeves' | 'tshirts' | 'headwear';
  imageSrc:     string;
  badge?:       string | null;
  description:  string;
  sizes:        string[];
  colors:       string[];
  colorImages?: Record<string, string>;
}
