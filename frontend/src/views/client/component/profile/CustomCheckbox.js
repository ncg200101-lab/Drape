import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid
} from '@mui/material';

const CustomCheckbox = (props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {props.content.title ? (
            <Typography className="basic-info-title">
              {props.content.title}
            </Typography>
          ) : (
            <></>
          )}
          {props.content.subtitle ? (
            <Typography className="basic-info-title-small">
              {props.content.subtitle}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {props.touched[`${props.name}`] &&
              props.errors[`${props.name}`] && (
                <FormHelperText id="standard-weight-helper-text--signup" error>
                  {props.errors[`${props.name}`]}
                </FormHelperText>
              )}
            <Grid container spacing={1}>
              {props.content.items.map((item, index) => (
                <Grid key={index} item xs={6} sm={3} xl={2.4}>
                  <FormControlLabel
                    className="orange-checkbox"
                    control={
                      <Checkbox
                        disabled={props?.disabled}
                        checked={props.value.includes(`${index}`)}
                        onBlur={props.handleBlur}
                        value={index}
                        onChange={props.handleChange}
                        name={props.name}
                      />
                    }
                    label={
                      <Typography className="custom-checkbox-label">
                        {item}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomCheckbox;
