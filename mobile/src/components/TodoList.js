import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'
import {
    List,
    ListItem,
    Header
} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import moment from 'moment'
import hoistStatics from 'hoist-non-react-statics'
import {
    createFragmentContainer,
    createPaginationContainer,
    graphql,
    QueryRenderer,
  } from 'react-relay';
  import { withNavigation } from 'react-navigation';
  import environment from '../Environment'
  import Todo from './Todo'

@withNavigation
class TodoList extends Component {
    static navigationOptions = {
        header: null
    }

    goToAdd = () => {
        this.props.navigation.navigate('TodoAdd')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.superHeader}>
                    <Text style={styles.titleH1}>Todo List</Text>
                    <Text style={styles.titleH2}>{moment().format("ddd MMM Do")}</Text>
                </View>
                <ScrollView>
                    <View>
                        {this.props.viewer.allTodoes.edges.map(({node}) =>
                            <Todo key={node.__id} todo={node} />
                        )}
                    </View>
                </ScrollView>
                <ActionButton onPress={this.goToAdd} buttonColor="#CC0067" />
            </View>
        )
    }
}

const TodoListFragmentContainer = createFragmentContainer(
    TodoList,
    graphql`
        fragment TodoList_viewer on Viewer {
            allTodoes(last: 100, orderBy: createdAt_DESC) @ connection(key: "TodoList_allTodoes", filters: []) {
                edges {
                    node {
                        ...Todo_todo
                    }
                }
            }
        }
    `
)

const TodoListQueryRenderer = () => {
    return(
        <QueryRenderer
            environment={environment}
            query={graphql`
            query TodoListLoadingAllTodoQuery {
              viewer {
                ...TodoList_viewer
              }
            }
            `}
            render={({error, props}) => {
                if (error) {
                    return <Text>{error.message}</Text>
                } else if (props) {
                    return <TodoListFragmentContainer viewer={props.viewer} />
                }
                return <Text>Loading</Text>
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7ebee'
    },
    superHeader: {
        backgroundColor: '#832655',
        padding: 15,
    },
    titleH1: {
        fontSize: 58,
        color: '#fff'
    },
    titleH2: {
        fontSize: 25,
        color: '#fff'
    }
})


export default hoistStatics(TodoListQueryRenderer, TodoList);