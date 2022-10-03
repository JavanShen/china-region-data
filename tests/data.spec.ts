import { province, city, county } from '@/main'
import provinceSource from '@/data/province.json'
import citySource from '@/data/city.json'
import countySource from '@/data/county.json'

import './utils/toBeAffiliation';

describe('数据准确性',() => {
    test('是否和元数据相同',() => {
        expect(province).toEqual(provinceSource)
        expect(city).toEqual(citySource)
        expect(county).toEqual(countySource)
    })

    test('省市区数据之间是否存在正确隶属关系', () => {
        expect(undefined).toBeAffiliation(province,city,county)
    })
})