import React from "react";
import { SkeletonPlaceholder } from "carbon-components-react";
import "./skeleton.scss";

export default function Skeleton() {
	return (
		<>
			<SkeletonPlaceholder className="skeleton" />
			<SkeletonPlaceholder className="skeleton" />
			<SkeletonPlaceholder className="skeleton" />
			<SkeletonPlaceholder className="skeleton" />
			<SkeletonPlaceholder className="skeleton" />
		</>
	);
}
