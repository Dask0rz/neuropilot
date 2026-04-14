import { redirect } from 'next/navigation'
export default function ChapterRedirect({ params }: { params: { chapterId: string } }) {
  redirect(`/dashboard/chapters/${params.chapterId}`)
}
