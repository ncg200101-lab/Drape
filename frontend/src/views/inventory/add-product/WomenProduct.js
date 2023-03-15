import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductCategories,
  getProductBrands,
  getProductColors,
  getProductSubCategories
} from 'actions/invMenProduct';
import { addWomenProduct, editWomenProduct } from 'actions/invWomenProduct';
import {
  fromHeightFtList,
  fromHeightInList,
  professionListWomen,
  occasionsList,
  normalFitList,
  styleInspirationList,
  dressLengthList,
  pantLengthList,
  pantRaiseList,
  topHalfList,
  pantStyleList,
  appareTypeList,
  bottomsTypeList,
  topTypeList,
  patternsTypeList,
  denimStylesList,
  missingFromFitList,
  pantsSizeList,
  budgetListWomen,
  jeansSizeList,
  sizeArmsList,
  braSizeNumList,
  braSizeLabelList,
  skirtSizeList,
  jacketSizeList,
  bottomSizeList,
  dressSizeLabelList,
  shirtBlouseSizeLabelList,
  topSizeNoList,
  shoeSizeNumListWomen,
  shoesStyleLabelList,
  heelHeightLabelList,
  topSizeLabelList,
  availableStatusList
} from 'utils/Constant';

const Shape_1 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-1'
);
const Shape_2 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-2'
);
const Shape_3 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-3'
);
const Shape_4 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-4'
);
const Shape_5 = GenS3Link(
  'landing/images/client/profile/women/basic-info/shape-5'
);
const OutFit_0 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-1'
);
const OutFit_1 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-2'
);
const OutFit_2 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-3'
);
const OutFit_3 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-4'
);
const OutFit_4 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-5'
);
const OutFit_5 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-6'
);
const OutFit_6 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-7'
);
const OutFit_7 = GenS3Link(
  'landing/images/client/profile/women/style-fit/outfit-8'
);

const profileList = [
  { title: 'Men', link: 'men' },
  { title: 'Women', link: 'women' },
  { title: 'Boy Kids', link: 'boy' },
  { title: 'Girl Kids', link: 'girl' }
];
const bodyTypeLabel = [
  { title: 'Trapezoid', image: Shape_1 },
  { title: 'Rectangle', image: Shape_2 },
  { title: 'Triangle', image: Shape_3 },
  { title: 'Oval', image: Shape_4 },
  { title: 'Inverted Triangle', image: Shape_5 }
];
const outFitsList = [
  { title: '', image: OutFit_0 },
  { title: '', image: OutFit_1 },
  { title: '', image: OutFit_2 },
  { title: '', image: OutFit_3 },
  { title: '', image: OutFit_4 },
  { title: '', image: OutFit_5 },
  { title: '', image: OutFit_6 },
  { title: '', image: OutFit_7 }
];

const WomenProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(1);
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
    prodCategoryId: prodCategories.length ? prodCategories[0].id : '',
    prodSubCategoryId: prodSubCategories.length ? prodSubCategories[0].id : '',
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
    occasions: [],
    bodyType: [],
    skinToneLabel: [],
    brandName: prodBrands.length ? prodBrands[0] : '',
    colorName: prodColors.length ? prodColors[0] : '',
    sizeType: '0',
    bestSizeFit: 0,
    pantsSize: 0,
    braSizeNum: 0,
    braSizeLabel: 0,
    skirtSize: 0,
    jeansSize: 0,
    activeWearSize: 0,
    jacketSize: 0,
    bottomSize: 0,
    dressSizeNo: 0,
    dressSizeLabel: 0,
    shirtBlouseSizeNo: 0,
    shirtBlouseSizeLabel: 0,
    shoeSizeNum: 0,
    shoesStyleLabel: 0,
    heelHeightLabel: 0,
    topSizeNo: 0,
    topSizeLabel: 0,
    styleInspiration: [],
    dressLength: 0,
    topHalf: [],
    pantLength: 0,
    pantRaise: 0,
    pantStyle: 0,
    appareType: 0,
    bottomsType: 0,
    topType: 0,
    patternsType: 0,
    denimStyles: [],
    missingFromFit: 0,
    outFits: [],
    budgetType: '',
    budgetTops: 0,
    budgetBottoms: 0,
    budgetOuterwear: 0,
    budgetJeans: 0,
    budgetJewelry: 0,
    budgetAccessories: 0,
    budgetDress: 0,
    sizeShoulders: 0,
    sizeArms: 0,
    sizeHips: 0,
    sizeLegs: 0,
    purchasePrice: '',
    salePrice: '',
    quantity: '',
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
              Women
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            {location.pathname.includes('edit') ? `Edit` : `Add`} Product For
            Women
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
                  editWomenProduct(values, actions, navigate);
                } else {
                  addWomenProduct(values, actions);
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
                            <MenuItem key={index} value={item.id}>
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
                    <Grid item xs={12} sm={6} />
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
                          options={professionListWomen}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Occasions
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
                          defaultValue={values.occasions}
                          onChange={(e) => (values.occasions = e)}
                          options={occasionsList}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={7} lg={6}>
                      <Typography className="form-item-title">
                        Body Type
                      </Typography>
                      <ImageSelectorCheckboxAdmin
                        content={bodyTypeLabel}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="bodyType"
                        value={values.bodyType}
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
                                  <strong>PANTS</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '1' ? false : true
                                }
                                size="small"
                                name="pantsSize"
                                value={values.pantsSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {pantsSizeList.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index}
                                    disabled={item.type === 0 ? false : true}
                                  >
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={2}
                              label={
                                <Typography>
                                  <strong>BRA SIZE</strong>
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
                                    name="braSizeNum"
                                    value={values.braSizeNum}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {braSizeNumList.map((item, index) => (
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
                                    name="braSizeLabel"
                                    value={values.braSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {braSizeLabelList.map((item, index) => (
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
                                  <strong>SKIRT SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '3' ? false : true
                                }
                                size="small"
                                name="skirtSize"
                                value={values.skirtSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {skirtSizeList.map((item, index) => (
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
                                  <strong>JEANS SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '4' ? false : true
                                }
                                size="small"
                                name="jeansSize"
                                value={values.jeansSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {jeansSizeList.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index}
                                    disabled={item.type === 0 ? false : true}
                                  >
                                    {item.value}
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
                                  <strong>ACTIVE WEAR SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '5' ? false : true
                                }
                                size="small"
                                name="activeWearSize"
                                value={values.activeWearSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {sizeArmsList.map((item, index) => (
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
                              value={6}
                              label={
                                <Typography>
                                  <strong>JACKET SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '6' ? false : true
                                }
                                size="small"
                                name="jacketSize"
                                value={values.jacketSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {jacketSizeList.map((item, index) => (
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
                              value={7}
                              label={
                                <Typography>
                                  <strong>BOTTOM SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '7' ? false : true
                                }
                                size="small"
                                name="bottomSize"
                                value={values.bottomSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {bottomSizeList.map((item, index) => (
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
                              value={8}
                              label={
                                <Typography>
                                  <strong>DRESS SIZE</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '8' ? false : true
                                    }
                                    size="small"
                                    name="dressSizeNo"
                                    value={values.dressSizeNo}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {jeansSizeList.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={index}
                                        disabled={
                                          item.type === 0 ? false : true
                                        }
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    disabled={
                                      values.sizeType === '8' ? false : true
                                    }
                                    name="dressSizeLabel"
                                    value={values.dressSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {dressSizeLabelList.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={index}
                                        disabled={
                                          item.type === 0 ? false : true
                                        }
                                      >
                                        {item.value}
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
                              value={9}
                              label={
                                <Typography>
                                  <strong>SHIRT & BLOUSE</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '9' ? false : true
                                    }
                                    size="small"
                                    name="shirtBlouseSizeNo"
                                    value={values.shirtBlouseSizeNo}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {jeansSizeList.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={index}
                                        disabled={
                                          item.type === 0 ? false : true
                                        }
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={
                                      values.sizeType === '9' ? false : true
                                    }
                                    size="small"
                                    name="topSizeLabel"
                                    value={values.topSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shirtBlouseSizeLabelList.map(
                                      (item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={index}
                                          disabled={
                                            item.type === 0 ? false : true
                                          }
                                        >
                                          {item.value}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              value={10}
                              label={
                                <Typography>
                                  <strong>SHOES</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography>What is your shoe size?</Typography>
                                <FormControl
                                  error={Boolean(
                                    touched.shoeSizeNum && errors.shoeSizeNum
                                  )}
                                  fullWidth
                                >
                                  <Select
                                    disabled={
                                      values.sizeType === '10' ? false : true
                                    }
                                    size="small"
                                    name="shoeSizeNum"
                                    value={values.shoeSizeNum}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shoeSizeNumListWomen.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography>
                                  Which heel height do you prefer?
                                </Typography>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    disabled={
                                      values.sizeType === '10' ? false : true
                                    }
                                    name="heelHeightLabel"
                                    value={values.heelHeightLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {heelHeightLabelList.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography>Which style of shoes ?</Typography>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    disabled={
                                      values.sizeType === '10' ? false : true
                                    }
                                    name="shoesStyleLabel"
                                    value={values.shoesStyleLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {shoesStyleLabelList.map((item, index) => (
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
                              value={11}
                              label={
                                <Typography>
                                  <strong>TOP SIZE</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    disabled={
                                      values.sizeType === '11' ? false : true
                                    }
                                    name="topSizeNo"
                                    value={values.topSizeNo}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {topSizeNoList.map((item, index) => (
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
                                      values.sizeType === '11' ? false : true
                                    }
                                    size="small"
                                    name="topSizeLabel"
                                    value={values.topSizeLabel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {topSizeLabelList.map((item, index) => (
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
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Style Inspiration
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
                          defaultValue={values.styleInspiration}
                          onChange={(e) => (values.styleInspiration = e)}
                          options={styleInspirationList}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Dress Length
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="dressLength"
                          value={values.dressLength}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {dressLengthList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Top Half
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
                          defaultValue={values.topHalf}
                          onChange={(e) => (values.topHalf = e)}
                          options={topHalfList}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Pant Length
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="pantLength"
                          value={values.pantLength}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {pantLengthList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Pant Raise
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="pantRaise"
                          value={values.pantRaise}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {pantRaiseList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Pant Style
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="pantStyle"
                          value={values.pantStyle}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {pantStyleList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Appare Type
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="appareType"
                          value={values.appareType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {appareTypeList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Bottoms Type
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="bottomsType"
                          value={values.bottomsType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {bottomsTypeList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Top Type
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="topType"
                          value={values.topType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {topTypeList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Patterns Type
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="patternsType"
                          value={values.patternsType}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {patternsTypeList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Denim Styles
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
                          defaultValue={values.denimStyles}
                          onChange={(e) => (values.denimStyles = e)}
                          options={denimStylesList}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Missing from fit / your closet
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="missingFromFit"
                          value={values.missingFromFit}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {missingFromFitList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="form-item-title">
                        OutFit prefer to wear
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
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        name="budgetType"
                        value={values.budgetType}
                        onChange={handleChange}
                      >
                        <Grid container columnSpacing={4} rowSpacing={2}>
                          {budgetListWomen.map((item, index) => (
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
                              <FormControl
                                fullWidth
                                error={Boolean(
                                  touched[item.value] && errors[item.value]
                                )}
                              >
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
                        Shoulders
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="sizeShoulders"
                          value={values.sizeShoulders}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {jeansSizeList.map((item, index) => (
                            <MenuItem
                              key={index}
                              value={index}
                              disabled={item.type === 0 ? false : true}
                            >
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Arms</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="sizeArms"
                          value={values.sizeArms}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {sizeArmsList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Hips</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="sizeHips"
                          value={values.sizeHips}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {jeansSizeList.map((item, index) => (
                            <MenuItem
                              key={index}
                              value={index}
                              disabled={item.type === 0 ? false : true}
                            >
                              {item.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Legs</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="sizeLegs"
                          value={values.sizeLegs}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {braSizeNumList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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

export default WomenProduct;
