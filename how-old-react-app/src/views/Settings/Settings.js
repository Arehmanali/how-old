import React from "react";
import axios from "axios";
import PropTypes, { element } from "prop-types";
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

const { REACT_APP_SERVER_URL } = process.env;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      camData: [],
      messages: "",
      open: false,
      errors: {},
    };
    this.addNewCamera = this.addNewCamera.bind(this);
  }
  async componentDidMount() {
    this.getCameras();
  }

  async getCameras() {
    const { userInfo } = JSON.parse(localStorage.getItem("sessionStorage"));
    const user_id = userInfo.id;
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `http://${REACT_APP_SERVER_URL}/cameras`,
        {
          headers: {
            user_id: user_id,
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
        camData: registerRequestData.cameras,
      });
    }
    if (!registerRequestData.success) {
      this.setState({
        errors:
          registerRequestData.messages && registerRequestData.messages.errors,
      });
    }
  }

  async addNewCamera(e) {
    e.preventDefault();
    const { userInfo } = JSON.parse(localStorage.getItem("sessionStorage"));
    const user_id = userInfo.id;

    const newCamData = {
      url: this.state.url,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    let registerRequest;
    try {
      registerRequest = await axios({
        method: "post",
        url: `http://${REACT_APP_SERVER_URL}/cameras/add-new-camera`,
        headers: {},
        data: {
          ...newCamData,
        },
      });
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      this.setState({
        camData: [...this.state.camData, registerRequestData.camera],
        message: registerRequestData.messages.success,
        open: true,
        url: "",
      });
    }
    if (!registerRequestData.success || registerRequest.status === 500) {
      this.setState({
        message:
          registerRequestData.messages && registerRequestData.messages.errors,
        errors:
          registerRequestData.messages && registerRequestData.messages.errors,
        open: true,
      });
    }
  }

  async deleteCamera(e, id, index) {
    e.preventDefault();

    let registerRequest;
    try {
      registerRequest = await axios({
        method: "delete",
        url: `http://${REACT_APP_SERVER_URL}/cameras/remove-camera`,
        headers: { id },
      });
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.success) {
      const newCamData = [...this.state.camData];
      newCamData.splice(index, 1);
      this.setState({
        camData: newCamData,
        message: registerRequestData.messages.success,
        open: true,
      });
    }
    if (!registerRequestData.success || registerRequest.status === 500) {
      this.setState({
        message:
          registerRequestData.messages && registerRequestData.messages.errors,
        errors:
          registerRequestData.messages && registerRequestData.messages.errors,
        open: true,
      });
    }
  }

  onChange(e) {
    if (e.target.name === "url") {
      this.setState({
        url: e.target.value,
      });
    }
  }

  handleClose = () => {
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { errors, open, message, camData, url } = this.state;

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
            <form onSubmit={this.addNewCamera}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Settings</h4>
                  <p className={classes.cardCategoryWhite}>
                    All the Camera Details
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem
                      style={{
                        marginTop: "20px",
                      }}
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <InputLabel className={classes.labelRoot} htmlFor={"url"}>
                        Cam URL
                      </InputLabel>
                      <TextField
                        classes={{
                          root: classes.marginTop,
                          disabled: classes.disabled,
                          underline: classes.underline,
                        }}
                        required={true}
                        name={"url"}
                        value={url}
                        onChange={(e) => this.onChange(e)}
                        style={{
                          width: "70%",
                          marginLeft: "22px",
                          marginRight: "10px",
                          padding: "0px",
                          marginTop: "-8px",
                        }}
                      />
                      <Button
                        type="submit"
                        style={{
                          height: "30px",
                          marginTop: "0px",
                          width: "106px",
                        }}
                        color="success"
                      >
                        Add
                      </Button>
                    </GridItem>
                    {camData.map((cam, idx) => (
                      <GridItem
                        style={{
                          marginTop: "20px",
                        }}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        <InputLabel htmlFor={"url"}>
                          Cam {idx + 1} URL
                        </InputLabel>
                        <TextField
                          required={true}
                          disabled={true}
                          name={"url"}
                          value={cam.url}
                          onChange={{}}
                          style={{
                            width: "70%",
                            margin: "10px",
                            padding: "0px",
                            marginTop: "-8px",
                          }}
                        />
                        <Button
                          style={{
                            height: "30px",
                            marginTop: "0px",
                          }}
                          onClick={(e) => this.deleteCamera(e, cam.id, idx)}
                          color="danger"
                        >
                          Remove
                        </Button>
                      </GridItem>
                    ))}
                  </GridContainer>
                </CardBody>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default withStyles(styles)(Settings);
