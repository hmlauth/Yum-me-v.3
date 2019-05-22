import React from "react";
import Demo from "./demo";
import "semantic-ui-css/semantic.min.css";
import {
    Container,
    Grid,
    Header,
    Image,
    Segment
  } from "semantic-ui-react";
  
  import "./App.css";

class Feature extends React.Component {
    render() {
          
    return (
        <div>
            <Container>
                <Segment vertical>
                <Grid stackable>
                    <Grid.Column width={10}>
                    <Header as="h1" id="featureTitle">
                        First feature heading.{" "}
                        <span className="sub">It'll blow your mind.</span>
                    </Header>
                    <p>
                        Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                        id ligula porta felis euismod semper. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                        ac cursus commodo.
                    </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Image src="/images/pho.jpeg" />
                    </Grid.Column>
                </Grid>
                </Segment>
                {/* <p>___________________________________________________________________________________________________________________________________________________________________</p> */}
                <hr></hr>
                <Segment vertical>
                <Grid stackable>
                    <Grid.Column width={6}>
                    <Image src="https://media.giphy.com/media/JQXNbf2yINO72ZdwhN/giphy.gif" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                    <Header as="h1" id="featureTitle">
                        Oh yeah, <span className="sub">it's that good.</span>
                    </Header>
                    <p>
                        Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                        id ligula porta felis euismod semper. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                        ac cursus commodo.
                    </p>
                    </Grid.Column>
                </Grid>
                </Segment>
                {/* <p>___________________________________________________________________________________________________________________________________________________________________</p> */}
                <Segment vertical>
                <Grid stackable>
                    <Grid.Column width={10}>
                    <Header as="h1" id="featureTitle">
                        And lastly, <span className="sub">this one.</span>
                    </Header>
                    <p>
                        Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                        id ligula porta felis euismod semper. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                        ac cursus commodo.
                    </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Image src="/images/pho.jpeg" />
                    </Grid.Column>
                </Grid>
                </Segment>
                {/* <p>___________________________________________________________________________________________________________________________________________________________________</p> */}
                <Demo />

                <Segment vertical>
                <Grid columns={2}>
                    <Grid.Column>
                    · <a href="#root">Privacy</a> ·{" "}
                    <a href="#root">Terms</a>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                    <a href="#root">Back to top</a>
                    </Grid.Column>
                </Grid>
                </Segment>
            </Container>
         </div>
  	    );
    }
}
export default Feature;