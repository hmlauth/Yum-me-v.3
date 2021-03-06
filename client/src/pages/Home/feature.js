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
                        Get Inspired!{" "}
                        <span className="sub">Research and compare.</span>
                    </Header>
                    <p>
                        The process was always the same - review at least 10 recipes before deciding which two were most aligned with the vision. Search unique and technical recipes then save it directly to your development page.
                    </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Image src="https://www.mediabistro.com/wp-content/uploads/2016/09/cookbook-writer.jpg" />
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
                        Sharpen Your Skills! <span className="sub">Watch YouTube videos.</span>
                    </Header>
                    <p>
                        Have video access while cooking so you can learn how to roll pasta, emulsify oil, frost your cupcakes or create chocolate decals without having to alternate between Youtube and the page on which your recipe resides.
                    </p>
                    </Grid.Column>
                </Grid>
                </Segment>
                {/* <p>___________________________________________________________________________________________________________________________________________________________________</p> */}
                <Segment vertical>
                <Grid stackable>
                    <Grid.Column width={10}>
                    <Header as="h1" id="featureTitle">
                        Recipe Development! <span className="sub">Access to every version.</span>
                    </Header>
                    <p>
                        Have you ever modified a recipe and then either forgotten what you did or wished you could have each version ever saved? Now you can! Yum(Me)! saves every version of your recipe so you can experiment with out the fear of forgetting or having to spend the energy remembering! All versions are date stamped.
                    </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Image src="https://cdn.shopify.com/s/files/1/0078/1828/1017/articles/blog_nav-online-recipes2_863x.jpg?v=1546627900" />
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