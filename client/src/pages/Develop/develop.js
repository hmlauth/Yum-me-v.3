import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Header"
import { EditVersionBtn } from "../../components/Buttons";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import "./develop.scss";
import loading from '../../assets/images/loading.gif';

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
            comments: [],
            isEditable: false,
            textInput: []
        }

        this.handleChange = this.handleChange.bind(this)

    }

    state = {
        loggedIn: false,
        user: null,
        loading: true
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
                topInstructions: res.data[0].extendedInstructions.Topping,
                textInput: res.data[0].extendedIngredients.Ingredients.map(ingredient => ingredient.originalString).join("\n")
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
        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props)

    }

    loading() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }


    handleChange(event) {
        event.preventDefault();
        console.log(event.target.value.split("\n"))
        console.log(this);
        this.setState({
            textInput: event.target.value
        })
    }

    editRecipe = () => {
        console.log("editRecipe")
        this.setState({
            isEditable: true
        })
    }

    saveRecipe = () => {

        // API.copyRecipe
        this.setState({
            isEditable: false
        })

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
            <div className="developPage">
                {this.state.loggedIn ? (
                    <div>
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
                                    <EditVersionBtn onClick={this.saveRecipe}> 
                                        Save Recipe
                                    </EditVersionBtn>
                                ) : ( 
                                    <EditVersionBtn onClick={this.editRecipe}>
                                        Edit Recipe
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
                    </div>

                ) : (
                    <div className="noUser">
                    {!this.state.loading ? (
                        <>
                            <h1>Please log in.</h1>
                            <Link className="loginLink" to="/login">
                            <Button className="loginBtn" color="info" block>Login</Button>
                            </Link>
                       <br></br>
                        </>
                    ) : (

                        <img src={loading} className="loadingIcon" alt="loading"></img>

                        )}
                </div>

                    )}
            </div>
    
        )

    }
}

export default Develop;