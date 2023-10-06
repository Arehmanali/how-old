import React, { useEffect, useState } from "react";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

function Customers(props) {
  const { classes } = props;
  const [customers, setCustomers] = useState([]);
  const { REACT_APP_SERVER_URL } = process.env; // server url

  useEffect(() => {
    new Promise(() => {
      getCustomers();
    });
  }, []);

  const getCustomers = async () => {
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/customers`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      setCustomers(registerRequestData.customers);
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={10}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Customers</h4>
            <p className={classes.cardCategoryWhite}>
              All the customers who have visited the store
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeadIcon="people_outline"
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                "Gender",
                "Age",
                "Feelings",
                "Visit Date",
                "Visit Time",
              ]}
              tableData={customers}
              rowsPerPage={10}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "0.5",
    },
  },
};

export default withStyles(styles)(Customers);
