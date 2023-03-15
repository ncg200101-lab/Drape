import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider,
  Grid,
  Box,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  TextareaAutosize,
  Breadcrumbs
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

//-- component
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import ColorRect from 'views/client/component/profile/ColorRect';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import Profession from 'views/client/component/profile/Profession';
import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import PriceSelectGroup from 'views/client/component/profile/PriceSelectGroup';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import DFnewImgTag from 'utils/DFnewImgTag';
import BrandSelector from 'views/client/component/profile/BrandSelector';

const Logo = GenS3Link('landing/images/logo');
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

const AddManualProduct = () => {
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Link to="/dfinventory/manual-return-product" className="home-link">
              Manual Return Product
            </Link>
            <Typography className="home-link current">Add Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Add Product</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            firFor: '',
            productCategory: '',
            subCategory: '',
            productName1st: '',
            productName2nd: '',
            heightFt: '',
            heightIn: '',
            weightLbs: ''
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            touched,
            values
          }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default AddManualProduct;
