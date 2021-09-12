import React from 'react';
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from 'carbon-components-react';

export default function HCIHeader() {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header>
          <HeaderMenuButton
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName prefix="HCI">Papers Search</HeaderName>
          <HeaderNavigation>
            <HeaderMenuItem>Articles</HeaderMenuItem>
          </HeaderNavigation>
        </Header>
      )}
    />
  );
}
