import Skeletons from "./Skeletons";

export default function SkeletonSongList() {
  return (
    <div className="flex items-center gap-4">
      <Skeletons className="!h-16 sm:!h-24 !w-16 sm:!w-24" />
      <div className="p-2">
        <Skeletons className="!h-6 !w-48" />
        <Skeletons className="!h-6 !w-32" />
      </div>
    </div>
  )
}