/*
 * @Author: OctopusRoe
 * @Date: 2023-08-03 10:19:37
 * @LastEditors: OctopusRoe
 * @LastEditTime: 2023-08-03 15:23:44
 * @Description: icon component file
 */
import React, { FC } from 'react';

const requireAll = (requireContext: any) => {
  return requireContext.keys().map(requireContext);
};

// @ts-ignore
const file = require.context('./', false, /.svg$/);
requireAll(file);

const Icon: FC<IconProps> = props => {
  const {
    icon,
    height = 20,
    width = 20,
    color = '#fff',
    className,
    onClick
  } = props;

  if (typeof icon !== 'string') {
    return <>{icon}</>;
  }

  return (
    <div
      style={{ color: color }}
      className={className}
      onClick={onClick}
    >
      <svg
        width={width}
        height={height}
        style={{ fill: 'currentColor' }}
        aria-hidden="true"
      >
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
    </div>
  );
};

export default Icon;
