import {
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Select,
  MenuItem
} from '@mui/material';

const PriceSelectGroup = (props) => {
  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 360,
        width: 220
      }
    }
  };
  return (
    <Grid container columnSpacing={4}>
      {props.initValue.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} lg={4}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className="basic-info-sub-title">
                {item.title}
              </Typography>
            </Grid>
            {props.touched[`${item.value}`] &&
              props.errors[`${item.value}`] && (
                <FormHelperText id="standard-weight-helper-text--signup" error>
                  {props.errors[`${item.value}`]}
                </FormHelperText>
              )}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  disabled={props?.disabled}
                  size="small"
                  value={props.value[`${item.value}`]}
                  name={item.value}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
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
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default PriceSelectGroup;
