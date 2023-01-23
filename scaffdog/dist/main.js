define(["require", "exports", "scaffolder/PrettyDog/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function App() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Pretty Dog"),
            React.createElement(index_1.PrettyDog, null, "pretty dog")));
    }
    const appRootNode = document.getElementById('root');
    const appRoot = ReactDOM.createRoot(appRootNode);
    appRoot.render(React.createElement(App));
});
//# sourceMappingURL=main.js.map