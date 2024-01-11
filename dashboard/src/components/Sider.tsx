import React from "react";
import styled from "styled-components";
import { HomeFilled, MailFilled, LockFilled } from "@ant-design/icons";

type Props = {};

const Sider = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <SiderWrapper>
      <SiderUserWrapper>
        <img
          src="https://avatars.githubusercontent.com/u/17093669?v=4"
          alt="user"
        />
        <div>
          <h3>John Doe</h3>
          <p>Admin</p>
        </div>
      </SiderUserWrapper>
      <SiderTab onClick={() => setActiveTab(0)} active={activeTab === 0}>
        <HomeFilled />
        <h4>Home</h4>
      </SiderTab>
      <SiderTab onClick={() => setActiveTab(1)} active={activeTab === 1}>
        <MailFilled />
        <h4>Blog</h4>
      </SiderTab>
      <SiderTab onClick={() => setActiveTab(2)} active={activeTab === 2}>
        <LockFilled />
        <h4>Logout</h4>
      </SiderTab>
    </SiderWrapper>
  );
};

const SiderWrapper = styled.div`
  height: 100vh;
  width: 20rem;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const SiderUserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 2rem;

  img {
    width: 5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
`;

const SiderTab = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? "#ddd" : "#fff")};
  padding: 1.5rem;
  padding-left: ${(props) => (props.active ? "1.75rem" : "2rem")};
  border-left: ${(props) => (props.active ? "0.25rem solid #04918f" : "none")};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: #ddd;
  }
`;

export default Sider;
