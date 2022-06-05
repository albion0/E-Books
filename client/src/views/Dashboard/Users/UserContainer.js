import React from "react";
import { Tabs } from "antd";
import { ListAdmins } from "./Admins/ListAdmins";
import { ListReaders } from "./Readers/ListReaders";

const { TabPane } = Tabs;

const UserContainer = () => {
  return (
    <Tabs type="card" destroyInactiveTabPane>
      <TabPane tab="Admin" key="1">
        <ListAdmins />
      </TabPane>
      <TabPane tab="Readers" key="2">
        <ListReaders />
      </TabPane>
    </Tabs>
  );
};
export default UserContainer;
