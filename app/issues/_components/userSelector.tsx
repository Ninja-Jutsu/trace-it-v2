'use client'
import { buttonStyles } from '@/utils/constants'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  users: User[]
  issue: Issue
}

export default function UserSelector({ users, issue }: Props) {
  const router = useRouter()
  async function assignIssue(userId: string) {
    try {
      const assignedUser = await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null })
      toast.success(assignedUser.data.name ? `Issue Assigned to ${assignedUser.data.name}` : 'Issue is unassigned')
      router.refresh()
    } catch (error) {
      toast.success('Issue is unassigned')
    }
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger
          style={buttonStyles}
          placeholder='Unassigned'
        />
        <Select.Content position='popper'>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={null!}>Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item
                value={user.id!}
                key={user.name}
              >
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
    </>
  )
}
