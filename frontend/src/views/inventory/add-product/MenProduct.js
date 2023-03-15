import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  unstable_HistoryRouter
} from 'react-router-dom';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  TextareaAutosize,
  Box,
  Divider
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import { Select as AntdSelect } from 'antd';

import GenS3Link from 'utils/GenS3Link';
import DFnewLogger from 'utils/DFnewLogger';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import ImageSelectorCheckboxAdmin from 'views/client/component/profile/ImageSelectorCheckboxAdmin';
import ImageSelectorCheckboxSmall from 'views/client/component/profile/ImageSelectorCheckboxSmall';
import CustomRadio from 'views/client/component/profile/CustomRadio';
import ColorCircularAdmin from 'views/client/component/profile/ColorCircularAdmin';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMenProduct,
  editMenProduct,
  getProductBrands,
  getProductCategories,
  getProductColors,
  getProductSubCategories
} from 'actions/invMenProduct';
import {
  fromHeightFtList,
  fromHeightInList,
  professionListMen,
  normalFitList,
  waistSizeNumList,
  waistSizeLabelList,
  shirtSizeNoList,
  shirtSizeLabelList,
  bottomSizeNoList,
  inseamSizeNumList,
  shoeSizeNumListMen,
  shoeSizeLabelList,
  typicalWear2WorkList,
  casualShirtsList,
  btnUpShirtsList,
  jeansFitList,
  shortsLongList,
  bottomFitList,
  fitIssuesList,
  budgetListMen,
  availableStatusList
} from 'utils/Constant';
import IndividualProduct from '../product-list/IndividualProduct';

const Shape_1 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-1'
);
const Shape_2 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-2'
);
const Shape_3 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-3'
);
const Shape_4 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-4'
);
const Shape_5 = GenS3Link(
  'landing/images/client/profile/men/basic-info/shape-5'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit1'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit2'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit3'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit4'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit5'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit6'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit7'
);
const OutFit_8 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit8'
);
const OutFit_9 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit9'
);
const OutFit_10 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit10'
);
const OutFit_11 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit11'
);
const OutFit_12 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit12'
);
const OutFit_13 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit13'
);
const OutFit_14 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit14'
);
const OutFit_15 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit15'
);
const OutFit_16 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit16'
);
const OutFit_17 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit17'
);
const OutFit_18 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit18'
);
const OutFit_19 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit19'
);
const OutFit_20 = GenS3Link(
  'landing/images/client/profile/men/style-fit/outfit20'
);

const profileList = [
  { title: 'Men', link: 'men' },
  { title: 'Women', link: 'women' },
  { title: 'Boy Kids', link: 'boy' },
  { title: 'Girl Kids', link: 'girl' }
];
const bodyShapeLabel = [
  { title: 'Trapezoid', image: Shape_1 },
  { title: 'Rectangle', image: Shape_2 },
  { title: 'Triangle', image: Shape_3 },
  { title: 'Oval', image: Shape_4 },
  { title: 'Inverted Triangle', image: Shape_5 }
];
const outFitsList = [
  { title: '', image: OutFit_1 },
  { title: '', image: OutFit_2 },
  { title: '', image: OutFit_3 },
  { title: '', image: OutFit_4 },
  { title: '', image: OutFit_5 },
  { title: '', image: OutFit_6 },
  { title: '', image: OutFit_7 },
  { title: '', image: OutFit_8 },
  { title: '', image: OutFit_9 },
  { title: '', image: OutFit_10 },
  { title: '', image: OutFit_11 },
  { title: '', image: OutFit_12 },
  { title: '', image: OutFit_13 },
  { title: '', image: OutFit_14 },
  { title: '', image: OutFit_15 },
  { title: '', image: OutFit_16 },
  { title: '', image: OutFit_17 },
  { title: '', image: OutFit_18 },
  { title: '', image: OutFit_19 },
  { title: '', image: OutFit_20 }
];

const MenProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(0);
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductColors());
    dispatch(getProductBrands());
  }, [dispatch]);
  const { prodCategories, prodSubCategories, prodColors, prodBrands } =
    useSelector((state) => state.invMenProduct);
  const { tableData } = useSelector((state) => state.invProductList);
  const initVal = {
    prodCategoryId: prodCategories.length ? prodCategories[0]?.id : '',
    prodSubCategoryId: prodSubCategories.length ? prodSubCategories[0]?.id : '',
    productName1: '',
    productName2: '',
    fromHeightFt: 0,
    fromHeightIn: 0,
    toHeightFt: 0,
    toHeightIn: 0,
    fromWeight: '',
    toWeight: '',
    fromAge: '',
    toAge: '',
    profession: [],
    sizeType: '0',
    bestSizeFit: 0,
    waistSizeNum: 0,
    waistSizeLabel: 0,
    shirtSizeNo: 0,
    shirtSizeLabel: 0,
    bottomSizeNo: 0,
    inseamSizeNum: 0,
    shoeSizeNum: 0,
    shoeSizeLabel: 0,
    bodyShape: [],
    skinToneLabel: [],
    typicalWear2Work: [],
    casualShirts: 0,
    btnUpShirts: 0,
    jeansFit: 0,
    shortsLong: 0,
    colorName: prodColors.length ? prodColors[0] : '',
    bottomFit: 0,
    outFits: [],
    fitIssues: [],
    budgetType: '',
    budgetShirts: 0,
    budgetTeesPolos: 0,
    budgetSweatersShirts: 0,
    budgetPantsDenim: 0,
    budgetShorts: 0,
    budgetShoes: 0,
    budgetOuterwear: 0,
    budgetTies: 0,
    budgetBelts: 0,
    budgetWalletsBags: 0,
    budgetSunglasses: 0,
    budgetHats: 0,
    budgetSocks: 0,
    budgetUnderwear: 0,
    budgetGrooming: 0,
    purchasePrice: '',
    salePrice: '',
    quantity: '',
    brandName: prodBrands.length ? prodBrands[0] : '',
    availableStatus: 0,
    productImage: '',
    note: ''
  };
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            {location.pathname.includes('edit') ? (
              <Link to="/dfinventory/product-list" className="home-link">
                Product List
              </Link>
            ) : null}
            <Typography className="home-link current">
              {location.pathname.includes('edit') ? `Edit` : `Add`} Product For
              Men
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            {location.pathname.includes('edit') ? `Edit` : `Add`} Product For
            Men
          </Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                size="small"
                value={profile}
                name="profile"
                placeholder="Men"
                onChange={(e) => setProfile(e.target.value)}
                MenuProps={selectProps}
              >
                {profileList.map((item, index) => (
                  <MenuItem key={index} value={index} style={{ padding: '0' }}>
                    <Link
                      to={`/dfinventory/add-product/${item.link}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '6px 16px',
                        color: '#232f3e'
                      }}
                    >
                      {item.title}
                    </Link>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={
                location.pathname.includes('edit')
                  ? tableData.length
                    ? tableData[0]
                    : initVal
                  : initVal
              }
              enableReinitialize
              validationSchema={Yup.object().shape({
                prodCategoryId: Yup.string()
                  .min(1, 'Please select category')
                  .notOneOf(['--'], 'Please select category')
                  .required('Please select category'),
                prodSubCategoryId: Yup.string()
                  .min(1, 'Please select sub-catetory')
                  .notOneOf(['--'], 'Please select sub-category')
                  .required('Please select sub-category')
              })}
              onSubmit={async (values, actions) => {
                DFnewLogger(values);
                if (location.pathname.includes('edit')) {
                  editMenProduct(values, actions, navigate);
                } else {
                  addMenProduct(values, actions);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container columnSpacing={4} rowSpacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Product Category
                      </Typography>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.prodCategoryId && errors.prodCategoryId
                        )}
                      >
                        <Select
                          size="small"
                          name="prodCategoryId"
                          autoFocus={Boolean(
                            touched.prodCategoryId && errors.prodCategoryId
                          )}
                          placeholder="Select Category"
                          value={values.prodCategoryId}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            DFnewLogger(e.target.value);
                            setFieldValue('prodCategoryId', e.target.value);
                            dispatch(getProductSubCategories(e.target.value));
                          }}
                          MenuProps={selectProps}
                        >
                          {prodCategories.map((item, index) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.prodCategoryId && errors.prodCategoryId && (
                          <FormHelperText error>
                            {errors.prodCategoryId}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Sub-category
                      </Typography>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.prodSubCategoryId && errors.prodSubCategoryId
                        )}
                      >
                        <Select
                          size="small"
                          name="prodSubCategoryId"
                          autoFocus={Boolean(
                            touched.prodSubCategoryId &&
                              errors.prodSubCategoryId
                          )}
                          placeholder="Select sub-category"
                          value={values.prodSubCategoryId}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {prodSubCategories.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.prodSubCategoryId &&
                          errors.prodSubCategoryId && (
                            <FormHelperText error>
                              {errors.prodSubCategoryId}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Product Name 1
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          value={values.productName1}
                          name="productName1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Product Name 2
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          value={values.productName2}
                          name="productName2"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Height Range
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputLabel>ft.</InputLabel>
                            <Select
                              size="small"
                              label="ft."
                              value={values.fromHeightFt}
                              name="fromHeightFt"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {fromHeightFtList.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputLabel>in.</InputLabel>
                            <Select
                              size="small"
                              label="in."
                              value={values.fromHeightIn}
                              name="fromHeightIn"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {fromHeightInList.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputLabel>ft.</InputLabel>
                            <Select
                              size="small"
                              label="ft."
                              value={values.toHeightFt}
                              name="toHeightFt"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {fromHeightFtList.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputLabel>in.</InputLabel>
                            <Select
                              size="small"
                              label="in."
                              value={values.toHeightIn}
                              name="toHeightIn"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {fromHeightInList.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Weight Range
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5.6}>
                          <FormControl fullWidth>
                            <OutlinedInput
                              size="small"
                              type="number"
                              value={values.fromWeight}
                              name="fromWeight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={12} md={5.6}>
                          <FormControl fullWidth>
                            <OutlinedInput
                              size="small"
                              type="number"
                              value={values.toWeight}
                              name="toWeight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Age Range
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5.6}>
                          <FormControl fullWidth>
                            <OutlinedInput
                              size="small"
                              type="number"
                              value={values.fromAge}
                              name="fromAge"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={12} md={5.6}>
                          <FormControl fullWidth>
                            <OutlinedInput
                              size="small"
                              type="number"
                              value={values.toAge}
                              name="toAge"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Profession
                      </Typography>
                      <FormControl fullWidth>
                        <AntdSelect
                          mode="multiple"
                          size="large"
                          allowClear
                          style={{
                            width: '100%'
                          }}
                          placeholder="--"
                          defaultValue={values.profession}
                          onChange={(e) => (values.profession = e)}
                          options={professionListMen}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        name="sizeType"
                        value={values.sizeType}
                        onChange={handleChange}
                      >
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={0}
                              label={
                                <Typography>
                                  <strong>Free Size (Best Size Fit)</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '0' ? false : true
                                }
                                size="small"
                                value={values.bestSizeFit}
                                name="bestSizeFit"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {normalFitList.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={1}
                              label={
                                <Typography>
                                  <strong>Waist Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '1' ? false : true
                                    }
                                    size="small"
                                    name="waistSizeNum"
                                    value={values.waistSizeNum}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {waistSizeNumList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '1' ? false : true
                                    }
                                    size="small"
                                    name="waistSizeLabel"
                                    value={values.waistSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {waistSizeLabelList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={2}
                              label={
                                <Typography>
                                  <strong>Shirt Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '2' ? false : true
                                    }
                                    size="small"
                                    name="shirtSizeNo"
                                    value={values.shirtSizeNo}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shirtSizeNoList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '2' ? false : true
                                    }
                                    size="small"
                                    name="shirtSizeLabel"
                                    value={values.shirtSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shirtSizeLabelList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={3}
                              label={
                                <Typography>
                                  <strong>Inseam Size</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '3' ? false : true
                                }
                                size="small"
                                value={values.inseamSizeNum}
                                name="inseamSizeNum"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {inseamSizeNumList.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={4}
                              label={
                                <Typography>
                                  <strong>Bottom Size</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '4' ? false : true
                                }
                                size="small"
                                value={values.bottomSizeNo}
                                name="bottomSizeNo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {bottomSizeNoList.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={5}
                              label={
                                <Typography>
                                  <strong>Shoe Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '5' ? false : true
                                    }
                                    size="small"
                                    name="shoeSizeNum"
                                    value={values.shoeSizeNum}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shoeSizeNumListMen.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '5' ? false : true
                                    }
                                    size="small"
                                    name="shoeSizeLabel"
                                    value={values.shoeSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shoeSizeLabelList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} md={7} lg={6}>
                      <Typography className="form-item-title">
                        Body Shape
                      </Typography>
                      <ImageSelectorCheckboxAdmin
                        content={bodyShapeLabel}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="bodyShape"
                        value={values.bodyShape}
                      />
                    </Grid>
                    <Grid item xs={12} md={5} lg={6}>
                      <Typography className="form-item-title">
                        Skin Tone
                      </Typography>
                      <ColorCircularAdmin
                        touched={touched}
                        errors={errors}
                        value={values.skinToneLabel}
                        name="skinToneLabel"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Typically wear to work
                      </Typography>
                      <FormControl fullWidth>
                        <AntdSelect
                          mode="multiple"
                          size="large"
                          allowClear
                          style={{
                            width: '100%'
                          }}
                          placeholder="--"
                          defaultValue={values.typicalWear2Work}
                          onChange={(e) => (values.typicalWear2Work = e)}
                          options={typicalWear2WorkList}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Casual shirts to fit?
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="casualShirts"
                          value={values.casualShirts}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {casualShirtsList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index === 0 ? (
                                <span style={{ opacity: '0.6' }}>{item}</span>
                              ) : (
                                item
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Button up shirt to fit
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="btnUpShirts"
                          value={values.btnUpShirts}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {btnUpShirtsList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index === 0 ? (
                                <span style={{ opacity: '0.6' }}>{item}</span>
                              ) : (
                                item
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Jeans to Fit?
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="jeansFit"
                          value={values.jeansFit}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {jeansFitList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index === 0 ? (
                                <span style={{ opacity: '0.6' }}>{item}</span>
                              ) : (
                                item
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Shorts long?
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="shortsLong"
                          value={values.shortsLong}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {shortsLongList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index === 0 ? (
                                <span style={{ opacity: '0.6' }}>{item}</span>
                              ) : (
                                item
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Color</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="colorName"
                          value={values.colorName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {prodColors.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Bottom fit?
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="bottomFit"
                          value={values.bottomFit}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {bottomFitList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {index === 0 ? (
                                <span style={{ opacity: '0.6' }}>{item}</span>
                              ) : (
                                item
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="form-item-title">
                        Tell us which of these outfits would you prefer to wear?
                      </Typography>
                      <ImageSelectorCheckboxSmall
                        content={outFitsList}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="outFits"
                        value={values.outFits}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="form-item-title">
                        Any fit issues to take note of?
                      </Typography>
                      <CustomCheckboxBtn
                        part={fitIssuesList}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="fitIssues"
                        value={values.fitIssues}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        name="budgetType"
                        value={values.budgetType}
                        onChange={handleChange}
                      >
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          {budgetListMen.map((item, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={index}
                                label={
                                  <Typography>
                                    <strong>{item.title}</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  disabled={
                                    values.budgetType === `${index}`
                                      ? false
                                      : true
                                  }
                                  size="small"
                                  value={values[item.value]}
                                  name={item.value}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {item.prices.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          ))}
                        </Grid>
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Purchase Price
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          type="number"
                          value={values.purchasePrice}
                          name="purchasePrice"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Sale Price
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          type="number"
                          value={values.salePrice}
                          name="salePrice"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Quantity
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          type="number"
                          value={values.quantity}
                          name="quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} />
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Brand Name
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="brandName"
                          value={values.brandName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {prodBrands.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {location.pathname.includes('edit') ? (
                      <Grid item xs={12} sm={6} />
                    ) : (
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Available Status
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="availableStatus"
                            value={values.availableStatus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                          >
                            {availableStatusList.map((item, index) => (
                              <MenuItem key={index} value={index}>
                                {index === 0 ? (
                                  <span style={{ opacity: '0.6' }}>{item}</span>
                                ) : (
                                  item
                                )}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Product Image
                      </Typography>
                      <Box width="200px">
                        <ImageUpload
                          arg="productImage"
                          value={values.productImage}
                          setFieldValue={setFieldValue}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Note</Typography>
                      <FormControl fullWidth>
                        <TextareaAutosize
                          style={{
                            minWidth: '100%',
                            maxWidth: '100%',
                            minHeight: '170px',
                            padding: '15px',
                            borderColor: '#ccc',
                            borderRadius: '12px',
                            fontSize: '14px'
                          }}
                          value={values.note}
                          name="note"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="admin-submit-btn"
                      >
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default MenProduct;
