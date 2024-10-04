import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import { Amplify } from "aws-amplify";
import queryClient from './api/client';

// Amplify.configure({

//   Auth: {
//     mandatorySignIn: false,
//     region: amplifyConfig.cognito.region,
//     userPoolId: amplifyConfig.cognito.userPoolId,
//     userPoolWebClientId: amplifyConfig.cognito.userPoolClient,
//   }

// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
  </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
