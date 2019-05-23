import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Row, Col } from "../../components/Grid";
import Header from "../../components/Header"
import { EditVersionBtn } from "../../components/Buttons";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { VersionList } from "../../components/List"
import "./develop.scss";
import loading from '../../assets/images/loading.gif';

class Develop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: null,
            loading: true,
            recipes: [],
            recipe: [],
            Ingredients: [],
            Instructions: [],
            ingredientTextInput: [],
            instructionTextInput: [],
            isIngredientEditable: false,
            isInstructionEditable: false,
            versions: []
        }

        this.handleIngredientChange = this.handleIngredientChange.bind(this)
        this.handleInstructionChange = this.handleInstructionChange.bind(this)
        this.loadVersion = this.loadVersion.bind(this)

    }

    // 1. Trigger child component (Develop page) to re-render if ingredients/instructions are updated.
    // 2. Make instructions updatable
    // 3. Show clickable links to render different versions of recipes in list
    // 4. Add Comments!!! 

    componentDidMount() {
        const { _id, id } = this.props.location.state
        console.log("location_id", _id);
        console.log("location id", id);

        API.loadMostRecentlySavedVersion(_id)
            .then(res => {
                console.log("loadMostRecentlySavedVersion", res.data)
                this.setState({
                    recipes: res.data,
                    recipe: res.data[0],
                    Ingredients: res.data[0].Ingredients,
                    Instructions: res.data[0].Instructions,
                    ingredientTextInput: res.data[0].Ingredients.join("\n"),
                    instructionTextInput: res.data[0].Instructions.join("\n")
                })
            })

        API.listAllVersions(id)
            .then(res => {
                console.log("All Versions", res)
                this.setState({
                    versions: res.data
                })
            })
            .catch(err => console.log('ERRR', err))

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

    loadVersion(_id) {
        console.log('LOAD VERSION _ID', _id)
        API.loadMostRecentlySavedVersion(_id)
            .then(res => {
                console.log("Load Version", res.data)
                this.setState({
                    recipes: res.data,
                    recipe: res.data[0],
                    Ingredients: res.data[0].Ingredients,
                    Instructions: res.data[0].Instructions,
                    ingredientTextInput: res.data[0].Ingredients.join("\n"),
                    instructionTextInput: res.data[0].Instructions.join("\n")
                })
            })
        }
    
    listAllVersions(id) {
        API.listAllVersions(id)
            .then(res => {
                console.log("All Versions", res)
                this.setState({
                    versions: res.data
                })
            })
            .catch(err => console.log('ERRR', err))
    }

    handleIngredientChange(event) {
        event.preventDefault();
        console.log(event.target.value.split("\n"))
        this.setState({
            ingredientTextInput: event.target.value
        })
    }

    handleInstructionChange(event) {
        event.preventDefault();
        console.log(event.target.value.split("\n"))
        this.setState({
            instructionTextInput: event.target.value
        })
    }

    editIngredients = () => {
        this.setState({
            isIngredientEditable: true
        })
    }

    editInstructions = () => {
        this.setState({
            isInstructionEditable: true
        })
    }

    saveRecipe = () => {

        // API.copyRecipe
        this.setState({
            isIngredientEditable: false,
            isInstructionEditable: false
        })

        console.log("...saving copy of recipe", this.state.recipe._id);

        const ingredientTextInput = this.state.ingredientTextInput.split("\n")
        console.log("ingredientTextInput", ingredientTextInput);

        const instructionTextInput = this.state.instructionTextInput.split("\n")
        console.log("instructionTextInput", instructionTextInput);

        const { id, sourceUrl, img, title, servings } = this.state.recipe

        // Save updated version of recipe as a 'new' recipe
        API.saveVersion({
            id,
            sourceUrl,
            img,
            title,
            servings,
            Ingredients: ingredientTextInput,
            Instructions: instructionTextInput

        })
            .then(res => {
                console.log("UPDATED RECIPE RESPONSE", res.data);
                const { id, _id } = res.data;
                API.loadMostRecentlySavedVersion(_id)
                    .then(res => {
                        console.log("loadMostRecentlySavedVersion", res.data)
                        this.setState({
                            recipes: res.data,
                            recipe: res.data[0],
                            Ingredients: res.data[0].Ingredients,
                            Instructions: res.data[0].Instructions,
                            ingredientTextInput: res.data[0].Ingredients.join("\n"),
                            instructionTextInput: res.data[0].Instructions.join("\n"),
                        })
                    })
                    .then(
                        API.logVersion({ id, _id })
                            .then(res => {
                                console.log("Version Created!", res)
                            })
                    )
            }).catch(err => console.log("ERRRRRRR", err))

    }

    render() {
        const { sourceUrl, title, img, servings } = this.state.recipe;
        const { Ingredients, Instructions, versions } = this.state

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

        const versionList = versions.map(version => {
            console.log('versionList mapping', version._id)
            return (
                <VersionList
                    _id={version._id}
                    onClick={this.loadVersion}>
                    {version.dateSaved}
                </VersionList>
            )
        })

        return (
            <div className="developPage">
                {this.state.loggedIn ? (
                    <div>
                        <Container fluid>
                        {/* Versions */}
                            <Row>
                                { versionList }
                            </Row>
                            {/* header */}
                            <Row>
                                <Header>
                                    <span id='recipe-title'>
                                        {title}
                                    </span>
                                </Header>
                            </Row>

                            {/* Recipe */}
                            <Row class='recipe-content'>
                                <Col size="5">
                                    {/* Buttons */}
                                    <Row>
                                        {this.state.isIngredientEditable ? (
                                            <EditVersionBtn onClick={this.saveRecipe}>
                                                Save Ingredients
                                            </EditVersionBtn>
                                        ) : (
                                            <EditVersionBtn onClick={this.editIngredients}>
                                                    Edit Ingredients
                                            </EditVersionBtn>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.isIngredientEditable ?
                                            <textarea
                                                value={this.state.ingredientTextInput}
                                                onChange={this.handleIngredientChange}>
                                            </textarea> :
                                            <div class='recipe-content-list'>
                                                {ingredients}
                                            </div>
                                            
                                        }
                                    </Row>
                                </Col>
                                <Col size="5">
                                    {/* Buttons */}
                                    <Row>
                                        {this.state.isInstructionEditable ? (
                                            <EditVersionBtn onClick={this.saveRecipe}>
                                                Save Instructions
                                            </EditVersionBtn>
                                        ) : (
                                            <EditVersionBtn onClick={this.editInstructions}>
                                                    Edit Instructions
                                            </EditVersionBtn>
                                        )}
                                    </Row>
                                    <Row>
                                        {this.state.isInstructionEditable ?
                                            <textarea
                                                value={this.state.instructionTextInput}
                                                onChange={this.handleInstructionChange}>
                                            </textarea> :
                                            <div class='recipe-content-list'>
                                                {instructions}
                                            </div>
                                            
                                        }
                                    </Row>

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