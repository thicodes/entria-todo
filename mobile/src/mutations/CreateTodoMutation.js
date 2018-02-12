import {
    commitMutation,
    graphql,
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
    mutation CreateTodoMutation($input: CreateTodoInput!) {
        createTodo(input: $input) {
            todo {
                id
                task
            }
        }
    }
`

const commit = (task) => {
    const variables = {
        input: {
            task,
            clientMutationId: ""
        }
    };
    return new Promise((resolve, reject) => {
        commitMutation(environment, {
            mutation,
            variables,
            onCompleted: (response, error) => {
                console.log(response, environment)
                resolve(response)
            },
            onError: err => reject(err)
        })
    })
}

export default commit;