import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import customization from './customization';
import profile from './profile';
import kids from './kids';
import payment from './payment';
//-- admin
import influencer from './influencer';
import employee from './employee';
//-- supplier
import splCategory from './splCategory';
import splProduct from './splProduct';
import splUsedDetails from './splUsedDetails';
//-- inventory
import invColor from './invColor';
import invBrand from './invBrand';
import invProductCategory from './invProductCategory';
import invProdSubCategory from './invProdSubCategory';
import invMenProduct from './invMenProduct';
import invProductList from './invProductList';

export default combineReducers({
  alert,
  auth,
  customization,
  profile,
  kids,
  payment,
  influencer,
  employee,
  splCategory,
  splProduct,
  splUsedDetails,
  invColor,
  invBrand,
  invProductCategory,
  invProdSubCategory,
  invMenProduct,
  invProductList
});
