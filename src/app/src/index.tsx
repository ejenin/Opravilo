import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app'
import { store } from './store/store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)