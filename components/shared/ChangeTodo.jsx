import Button from "../ui/Button";
import Form from "../ui/Form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Input from "../ui/Input";
import { todoStatus } from "@/app/actions/todoActions";

const ChangeTodo = ({ todo }) => {
  return (
    <Form action={todoStatus}>
      <Input
        name="inputId"
        value={todo.id}
        className="border-gray-700 border"
        type="hidden"
      />

      <Button actionButton type="submit" text={<AiOutlineCheckCircle />} />
    </Form>
  );
};

export default ChangeTodo;
