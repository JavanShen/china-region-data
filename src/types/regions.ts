interface RegionItem {
  id: string;
  name: string;
}

interface ProvinceItem extends RegionItem {}

interface CityItem extends RegionItem {
  province: string;
}

interface CountyItem extends RegionItem {
  city: string;
}

type Province = ProvinceItem[];
type City = {
  [key: string]: CityItem[];
};
type County = {
  [key: string]: CountyItem[];
};

export type { ProvinceItem, CityItem, CountyItem, Province, City, County };
