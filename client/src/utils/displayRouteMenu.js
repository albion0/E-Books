import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export const displayRouteMenu = (routes) => {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route) {
    return (
      <>
        {route.shouldShow ? (
          <Menu.Item key={route.key} icon={<route.icon />}>
            <Link to={route.path}>{route.categoryName}</Link>
          </Menu.Item>
        ) : null}
      </>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (
    <>
      {routes.map((route) => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {singleRoute(route)}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })}
    </>
  );
};
