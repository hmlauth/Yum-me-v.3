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
            isEditable: false,
            textInput: []
        }

        this.handleChange = this.handleChange.bind(this)

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
                Ingredients: res.data[0].Ingredients,
                Instructions: res.data[0].Instructions,
                textInput: res.data[0].Ingredients.join("\n")
            })
            console.log(this.state.Ingredients)
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

    handleChange(event) {
        event.preventDefault();
        this.setState({
            textInput: event.target.value

        })
        console.log(this.state.Ingredients)
    }

    editRecipe = () => {
        console.log("editRecipe")
        this.setState({
            isEditable: true
        })
    }

    updateRecipe = () => {

        // API.copyRecipe
        this.setState({
            isEditable: false
        })

        console.log("...updatings recipe", this.state.recipe._id);
        const _id = this.state.recipe._id
        const textInput = this.state.textInput.split("\n")
        console.log("___ID", _id);
        console.log("TEXTINPUT", textInput);

        // update ingredients
        API.updateRecipe({
            _id: _id,
            textInput: textInput
        })
        .then(res => console.log(res))
        .catch(err => console.log("ERRRRRRR", err))

    }

    render() {
        const { sourceUrl, title, img, servings } = this.state.recipe;
        const { Ingredients, Instructions } = this.state

        const ingredients = Ingredients.map(ingredient => {
            console.log(ingredient)
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
                        <EditVersionBtn onClick={this.updateRecipe}> 
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
                            value={this.state.textInput} 
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