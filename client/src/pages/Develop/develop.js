import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Header"

class Develop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipe: [],
            Ingredients: [],
            topIngredients: [],
            Instructions: [],
            topInstructions: [],
            comments: []
        }
    }

    componentDidMount() {
        const { id } = this.props.location.state
        console.log(id)
        API.getVersions(id)
        .then(res => {
            console.log("getVersions", res.data)
            this.setState({
                recipes: res.data,
                recipe: res.data[0],
                Ingredients: res.data[0].extendedIngredients.Ingredients,
                topIngredients: res.data[0].extendedIngredients.Toppings,
                Instructions: res.data[0].extendedInstructions.Instructions,
                topInstructions: res.data[0].extendedInstructions.Topping
            })
        })

        // API for when comments are ready to be populated
        // API.getComments(id)
        // .then(res => {
        //     console.log("getComments", res.data);
        //     this.setState({
        //         comments: res.data
        //     })
        // })
    }

    render() {
        const { sourceUrl, title, img, servings } = this.state.recipe;
        const { Ingredients, Instructions, topIngredients, topInstructions, comments } = this.state
        const ingredients = Ingredients.map(ingredient => {
            return <ul>
                <li>
                    {ingredient.originalString}
                </li>
            </ul>
        })
        const instructions = Instructions.map(instruction => {
            return <ul>
                <li>
                    {instruction}
                </li>
            </ul>
        })

        return (
            <Container fluid>
            {/* header */}
                <Row>
                    <Header>
                        {title}
                    </Header>
                </Row>
            {/* Recipe */}
                <Row>
                    <Col size="5">
                        {ingredients}
                    </Col>
                    <Col size="5">
                        {instructions}
                    </Col>
                </Row>
            
                <Row>

                    {/* Comments */}

                </Row>
            </Container>
            
        )}

}

export default Develop;