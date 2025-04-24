import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const cookieStore = cookies()
  const session = (await cookieStore).get('session')?.value

  const payload = await decrypt(session)
  console.log('payload', payload)

  if (!payload || !payload.userId) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Welcome user: {String(payload.userName)}</p>
    </div>
  )
}
