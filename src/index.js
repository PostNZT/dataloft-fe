import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from 'store/store'
import * as serviceWorker from 'serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
