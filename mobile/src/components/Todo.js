import React, { Component } from 'react'
import {
    createFragmentContainer,
    graphql
} from 'react-relay'
import {
    Text,
    View,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import moment from 'moment'
import UpdateTodoMutation from '../mutations/UpdateTodoMutation'

class Todo extends Component {
    state = {
        checked: false
    }

    componentDidMount() {
        this.setState({ checked: this.props.todo.isCompleted })
    }

    handleCheck = () => {
        this.setState({ checked: !this.state.checked }, () => {
            UpdateTodoMutation(this.props.todo.id, this.state.checked)
        })
    }
    render() {
        let { 
            todo,
            createdAt
        } = this.props
        
        return (
            <CheckBox
                onPress={this.handleCheck}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={
                    <View style={{paddingLeft: 10}}>
                        <Text style={{fontSize: 18, color: '#000'}}>{todo.task}</Text>
                        <Text>{moment(todo.createdAt, 'YYYYMMDD').fromNow()}</Text>
                    </View>
                }
                checked={this.state.checked}
            />
        )
    }
}

export default createFragmentContainer(Todo, graphql`
    fragment Todo_todo on Todo {
        id
        task
        createdAt
        isCompleted
    }
`)