import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const getWidth = () => {
  return window.innerWidth
}

const HomepageHeading = () => (
  <Container text>
    <Header
      as='h1'
      content='DocBook'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content='Connecting Healthcare and Patients'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop:'1.5em',
      }}
    />
    <Button primary size='huge' href="/Login">
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}


class DesktopContainer extends Component {
  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed} href="/Login" style={{ width: "7em"}}>
                    Log in
                  </Button>
                  <Button as='a' href="/SignIn" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em',  width: "7em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Making you the best version of yourself
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              By making appointment booking easier, we Connect
              health care practicioners with their patients at 
              the click of a button.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Feel the best you possibly could
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but even you can
              feel 100% again
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
            <Image bordered rounded size='large' src='background1.jpg' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout