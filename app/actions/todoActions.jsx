"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

/*************************************Create*************************************/

// Lorsque l'utilisateur soumet le formulaire, le navigateur crée l'objet formData et l'envoie au serveur.
// formData c'est nous qui l'avons créer dans action dans Form.jsx
export async function create(formData) {
  // "input" provient de <Input name="input" type="text" placeholder="Add Todo..." /> qui est le name.
  // La fonction create() reçoit l'objet FormData et utilise la méthode get() pour récupérer la valeur de la propriété "input".
  // Cette valeur est ensuite stockée dans la variable input.
  const input = formData.get("input");

  // Si le champs est vide, il n'envoie pas les informations à la BDD
  if (!input.trim()) {
    return;
  }

  // Create

  await prisma.todo.create({
    data: {
      title: input,
    },
  });

  revalidatePath("/"); // Pour actualiser la page après le submit.
}

/********************************************************************/
/*
Voici comment se déroule la correspondance :

1/ Dans le code HTML du composant AddTodo, la ligne <Input name="input" type="text" placeholder="Add Todo..." /> 
crée un champ de saisie de texte. L'attribut name de ce champ est défini à "input". 
Cela signifie que lorsque le formulaire est soumis, la valeur saisie dans ce champ sera associée à la clé "input" dans l'objet FormData.

2/ Lorsque l'utilisateur soumet le formulaire, le navigateur crée l'objet FormData et l'envoie au serveur. 
Cet objet contient une propriété nommée "input" dont la valeur est la valeur saisie par l'utilisateur dans le champ de texte.

3/ La fonction create() reçoit l'objet FormData et utilise la méthode get() pour récupérer la valeur de la propriété "input". 
Cette valeur est ensuite stockée dans la variable input.
*/

/********************************************************************/
/*
Si nous avons plusieurs données à envoyer dans le formulaire le code devient ainsi :

export async function create(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const priority = formData.get("priority");
  const dueDate = formData.get("dueDate");

  if (!title.trim() || !description.trim() || !priority.trim() || !dueDate.trim()) {
  return;
}

  await prisma.todo.create({
    data: {
      title,
      description,
      priority,
      dueDate,
    },
  });

  revalidatePath("/"); // Pour actualiser la page après le submit.
}


*/
/***********************************************************************/

/*************************************findMany*************************************/

export async function getData() {
  const data = await prisma.todo.findMany({
    select: {
      title: true,
      id: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

/*
await prisma.todo.findMany({: Cette ligne appelle la fonction findMany() de l'objet prisma.todo. 
Cette fonction est utilisée pour récupérer plusieurs enregistrements de la table todo de la base de données.
On sait que la table s'appelle todo car c'est dans la schema

select:: Cette propriété spécifie les champs à inclure dans les résultats de la requête. 
Dans ce cas, seuls les champs title, id et isCompleted seront inclus.

*/

/*************************************Changer le statut*************************************/

export async function todoStatus(formData) {
  const inputId = formData.get("inputId");
  const todo = await prisma.todo.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!todo) {
    return;
  }

  const updatedStatus = !todo.isCompleted;

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      isCompleted: updatedStatus,
    },
  });

  revalidatePath("/");

  return updatedStatus;
}

/*
Le statut de Todo est par défaut false, cette fonction sert à le rendre true ou false.

1/ function todoStatus(formData) {: Définit la fonction todoStatus() qui prend en argument 
un objet formData contenant les données du formulaire.

2/ const inputId = formData.get("inputId"); 
Récupère l'ID de la tâche à mettre à jour à partir de l'objet formData. L'ID est stocké dans la variable inputId.

3/ const todo = await prisma.todo.findUnique({ where: { id: inputId } });

a/ where: indique que vous souhaitez filtrer les résultats de la requête en fonction de certaines conditions.
b/Récupère la tâche spécifique à mettre à jour à partir de la base de données en utilisant prisma.todo.findUnique().
c/La recherche se fait en fonction de l'ID fourni dans inputId.
d/Le résultat est stocké dans la variable todo.

4/ if (!todo) { return; } : Vérifie si une tâche a été trouvée. Si aucune tâche n'est trouvée, la fonction se termine.

5/ const updatedStatus = !todo.isCompleted; : 
Inverse l'état d'achèvement de la tâche (isCompleted) et stocke le nouvel état dans updatedStatus.

6/ await prisma.todo.update({ where: { id: inputId }, data: { isCompleted: updatedStatus } });
Met à jour la tâche dans la base de données avec l'état d'achèvement modifié (isCompleted est défini à updatedStatus).
*/

/*************************************Edit*************************************/

export async function edit(formData) {
  const input = formData.get("newTitle");
  const inputId = formData.get("inputId");

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      title: input,
    },
  });

  revalidatePath("/");
}

/*************************************Delete*************************************/

export async function deleteTodo(formData) {
  const inputId = formData.get("inputId");

  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/");
}
