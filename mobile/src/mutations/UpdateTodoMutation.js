import {
    commitMutation,
    graphql,
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
    mutation UpdateTodoMutation($input: UpdateTodoInput!) {
        updateTodo(input: $input) {
            todo {
                id
                isCompleted
            }
        }
    }
`

const commit = (todoId, isCheck) => {
    const variables = {
        input: {
            id: todoId,
            isCompleted: isCheck,
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