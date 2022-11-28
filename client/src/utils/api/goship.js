import { axiosWithCookies, axiosDefault} from './axiosInstances';

export default class GoshipApi{
  static async getCities(){
      return (await axiosDefault.get('/goship/cities')).data;
  }
  static async getDistricts(cityId){
    return (await axiosDefault.get(`/goship/${cityId}/districts`)).data;
  }
  static async getWards(districtId){
    return (await axiosDefault.get(`/goship/${districtId}/wards`)).data;
  }
  static async getFee(cityId, districtId) {
    const res = await axiosDefault.get(`/goship/fee/${cityId}/${districtId}`);
    return res.data;
  }
}