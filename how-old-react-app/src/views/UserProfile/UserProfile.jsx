import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InputLabel from "@material-ui/core/InputLabel";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const { REACT_APP_SERVER_URL } = process.env;
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      messages: "",
      open: false,
      errors: {},
    };
    this.updateProfile = this.updateProfile.bind(this);
  }
  async componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    const { userInfo } = JSON.parse(localStorage.getItem("sessionStorage"));
    const id = userInfo.id;
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/profile/get-user-info`,
        {
          headers: {
            id: id,
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
      this.setState({
        userName: registerRequestData.userInfo.name,
        userEmail: registerRequestData.userInfo.email,
      });
    }
    if (!registerRequestData.success) {
      this.setState({
        errors:
          registerRequestData.messages && registerRequestData.messages.errors,
      });
    }
  }

  async updateProfile(e) {
    e.preventDefault();

    const fields = ["name", "username"];
    const formElements = e.target.elements;

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    let registerRequest;
    try {
      registerRequest = await axios({
        method: "post",
        url: `http://${REACT_APP_SERVER_URL}/profile/update-profile-info`,
        headers: {},
        data: {
          ...formValues,
        },
      });
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      const { userInfo } = JSON.parse(localStorage.getItem("sessionStorage"));

      localStorage.setItem(
        "sessionStorage",
        JSON.stringify({
          success: true,
          userInfo: {
            ...userInfo,
            email: registerRequestData.userInfo.email,
            name: registerRequestData.userInfo.name,
          },
        })
      );

      this.setState({
        userName: registerRequestData.userInfo.name,
        userEmail: registerRequestData.userInfo.email,
        message: registerRequestData.messages.success,
        open: true,
      });
    }
    if (!registerRequestData.success || registerRequest.status === 500) {
      this.setState({
        message:
          (registerRequestData.messages &&
            registerRequestData.messages.errors) ||
          "Enter Valid Field(s).",
        errors:
          registerRequestData.messages && registerRequestData.messages.errors,
        open: true,
      });
    }
  }

  onChange(e) {
    if (e.target.name === "name") {
      this.setState({ userName: e.target.value });
    } else if (e.target.name === "username") {
      this.setState({ userEmail: e.target.value });
    }
  }

  handleClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { errors, userName, userEmail, open, message } = this.state;

    return (
      <div>
        <GridContainer>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">{message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />

          <GridItem xs={12} sm={12} md={8}>
            <form onSubmit={this.updateProfile}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"name"}
                      >
                        Name
                      </InputLabel>
                      <TextField
                        classes={{
                          root: classes.marginTop,
                          disabled: classes.disabled,
                          underline: classes.underline,
                        }}
                        required={true}
                        name={"name"}
                        value={userName}
                        onChange={(e) => this.onChange(e)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <InputLabel
                        className={classes.labelRoot}
                        htmlFor={"username"}
                      >
                        Email address
                      </InputLabel>
                      <TextField
                        classes={{
                          root: classes.marginTop,
                          disabled: classes.disabled,
                          underline: classes.underline,
                        }}
                        id={"username"}
                        required={true}
                        value={userEmail}
                        name={"username"}
                        onChange={(e) => this.onChange(e)}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
