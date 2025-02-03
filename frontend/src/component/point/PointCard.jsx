import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const PointCard = ({ number, expired_date, is_expired }) => {
  const props = useSpring({
    number,
    from: { number: 0 },
    config: { duration: 1000 },
  });

  const numberWithCommas = props.number.to(n => {
    return `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}p`;
  });

  return (
    <div className='point_card'>
      <p style={{ fontSize: '14px', color: 'lightgrey' }}>보유 포인트</p>
      <animated.div style={{ fontSize: '35px', fontWeight: 'bold' }}>
        { numberWithCommas }
      </animated.div>
      {is_expired === 'Y' ? <p style={{ fontSize: '12px', color: 'lightgrey' }}>만료일: { expired_date }</p> : <p style={{ fontSize: '12px', color: 'black' }}>No expiration</p>}
    </div>
  );
};

export default PointCard;
