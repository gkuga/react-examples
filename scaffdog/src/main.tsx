import { PrettyDog } from 'scaffolder/PrettyDog/index'

function App() {
	return (
		<>
			<h1>Pretty Dog</h1>
			<PrettyDog>pretty dog</PrettyDog>
		</>
	)
}
const appRootNode = document.getElementById('root');
const appRoot = ReactDOM.createRoot(appRootNode);
appRoot.render(React.createElement(App));
