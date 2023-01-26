import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function Dashboard(props) {
  const [value, setValue] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [feelings, setFeelings] = useState(0);

  const { classes } = props;
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(async () => {
    await getCustomers();
  }, []);

  useEffect(() => {
    if (customers && customers.length > 0) {
      countMale();
      countFemale();
      getFeelings();
    }
  }, [customers]);

  const countMale = () => {
    const male = customers.filter((e) => e.gender === "male");
    setMaleCount(male.length);
  };

  const countFemale = () => {
    const female = customers.filter((e) => e.gender === "female");
    setFemaleCount(female.length);
  };
  const getFeelings = () => {
    const happy = customers.filter((e) => e.feeling === "happy");
    const happyPercentage = (happy.length / customers.length) * 100;
    setFeelings(Math.floor(happyPercentage));
  };

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
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>directions_walk</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Visitors</p>
              <h3 className={classes.cardTitle}>{customers.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>male</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Male</p>
              <h3 className={classes.cardTitle}>{maleCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>female</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Female</p>
              <h3 className={classes.cardTitle}>{femaleCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>sentiment_satisfied_alt</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Feeling Happy</p>
              <h3 className={classes.cardTitle}>{feelings}%</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Visitors</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today visitings.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Feelings</h4>
              <p className={classes.cardCategory}>Feelings of the visitors</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 24 hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Gender of Visitors</h4>
              <p className={classes.cardCategory}>Visitors gender ratio</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Last 24 hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Customers Stats</h4>
              <p className={classes.cardCategoryWhite}>
                Customers stats who visited the store today
              </p>
            </CardHeader>
            <CardBody>
              <Table
                icon="people_outline"
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
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
