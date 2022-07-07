import Skeletons from "./Skeletons";

export default function SkeletonArtistList() {
  return (
    <div>
      <Skeletons className="!h-56 md:!h-52" />
      <div className="p-3">
        <Skeletons className="!h-6 !w-48" />
        <Skeletons className="!h-6 !w-32" />
      </div>
    </div>
  )
}