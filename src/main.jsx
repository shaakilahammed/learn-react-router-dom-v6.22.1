import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import {
    createContactAction,
    destroyContactAction,
    toggleFavoriteContactAction,
    updateContactAction,
} from './actions/actions';
import './index.css';
import { contactLoader, contactsLoader } from './loaders/loaders';
import Contact from './pages/Contact';
import EditContact from './pages/EditContact';
import Error from './pages/Error';
import Home from './pages/Home';
import Layout from './pages/Layout';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Layout />}
            errorElement={<Error />}
            loader={contactsLoader}
            action={createContactAction}
        >
            <Route errorElement={<Error />}>
                <Route index element={<Home />} />
                <Route
                    path="contacts/:contactId"
                    element={<Contact />}
                    loader={contactLoader}
                    action={toggleFavoriteContactAction}
                />
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact />}
                    loader={contactLoader}
                    action={updateContactAction}
                />
                <Route
                    path="contacts/:contactId/destroy"
                    action={destroyContactAction}
                    errorElement={<p>Oops! there was an error.</p>}
                />
            </Route>
        </Route>
    )
);

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Layout />,
//         errorElement: <Error />,
//         loader: contactsLoader,
//         action: createContactAction,
//         children: [
//             {
//                 errorElement: <Error />,
//                 children: [
//                     {
//                         index: true,
//                         element: <Home />,
//                     },
//                     {
//                         path: 'contacts/:contactId',
//                         element: <Contact />,
//                         loader: contactLoader,
//                         action: toggleFavoriteContactAction,
//                     },
//                     {
//                         path: 'contacts/:contactId/edit',
//                         element: <EditContact />,
//                         loader: contactLoader,
//                         action: updateContactAction,
//                     },
//                     {
//                         path: 'contacts/:contactId/destroy',
//                         action: destroyContactAction,
//                         errorElement: <p>Oops! there was an error.</p>,
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
