import React from 'react';
import { connect, Dispatch } from 'dva';


interface BlankLayoutPropsType {
  dispatch: Dispatch,
  children:any
}

function BlankLayout({ dispatch,children }: BlankLayoutPropsType) {
  return (
    <div>
      {children}
    </div>
  );
}

export default connect(({}) => ({}))(BlankLayout);
