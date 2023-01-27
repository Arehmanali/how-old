import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment";
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
  const [prevWeekCustomers, setPrevWeekCustomers] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [feelings, setFeelings] = useState(0);
  const [visitorLabels, setVisitorLabels] = useState([
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ]);
  const [feelingLabels, setFeelingLabels] = useState([
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ]);
  const [visitorCount, setVisitorCount] = useState([]);
  const [feelingCount, setFeelingCount] = useState([]);
  const [chartMaleCount, setChartMaleCount] = useState(0);
  const [chartFemaleCount, setChartFemaleCount] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(moment().fromNow());

  const { classes } = props;
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    getCustomers();
    getPrevWeekCustomers();
  }, []);

  useEffect(() => {
    if (customers && customers.length > 0) {
      countMale();
      countFemale();
      getFeelings();
    }
  }, [customers]);

  useEffect(() => {
    if (prevWeekCustomers && prevWeekCustomers.length > 0) {
      calculateChartData();
    }
  }, [prevWeekCustomers]);

  const calculateChartData = async () => {
    let today = new Date();

    let visitCount = [];
    let happyCount = [];
    let labels = [];
    for (let i = 6; i >= 0; i--) {
      const date = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0") - i}`;
      let daydata = prevWeekCustomers.filter(
        (e) => e.created_at.slice(0, 10) === date
      );

      visitCount.push(daydata.length);
      labels.push(new Date(date).getDay());
      const happy = daydata.filter((e) => e.feeling === "happy");
      const happyPercentage = (happy.length / daydata.length) * 100;
      happyCount.push(Math.floor(happyPercentage));
    }

    const male = prevWeekCustomers.filter((e) => e.gender === "male");
    const female = prevWeekCustomers.filter((e) => e.gender === "female");
    const newLabel = [
      visitorLabels[labels[0]],
      visitorLabels[labels[1]],
      visitorLabels[labels[2]],
      visitorLabels[labels[3]],
      visitorLabels[labels[4]],
      visitorLabels[labels[5]],
      visitorLabels[labels[6]],
    ];
    setVisitorLabels(newLabel);
    setVisitorCount(visitCount);
    setFeelingLabels(newLabel);
    setFeelingCount(happyCount);
    let percentage = (male.length / prevWeekCustomers.length) * 100;
    setChartMaleCount(Math.round(percentage));
    percentage = (female.length / prevWeekCustomers.length) * 100;
    setChartFemaleCount(Math.round(percentage));
    setUpdatedAt(moment().fromNow());
  };

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
    setFeelings(Math.round(happyPercentage));
  };

  const getPrevWeekCustomers = async () => {
    let today = new Date();
    let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
    let fromTime = new Date(date);
    fromTime.setDate(today.getDate() - 7);
    fromTime = fromTime.toISOString();
    let toTime = new Date(date);
    toTime.setDate(today.getDate());
    toTime = toTime.toISOString();
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/customers`,
        {
          headers: {
            from_time: fromTime,
            to_time: toTime,
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
      setPrevWeekCustomers(registerRequestData.customers);
    }
  };

  const getCustomers = async () => {
    let today = new Date();
    let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;
    const fromTime = new Date(date).toISOString();
    let toTime = new Date(date);
    toTime.setDate(today.getDate());
    toTime = toTime.toISOString();
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/customers`,
        {
          headers: {
            from_time: fromTime,
            to_time: toTime,
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
                className="ct-chart ct-perfect-fourth"
                data={dailySalesChart(visitorLabels, visitorCount).data}
                type="Line"
                options={dailySalesChart(visitorLabels, visitorCount).options}
                listener={
                  dailySalesChart(visitorLabels, visitorCount).animation
                }
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Visitors</h4>
              <p className={classes.cardCategory}>
                Visitors count of last 7 days
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {updatedAt}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart ct-perfect-fourth"
                data={emailsSubscriptionChart(feelingLabels, feelingCount).data}
                type="Bar"
                options={
                  emailsSubscriptionChart(feelingLabels, feelingCount).options
                }
                responsiveOptions={
                  emailsSubscriptionChart(feelingLabels, feelingCount)
                    .responsiveOptions
                }
                listener={
                  emailsSubscriptionChart(feelingLabels, feelingCount).animation
                }
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Feelings</h4>
              <p className={classes.cardCategory}>Feelings of the visitors</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {updatedAt}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart ct-perfect-fourth"
                data={
                  completedTasksChart(
                    [`Male ${chartMaleCount}%`, `Female ${chartFemaleCount}%`],
                    [chartMaleCount, chartFemaleCount]
                  ).data
                }
                type="Pie"
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Gender of Visitors</h4>
              <p className={classes.cardCategory}>Visitors gender ratio</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated {updatedAt}
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
                rowsPerPage={10}
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
