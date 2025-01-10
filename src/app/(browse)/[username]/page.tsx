
interface UserPageProps {
  params: { username: string };
}

export default function userPage({ params }: UserPageProps) {
  return (
    <div>
      user page{params.username}
    </div>
  )
}
