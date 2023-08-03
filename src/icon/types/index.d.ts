/*
 * @Author: OctopusRoe
 * @Date: 2023-08-03 10:20:17
 * @LastEditors: OctopusRoe
 * @LastEditTime: 2023-08-03 11:18:17
 * @Description:
 */

/// <reference types="react" />
/// <reference types="react-dom" />

declare type IconProps = {
  icon: React.ReactNode | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  closeIcon?: React.ReactNode;
  className?: any;
  onClick?: () => void;
};
