import { getData } from "@/app/actions/todoActions";
import Todo from "@/components/shared/Todo";

const ListTodo = async () => {
  const data = await getData();

  return (
    <div className=" flex flex-col gap-5 items-center justify-center mt-10 w-full">
      {data.map((todo, id) => (
        <div className="w-full" key={id}>
          <Todo todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default ListTodo;

// import Todo from "@/components/shared/Todo";
// import { prisma } from "@/utils/prisma";

// async function getData() {
//   const data = await prisma.todo.findMany({
//     select: {
//       title: true,
//       id: true,
//       isCompleted: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return data;
// }

// const ListTodo = async () => {
//   const data = await getData();

//   return (
//     <div className=" flex flex-col gap-5 items-center justify-center mt-10 w-full">
//       {data.map((todo, id) => (
//         <div className="w-full" key={id}>
//           <Todo todo={todo} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ListTodo;
