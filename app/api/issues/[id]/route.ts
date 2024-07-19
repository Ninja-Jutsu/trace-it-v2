import { issueSchema } from '@/app/zod/zod-schema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json()

  const validation = issueSchema.safeParse(body)
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  if (!issue) return NextResponse.json({ error: 'Issue not found!' }, { status: 404 })

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title: body.title, description: body.description },
  })

  return NextResponse.json(updatedIssue)
}

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!issue) return NextResponse.json({ error: 'Issue not found!' }, { status: 404 })

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(id) },
  })

  return NextResponse.json(deletedIssue)
}
