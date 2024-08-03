import { Typography } from '@material-tailwind/react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTable = () => {
  return (
    <SkeletonTheme baseColor="#cacaca" highlightColor="#525252">
      {[...Array(6)].map((_, index) => (
        <tr key={index}>
          <td className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton circle={true} height={40} width={40} />
            </div>
          </td>
          <td className="p-4">
            <Typography variant="small" color="gray" className="font-normal">
              <Skeleton width={260} />
            </Typography>
          </td>
          <td className="p-4">
            <Typography variant="small" color="gray" className="font-normal">
              <Skeleton width={80} />
            </Typography>
          </td>
          <td className="p-4">
            <Typography variant="small" color="gray" className="font-normal">
              <Skeleton width={50} />
            </Typography>
          </td>
          <td className="p-4">
            <Skeleton width={30} />
          </td>
        </tr>
      ))}
    </SkeletonTheme>
  );
};

export default SkeletonTable;
