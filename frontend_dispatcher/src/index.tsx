import React from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import { store } from 'redux/store'


export const theme = createMuiTheme({
	palette: {
		primary: {
			dark: '#000000',
			main: '#696969'
		},
		secondary: {
			dark: '#FFB800',
			main: '#FFB800',
			light: '#FFB800',
		},
		text: {
			primary: '#000000',
			secondary: '#A6ACBE',
		},
		background: {
			default: '#E5E5E5',
		},

		success: {
			main: '#FE5834',
			light: '#FF947C'
		},
		info: {
			main: '#007EFF',
			light: '#007EFF',
		},
		error: {
			main: '#FE5834',
			light: '#FF947C'
		},
		warning: {
			main: '#FFB800'
		}

	},
	typography: {
		fontFamily: 'Proxima Nova Rg',
	}
});


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
