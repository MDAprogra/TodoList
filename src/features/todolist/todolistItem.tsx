import {
  Item,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cx } from "class-variance-authority"
import type { Todo } from "@/generated/prisma/client"

export type TodoListItemProps = {
    todo : Todo,
}

export const TodoListItem = ({
    todo,
    ...rest
}: TodoListItemProps
) => {

    return (
        <>
        <div className="ml-64 mr-64">
            <Item {...rest} variant="outline">
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
        </div>
        </>
    )
}