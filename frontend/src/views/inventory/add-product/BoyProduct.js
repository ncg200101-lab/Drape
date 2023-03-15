import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import DFnewLogger from 'utils/DFnewLogger';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import CustomRadio from 'views/client/component/profile/CustomRadio';
import {
  getProductBrands,
  getProductCategories,
  getProductColors,
  getProductSubCategories
} from 'actions/invMenProduct';
import { addKidsProduct, editKidsProduct } from 'actions/invKidsProduct';
import {
  childHeightFtList,
  childHeightInList,
  normalFitList,
  topsSizeList,
  shoeSizeList,
  bodyShapeList,
  typeOfPrintList,
  availableStatusList
} from 'utils/Constant';

const profileList = [
  { title: 'Men', link: 'men' },
  { title: 'Women', link: 'women' },
  { title: 'Boy Kids', link: 'boy' },
  { title: 'Girl Kids', link: 'girl' }
];

const BoyProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(2);
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
    childHeightFt: 0,
    childHeightIn: 0,
    childWeight: '',
    colorName: prodColors.length ? prodColors[0] : '',
    sizeType: '0',
    bestSizeFit: 0,
    topsSize: 0,
    bottomsSize: 0,
    shoeSize: 0,
    bodyShape: 0,
    typeOfPrint: 0,
    purchasePrice: '',
    salePrice: '',
    brandName: prodBrands.length ? prodBrands[0] : '',
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
              Boy
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            {location.pathname.includes('edit') ? `Edit` : `Add`} Product For
            Boy
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
                  editKidsProduct(values, 'boy', actions, navigate);
                } else {
                  addKidsProduct(values, 'boy', actions);
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
                        Child Height
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>ft.</InputLabel>
                            <Select
                              size="small"
                              label="ft."
                              value={values.childHeightFt}
                              name="childHeightFt"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {childHeightFtList.map((item, index) => (
                                <MenuItem key={index} value={index}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>in.</InputLabel>
                            <Select
                              size="small"
                              label="in."
                              value={values.childHeightIn}
                              name="childHeightIn"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                            >
                              {childHeightInList.map((item, index) => (
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
                        Child Weight
                      </Typography>
                      <FormControl fullWidth>
                        <OutlinedInput
                          size="small"
                          type="number"
                          value={values.childWeight}
                          name="childWeight"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
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
                                  <strong>TOPS SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '1' ? false : true
                                }
                                size="small"
                                name="topsSize"
                                value={values.topsSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {topsSizeList.map((item, index) => (
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
                                  <strong>BOTTOMS SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '2' ? false : true
                                }
                                size="small"
                                name="bottomsSize"
                                value={values.bottomsSize}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {topsSizeList.map((item, index) => (
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
                              value={3}
                              label={
                                <Typography>
                                  <strong>SHOE SIZE</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={
                                  values.sizeType === '3' ? false : true
                                }
                                size="small"
                                value={values.shoeSize}
                                name="shoeSize"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {shoeSizeList.map((item, index) => (
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
                        </Grid>
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Body Shape
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="bodyShape"
                          value={values.bodyShape}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {bodyShapeList.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Type of Print
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="typeOfPrint"
                          value={values.typeOfPrint}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {typeOfPrintList.map((item, index) => (
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
                    <Grid item xs={12} sm={6} />
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

export default BoyProduct;
