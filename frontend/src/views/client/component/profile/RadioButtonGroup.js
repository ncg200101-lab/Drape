import {
  ButtonGroup,
  FormControl,
  Button,
  FormHelperText
} from '@mui/material';

const RadioButtonGroup = (props) => {
  return (
    <>
      <FormControl fullWidth>
        <ButtonGroup
          disabled={props?.disabled}
          size="large"
          variant="outlined"
          name={props.name}
          value={props.value}
        >
          {props.group.map((item, index) => (
            <Button
              key={index}
              className="radio-button-group"
              style={{
                backgroundColor: props.value === index ? '#ff6c00' : '#f8f8f8',
                color: props.value === index ? '#ffffff' : '#656565'
              }}
              onClick={() => {
                props.setFieldValue(props.name, index);
              }}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
        {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
          <FormHelperText id="standard-weight-helper-text--signup" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default RadioButtonGroup;
