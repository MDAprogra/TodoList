import { prisma } from '@/lib/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/client';

export async function DELETE(_req: Request,{
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    return Response.json({ data: updatedTodo }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    return Response.json({ message: error }, { status: 400 });
  }
}