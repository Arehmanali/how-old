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
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    new Promise(() => {
      getCustomers();
    });
  }, []);

  const getCustomers = async () => {
    const timePeriod = new Date().toISOString();
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/customers`,
        {
          headers: {
            time_period: timePeriod,
          },
        },
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
    if (!registerRequestData.success) {
      // this.setState({
      //   errors:
      //     registerRequestData.messages && registerRequestData.messages.errors,
      // });
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
      fontSize: "6px",
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
    fontWeight: "100",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "0px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "15%",
      fontWeight: "100",
      lineHeight: "0.5",
    },
  },
};

export default withStyles(styles)(Customers);
