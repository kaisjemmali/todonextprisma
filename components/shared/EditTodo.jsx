"use client";

import { edit } from "@/app/actions/todoActions";
import Form from "../ui/Form";
import Input from "../ui/Input";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import Button from "../ui/Button";

const EditTodo = ({ todo }) => {
  const [editTodo, setEditTodo] = useState(false);

  const handleEdit = () => {
    setEditTodo(!editTodo);
  };

  const handleSubmit = () => {
    setEditTodo(false);
  };
  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<BiEdit />} actionButton />

      {editTodo ? (
        <Form action={edit} onSubmit={handleSubmit}>
          <Input name="inputId" value={todo.id} type="hidden" />
          <div className="flex justify-center">
            <Input type="text" name="newTitle" placeholder="Edit Todo..." />

            <Button type="submit" text="Save" />
          </div>
        </Form>
      ) : null}
    </div>
  );
};

export default EditTodo;

/***************************************************************************/
/*
1/ const EditTodo = ({ todo }) => { : 
Définit un composant React fonctionnel nommé EditTodo qui prend un objet todo comme prop. Cet objet todo représente la tâche à modifier.

2/ const [editTodo, setEditTodo] = useState(false);
Utilise le hook useState pour gérer un état local nommé editTodo. 
Cet état est initialisé à false, ce qui signifie que le formulaire d'édition n'est pas visible au départ.

3/ const handleEdit = () => { ... }
a) Définit une fonction nommée handleEdit qui est appelée lorsque l'utilisateur clique sur le bouton d'édition.
b) La fonction inverse l'état editTodo en utilisant setEditTodo(!editTodo), ce qui fait basculer l'affichage du formulaire d'édition.

4/ const handleSubmit = () => { ... }
a) Définit une fonction nommée handleSubmit qui est appelée lorsque le formulaire d'édition est soumis.
b) La fonction ferme le formulaire en définissant editTodo sur false.

*/
