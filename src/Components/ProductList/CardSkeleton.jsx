import { Skeleton } from "antd";
import React from "react";

const CardSkeleton = () => {
  return (
    <div className="p-2 w-full md:w-[29vw] lg:w-[21vw] xl:w-[18vw] overflow-clip border border-gray-300 rounded-lg mb-4">
      <div className="h-28 w-full">
        <Skeleton.Image  className="h-full w-full" active />
      </div>
      <div className="mt-3">
        <Skeleton
          active
          paragraph={{
            rows: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CardSkeleton;
