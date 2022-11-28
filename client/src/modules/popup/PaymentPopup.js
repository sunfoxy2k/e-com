import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Sushi from './assets/sushiIcon.png';
import Momo from './assets/momo.png';
import Goship from './assets/goship.png';
import { OrderService, GoshipApi } from '../../utils/api';
const initLocation = {
  city: "",
  district: "",
  ward: "",
  address: "",
}
const PaymentPopup = (props) => {
  const [note, setNote] = useState('');
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState(0);
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await GoshipApi.getCities();
        setCities(res);
        handleCitySelected(res[0].id);
      } catch (err) {
        console.log(err);
      }
    };
    loadCities();
  }, []);

  const loadDistricts = async (cId) => {
    try {
      const res = await GoshipApi.getDistricts(cId);
      setDistricts(res);
      handleDistrictSelected(res[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadWards = async (dId) => {
    try {
      const res = await GoshipApi.getWards(dId);
      setWards(res);
      setWardId(parseInt(res[0].id));
    } catch (err) {
      console.log(err);
    }
  } 

  const handleCitySelected = (cID) => {
    setCityId(cID);
    loadDistricts(cID);
  };

  const handleDistrictSelected = (dId) => {
    setDistrictId(dId);
    loadWards(dId);
  };

  const makePayment = async () => {
    try {
      if (!props.orderId) return;
      const cityName = cities.find(city => city.id === cityId).name;
      const districtName = districts.find(district => district.id === districtId).name;
      const wardName = wards.find(ward => ward.id === parseInt(wardId)).name;
      const info = `${note}, ${wardName}, ${districtName}, ${cityName}`;
      const res = await OrderService.makePayment(props.orderId,
        info,
        cityId,
        districtId
      );
      window.open(res.payUrl, '_blank').focus();
    } catch (err) {
      console.log(err);
    }
    props.onClose();
  };

  const calculateFee = async () => {
    try {
      const res = await GoshipApi.getFee(cityId, districtId);
      setDeliveryFee(res[0].total_amount);
    } catch (err) {
      console.log(err);
    }
  }
  
  const onClose = () => {
    props.onClose();
  };
  return (
    <Transition.Root style={{ fontFamily: "Alata" }} show={props.isOpenModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mb-8">
                      <img className="w-20 m-auto" src={Sushi} alt = "sushi"/>
                    </div>
                    <div className="grid grid-cols-2 mt-2">
                      {/* <p className="text-sm text-gray-500">
                        Payment method: 
                      </p> */}
                      <div className= "m-auto">
                        <img className="w-20" src={Momo} alt = "momo"/>
                      </div>
                      
                      <div className= "m-auto">
                        <img className="w-20" src={Goship} alt = "Goship"/>
                       
                      </div>
                    </div>
                    <div>
                      <p className="mt-3">Select a city:</p>
                      <select 
                        id="city"
                        name="city"
                        value={cityId}
                        onChange={(e) => handleCitySelected(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      >
                        {
                          cities.map((city) => 
                            <option value={city.id} key={`city_${city.id}`}>{city.name}</option>
                          )
                        }
                        
                      </select>
                      <br/>
                      <p>Select a district:</p>
                      <select 
                        id="district"
                        value={districtId}
                        name="district"
                        onChange={(e) => handleDistrictSelected(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      >
                        {
                          districts.map((district) => 
                            <option value={district.id} key={`district_${district.id}`}>{district.name}</option>
                          )
                        }
                      </select>
                      <br/>
                      <p>Select a ward:</p>
                      <select 
                        id="ward"
                        value={wardId}
                        name="ward"
                        onChange={(e) => setWardId(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      >
                        {
                          wards.map((ward) => 
                            <option value={ward.id} key={`ward_${ward.id}`}>{ward.name}</option>
                          )
                        }
                      </select>
                      <br/>
                      <p>Address:</p>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Address"
                        onChange={event => setNote(event.target.value)}
                      />
                    </div>
                  </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                <button
                  onClick={calculateFee}
                  type="button"
                  className={`w-full bg-white py-2 pl-2 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 hover:bg-gray-900 hover:text-white sm:m-2 sm:text-md my-7`}
                >
                  Calculate fee
                </button>
              </div>
              <div className="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
                <p> Delivery fee: {deliveryFee} </p>
                <p className="mt-3"> Order: {props.orderPrice } </p>
                <p className="mt-3" style = {{color:"red"}}> Total sum: {props.orderPrice + deliveryFee}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={makePayment}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-900 hover:text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default PaymentPopup;