import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button
} from 'react-native-elements'
import {
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from '../Environment'
import CreatePostMutation from '../mutations/CreateTodoMutation'

const TodoAddViewerQuery = graphql`
    query TodoAddViewerQuery {
        viewer {
            id
        }
    }
`

class TodoAdd extends Component {
    static navigationOptions = {
        title: 'Todo Add',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#832655'
        }
    }

    state = {
        task: ''
    }

    handleSubmit = async(viewerId) => {
        const { task } = this.state
        await CreatePostMutation(task)
        this.props.navigation.navigate('TodoList')
        //CreatePostMutation(task, viewerId, () => this.props.navigation.navigate('TodoListLoading') )
    }

    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={TodoAddViewerQuery}
                render={({error, props}) => {
                    if (error) {
                        return <Text>{error.message}</Text>
                    } else if (props) {
                        return (
                            <View style={styles.container}>
                                <View style={styles.formView}>
                                    <FormInput
                                        placeholder='Todo Task'
                                        onChangeText={(task) => this.setState({task})}
                                    />
                                </View>


                                    <Button
                                        large
                                        title='SAVE'
                                        onPress={() => this.handleSubmit(props.viewer.id)}
                                        backgroundColor='#832655'
                                    />

                            </View>
                        )
                    }
                    return <Text>Loading</Text>
                }}
            />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: 'white'
    },
    formView: {
        paddingBottom: 22,
    }
})

export default TodoAdd