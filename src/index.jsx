import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import "./index.css";
import App from "./App/App.jsx";
 import { QuestionnaireProvider } from "./context/QuestionnaireProvider.jsx";
 if (import.meta.env.NODE_ENV === 'production') {
  console.log('disabled devtool')
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QuestionnaireProvider>
        <App />
      </QuestionnaireProvider>
    </BrowserRouter>
  </React.StrictMode>
);
