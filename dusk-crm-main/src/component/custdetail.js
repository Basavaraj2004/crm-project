


import React, { useState } from 'react';
import bgimg from './bg2.jpg';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  styled,
  LinearProgress,
  TextField,
  Button,
  Input,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 8px;
`;

const StyledStatusCell = styled(StyledTableCell)`
  font-weight: bold;
  color: ${(props) => props.color || 'inherit'};
`;

const getStatus = (progress) => {
  if (progress < 50) {
    return { text: 'At Risk', color: 'red' };
  } else if (progress >= 50 && progress < 75) {
    return { text: 'On Track', color: 'orange' };
  } else {
    return { text: 'Ahead', color: 'green' };
  }
};

const capitalizeFirstLetter = (str) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Custdetail = ({ customers, onDeleteCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortOrder('asc');
    }
  };

  


  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '89.9vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Box my={4}>
        <Typography
          component={Paper}
          elevation={18}
          variant="h4"
          align="center"
          style={{ color: 'black', paddingTop: '6px', paddingBottom: '6px' }}
          gutterBottom
        >
          Customer List
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between" >
        <input
        type="text"
        placeholder="Search"
        style={{
          height: '2em',
          width: '100%',
          padding: '10px',
          border: '2px solid white', // Outline color
          borderRadius: '5px',
          backgroundColor: 'white', // Background color
          color: 'black', // Text color
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
          <Box>
          <Button
        variant="outlined"
        onClick={() => handleSort('name')}
        style={{
          height: '4em',
          border: '2px solid black', // Outline color
          borderRadius: '5px',
          backgroundColor: 'white', // Background color
          color: 'black', // Text color
          marginLeft: '10px', // Adjust margin as needed
        }}
      >
        Sort by Name
      </Button>
          </Box>
        </Box>

        <StyledTableContainer component={Paper} style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Priority</StyledTableCell>
                <StyledTableCell>Quotation Amount</StyledTableCell>
                <StyledTableCell>Progress</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .filter(
                  (customer) =>
                    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => {
                  const comparison =
                    sortedField && a[sortedField] > b[sortedField] ? 1 : -1;
                  return sortOrder === 'asc' ? comparison : -comparison;
                })
                .map((customer, index) => (
                  <StyledTableRow key={index + 1}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{customer.name}</StyledTableCell>
                    <StyledTableCell>{customer.email}</StyledTableCell>
                    <StyledTableCell>{customer.phoneNumber}</StyledTableCell>
                    <StyledTableCell>{customer.companyName}</StyledTableCell>
                    <StyledTableCell>{capitalizeFirstLetter(customer.priority)}</StyledTableCell>
                    <StyledTableCell>{customer.quotationAmount}</StyledTableCell>
                    <StyledTableCell>
                      <Box display="flex" alignItems="center">
                        <LinearProgress
                          variant="determinate"
                          value={customer.progress}
                          sx={{ minWidth: '100px', marginRight: '8px' }}
                        />
                        <Typography variant="body2">{`${customer.progress}`}</Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledStatusCell color={getStatus(customer.progress).color}>
                      {getStatus(customer.progress).text}
                    </StyledStatusCell>
                    <StyledTableCell>
                      <IconButton color="secondary" onClick={() => onDeleteCustomer(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    </Container>
  );
};

export default Custdetail;
