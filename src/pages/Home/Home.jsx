import React from 'react';
import { Grid } from 'carbon-components-react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import Header from '../../components/index';
import ArticlesFilter from './ArticlesFilter';

export default function Home() {
  return (
    <>
      <Header />
      <Content>
        <Grid>
          <ArticlesFilter />
        </Grid>
      </Content>
    </>
  );
}
