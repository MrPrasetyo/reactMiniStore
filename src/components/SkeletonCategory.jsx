import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCategory = () => {
  return (
    <SkeletonTheme baseColor="#cacaca" highlightColor="#525252">
      {[...Array(4)].map((_, index) => (
        <tr key={index}>
          <Card className="w-full flex flex-col items-center">
                  <CardHeader shadow={false} floated={false} className="m-0 rounded-none">
                    <Skeleton width={200} height={200} />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-2 text-left">
                      <Skeleton width={250} />
                    </Typography>
                    <Typography color="gray" className="font-normal mb-4">
                      <Skeleton width={250}/>
                    </Typography>
                      <Button variant="text" className="flex items-center gap-2 p-2">
                        <Skeleton width={250}/>
                      </Button>
                  </CardBody>
                </Card>
        </tr>
      ))}
    </SkeletonTheme>
  );
};

export default SkeletonCategory;
