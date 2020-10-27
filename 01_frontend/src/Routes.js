import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from '../src/components/NavigationBar/NavigationBar';
import App from '../src/components/App/App';
import Footer from '../src/components/Footer/Footer';
import About from '../src/components/NavigationBar/About';
import SinglePagePub from '../src/componentsSearch/SinglePagePub/SinglePagePub';
import VisitedList from '../src/componentsBlog/VisitedList/VisitedList';
import VisitedSinglePage from '../src/componentsBlog/VisitedSinglePage/VisitedSinglePage';
import Create from '../src/componentsBlog/Create/Create';
import Edit from '../src/componentsBlog/Edit/Edit';
import Admin from '../src/componentsBlog/Admin/Admin'



const Routes = () => {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/about" exact component={About} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/pub/:id" exact component={SinglePagePub} />
                <Route path="/visited" exact component={VisitedList} />
                <Route path="/visited/create" exact component={Create} />
                <Route path="/visited/edit/:id" exact component={Edit} />
                <Route path="/visited/:id" exact component={VisitedSinglePage} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}


export default Routes;