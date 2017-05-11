import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Button } from 'react-native';
import StartupStack from './navigation/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAppReady: false,
      // isLoggedIn: false,
      isLoggedIn: true,
      recipes: [],
      image: null,
      predictions: [],
      searchResults: {},
      ingredients: [
        {name: 'blueberry'},
        {name: 'strawberry'},
        {name: 'blackberry'}
      ],
    };
  }

  // componentDidMount() {
  //   const login = () => this.setState({isLoggedIn: true});
  //   setTimeout(login.bind(this), 2000);
  // }

  componentDidMount() {
    fetch('https://jellyfiish-recipely.herokuapp.com/api/recipes?q=')
      .then(res => res.json())
      .then(results => this.onRecipesChange(results.recipes))
      .then(() => this.setState({isAppReady: true}));
  }

  onRecipesChange = (recipes) => {
    this.setState({recipes});
  };

  onImageChange = (image) => {
    this.setState({image});
  }

  onPredictionsChange = (predictions) => {
    this.setState({predictions});
  }

  onSearchChange = (query, results) => {
    this.setState({
      searchResults: { ...this.state.searchResults, [query]: results }
    });
  };

  onIngredientChange = (ingredients) => {
    this.setState({ingredients});
  };

  onLoginChange = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn});
  }

  render() {
    return (
      <StartupStack
        screenProps={
          {
            isAppReady: this.state.isAppReady,
            isLoggedIn: this.state.isLoggedIn,
            recipes: this.state.recipes,
            image: this.state.image,
            predictions: this.state.predictions,
            searchResults: this.state.searchResults,
            ingredients: this.state.ingredients,
            onRecipesChange: this.onRecipesChange,
            onImageChange: this.onImageChange,
            onPredictionsChange: this.onPredictionsChange,
            onSearchChange: this.onSearchChange,
            onIngredientChange: this.onIngredientChange,
            onLoginChange: this.onLoginChange,
          }
        }
      />
    );
  }
}

Expo.registerRootComponent(App);
