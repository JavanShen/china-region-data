import { Province, City, County } from "@/types/regions";
import { expect } from "@jest/globals";
import type { ExpectationResult, MatcherFunction } from "expect";

const returnMsg = (message: string, pass: boolean): ExpectationResult => {
  return {
    message: () => message,
    pass,
  };
};

//ADCC = AdministrativeDivisionCodeCollection 行政区划代码集合
const toBeAffiliation: MatcherFunction<
  [province: Province, city: City, county: County]
> = (actual, province, city, county) => {
  const provinceADCC = new Map();
  const cityADCC = new Map();

  province.forEach((item) => provinceADCC.set(item.id, item.name));

  for (const key in city) {
    if (!provinceADCC.has(key))
      return returnMsg(
        `市级数据中出现的省行政区划代码没有在省级数据中定义--错误文件: src/data/city.json 错误行政区划代码: ${key}`,
        false
      );

    const pro = provinceADCC.get(key);

    for (let i = 0, len = city[key].length; i < len; i++) {
      const item = city[key][i];
      if (item.province !== pro)
        return returnMsg(
          `市级数据中的省级名称和省级行政区划代码不一致--错误文件: src/data/city.json 错误行政区划代码: ${key} 错误下标: ${i}, 你也许可以将province的值修改为: ${pro} 来修复此错误`,
          false
        );
      cityADCC.set(item.id, item.name);
    }
  }

  for (const key in county) {
    if (!cityADCC.has(key))
      return returnMsg(
        `区级数据中出现的市行政区划代码没有在市级数据中定义--错误文件: src/data/county.json 错误行政区划代码: ${key}`,
        false
      );

    const cit = cityADCC.get(key);

    for (let i = 0, len = county[key].length; i < len; i++) {
      const item = county[key][i];
      if (item.city !== cit)
        return returnMsg(
          `区级数据中的市级名称和市级行政区划代码不一致--错误文件: src/data/county.json 错误行政区划代码: ${key} 错误下标: ${i}, 你也许可以将city的值修改为: ${cit} 来修复此错误`,
          false
        );
    }
  }

  return returnMsg("测试通过, 省市区数据符合隶属关系", true);
};

expect.extend({ toBeAffiliation });

declare global{
    namespace jest {
        interface Matchers<R> {
            toBeAffiliation(province: Province, city: City, county: County): R;
          }
    }
}
declare module "expect" {
  interface AsymmetricMatchers {
    toBeAffiliation(province: Province, city: City, county: County): void;
  }
  interface Matchers<R> {
    toBeAffiliation(province: Province, city: City, county: County): R;
  }
}
