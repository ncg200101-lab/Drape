import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  styled
} from '@mui/material';
import DFnewLogger from 'utils/DFnewLogger';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const InfoTable = () => {
  return (
    <>
      <Box className="fx-lg-padding">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">John Doe</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">(women)</Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Email:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">john@doe.com</Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Full Name:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">John Doe</Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography className="uinfo-str">Address:</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography className="uinfo-nstr">Big Apple</Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default InfoTable;
