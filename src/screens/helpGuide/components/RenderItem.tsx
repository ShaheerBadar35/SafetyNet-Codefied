import React from 'react';
import ShowGuide from './ShowGuide';

const RenderItem = ({item, index}: any) => {
  return (
    <ShowGuide
      heading={item?.heading}
      desc1={item?.desc1}
      desc2={item?.desc2}
    />
  );
};

export default RenderItem;
