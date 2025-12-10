import { prisma } from "@/lib/prisma"
import {
  Item,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Fragment } from "react/jsx-runtime"
import { cx } from "class-variance-authority"

export const TodoListItem = async () => {
    const todos =await prisma.todo.findMany();
    return (
        <>
        <div className="ml-64 mr-64 mt-12">
        {todos.map(todo =>(
            <Item variant="outline" key={todo.id}>
                <Checkbox id="status" defaultChecked={todo.status === "CHECKED"}  />
                <ItemContent>
                        <ItemTitle className={cx(todo.status==="CHECKED"?"line-through":"")}>{todo.label}</ItemTitle>
                    </ItemContent>
                    {todo.priority === "HIGH" &&
                    <Badge variant="destructive">{todo.priority}</Badge>
                    }
                    {todo.priority === "MEDIUM" &&
                    <Badge className="bg-amber-400" variant="outline">{todo.priority}</Badge>
                    }
                    {todo.priority === "LOW" &&
                    <Badge className="bg-emerald-500" variant="outline">{todo.priority}</Badge>
                    }
            </Item>
        ))}
        </div>
        </>
    )
}