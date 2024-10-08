import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { Link, IssueStatusBadge } from '@/app/components'

//compo
import IssueActions from './IssueActions'

export const dynamic = 'force-dynamic'
// export const revalidate = 0 // both this and dynamic are the same

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()
  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, createdAt, description, title, status }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

