import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Header"
import { EditVersionBtn } from "../../components/Buttons";

class Develop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipe: [],
            Ingredients: [],
            Instructions: [],
            ingredientTextInput: [],
            isEditable: false
        }

        this.handleChange = this.handleChange.bind(this)

    }

    // 1. Trigger child component (Develop page) to re-render if ingredients/instructions are updated.
    // 2. Make instructions updatable
    // 3. Show clickable links to render different versions of recipes in list
    // 4. Add Comments!!! 
    
    componentDidMount() {
        const { _id } = this.props.location.state
            API.loadMostRecentlySavedVersion(_id)
            .then(res => {
                console.log("loadMostRecentlySavedVersion", res.data)
                this.setState({
                    recipes: res.data,
                    recipe: res.data[0],
                    Ingredients: res.data[0].Ingredients,
                    Instructions: res.data[0].Instructions,
                    ingredientTextInput: res.data[0].Ingredients.join("\n")
                })
            })
    }

    handleChange(event) {
        event.preventDefault();
        console.log(event.target.value.split("\n"))
        this.setState({
            ingredientTextInput: event.target.value
        })
    }

    editRecipe = () => {
        console.log("editRecipe")
        this.setState({
            isEditable: true
        })
    }

    saveVersion = () => {

        // API.copyRecipe
        this.setState({
            isEditable: false
        })

        console.log("...saving copy of recipe", this.state.recipe._id);

        const ingredientTextInput = this.state.ingredientTextInput.split("\n")
        console.log("ingredientTextInput", ingredientTextInput);

        const { id, sourceUrl, img, title, servings } = this.state.recipe

        // update ingredients
        API.saveVersion({
            id,
            sourceUrl,
            img, 
            title, 
            servings,
            Ingredients: ingredientTextInput,
            Instructions: this.state.Instructions

        })
        .then(res => {
            console.log("Version RESPONSE", res.data);
            const { id, _id } = res.data;
            API.logVersion({ id, _id })
            .then(res => {
                console.log("Version Created!", res)
            })
        })
        .catch(err => console.log("ERRRRRRR", err))
        
    }

    render() {
        const { sourceUrl, title, img, servings } = this.state.recipe;
        const { Ingredients, Instructions } = this.state

        const ingredients = Ingredients.map(ingredient => {
            return <ul>
                <li>
                    {ingredient}
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
                {/* Buttons */}
                <Row>
                    {this.state.isEditable ? (
                        <EditVersionBtn onClick={this.saveVersion}> 
                            Save Ingredients
                        </EditVersionBtn>
                    ) : ( 
                        <EditVersionBtn onClick={this.editRecipe}>
                            Edit Ingredients
                        </EditVersionBtn>
                    )}
                </Row>
            {/* Recipe */}
                <Row>
                    <Col size="5">
                        {this.state.isEditable ? 
                        <textarea 
                            value={this.state.ingredientTextInput} 
                            onChange={this.handleChange}>
                        </textarea> :
                        ingredients
                    }    
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